<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"/>
    <Types :value.sync="record.type"/>
    <div class="notes">
      <FormItem placeholder="点击输入备注" field-name="备注" @update:value="onUpdateNotes"/>
    </div>
    <Tags/>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import Tags from '@/components/Money/Tags.vue';
  import {Component} from 'vue-property-decorator';
  import FormItem from '@/components/Money/FormItem.vue';

  @Component({
    components: {FormItem, Tags, Types, NumberPad},
    computed: {
      recordList() {
        return this.$store.state.recordList;
      }
    }
  })
  export default class Money extends Vue {
    // eslint-disable-next-line no-undef
    record: RecordItem = {
      tags: [], notes: '', type: '-', amount: 0
    };
    created(){
      this.$store.commit('fetchRecords')
    }
    onUpdateNotes(value: string) {
      this.record.notes = value;
    }

    onUpdateAmount(value: string) {
      this.record.amount = parseFloat(value);
    }

    saveRecord() {
      this.$store.commit('createRecord', this.record);
    }
  }
</script>

<style>
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }

  .notes {
    padding: 12px 0
  }
</style>