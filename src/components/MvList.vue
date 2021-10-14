<!--
 * @Author: wwssaabb
 * @Date: 2021-10-14 17:41:41
 * @LastEditTime: 2021-10-14 17:41:42
 * @FilePath: \CloudMusic-for-Vue3\src\components\MvList.vue
-->
<template>
  <div class="mv-list">
    <div class="item" v-for="item in list" :key="item.id">
      <div class="cover pr">
        <img :src="item.picUrl" alt="" />
        <i class="icon_mv_play pa"></i>
      </div>
      <div class="name">{{ item.name }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";

const props = defineProps({
  list: {
    type: Array,
    required: true,
  },
});
</script>

<style lang="scss" scoped></style>
