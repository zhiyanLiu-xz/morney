<template>
  <Layout class-prefix="layout">
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
    <div>
      <ul class="types">
        <li class="selected">支出</li>
        <li>收入</li>
      </ul>
    </div>
    <div>
      <label class="notes">
        <span class="name">备注</span>
        <input type="text" placeholder="请输入标签内容">
      </label>
    </div>
    <div class="tags">
      <div class="new">
        <button>新增标签</button>
      </div>
      <ul class="current">
        <li>衣</li>
        <li>食</li>
        <li>住</li>
        <li>行</li>
      </ul>
    </div>
  </Layout>
</template>

<script lang="ts">
  export default {
    name: 'Money',
  };
</script>

<style>
  .layout-content{
    border: 3px solid red;
    display: flex;
    flex-direction: column-reverse;
  }
</style>
<style lang="scss">
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
  .types{
    display: flex;
    background: #c4c4c4;
    font-size: 24px;
    > li{
      width: 50%;
      height: 64px;
      justify-content: center;
      display: flex;
      align-items: center;
      position: relative;
      &.selected::after{
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: #333333;
      }
    }
  }
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
  .tags{
    flex-grow: 1;
    display: flex;
    flex-direction: column-reverse;
    > .new{
      > button{
        background: inherit;
        border: none;
        color: #999;
        margin: 10px 10px;
        border-bottom: 1px solid #666;
        padding: 0 3px;
      }
    }
    > .current{
      display: flex;
      > li{
        margin-top: 16px;
        margin-left: 16px;
        padding: 0 10px;
        background: #d9d9d9;
        border-radius: (49px/2);
      }
    }
  }
</style>