<!--
 * @Author: wwssaabb
 * @Date: 2021-10-18 10:09:44
 * @LastEditTime: 2021-10-18 16:50:25
 * @FilePath: \CloudMusic-for-Vue3\src\components\Playlist\likers.vue
-->
<template>
  <div class="playlist-likers">
    <div class="title">喜欢这个歌单的人</div>
    <div class="list">
      <img
        class="item"
        v-for="item in list"
        :src="item.avatarUrl + '?param=40y40'"
        alt=""
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { SubscriberType } from "../../types/types";

const props = defineProps({
  list: {
    type: Array as PropType<SubscriberType[]>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.playlist-likers {
  .title {
    line-height: 24px;
    height: 24px;
    font-size: 12px;
    color: #333;
    font-weight: bold;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
  }

  .list {
    margin-bottom: 25px;
    img {
      width: 40px;
      height: 40px;
      margin-bottom: 13px;
      &:not(:nth-child(4n + 1)) {
        margin-left: 13px;
      }
    }
  }
}
</style>
