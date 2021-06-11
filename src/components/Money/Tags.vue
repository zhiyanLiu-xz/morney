<template>
  <div class="tags">
    <div class="new">
      <button @click="createTag">新增标签</button>
    </div>
    <ul class="current">
      <li v-for="tag in tagList" :key="tag.id"
          :class="{selected:selectedTags.indexOf(tag)>=0}"
          @click="toggle(tag)">{{tag.name}}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator';
  import {mixins} from 'vue-class-component';
  import TagHelper from '@/mixins/TagHelper';

  @Component({
    computed: {
      tagList(){
        return this.$store.state.tagList;
      }
    }
  })
  export default class Tags extends mixins(TagHelper) {
    selectedTags: string[] = [];

    created() {
      this.$store.commit('fetchTags');
    }
    toggle(tag:string) {
      const index = this.selectedTags.indexOf(tag);
      if (index >= 0) {
        this.selectedTags.splice(index, 1);
      } else {
        this.selectedTags.push(tag);
      }
      this.$emit('update:value',this.selectedTags)
    }
  }
</script>

<style lang="scss" scoped>
  .tags {
    flex-grow: 1;
    background: white;
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