<!--
 * @Author: wwssaabb
 * @Date: 2021-09-29 14:04:21
 * @LastEditTime: 2021-09-29 14:21:25
 * @FilePath: \CloudMusic-for-Vue3\src\components\Title.vue
-->
<template>
  <div class="title-wrap fsc">
    <div class="left">{{ title }}</div>
    <div class="center d_ib">
      <slot name="center"></slot>
    </div>
    <div class="right d_ib">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.title-wrap {
  width: 100%;
  height: 40px;
  border-bottom: 2px solid #c20c0c;

  .left {
    font-size: 24px;
    line-height: 40px;
    color: #333;
    margin-right: 12px;
  }
  .left {
    margin-left: 12px;
  }
  .center {
    flex: 1;
  }
}
</style>
