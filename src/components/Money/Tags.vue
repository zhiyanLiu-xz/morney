<template>
  <div class="tags">
    <div class="new">
      <button @click="create">新增标签</button>
    </div>
    <ul class="current">
      <li v-for="tag in dataSource" :key="tag"
          :class="{selected:selectedTags.indexOf(tag)>=0}"
          @click="toggle(tag)">{{tag}}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class Tags extends Vue {
    @Prop() dataSource: string[] | undefined;
    selectedTags: string[] = [];

    toggle(tag:string) {
      const index = this.selectedTags.indexOf(tag);
      if (index >= 0) {
        this.selectedTags.splice(index, 1);
      } else {
        this.selectedTags.push(tag);
      }
      this.$emit('update:value',this.selectedTags)
    }

    create() {
      const name = window.prompt('请输入标签名');
      if (name === '') {
        window.alert('标签名不能为空');
      } else if (this.dataSource) {
        this.$emit('update:dataSource', [...this.dataSource, name]);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tags {
    flex-grow: 1;
    display: flex;
    flex-direction: column-reverse;

    > .new {
      > button {
        background: inherit;
        border: none;
        color: #999;
        margin: 10px 10px;
        border-bottom: 1px solid #666;
        padding: 0 3px;
      }
    }

    > .current {
      display: flex;

      > li {
        margin-top: 16px;
        margin-left: 16px;
        padding: 0 16px;
        $bg: #d9d9d9;
        background: $bg;
        border-radius: (49px/2);

        &.selected {
          background: darken($bg, 50%);
          color: white;
        }
      }
    }
  }
</style>