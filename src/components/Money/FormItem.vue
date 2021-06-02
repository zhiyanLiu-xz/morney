<template>
  <div>
    <label class="formItem">
      <span class="name">{{this.fieldName}}</span>
      <input type="text"
             v-model="value"
             :placeholder="this.placeholder">
    </label>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component, Prop, Watch} from 'vue-property-decorator';

  @Component
  export default class FormItem extends Vue{
    value = '';
    @Prop({required:true}) fieldName!:string
    @Prop() placeholder?:string
    @Watch('value')
    onValueChanged(value:string,oldValue:string){
      this.$emit('update:value',this.value)
    }
  }
</script>

<style lang="scss" scoped>
  .formItem{
    display: flex;
    padding-left: 16px;
    align-items: center;
    > .name{
      padding-right: 16px;
    }
    > input{
      height: 40px;
      background: transparent;
      border: none;
      font-size: 14px;
      color: #999;
    }
  }
</style>