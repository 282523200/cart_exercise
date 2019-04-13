import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
var _ = require("lodash");
Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    bannerlist: [],
    shopList: [],
    cartlist:[]
  },

  getters: { // 获取
    getshopList: state => {
      return state.shopList;
    }
  },
  mutations: { // 修改
    updatashopList: (state, payload) => {
      state.shopList = [...payload];
    },
    modifyshopList: (state, payload) => {
      var current = _.find(state.shopList, function (o) {
        return o.id == payload;
      });
      current.count += 1;
    },
    updatacartlist: (state, payload) => {
      state.cartlist = [..._.filter(payload, function(o) {
        
        return o.count > 0;
      })];
    },
  },
  actions: { // 异步修改
    updatashopList: ({ commit }, payload) => {
      commit('updatashopList', payload);
    },
    modifyshopList: ({ commit }, payload) => {
      commit('modifyshopList', payload);
    },
    updatacartlist: ({ commit }, payload) => {
      commit('updatacartlist', payload);
    }
  },
  plugins: [createPersistedState()]
})
