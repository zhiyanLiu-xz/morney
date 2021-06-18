<template>
  <div class="tags">
    <ul class="current">
      <li v-for="tag in incomeTagList" :key="tag.id"
          :class="{selected:selectedTags.indexOf(tag)>=0}"
          @click="toggle(tag)">
        <Icon v-if="tag.id>16" name="其他"/>
        <Icon v-else :name="tag.name"/>
        <span class="text">
           {{tag.name}}
        </span>

      </li>
      <li class="new">
        <button @click="createIncomeTag">
          <Icon name="自定义"/>
          新增
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
  @media screen and (min-width: 480px) {
    .tags > .current > li{
      margin-left: 25px;
    }
  }
  @media screen and (max-width: 480px) {
    .tags > .current > li{
      margin-left: 19px;
    }
  }
  .tags {
    max-height: 300px;
    overflow: scroll;
    flex-grow: 1;
    background: #fbfaf1;
    display: flex;
    flex-direction: column;
    box-shadow: 1px 1px 1px #d3d3d3;
    &::-webkit-scrollbar{
      display: none;
    }
    > .current {
      display: flex;
      flex-wrap: wrap;
      > li {
        display: flex;
        flex-direction: column;
        text-align: center;
        margin-top: 16px;
        padding: 0 16px;
        font-size: 14px;
        border-radius: (49px/2);
        > .text{
          width: 38px;
          max-height: 24px;
          display: flex;
          overflow: hidden;
          justify-content: center;
        }
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
          width: 38px;
          display: flex;
          flex-direction: column;
          background: inherit;
          align-items: center;
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