/*
 * @Author: wwssaabb
 * @Date: 2021-09-29 16:35:36
 * @LastEditTime: 2021-10-21 11:01:08
 * @FilePath: \CloudMusic-for-Vue3\src\utils\index.ts
 */

import { PaginationClickType } from "../types/types";
import { useRouter } from "vue-router";
import cities from "./city.json";

//获取router实例
// const router = useRouter();

//router 跳转
export const routerPush = (path: string) => {
  // console.log(router);
  // router.push(path);
};

//修改页数
export const changePage = (
  type: PaginationClickType,
  data: { currentPage: number; totalPage: number },
  page?: number
): void => {
  const p = data.currentPage;
  const handle = {
    page: () => (type === "page" && page ? (data.currentPage = page) : null),
    prev: () => (data.currentPage = p === 1 || p === 2 ? 1 : p - 1),
    next: () =>
      (data.currentPage =
        p === data.totalPage || p + 1 === data.totalPage
          ? data.totalPage
          : p + 1),
  };
  handle[type]();
};

//由时间戳获取mv、视频、歌曲时长，默认格式为 05:12
export const longTimeFormat = (t: number): string => {
  //获取总秒数
  let all = Math.floor(t / 1000);
  //获取秒数
  let s: number | string = all % 60;
  //获取分钟数
  let m: number | string = Math.floor(all / 60);
  //秒数和分钟数调整格式
  s = s > 9 ? s : "0" + s;
  m = m > 9 ? m : "0" + m;
  return m + ":" + s;
};

//格式化播放数 超过万时用万为单位
export const playCountFormat = (count: number): string =>
  count >= 10000 ? (count / 10000).toFixed(1) + "万" : count.toString();

//将作者数组，返回一个包含所有作者span且hover有下划线的html字符串
export const getCreatorHtml = <T>(
  creator: T[],
  name: keyof T,
  id: keyof T,
  path: string
): string => {
  const fn = (a: any) => console.log(a);
  return creator
    .map(
      (i) =>
        `<span class='td_u' style='font-size:12px;' onclick="location.href='#${
          path + i[id]
        }'">${i[name]}</span>`
    )
    .join("/");
};

//时间格式化方法 2017-04-15
export const timeFormat = (time: number): string => {
  const t = new Date(time);
  const y = t.getFullYear();
  let m: number | string = t.getMonth() + 1;
  let d: number | string = t.getDate();
  m = m > 9 ? m : "0" + m;
  d = d > 9 ? d : "0" + d;
  return y + "-" + m + "-" + d;
};

//获取所在地区 格式 陕西省 - 咸阳市
export const getCityName = (
  cid1: number | string,
  cid2: number | string
): string => {
  let city1 = cities[cid1];
  let city2 = cities[cid2];
  return city1 !== undefined
    ? city2 !== undefined
      ? city1 + " - " + city2
      : city1
    : "无";
};

//获取 年龄区间 例如 95后
export const getAgeArea = (t: number) => {
  let time = new Date(t);
  let y = time.getFullYear().toString().slice(-2);
  let os: string | number = parseInt(y[1]);
  os = (os > 5 ? 5 : 0) + "";
  return y[0] + os + "后";
};
