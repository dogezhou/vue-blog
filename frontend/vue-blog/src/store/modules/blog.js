import blog from '../../api/blog'

const state = {
  list: [],
}

const getters = {

}

const mutations = {
  setBlogList(state, payload) {
    state.list = payload.list
  }
}

const actions = {
  getBlogList({ commit }) {
    return blog.getBlogs().then(res => {
      commit('setBlogList', { list: res.data })
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
