/*
 * @Author: wwssaabb
 * @Date: 2021-09-29 16:35:36
 * @LastEditTime: 2021-10-13 10:01:04
 * @FilePath: \CloudMusic-for-Vue3\src\utils\index.ts
 */

import { useRouter } from "vue-router";

//获取router实例
const router = useRouter();
console.log(router);

//router 跳转
export const routerPush = (path: string) => {
  console.log(router);
  router.push(path);
};
