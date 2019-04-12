import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    bannerlist: [],
    shopList: [],
    tableData: [],
    cartlist: [],

    param: 0
  },
  plugins: [createPersistedState()],
  getters: { // 获取
    getshopList: state => {
      return state.shopList;
    }
  },
  mutations: { // 修改
    updatashopList: (state, payload, i) => {
      state.shopList[i] = { ...state.shopList[i], ...payload }
    }
  },
  actions: { // 异步修改
    updatashopList: ({ commit }, payload) => {
      commit('updatashopList', payload);
    }
  }
})
