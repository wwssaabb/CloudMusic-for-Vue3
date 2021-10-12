<!--
 * @Author: wwssaabb
 * @Date: 2021-10-12 11:17:28
 * @LastEditTime: 2021-10-12 11:17:29
 * @FilePath: \CloudMusic-for-Vue3\src\components\Song\recommendAlbums.vue
-->
<template>
  <div class="recommend-albums">
    <div class="item" v-for="item in list">
      <img :src="item.picUrl + '?param=50y50'" alt="" />
      <div class="msg">
        <div class="name">{{ item.name }}</div>
        <div class="artist">
          by <span>{{ item.artist }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import {} from "../../types/types";

const props = defineProps({
  list: {
    type: Array,
    required: true,
  },
});
</script>

<style lang="scss" scoped></style>
