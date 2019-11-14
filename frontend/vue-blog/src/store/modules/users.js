import users from '../../api/users'

const state = {
  user: {

  },
  isLogin: false,
}

const getters = {

}

const mutations = {
  setUserInfo(state, payload) {
    state.user = payload.user
    state.isLogin = payload.isLogin
    // // DEBUG:
    // state.user = {
    //   avatar: "https://avatars3.githubusercontent.com/u/14866230?v=4",
    //   githubId: "14866230",
    //   id: 1,
    //   provider: "github",
    //   username: "周伟", 
    // }
    // state.isLogin = true
  }
}

const actions = {
  getUserInfo({ commit }) {
    return users.getUserInfo().then(res => {
      commit('setUserInfo', { user: res.data.user, isLogin: res.data.isLogin })
    })
  },
  logout({ commit }) {
    return users.logout().then(res => {
      commit('setUserInfo', { user: {}, isLogin: false})
    })
  },
  login({ commit, dispatch }) {
    return users.login().then(res => {
      dispatch('getUserInfo')
    })
  }  
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
