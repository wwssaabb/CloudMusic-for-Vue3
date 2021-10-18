<!--
 * @Author: wwssaabb
 * @Date: 2021-10-14 09:03:02
 * @LastEditTime: 2021-10-18 14:28:10
 * @FilePath: \CloudMusic-for-Vue3\src\components\Button\normal.vue
-->
<template>
  <div class="pr" :class="iconBg">
    <span>{{ text }}</span>
    <i class="icon_close pa"></i>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  iconBg: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped></style>
