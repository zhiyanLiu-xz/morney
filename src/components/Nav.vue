<template>
  <nav>
    <router-link class="item" to="/money" active-class="selected">
      <Icon name="money"/>
      记账
    </router-link>
    <router-link class="item" to="/labels" active-class="selected">
      <Icon name="label"/>
      标签
    </router-link>
    <router-link class="item" to="/statistics" active-class="selected">
      <Icon name="statistics"/>
      统计
    </router-link>
  </nav>
</template>

<script lang="ts">
  export default {
    name: 'Nav'
  };
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";
  nav {
    @extend %outerShadow;
    padding-top: 2px;
    display: flex;
    font-size: 12px;
    background: white;
    > .item {
      padding: 2px 0;
      width: 33.3333%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      color: #b4b4b4;
      .icon {
        width: 28px;
        height: 28px;
        color: #b4b4b4;
      }
    }

    > .item.selected {
      color: $color-highlight;
      ::v-deep .icon{
        color: $color-highlight;
        width: 30px;
        height: 30px;
      }
      text-shadow: $color-highlight;
    }
  }
</style>