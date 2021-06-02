<template>
  <Layout class-prefix="layout">
    {{record}}
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"/>
    <Types :value.sync="record.type"/>
    <div class="notes">
      <FormItem placeholder="点击输入备注" field-name="备注" @update:value="onUpdateNotes"/>
    </div>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import Tags from '@/components/Money/Tags.vue';
  import {Component, Watch} from 'vue-property-decorator';
  import RecordItem from '@/custom';
  import recordListModel from '@/models/recordListModel';
  import tagListModel from '@/models/tagListModel';
  import FormItem from '@/components/Money/FormItem.vue';

  const recordList = recordListModel.fetch();
  const tagList = tagListModel.fetch();

  @Component({
    components: {FormItem, Tags, Types, NumberPad},
  })
  export default class Money extends Vue {
    tags = tagList;
    recordList: RecordItem[] = recordList;
    record: RecordItem = {
      tags: [], notes: '', type: '-', amount: 0
    };

    onUpdateTags(value: string[]) {
      this.record.tags = value;
    }

    onUpdateNotes(value: string) {
      this.record.notes = value;
    }

    onUpdateAmount(value: string) {
      this.record.amount = parseFloat(value);
    }

    saveRecord() {
      const record2: RecordItem = recordListModel.clone(this.record);
      record2.createAt = new Date();
      this.recordList.push(record2);
      console.log(this.recordList);
    }

    @Watch('recordList')
    onRecordChanged() {
      recordListModel.sava(this.recordList);
    }
  }
</script>

<style>
  .layout-content {
    border: 3px solid red;
    display: flex;
    flex-direction: column-reverse;
  }

  .notes {
    padding: 12px 0
  }
</style>