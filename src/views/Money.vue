<template>
  <div class="nav-wrapper">
    <div class="content">
      Money.vue
    </div>
    <Nav/>
  </div>
</template>

<script lang="ts">

  export default {
    name: 'Money',
  };
</script>

<style lang="scss" scoped>
  .nav-wrapper{
    border: 1px solid green;
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  .content{
    border: 1px solid blue;
    overflow: auto;//内容过多出现滚动条
    flex-grow: 1;//默认content占据大部分
  }
</style>