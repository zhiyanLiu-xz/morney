<template>
  <ul class="tabs" :class="{[classPrefix+'-tabs']:classPrefix}">
    <li v-for="item in dataSource" :key="item.value" class="tabs-item"
        :class="liClass(item)" @click="select(item)">
      <ul class="text">
        <li class="itemText">{{item.text}}</li>
        <li class="amountText" v-if="item.text === '支出'">{{amountOutput}}元</li>
        <li class="amountText" v-else>{{amountInput}}元</li>
      </ul>
    </li>
  </ul>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  type DataSourceItem = { text: string, value: string }

  @Component
  export default class Tabs extends Vue {
    @Prop({required: true, type: Array}) dataSource!: DataSourceItem[];
    @Prop(String) readonly value!: string;
    @Prop(String) classPrefix?: string;
    amountOutput = 0
    amountInput = 0
    add(){
      for(let i=0;i<this.recordList.length;i++){
        if(this.recordList[i].type==='-'){
          const a = this.recordList[i].amount
          this.amountOutput += a
        }else {
          const b = this.recordList[i].amount
          this.amountInput += b
        }
      }
    }
    get recordList() {
      return this.$store.state.recordList;
    }
    created() {
      this.$store.commit('fetchRecords');
      this.add()
    }
    liClass(item: DataSourceItem) {
      return {
        [this.classPrefix + '-tabs-item']: this.classPrefix,
        selected: item.value === this.value,
      };
    }
    select(item: DataSourceItem) {
      this.$emit('update:value', item.value);
    }
  }
</script>

<style lang="scss" scoped>
  .tabs {
    background: white;
    display: flex;
    justify-content: space-around;
    padding-top: 14px;
    align-items: center;
    text-align: center;
    &-item {
      border-radius: 4px;
      font-size: 14px;
      padding: 3px 35px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      text-wrap: none;
      >.text > .itemText{
        font-size: 13px;
        color: #b4b4b4;
      }
      >.text > .amountText{
        color: #ff9bbb;
        font-size: 16px;
        margin-top: 3px;
        margin-bottom: 1px;
      }
      &.selected::after {
        content: '';
        position: absolute;
        border-radius: 1px;
        bottom: 0;
        left: 50%;
        margin-left: -19px;
        width: 38px;
        height: 3px;
        background: #ff9bbb;
      }
    }
  }
</style>