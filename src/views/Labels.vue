<template>
  <Layout>
    <Tabs :data-source="recordTypeList"
          :value.sync="record.type"/>
    <div v-if="record.type === '-'" class="tags">
      <div class="tag" v-for="tag in tags" :key="tag.id">
        <span class="tagName">{{tag.name}}</span>
        <button class="removeTag" @click="remove(tag.id)">
          <Icon name="delete"/>
        </button>
      </div>
    </div>
    <div v-else class="tags">
      <div class="tag" v-for="tag in incomeTags" :key="tag.id">
        <span class="tagName">{{tag.name}}</span>
        <button class="removeTag" @click="removeIncomeTag(tag.id)">
          <Icon name="delete"/>
        </button>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator';
  import Button from '@/components/Button.vue';
  import {mixins} from 'vue-class-component';
  import TagHelper from '@/mixins/TagHelper';
  import Tabs from '@/components/Tabs.vue';
  import recordTypeList from '@/constants/recordTypeList';

  @Component({
    components: {Tabs, Button},
  })
  export default class Labels extends mixins(TagHelper) {
    recordTypeList = recordTypeList;
    // eslint-disable-next-line no-undef
    record: RecordItem = {
      tags: [], notes: '', type: '-', amount: 0, createdAt: new Date().toISOString()
    };

    get tags() {
      return this.$store.state.tagList;
    }

    get incomeTags() {
      return this.$store.state.incomeTagList;
    }

    beforeCreate() {
      this.$store.commit('fetchTags');
      this.$store.commit('fetchIncomeTags');
    }

    remove(id: number) {
      this.$store.commit('removeTag', id);
    }
    removeIncomeTag(id:string){
      this.$store.commit('removeIncomeTag', id);
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";
  .tags {
    background: white;
    font-size: 16px;
    padding-left: 16px;
    > .tag {
      border-bottom: 1px solid #e6e6e6;
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      ::v-deep .icon {
        color: #ff9ab7;
      }
      > .removeTag{
        border: none;
        background: inherit;
        margin-right: 16px;
      }
    }
  }
</style>