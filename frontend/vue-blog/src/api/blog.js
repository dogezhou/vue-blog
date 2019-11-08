import request from '../helpers/request'

const URL = {
  GET_LIST: '/blog',
  GET_DETAIL: '/blog/:id',
  CREATE: '/blog',
  UPDATE: '/blog/:id',
  DELETE: '/blog/:id'
}

export default {
  getBlogs({ page=1, userId, atIndex } = { page: 1 }) {
    return request(URL.GET_LIST, 'GET', { page, userId })
  },
}