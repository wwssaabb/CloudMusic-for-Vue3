<!--
 * @Author: wwssaabb
 * @Date: 2021-09-29 14:36:54
 * @LastEditTime: 2021-09-29 16:27:57
 * @FilePath: \CloudMusic-for-Vue3\src\components\AlbumList.vue
-->

<template>
  <div class="album-list d_f fw" v-if="playLists !== undefined">
    <div v-for="item in playLists" :key="item.id" class="item cur_p f_nog">
      <div class="cover pr">
        <img :src="item.coverImgUrl + '?param=140y140'" alt="" />
        <div class="cover-mask pa icon_cover_mask"></div>
        <div class="cover-bottom pa icon_cov_bot_bg fpbc">
          <div class="left d_ib">
            <i class="icon_headset"></i>
            <span>{{ format(item.playCount) }}</span>
          </div>
          <div class="right d_ib">
            <i class="icon_play"></i>
          </div>
        </div>
      </div>
      <div class="msg">
        <div class="name t_ovl1 td_u f_nog">
          {{ item.name }}
        </div>
        <div class="author fsc">
          by <span class="td_u t_ovl1 d_ib">{{ item.creator.nickname }}</span>
          <img
            v-if="item.creator.avatarDetail"
            :src="item.creator.avatarDetail.identityIconUrl"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { playListType } from "../types/types";
import { PropType } from "vue";
const props = defineProps({
  playLists: {
    type: Array as PropType<playListType[] | undefined>,
    required: true,
  },
});

const format = (n: number): string => {
  return n > 10000 ? (n / 10000).toFixed(0) + "万" : n.toString();
};
</script>

<style lang="scss" scoped>
.album-list {
  justify-content: stretch;
  padding-bottom: 40px;

  .item {
    margin: 30px 50px 0 0;
    &:nth-child(5n) {
      margin: 30px 0 0 0;
    }
    .cover {
      width: 140px;
      height: 140px;

      img {
        width: 100%;
        height: 100%;
      }
      .cover-bottom {
        left: 0;
        bottom: 0;
        width: 140px;
        height: 27px;
        padding: 0 10px;
        color: #ccc;

        span {
          font-size: 12px;
        }

        .left,
        .right {
          height: 16px;
        }

        .icon_headset {
          margin-right: 10px;
        }
      }

      .cover-mask {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }

    .msg {
      .name {
        width: 140px;
        height: 20px;
        margin: 8px 0 3px;
      }
      .author {
        color: #999;

        span {
          max-width: 102px;
          color: #666;
          margin-left: 5px;
          font-size: 12px;
        }
        img {
          width: 13px;
          height: 13px;
          margin-left: 5px;
        }
      }
    }
  }
}
</style>
