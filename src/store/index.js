import Vue from 'vue'
import Vuex from 'vuex'

import VuexPersistence from 'vuex-persist'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rooms: []
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
  plugins: [new VuexPersistence().plugin]
})
