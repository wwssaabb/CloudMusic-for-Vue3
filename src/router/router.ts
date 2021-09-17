/*
 * @Author: wwssaabb
 * @Date: 2021-09-17 15:52:26
 * @LastEditTime: 2021-09-17 16:11:31
 * @FilePath: \CloudMusic-for-Vue3\src\router\router.ts
 */
import { createRouter, createWebHashHistory } from "vue-router";

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: import("../views/Home.vue"),
    },
    {
      path: "/home",
      component: import("../views/Home.vue"),
    },
  ],
});
