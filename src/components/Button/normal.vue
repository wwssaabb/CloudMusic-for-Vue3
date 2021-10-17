<!--
 * @Author: wwssaabb
 * @Date: 2021-10-14 09:03:02
 * @LastEditTime: 2021-10-14 09:07:37
 * @FilePath: \CloudMusic-for-Vue3\src\components\Botton\normal.vue
-->
<template>
  <div></div>
</template>

<script setup lang="ts">
const props = defineProps({
  width: {
    type: Number,
    default: 56,
  },
  height: {
    type: Number,
    default: 31,
  },
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
