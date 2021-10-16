<!--
 * @Author: wwssaabb
 * @Date: 2021-09-17 10:20:33
 * @LastEditTime: 2021-10-16 09:03:25
 * @FilePath: \CloudMusic-for-Vue3\src\App.vue
-->
<template>
  <div class="page">
    <div class="page-head"><Head></Head></div>
    <div class="page-content">
      <router-view></router-view>
    </div>
    <div class="page-foot"><Foot></Foot></div>
  </div>
</template>

<script lang="ts" setup>
import Head from "./components/Head.vue";
import Foot from "./components/Foot.vue";
import { onBeforeRouteUpdate, useRouter } from "vue-router";
import { ref } from "vue";
// const chooseMenuId=0

const router = useRouter();

router.beforeEach((to, from, next) => {
  // console.log(to);
  // console.log(from);
  // if(to.path===from.path )
  next();
});
</script>
