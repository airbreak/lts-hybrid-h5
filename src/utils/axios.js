import { getToken } from '@/utils/auth'
import axios from 'axios'
import Qs from 'qs'

// request interceptor
axios.interceptors.request.use(config => {
  config.headers['accessToken'] = getToken()
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor
axios.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response) {
    }
    return Promise.reject(error)
  })

export { axios }
export default (url = '', data = {}, type = 'POST', responseType) => {
  let option = {
    baseURL: process.env.NODE_ENV === 'development' ? '' : window.APIPATH,
    timeout: 60 * 2 * 1000,
    method: type,
    url: url
  }

  if (/^post|put|patch$/i.test(type)) {
    option.data = Qs.stringify(data)
  } else {
    option.params = data
  }
  return axios(option)
}
