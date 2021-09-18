/*
 * @Author: wwssaabb
 * @Date: 2021-09-17 15:52:26
 * @LastEditTime: 2021-09-18 14:15:56
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
      path: "/discover",
      component: import("../views/Home.vue"),
    },
    {
      path: "/discover/toplist",
      component: import("../views/Home.vue"),
    },
    {
      path: "/discover/playlist",
      component: import("../views/Home.vue"),
    },
    {
      path: "/discover/djradio",
      component: import("../views/Home.vue"),
    },
    {
      path: "/discover/artist",
      component: import("../views/Home.vue"),
    },
    {
      path: "/discover/album",
      component: import("../views/Home.vue"),
    },
  ],
});
