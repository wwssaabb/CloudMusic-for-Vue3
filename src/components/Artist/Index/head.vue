<!--
 * @Author: wwssaabb
 * @Date: 2021-10-14 10:40:19
 * @LastEditTime: 2021-10-15 09:31:07
 * @FilePath: \CloudMusic-for-Vue3\src\components\Artist\Index\head.vue
-->
<template>
  <div class="head fpbc">
    <div class="left fss">
      <PlayAddlistBtn />
      <i class="icon_btn_collect_bg icon_collect50">
        <span class="d_b">收藏热门50</span>
      </i>
    </div>
    <div class="right">
      <div class="icon_artist_filter_bg filter_btn pr">
        <span class="icons16_img d_b show">{{
          filters[chooseFilterIndex].name
        }}</span>
        <div class="selector pa">
          <div
            class="item"
            :class="index === chooseFilterIndex ? 'active' : ''"
            v-for="(item, index) in filters"
            :key="item.id"
            @click="changeFilterIndex(index)"
          >
            <span class="d_ib">{{ item.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { ArtistPage_filterType } from "../../../types/types";
import PlayAddlistBtn from "../../Botton/play_addlist.vue";

const props = defineProps({
  filters: {
    type: Array as PropType<ArtistPage_filterType[]>,
    required: true,
  },
  chooseFilterIndex: {
    type: Number,
    required: true,
  },
  changeFilterIndex: {
    type: Function as PropType<(index: number) => void>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.head {
  margin: 20px 0 10px;

  .left {
    .icon_collect50 {
      width: 90px;
      span {
        width: 94px;
        height: 31px;
        padding: 7px 0 0 27px;
        font-size: 12px;
        color: #333;
        background: url("https://music.163.com/style/web2/img/button2.png?17e0eb841988b28b1ec22857bd3d0dda")
          no-repeat;
        background-position: right -1020px;
        z-index: 10;
      }
      &:hover {
        span {
          background-position: right -1106px;
        }
      }
    }
  }

  .right {
    .filter_btn {
      width: 107px;
      height: 31px;
      span.show {
        width: 107px;
        height: 31px;
        background-position: right -100px;
        font-size: 12px;
        color: #333;
        padding: 7px 0 0 27px;
      }

      &:hover {
        .selector {
          display: block;
        }
        span.show {
          background-position: right -181px;
        }
      }

      .item:active {
        .selector {
          display: none;
        }
      }

      .selector {
        width: 107px;
        top: 31px;
        background: #fff;
        border: 1px solid #c3c3c3;
        border-bottom-right-radius: 4px;
        border-bottom-left-radius: 4px;
        display: none;
        .item {
          width: 107px;
          height: 31px;
          line-height: 31px;
          text-align: center;
          &:not(:last-child) {
            border-bottom: 1px solid #c3c3c3;
          }

          span {
            font-size: 12px;
            color: #333;
          }

          &:hover {
            background: rgba(0, 0, 0, 0.1);
          }
          &.active {
            background: rgba(0, 0, 0, 0.1);
          }
        }
      }
    }
  }
}
</style>
