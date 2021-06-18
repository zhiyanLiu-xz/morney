<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount"
               @submit="saveRecord"/>
    <div class="createdAt">
      <FormItem field-name="日期"
                type="date"
                placeholder="在这里输入日期"
                :value.sync="record.createdAt"/>
    </div>
    <Tags v-if="record.type === '-'" @update:value="record.tags=$event"/>
    <IncomeTag v-if="record.type === '+'" @update:value="record.tags=$event"/>
    <Tabs :data-source="recordTypeList"
          :value.sync="record.type"/>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Tags from '@/components/Money/Tags.vue';
  import {Component} from 'vue-property-decorator';
  import FormItem from '@/components/Money/FormItem.vue';
  import Tabs from '@/components/Tabs.vue';
  import recordTypeList from '@/constants/recordTypeList';
  import IncomeTag from '@/components/Money/IncomeTag.vue';
  import {Button, Cell, Toast} from 'vant';

  type NewObject = {
    newAmount:number,newNotes:string
  }

  @Component({
    components: {IncomeTag, Tabs, Tags,FormItem, NumberPad,Button,Cell},
  })
  export default class Money extends Vue {
    get recordList() {
      return this.$store.state.recordList;
    }
    recordTypeList = recordTypeList;
    // eslint-disable-next-line no-undef
    record: RecordItem = {
      tags: [], notes: '', type: '-', amount: 0, createdAt: new Date().toISOString()
    };
    created() {
      this.$store.commit('fetchRecords');
    }
    // eslint-disable-next-line no-undef
    onUpdateAmount(value:NewInput) {
      this.record.amount = value.newAmount;
      this.record.notes = value.newNotes
    }
    saveRecord() {
      if (!this.record.tags || this.record.tags.length === 0) {
        // window.alert('添加成功！')
        Toast.success('添加成功！')
        return Toast('请至少选择一个标签！');
      }
      this.$store.commit('createRecord', this.record);
      if (this.$store.state.createRecordError === null) {
        Toast.success('添加成功！')
        this.record.notes = '';
      }
    }
  }
</script>

<style lang="scss" scoped>
  ::v-deep .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
  .createdAt {
    background: white;
    box-shadow: 1px 2px 1px #d3d3d3;
    ::v-deep .formItem{
      margin: 8px 0;
      > .name{
        margin: 0 16px;
      }
      > input{
        margin-right: 32px;
        padding: 5px 5px 0 16px;
        border: 1px solid #e8e8e9;
      }
    }
  }
</style>