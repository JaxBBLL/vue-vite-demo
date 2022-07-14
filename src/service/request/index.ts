import Axios, { type AxiosInstance } from 'axios'
import querystring from 'querystring'
import { adornUrl, objReduce } from '@/utils'
import { useMessage } from 'naive-ui'

const message = useMessage()

interface Config {
  url: string
  method: string
  data?: any
  params?: any,
}

function createAxios(contentType = 'json') {
  const baseOptions = {
    baseURL: adornUrl(''),
    timeout: 1000 * 30,
    withCredentials: true,
  }
  const options =
    contentType === 'json'
      ? {
          ...baseOptions,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          transformRequest: [
            function (data) {
              return JSON.stringify(data)
            },
          ],
        }
      : {
          ...baseOptions,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          transformRequest: [
            function (data:any) {
              return querystring.stringify(data)
            },
          ],
        }
  const axios = Axios.create(options)
  addInterceptorsReq(axios)
  addInterceptorsRes(axios)
  /**
   * [http 封装]
   * @param  {[string]} method [请求的类型:get/post/delete/put]
   * @param  {[string]} url    [url]
   * @param  {Object} params [发送的query数据]
   * @param  {[Object|Array]} data   [发送的body数据]
   * @param  {[Boolean]} isFilterEmptyString   [是否过滤发送的空字符， 默认过滤]
   * @return {[Promise]}        [返回Promise]
   */
  return function (
    method: string,
    url: string,
    params?:any,
    data?:any,
    isFilterEmptyString= true,
  ) {
    const config: Config = {
      url,
      method,
    }
    if (method.toUpperCase() !== 'GET') {
      if (data === undefined) {
        data = params
        params = {}
      }
      config.params = params
      config.data = data
    } else {
      config.params = params
    }
    if (isFilterEmptyString) {
      config.params = objReduce(config.params)
      config.data = objReduce(config.data)
    }
    return new Promise((resolve, reject) => {
      axios(config)
        .then(({ data }) => {
          if (data.code === 200) {
            console.log(url, data)
            resolve(data)
          } else {
            if (![304011, 304012, 302001].includes(data.code)) {
              message.error('data.message')
            }
            reject(data)
          }
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

//  添加一个请求拦截器
function addInterceptorsReq(axios:AxiosInstance) {
  axios.interceptors.request.use(
    function (config) {
      return config
    },
    function (error) {
      return Promise.reject(error)
    },
  )
}

//  添加一个响应拦截器
function addInterceptorsRes(axios:AxiosInstance) {
  axios.interceptors.response.use(
    (res) => {
      if (res.status === 200) {
      } else {
      }
      return res
    },
    (err) => {
      return Promise.reject(err)
    },
  )
}

export const httpJson = createAxios('json')
export const httpForm = createAxios('form')
export { Axios as default }
