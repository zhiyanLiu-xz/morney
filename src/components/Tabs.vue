<template>
  <ul class="tabs" :class="{[classPrefix+'-tabs']:classPrefix}">
    <li v-for="item in dataSource" :key="item.value" class="tabs-item"
        :class="liClass(item)" @click="select(item)">
      <div class="text">
        {{item.text}}
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  type DataSourceItem = {text:string,value:string}

  @Component
  export default class Tabs extends Vue {
    @Prop({required:true,type:Array}) dataSource!:DataSourceItem[]
    @Prop(String) readonly value!:string
    @Prop(String) classPrefix?:string

    liClass(item:DataSourceItem){
      return {
        [this.classPrefix+'-tabs-item']:this.classPrefix,
        selected:item.value===this.value
      }
    }
    select(item:DataSourceItem){
      this.$emit('update:value',item.value)
    }
  }
</script>

<style lang="scss" scoped>
  .tabs {
    background: #ff9bbb;
    display: flex;
    justify-content: center;
    padding: 20px 0;
    align-items: center;
    text-align: center;
    &-item {
      border: 1px solid white;
      background: #ff9bbb;
      border-radius: 4px;
      font-size: 14px;
      padding: 3px 35px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      text-wrap: none;
      color: white;
      &.selected {
        z-index: 0;
        bottom: 0;
        left: 0;
        background: white;
        color: #ff9bbb;
      }
    }
  }
</style>