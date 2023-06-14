import axios, { AxiosInstance } from 'axios';

//创建axios的一个实例
const pathUrl = 'https://raw.onmicrosoft.cn/';
const instance: AxiosInstance = axios.create({
  baseURL: pathUrl,
  timeout: 60000, //设置超时
  headers: {
    'Content-Type': 'application/json;charset=UTF-8;'
  }
});

export { instance, pathUrl };
