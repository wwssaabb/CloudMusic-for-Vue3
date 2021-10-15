<!--
 * @Author: wwssaabb
 * @Date: 2021-10-15 17:05:02
 * @LastEditTime: 2021-10-15 17:55:12
 * @FilePath: \CloudMusic-for-Vue3\src\components\Mv\mvPlay.vue
-->
<template>
  <div class="mv-play">
    <div class="title">
      <i class="icon_mv_tag"></i>
      <span>{{ mvName }}</span>
      <span class="td_u">{{ artistName }}</span>
    </div>
    <video :src="mvUrl" :poster="cover" controls></video>
    <div class="icons fsc">
      <div class="like icon_mv_icon_like"><i class="close"></i></div>
      <div class="collect icon_mv_icon_collect"><i class="close"></i></div>
      <div class="share icon_mv_icon_share"><i class="close"></i></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  mvName: {
    type: String,
    required: true,
  },
  artistName: {
    type: String,
    required: true,
  },
  mvUrl: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  likeCount: {
    type: Number,
    required: true,
  },
  collectCount: {
    type: Number,
    required: true,
  },
  shareCount: {
    type: Number,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.mv-play {
  .title {
    margin-bottom: 8px;

    span {
      color: #333;
      font-size: 24px;
      margin-left: 5px;

      &:last-child {
        color: #0c73c2;
        font-size: 12px;
      }
    }
  }

  video {
    width: 640px;
    height: 360px;
    border: 1px solid #333;
  }
}
</style>
