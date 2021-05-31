<template>
  <div>
    <label class="notes">
      <span class="name">备注</span>
      <input type="text"
             v-model="value"
             placeholder="点击输入备注">
    </label>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component, Watch} from 'vue-property-decorator';

  @Component
  export default class Notes extends Vue{
    value = '';
    @Watch('value')
    onValueChanged(value:string,oldValue:string){
      this.$emit('update:value',this.value)
    }
  }
</script>

<style lang="scss" scoped>
  .notes{
    display: flex;
    background: #f5f5f5;
    > .name{
      padding: 25px 16px;
    }
    > input{
      background: inherit;
      border: none;
      font-size: 14px;
      color: #999;
    }
  }
</style>