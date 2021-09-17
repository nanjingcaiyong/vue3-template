import axios from 'axios';
const instance = axios.create({
  timeout: 3000,
  baseURL: process.env.NODE_ENV === 'production' ? process.env.APP_HOST : '/apis' // 开发环境走代理
});

instance.interceptors.request.use((config) => config);

instance.interceptors.response.use(res => {
  return res.data;
});

export interface IResponse {
  data: any;
  retCode: string;
  retInfo: string;
  success: boolean;
  timeStamp: any;
}

export default instance;