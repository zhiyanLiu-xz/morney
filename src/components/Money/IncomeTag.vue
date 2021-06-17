<template>
  <div class="tags">
    <ul class="current">
      <li v-for="tag in incomeTagList" :key="tag.id"
          :class="{selected:selectedTags.indexOf(tag)>=0}"
          @click="toggle(tag)">
        <Icon v-if="tag.id>11" name="其他"/>
        <Icon v-else :name="tag.name"/>
        {{tag.name}}
      </li>
      <li class="new">
        <button @click="createIncomeTag">
          <Icon name="自定义"/>
          自定义
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator';
  import {mixins} from 'vue-class-component';
  import TagHelper from '@/mixins/TagHelper';

  @Component
  export default class Tags extends mixins(TagHelper) {
    selectedTags: string[] = [];
    get incomeTagList(){
      return this.$store.state.incomeTagList
    }
    created() {
      this.$store.commit('fetchIncomeTags');
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
    max-height: 300px;
    overflow: scroll;
    flex-grow: 1;
    background: #fbfaf1;
    display: flex;
    flex-direction: column;
    box-shadow: 1px 1px 1px #d3d3d3;
    > .current {
      display: flex;
      flex-wrap: wrap;
      > li {
        display: flex;
        flex-direction: column;
        text-align: center;
        margin-top: 16px;
        margin-left: 16px;
        padding: 0 16px;
        font-size: 14px;
        border-radius: (49px/2);
        .icon{
          width: 36px;
          height: 36px;
        }
        &.selected {
          background: #f0eeeb;
        }
      }
      > .new {
        > button {
          border: none;
          display: flex;
          flex-direction: column;
          background: inherit;
          /*margin-top: 16px;*/
          /*margin-left: 16px;*/
          /*padding: 0 16px;*/
          text-align: center;
          font-size: 14px;
          .icon{
            width: 36px;
            height: 36px;
          }
        }
      }
    }
  }
</style>