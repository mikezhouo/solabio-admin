import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    muneRights:JSON.parse(sessionStorage.getItem('muneList') || '[]'),
    loginName: sessionStorage.getItem('loginName') || ''
  },
  mutations: {
    getMuneRights(state,rights) {
      state.muneRights = rights;
      // 同步存储到sessionStorge 中
      sessionStorage.setItem('muneList',JSON.stringify(rights))
    },
    getLoginUserName(state,passName) {
      state.loginName = passName;
      // 同步存储到sessionStorge中
      sessionStorage.setItem('loginName',passName)
    }
  },
  actions: {
  },
  modules: {
  }
})
