<template>
  <div class="numberPad">
    <div class="output">100</div>
    <div class="buttons">
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>删除</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>清空</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button class="ok">OK</button>
      <button class="zero">0</button>
      <button>.</button>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'NumberPad'
  };
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";
  .numberPad{
    .output{
      @extend %innerShadow;
      text-align: right;
      font-family: Consolas,monospace;
      font-size: 50px;
      color: #333333;
      padding: 12px 16px;
    }
    .buttons{
      @extend %clearFix;
      > button{
        width: 25%;
        height: 64px;
        float: left;
        background: #f0f4f7;
        border: none;
        &.ok{
          height: 64px*2;
          float: right;
        }
        &.zero{
          width: 25%*2;
        }
        &:nth-child(1){
          background: #f2f2f2;
        }
        &:nth-child(2),&:nth-child(5){
          background: #e0e0e0;
        }
      }
    }
  }
</style>