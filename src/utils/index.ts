/*
 * @Author: wwssaabb
 * @Date: 2021-09-29 16:35:36
 * @LastEditTime: 2021-10-14 17:11:58
 * @FilePath: \CloudMusic-for-Vue3\src\utils\index.ts
 */

import { PaginationClickType } from "../types/types";
import { useRouter } from "vue-router";

//获取router实例
const router = useRouter();
console.log(router);

//router 跳转
export const routerPush = (path: string) => {
  console.log(router);
  router.push(path);
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
