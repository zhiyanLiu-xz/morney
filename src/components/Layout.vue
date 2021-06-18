<template>
  <div class="layout-wrapper">
    <div class="content" :class="classPrefix&&`${classPrefix}-content`">
      <slot/>
    </div>
    <Nav/>
  </div>
</template>

<script lang="ts">
  export default {
    props:['classPrefix'],
    name: 'Layout'
  };
</script>

<style lang="scss" scoped>
  .layout-wrapper{
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  .content{
    overflow: auto;//内容过多出现滚动条
    flex-grow: 1;//默认content占据大部分
    &::-webkit-scrollbar{
      display: none;
    }
  }
</style>