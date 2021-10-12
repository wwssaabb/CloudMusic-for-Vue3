<!--
 * @Author: wwssaabb
 * @Date: 2021-10-12 11:04:23
 * @LastEditTime: 2021-10-12 11:11:01
 * @FilePath: \CloudMusic-for-Vue3\src\views\Artist.vue
-->
<template>
  <div></div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

//获取页面 query参数 id
const id: string | undefined =
  useRouter().currentRoute.value.query.id?.toString();
console.log(id);
</script>

<style lang="scss" scoped></style>
