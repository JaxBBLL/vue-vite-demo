import Axios from 'axios'
import type { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios'
import querystring from 'querystring'
import { adornUrl, objReduce } from '@/utils'
interface Config {
  url: string
  method: string
  data?: any
  params?: any
}

export interface HttpResponse<T> {
  code: number
  data: T
  message: string
}

const baseOptions = {
  baseURL: adornUrl(''),
  timeout: 1000 * 30,
  withCredentials: true,
}

const instance = Axios.create(baseOptions)

function createAxios(contentType = 'json') {
  let options: AxiosRequestConfig = null!
  if (contentType === 'json') {
    options = {
      ...baseOptions,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      transformRequest: [
        function (data: any) {
          return JSON.stringify(data)
        },
      ],
    }
  } else if (contentType === 'form') {
    options = {
      ...baseOptions,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      transformRequest: [
        function (data: any) {
          return querystring.stringify(data)
        },
      ],
    }
  } else if (contentType === 'file') {
    options = {
      ...baseOptions,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
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
  return function <T>(
    method: string,
    url: string,
    params?: any,
    data?: any,
    isFilterEmptyString = true
  ): Promise<HttpResponse<T>> {
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
        .then(({ data }: AxiosResponse<HttpResponse<T>>) => {
          if (data.code === 200) {
            console.log(url, data)
            resolve(data)
          } else {
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
function addInterceptorsReq(axios: AxiosInstance) {
  axios.interceptors.request.use(
    function (config) {
      return config
    },
    function (error) {
      return Promise.reject(error)
    }
  )
}

//  添加一个响应拦截器
function addInterceptorsRes(axios: AxiosInstance) {
  axios.interceptors.response.use(
    (res) => {
      return res
    },
    (err) => {
      return Promise.reject(err)
    }
  )
}

export const httpJson = createAxios('json')
export const httpForm = createAxios('form')
export { instance as default }
