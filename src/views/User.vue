<!--
 * @Author: wwssaabb
 * @Date: 2021-10-20 08:52:38
 * @LastEditTime: 2021-10-26 09:51:27
 * @FilePath: \CloudMusic-for-Vue3\src\views\User.vue
-->
<template>
  <div>
    <RouterView v-if="data.isRouterAlive"></RouterView>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, provide } from "vue";
import { RouterView, useRouter } from "vue-router";

const router = useRouter();

const data = ref({
  isRouterAlive: true,
});

const reload = () => {
  data.value.isRouterAlive = false;
  nextTick(function () {
    data.value.isRouterAlive = true;
  });
};

provide("reload", reload);

router.beforeEach((to, form, next) => {
  console.log(to.path);
  console.log(form.path);
  let isUserPage = to.path.includes("/user/") && form.path.includes("/user/");
  console.log(isUserPage);
  if (isUserPage) {
    reload();
  }
  next();
});
</script>

<style lang="scss" scoped></style>
