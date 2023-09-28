import axios from 'axios';
import { removeNullParameter } from '@/utils/index';

axios.defaults.withCredentials = true;

const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  timeout: 5000,
});

let hasLogout = false;

service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);

service.interceptors.response.use(
  (response) => {
    const res = response.data;

    if (res instanceof Blob) {
      return response;
    }

    if (res.code !== 8200) {
      if (res.code === 8401 && !response.config.headers.nonDense) {
        console.error('未登录');
        hasLogout = true;
      } else {
        console.error(res.message || '服务端错误');
      }
      return Promise.reject(new Error(res));
    } else {
      console.log(
        '%c' + response.config.url,
        'color:#38f;font-size:14px;font-weight:bold',
        res.data,
      );
      return res;
    }
  },
  (error) => {
    const data = error?.response?.data || {};
    console.error(data.message || '服务端错误');
    return Promise.reject(error);
  },
);

export default function (config) {
  let { params, data, sendEmptyValue = false } = config;
  if (
    config.headers &&
    config.headers['Content-Type'] === 'multipart/form-data'
  ) {
    return service(config);
  }
  // 默认移除空值参数
  if (!sendEmptyValue) {
    params = removeNullParameter(config.params);
    data = removeNullParameter(config.data);
  }
  return service({
    ...config,
    params,
    data,
  });
}
