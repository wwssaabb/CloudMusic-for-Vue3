<!--
 * @Author: wwssaabb
 * @Date: 2021-09-17 10:20:33
 * @LastEditTime: 2021-09-17 16:58:12
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
</script>
