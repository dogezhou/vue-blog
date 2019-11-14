import request from '@/helpers/request'

const URL = {
  LOGIN: 'github',
  LOGOUT: 'logout',
  GET_INFO: 'userInfo'
}

export default {

  login() {
    return request(URL.LOGIN)
  },

  logout() {
    return request(URL.LOGOUT)
  },

  getUserInfo() {
    return request(URL.GET_INFO)
  }
}