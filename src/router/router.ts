/*
 * @Author: wwssaabb
 * @Date: 2021-09-17 15:52:26
 * @LastEditTime: 2021-10-12 11:02:39
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
      path: "/discover/artists",
      component: () => import("../views/Artists.vue"),
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
