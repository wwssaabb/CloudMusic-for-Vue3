/*
 * @Author: wwssaabb
 * @Date: 2021-09-17 15:52:26
 * @LastEditTime: 2021-09-18 14:21:43
 * @FilePath: \CloudMusic-for-Vue3\src\router\router.ts
 */
import { createRouter, createWebHashHistory } from "vue-router";

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: import("../views/Discover.vue"),
    },
    {
      path: "/discover",
      component: import("../views/Discover.vue"),
    },
    {
      path: "/discover/toplist",
      component: import("../views/TopList.vue"),
    },
    {
      path: "/discover/playlist",
      component: import("../views/PlayList.vue"),
    },
    {
      path: "/discover/djradio",
      component: import("../views/DjRadio.vue"),
    },
    {
      path: "/discover/artist",
      component: import("../views/Artist.vue"),
    },
    {
      path: "/discover/album",
      component: import("../views/Album.vue"),
    },
  ],
});
