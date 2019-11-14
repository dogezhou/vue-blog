import blog from '../../api/blog'

const state = {
  blogList: [],
  page: 1,
  total: 0
}

const getters = {

}

const mutations = {
  setBlogList(state, payload) {
    state.blogList = payload.blogList
    state.total = payload.total
    state.page = payload.page
  }, 
}

const actions = {
  getBlogList({ commit, state }, payload) {
    const page = payload ? payload.page : state.page
    return blog.getBlogs({page}).then(res => {
      const { list: blogList, total, page } = res.data
      commit('setBlogList', { blogList, total, page })
    })
  },
  getBlogsByUserId({ commit }) {
    return blog.getBlogsByUserId().then(res => {
      const { list: blogList, total, page } = res.data
      commit('setBlogList', { blogList, total, page })
    })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
