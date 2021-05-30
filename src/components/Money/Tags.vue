<template>
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
</template>

<script lang="ts">
  export default {
    name: 'Tags'
  };
</script>

<style lang="scss" scoped>
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