<template>
  <div class="numberPad">
    <div class="output">
      <div class="notes">
        <FormItem placeholder="点击输入备注" field-name="备注"
                  :value.sync="record.notes"/>
      </div>
      <span class="outputNumber">
         {{output}}
      </span>
    </div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="remove">删除</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="clear">清空</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="ok" class="ok">OK</button>
      <button @click="inputContent" class="zero">0</button>
      <button @click="inputContent">.</button>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component,} from 'vue-property-decorator';
  import FormItem from '@/components/Money/FormItem.vue';
  @Component({
    components: {FormItem}
  })
  export default class NumberPad extends Vue {
    output = '0';
    // eslint-disable-next-line no-undef
    record: RecordItem = {
      tags: [], notes: '', type: '-', amount: 0, createdAt: new Date().toISOString()
    };
    inputContent(event: MouseEvent) {
      const button = (event.target as HTMLButtonElement);
      const input = button.textContent!;
      if (this.output.length === 16) { return; }
      if (this.output === '0') {
        if ('0123456789'.indexOf(input) >= 0) {
          this.output = input;
        } else {
          this.output += input;
        }
        return;
      }
      if (this.output.indexOf('.') >= 0 && input === '.') {return;}
      this.output += input;
    }
    remove() {
      if (this.output.length === 1) {
        this.output = '0';
      } else {
        this.output = this.output.slice(0, -1);
      }
    }
    clear() {
      this.output = '0';
    }
    ok() {
      const number = parseFloat(this.output);
      this.$emit('update:value', number);
      this.$emit('submit', number);
      this.output = '0';
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";
  .numberPad {
    .output {
      @extend %clearFix;
      //@extend %innerShadow;
      background: white;
      font-family: Consolas, monospace;
      font-size: 36px;
      color: #ff9ab9;
      display: flex;
      justify-content: flex-end;
      position: relative;
      >.outputNumber{
        margin-right: 16px;
      }
      >.notes {
        padding: 17px 0;
        position: absolute;
        left: 0;
      }
    }
    .buttons {
      @extend %clearFix;
      > button {
        border: 1px solid #c3c3c3;
        background: white;
        width: 25%;
        height: 50px;
        float: left;
        /*border: none;*/
        &.ok {
          height: 50px*2;
          float: right;
          color: white;
          background: #ff9ab9;
        }
        &.zero {
          width: 25%*2;
        }
      }
    }
  }
</style>