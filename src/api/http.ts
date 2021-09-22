/*
 * @Author: wwssaabb
 * @Date: 2021-09-17 15:52:51
 * @LastEditTime: 2021-09-22 09:31:22
 * @FilePath: \CloudMusic-for-Vue3\src\api\http.ts
 */

/* 
  封装axios，返回promise对象
*/

import axios, { AxiosResponse } from "axios";
import { ElMessage } from "element-plus";

//设置baseURL
export const BASE_URL = "https://cloud-music-api-brown.vercel.app";

//设置支持的axios的请求方式
type InstanceMethods = "get" | "delete" | "post" | "put" | "patch";
const acceptMethods = ["get", "delete", "post", "put", "patch"];

//创建axios实例对象
axios.defaults.baseURL = BASE_URL;
axios.defaults.timeout = 6000;
/* const instance = axios.create({
  baseURL: BASE_URL, //统一请求域名
  timeout: 6000, //设置超时
}); */

/* =============请求拦截器============= */
axios.interceptors.request.use(
  (config) => {
    //请求拦截...
    return config;
  },
  (err) => {
    //请求错误
    ElMessage.error("请求错误:" + err);
    return Promise.reject(err);
  }
);

/* =============响应拦截器============= */
axios.interceptors.response.use(
  (res) => {
    //响应拦截...
    return res;
  },
  (err) => {
    //响应错误
    return Promise.reject(err);
  }
);

/* 
  导出封装的函数
  @ method :"get" | "delete" | "post" | "put" | "patch",默认 get
  @ url :string
  @ data :object | null,默认 null
  @ headers :object | null,默认 null
*/

export default function <T>(
  url: string,
  data?: object | null,
  method: InstanceMethods = "get"
  // headers?: object | null
) {
  return new Promise<T>((resolve) => {
    if (!acceptMethods.includes(method)) {
      return ElMessage.error("不支持" + method + "请求方法");
    }
    let promise;
    if (method === "get") {
      promise = axios.get(url, { data });
    } else {
      promise = axios[method](url, data);
    }

    promise
      .then((res: { data: T }): void => resolve(res.data))
      .catch((err) => ElMessage.error(err));
  });
}
