/*
 * @Author: wwssaabb
 * @Date: 2021-09-17 15:52:26
 * @LastEditTime: 2021-10-09 14:41:55
 * @FilePath: \CloudMusic-for-Vue3\src\router\router.ts
 */
import { createRouter, createWebHashHistory } from "vue-router";

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: () => import("../views/Discover.vue"),
    },
    {
      path: "/discover/",
      component: () => import("../views/Discover.vue"),
      children: [],
    },
    {
      path: "/discover/toplist",
      component: () => import("../views/TopList.vue"),
    },
    {
      path: "/discover/playlist",
      component: () => import("../views/PlayList.vue"),
    },
    {
      path: "/discover/djradio",
      component: () => import("../views/DjRadio.vue"),
    },
    {
      path: "/discover/artist",
      component: () => import("../views/Artist.vue"),
    },
    {
      path: "/discover/album",
      component: () => import("../views/Album.vue"),
    },
    {
      path: "/song",
      component: () => import("../views/Song.vue"),
    },
  ],
});
