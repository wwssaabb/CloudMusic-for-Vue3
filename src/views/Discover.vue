<!--
 * @Author: wwssaabb
 * @Date: 2021-09-17 16:07:22
 * @LastEditTime: 2021-09-18 15:37:12
 * @FilePath: \CloudMusic-for-Vue3\src\views\Discover.vue
-->
<template>
  <div class="full">
    <div class="banner-wrap">
      <div class="banner"></div>
      <div class="download"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Head from "../components/Head.vue";
import Foot from "../components/Foot.vue";
import { reqBanner } from "../api/index";
import { onMounted } from "vue-demi";
onMounted(async () => {
  const res = await reqBanner();
  console.log(res);
});
</script>

<style lang="scss" scoped>
.banner-wrap {
  width: 100%;
  height: 283.89px;
  background-color: skyblue;
}
</style>
