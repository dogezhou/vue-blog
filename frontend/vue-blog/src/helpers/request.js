import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000/api'

export default function request(url, type = 'GET', data = {}) {
  return new Promise((resolve, reject) => {
    let option = {
      url,
      method: type
    }
    if(type.toLowerCase() === 'get') {
      option.params = data
    }else {
      option.data = data
    }
    axios(option).then(res => {
      console.log(res.data)
      if(res.data.status === 0) {
        resolve(res.data)
      }else{
        Message.error(res.data.msg)
        reject(res.data)
      }
    }).catch(err => {
      reject({ msg: '网络异常' })
    })
  })
}
