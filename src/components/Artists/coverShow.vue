<!--
 * @Author: wwssaabb
 * @Date: 2021-10-08 11:13:12
 * @LastEditTime: 2021-10-13 15:53:26
 * @FilePath: \CloudMusic-for-Vue3\src\components\Artists\coverShow.vue
-->
<template>
  <div class="cover-list fss fw">
    <div class="item" v-for="item in list">
      <div class="cover pr">
        <img :src="item.picUrl + '?param=130y130'" alt="" />
        <i class="mask pa icon_cover_mask cur_p"></i>
      </div>
      <div
        class="msg fpbc cur_p"
        @click="goArtistDetail?.('/artist?id=' + item.id)"
      >
        <span class="name td_u">{{ item.name }}</span>
        <i class="icon_personal cur_p" :title="item.name + '的个人主页'"></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { artistType } from "../../types/types";
import { PropType, inject } from "vue";

const props = defineProps({
  list: {
    type: Array as PropType<artistType[]>,
    required: true,
  },
});

// router跳转到歌手详情页
const goArtistDetail: ((path: string) => void) | undefined =
  inject("goArtistDetail");
</script>

<style lang="scss" scoped>
.cover-list {
  .item {
    width: 130px;
    margin: 0 0 30px 17px;

    &:nth-child(5n + 1) {
      margin: 0 0 30px 0;
    }

    .cover {
      img {
        width: 130px;
        height: 130px;
        object-fit: contain;
        margin-bottom: 8px;
        z-index: 10;
      }
      .mask {
        top: -5px;
        left: -5px;
        transform: scale(0.92857);
      }
    }

    .msg {
      span {
        font-size: 12px;
      }
    }
  }
}
</style>
