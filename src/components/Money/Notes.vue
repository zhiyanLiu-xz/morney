<template>
  <div>
    <label class="notes">
      <span class="name">备注</span>
      <input type="text"
             v-model="value"
             placeholder="请输入标签内容">
    </label>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component} from 'vue-property-decorator';

  @Component
  export default class Notes extends Vue{
    value = '';
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