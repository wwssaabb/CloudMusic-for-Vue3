/*
 * @Author: wwssaabb
 * @Date: 2021-09-29 16:35:36
 * @LastEditTime: 2021-10-16 16:34:25
 * @FilePath: \CloudMusic-for-Vue3\src\utils\index.ts
 */

import { PaginationClickType } from "../types/types";
import { useRouter } from "vue-router";

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
export const getCreatorHtml = <T>(creator: T[], name: keyof T): string => {
  return creator
    .map((i) => `<span class='td_u' style='font-size:12px;'>${i[name]}</span>`)
    .join("/");
};
