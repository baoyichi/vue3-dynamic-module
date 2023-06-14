import { instance } from './request';
export const request = (option: any) => {
  const { url, method, params, data, responseType } = option;
  return instance({
    url: url,
    method,
    params,
    data,
    responseType: responseType
  });
};
export default {
  get: <T = any>(option: any) => {
    return request({ method: 'get', ...option }) as unknown as T;
  },
  post: <T = any>(option: any) => {
    return request({ method: 'post', ...option }) as unknown as T;
  },
  delete: <T = any>(option: any) => {
    return request({ method: 'delete', ...option }) as unknown as T;
  },
  put: <T = any>(option: any) => {
    return request({ method: 'put', ...option }) as unknown as T;
  },
  map: <T = any>(option: any) => {
    return request({ method: 'get', ...option }) as unknown as T;
  }
};
