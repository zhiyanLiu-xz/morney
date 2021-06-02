<template>
  <div>
    <label class="notes">
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
  export default class Notes extends Vue{
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