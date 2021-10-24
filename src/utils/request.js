import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import { getToken } from '@/utils/auth'

const service = axios.create({
  timeout: 5000
})

// request interceptor
service.interceptors.request.use(
  config => {
    config.headers['Authorization'] = getToken()
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response
    // if the custom code is not 200, it is judged as an error.
    if (res.data.code !== 200) {
      Message({
        message: res.data.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })}
      else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
