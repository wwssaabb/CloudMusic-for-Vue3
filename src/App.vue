<!--
 * @Author: wwssaabb
 * @Date: 2021-09-17 10:20:33
 * @LastEditTime: 2021-10-16 17:40:33
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

  //暂时解决同路由不同参数跳转问题
  const isSamePath = to.path === from.path;
  const isNoSameParamId = to.query.id !== from.query.id;
  if (isSamePath && isNoSameParamId) {
    setTimeout(() => location.reload(), 0);
  }
  next();
});
</script>
