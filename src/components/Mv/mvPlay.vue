<!--
 * @Author: wwssaabb
 * @Date: 2021-10-15 17:05:02
 * @LastEditTime: 2021-10-16 16:06:10
 * @FilePath: \CloudMusic-for-Vue3\src\components\Mv\mvPlay.vue
-->
<template>
  <div class="mv-play" v-loading="detail.cover === ''">
    <div class="title">
      <i class="icon_mv_tag"></i>
      <span>{{ detail.name }}</span>
      <span class="td_u">{{ detail.artistName }}</span>
    </div>
    <video :src="mvUrl" :poster="detail.cover" controls></video>
    <div class="icons fsc">
      <div class="like icon_mv_icon_like pr">
        <i class="close d_ib pa icons20_img"></i
        ><i class="like_icon d_ib pa"></i
        ><span class="d_ib cur_p">({{ detail.likedCount ?? 0 }})</span>
      </div>
      <div class="collect icon_mv_icon_collect pr">
        <i class="close d_ib pa icons20_img"></i
        ><span class="d_ib cur_p">({{ detail.subCount }})</span>
      </div>
      <div class="share icon_mv_icon_share pr">
        <i class="close d_ib pa icons20_img"></i
        ><span class="d_ib cur_p">({{ detail.shareCount }})</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { MvDetailType } from "../../types/types";
const props = defineProps({
  detail: {
    type: Object as PropType<MvDetailType>,
    required: true,
  },
  mvUrl: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.mv-play {
  height: 442px;
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
  .icons {
    margin: 12px 0 45px;

    .like,
    .collect,
    .share {
      margin-right: 13px;
      width: auto;
      min-width: 58px;
      &:hover {
        width: auto;
        min-width: 58px;
      }

      .close {
        width: calc(100% + 4px);
        height: 31px;
        background-position: right -100px;
      }

      span {
        font-size: 12px;
        color: #333;
        z-index: 10;
        margin: 8px 5px 0 32px;
      }

      &:hover {
        .close {
          background-position: right -182px;
        }
      }
    }
  }
}
</style>
