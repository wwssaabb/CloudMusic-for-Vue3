/*
 * @Author: wwssaabb
 * @Date: 2021-09-17 15:52:26
 * @LastEditTime: 2021-10-15 15:50:44
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
      path: "/discover",
      component: () => import("../views/Discover.vue"),
      redirect: '/discover/',
      children: [
        {
          path: "/discover/",
          component: () => import("../views/Discover/Index.vue"),
        },
        {
          path: "/discover/toplist",
          component: () => import("../views/Discover/TopList.vue"),
        },
        {
          path: "/discover/playlist",
          component: () => import("../views/Discover/PlayList.vue"),
        },
        {
          path: "/discover/djradio",
          component: () => import("../views/Discover/DjRadio.vue"),
        },
        {
          path: "/discover/artists",
          component: () => import("../views/Discover/Artists.vue"),
        },
        {
          path: "/discover/album",
          component: () => import("../views/Discover/Album.vue"),
        },
      ],
    },

    {
      path: "/song",
      component: () => import("../views/Song.vue"),
    },
    {
      path: "/artist/",
      component: () => import("../views/Artist.vue"),
      children: [
        {
          path: "/artist/",
          component: () => import("../views/Artist/Index.vue"),
        },
        {
          path: "/artist/album",
          component: () => import("../views/Artist/Album.vue"),
        },
        {
          path: "/artist/mv",
          component: () => import("../views/Artist/Mv.vue"),
        },
        {
          path: "/artist/desc",
          component: () => import("../views/Artist/Desc.vue"),
        },
      ],
    },
    {
      path: "/mv",
      component: () => import("../views/Mv.vue"),
    },
  ],
});
