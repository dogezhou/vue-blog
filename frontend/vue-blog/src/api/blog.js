import request from '../helpers/request'

const URL = {
  GET_LIST: '/blog',
  GET_DETAIL: '/blog/:id',
  CREATE: '/blog',
  UPDATE: '/blog/:id',
  DELETE: '/blog/:id'
}

export default {
  getBlogs({ page=1, userId } = { page: 1 }) {
    return request(URL.GET_LIST, 'GET', { page, userId })
  },

  getBlogsByUserId(userId, { page=1 } = { page: 1}) {
    return this.getBlogs({ userId, page })
  },

  getDetail({ blogId }) {
    return request(URL.GET_DETAIL.replace(':id', blogId))
  },

  updateBlog({ blogId }, { title, content, description }) {
    return request(URL.UPDATE.replace(':id', blogId), 'PUT', { title, content, description })
  },

  deleteBlog({ blogId }) {
    return request(URL.DELETE.replace(':id', blogId), 'DELETE')
  },

  createBlog(userId, { title = '', content = '', description = ''} = { title: '', content: '', description: '' }) {
    return request(URL.CREATE, 'POST', { userId, title, content, description })
  }  
}