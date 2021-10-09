<!--
 * @Author: wwssaabb
 * @Date: 2021-10-09 08:48:24
 * @LastEditTime: 2021-10-09 10:03:47
 * @FilePath: \CloudMusic-for-Vue3\src\components\AlbumCoverList.vue
-->
<template>
  <div class="album-cover-list fss fw" v-loading="list.length === 0">
    <div class="album-item d_ib" v-for="item in list">
      <div class="cover pr">
        <img :src="item.picUrl + '?param=130y130'" alt="" />
        <i class="play icon_album_play_28x28 pa"></i>
        <i class="mask icon_cover_mask_153x130 pa"></i>
      </div>
      <div class="msg">
        <div class="name t_ovl1">
          <span class="td_u">{{ item.name }}</span>
        </div>
        <div class="artists t_ovl1">
          <span v-for="(artist, index) in item.artists" :key="artist.id"
            ><span class="td_u">{{ artist.name }}</span
            ><span
              v-if="
                item.artists.length !== 1 && index !== item.artists.length - 1
              "
            >
              /
            </span></span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AlbumType } from "../types/types";
import { PropType } from "vue";

const props = defineProps({
  list: {
    type: Array as PropType<AlbumType[]>,
    required: true,
  },
});
console.log(props.list);

//获取创作者方法，
const getArtists = (item: AlbumType) => {};
</script>

<style lang="scss" scoped>
.album-cover-list {
  margin-top: 20px;
  justify-content: stretch;
  min-height: 418px;

  .album-item {
    width: 153px;
    margin: 0 0 30px 33px;
    background: url();

    &:nth-child(5n + 1) {
      margin: 0 0 30px 0;
    }

    &:hover {
      .cover .play {
        opacity: 1;
      }
    }

    .cover {
      img {
        width: 130px;
        height: 130px;
      }
      .play {
        right: 33px;
        bottom: 10px;
        opacity: 0;
      }
      .mask {
        top: 0;
        left: 0;
      }
    }

    .msg {
      width: 130px;

      .name {
        font-size: 14px;
        color: #000;
        margin: 8px 0 3px;
      }

      .artists {
        span {
          font-size: 12px;
          color: #666;
        }
      }
    }
  }
}
</style>
