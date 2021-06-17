import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';
import router from '@/router';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
    createRecordError:null,
    createTagError:null,
    tagList: [] as Tag[],
    incomeTagList: [] as Tag[],
    currentTag: undefined
  } as RootState,
  mutations: {
    setCurrentTag(state,id:string){
      state.currentTag = state.tagList.filter(t => t.id === id)[0]
    },
    updateTag(state, payload: { id: string, name: string }) {
      const {id, name} = payload;
      const idList = state.tagList.map(item => item.id);
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map(item => item.name);
        if (names.indexOf(name) >= 0) {
          window.alert('标签名重复了');
        } else {
          const tag = state.tagList.filter(item => item.id === id)[0];
          tag.name = name;
          store.commit('saveTags');
        }
      }
    },
    removeTag(state, id: string) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        state.tagList.splice(index, 1);
        store.commit('saveTags');
        router.back();
      } else {
        window.alert('删除失败');
      }
    },
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
    },
    createRecord(state, record:RecordItem) {
      const record2 = clone(record);
      record2.createdAt = record2.createdAt || new Date().toISOString();
      state.recordList.push(record2);
      store.commit('saveRecords')
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList',
        JSON.stringify(state.recordList));
    },
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
      if(!state.tagList || state.tagList.length===0){
        store.commit('createTag','交通')
        store.commit('createTag','医疗')
        store.commit('createTag','娱乐')
        store.commit('createTag','学习')
        store.commit('createTag','宠物')
        store.commit('createTag','房屋')
        store.commit('createTag','旅行')
        store.commit('createTag','服饰')
        store.commit('createTag','生活')
        store.commit('createTag','美容')
        store.commit('createTag','运动')
        store.commit('createTag','餐饮')
      }
    },
    fetchIncomeTags(state) {
      state.incomeTagList = JSON.parse(window.localStorage.getItem('incomeTagList') || '[]');
      if(!state.incomeTagList || state.incomeTagList.length===0){
        store.commit('createIncomeTag','工资')
        store.commit('createIncomeTag','兼职')
        store.commit('createIncomeTag','礼金')
        store.commit('createIncomeTag','奖金')
        store.commit('createIncomeTag','其他')
      }
    },
    createTag(state, name: string) {
      state.createTagError = null
      const names = state.tagList.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        state.createTagError = new Error('tag name duplicated')
        return
      }
      const id = createId().toString();
      state.tagList.push({id, name: name});
      store.commit('saveTags');
    },
    createIncomeTag(state, name: string) {
      state.createTagError = null
      const names = state.incomeTagList.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        state.createTagError = new Error('tag name duplicated')
        return
      }
      const id = createId().toString();
      state.incomeTagList.push({id, name: name});
      store.commit('saveIncomeTags');
    },
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    },
    saveIncomeTags(state) {
      window.localStorage.setItem('incomeTagList', JSON.stringify(state.incomeTagList));
    }
  }
});

export default store