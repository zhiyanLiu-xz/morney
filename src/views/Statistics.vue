<template>
  <Layout class="wrapper">
    <Tabs class-prefix="type" :data-source="recordTypeList"
          :value.sync="type"/>
    <div class="chart-wrapper" ref="chartWrapper">
      <Chart class="chart" :options="chartOptions"/>
    </div>
    <ol v-if="groupedList.length>0" class="itemList">
      <li v-for="(group,index) in groupedList" :key="index">
        <ol class="title">
          <li>{{group.title}}</li>
          <li v-if="type==='-'">支出：{{amount}}</li>
          <li v-else>收入：{{amount}}</li>
        </ol>
        <ol>
          <li v-for="item in group.items" :key="item.id" class="record">
            <span>{{tagString(item.tags)}}</span>
            <span class="notes">{{item.notes}}</span>
            <span class="itemAmount">￥{{item.amount}}</span>
          </li>
        </ol>
      </li>
    </ol>
    <div v-else class="noResult">
      目前没有相关记录
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Tabs from '@/components/Tabs.vue';
  import {Component} from 'vue-property-decorator';
  import recordTypeList from '@/constants/recordTypeList';
  import dayjs from 'dayjs';
  import clone from '@/lib/clone';
  import Chart from '@/components/Chart.vue';
  import _ from 'lodash';

  @Component({
    components: {Chart, Tabs}
  })
  export default class Statistics extends Vue {
    amount = 0;

    // eslint-disable-next-line no-undef
    tagString(tags: Tag[]) {
      return tags.length === 0 ? '无' : tags.map(t => t.name).join('，');
    }

    mounted() {
      const div = (this.$refs.chartWrapper as HTMLDivElement);
      div.scrollLeft = div.scrollWidth;
      this.add();
    }

    add() {
      for (let i = 0; i < this.groupedList.length; i++) {
        const number1 = this.groupedList[i].total as number;
        this.amount = this.amount + number1;
      }
      return this.amount;
    }

    beautify(string: string) {
      const day = dayjs(string);
      const now = dayjs();
      if (day.isSame(now, 'day')) {
        return '今天';
      } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
        return '昨天';
      } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
        return '前天';
      } else if (day.isSame(now, 'year')) {
        return day.format('M月D日');
      } else {
        return day.format('YYYY年M月D日');
      }
    }

    get keyValueList() {
      const today = new Date();
      const array = [];
      for (let i = 0; i <= 29; i++) {
        const dateString = dayjs(today)
          .subtract(i, 'day').format('YYYY-MM-DD');
        const found = _.find(this.groupedList, {
          title: dateString
        });
        array.push({
          key: dateString, value: found ? found.total : 0
        });
      }
      array.sort((a, b) => {
        if (a.key > b.key) {
          return 1;
        } else if (a.key === b.key) {
          return 0;
        } else {
          return -1;
        }
      });
      return array;
    }

    get chartOptions() {
      const keys = this.keyValueList.map(item => item.key);
      const values = this.keyValueList.map(item => item.value);
      return {
        grid: {
          left: 0,
          right: 0,
          height: 150,
        },
        xAxis: {
          type: 'category',
          data: keys,
          axisTick: {alignWithLabel: true},
          axisLine: {lineStyle: {color: '#ff9ab7'}},
          axisLabel: {
            formatter: function (value: string, index: number) {
              return value.substr(5);
            }
          }
        },
        yAxis: {
          type: 'value',
          show: false
        },
        series: [{
          symbol: 'circle',
          symbolSize: 12,
          itemStyle: {borderWidth: 1, color: '#ff9ab7', borderColor: '#ff9ab7'},
          data: values,
          type: 'line'
        }],
        tooltip: {
          show: true, triggerOn: 'click',
          position: 'top',
          formatter: '{c}'
        }
      };
    }


    get recordList() {
      // eslint-disable-next-line no-undef
      return (this.$store.state as RootState).recordList;
    }

    get groupedList() {
      const {recordList} = this;
      const newList = clone(recordList)
        .filter(r => r.type === this.type)
        .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
      if (newList.length === 0) {return [];}
      // eslint-disable-next-line no-undef
      type Result = { title: string, total?: number, items: RecordItem[] }[]
      const result: Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList [0]]}];
      for (let i = 1; i < newList.length; i++) {
        const current = newList[i];
        const last = result[result.length - 1];
        if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
          last.items.push(current);
        } else {
          result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
        }
      }
      result.map(group => {
        group.total = group.items.reduce((sum, item) => {
          return sum + item.amount;
        }, 0);
      });
      return result;
    }

    beforeCreate() {
      this.$store.commit('fetchRecords');
    }

    type = '-';
    recordTypeList = recordTypeList;
  }
</script>

<style scoped lang="scss">
  .noResult {
    padding: 16px;
    text-align: center;
  }

  %item {
    padding: 8px 16px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .wrapper {
    background: #fafaf8;
  }

  .itemList {
    margin-top: 12px;
    max-height: 282px;
    overflow: scroll;

    .title {
      @extend %item;
      font-size: 12px;
      background: #f2f6f5;
      height: 26px;
      color: #818584;
    }

    .record {
      background: white;
      @extend %item;

      > .itemAmount {
        color: #ff9bbb;
      }
    }

    .notes {
      margin-right: auto;
      margin-left: 16px;
      color: #999999;
    }

    ::v-deep {
      .type-tabs-item {
        &.selected {
          background: white;

          &::after {
            display: none;
          }
        }
      }

      .interval-tabs-item {
        height: 48px;
      }
    }
  }

  .chart {
    background: white;
    width: 430%;
    max-height: 250px;

    &-wrapper {
      overflow: auto;

      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
</style>