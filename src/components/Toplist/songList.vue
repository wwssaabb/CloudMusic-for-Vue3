<!--
 * @Author: wwssaabb
 * @Date: 2021-09-28 15:14:46
 * @LastEditTime: 2021-09-28 16:30:43
 * @FilePath: \CloudMusic-for-Vue3\src\components\Toplist\songList.vue
-->
<template>
  <div class="list">
    <div class="list-title fsc">
      <div class="index"></div>
      <div class="name">标题</div>
      <div class="time">时长</div>
      <div class="singer">歌手</div>
    </div>
    <div class="content">
      <div
        class="item fsc"
        :style="'padding:' + (index <= 2 ? '10px 0' : '6px 0')"
        v-for="(item, index) in showData.tracks"
        :key="item.id"
      >
        <div class="index fpbc">
          <span>{{ index + 1 }}</span>
          <span class="rank_icon fcc"
            ><i :class="getStatus(index)">{{
              getRankNumber(index) === undefined ? "" : getRankNumber(index)
            }}</i></span
          >
        </div>
        <div class="name cur_p fsc f_nos">
          <img
            v-if="index <= 2"
            :src="item.al.picUrl + '?param=50y50&quality=100'"
            alt=""
          />
          <i class="play_icon f_nos"></i>
          <span
            class="name-content td_u f_nos t_ovl1"
            :title="getTitle(item)"
            >{{ item.name }}</span
          >
          <span
            class="t_ovl1 f_nog"
            style="color: #aeaeae"
            v-if="item.alia?.length !== 0"
            :title="getTitle(item, false)"
            >- ({{ item.alia?.[0] }})</span
          >
          <i class="mv_icon f_nosg" v-if="item.mv !== 0"></i>
        </div>
        <div class="time fsc pr">
          <span>{{ format(item.dt, "", "duration") }}</span>
          <div class="icons fsc">
            <a
              href="javascript:;"
              title="添加到播放列表"
              class="playlist_icon"
            ></a>
            <a href="javascript:;" title="收藏" class="addlist_icon"></a>
            <a href="javascript:;" title="分享" class="collectlist_icon"></a>
            <a href="javascript:;" title="下载" class="downloadlist_icon"></a>
          </div>
        </div>
        <div class="singer t_ovl1">
          <span>{{ item.ar.map((i) => i.name).join("/") }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  PlaylistType,
  DiscoverListSongType,
  formatType,
} from "../../types/types";
import { PropType } from "vue";

const props = defineProps({
  showData: {
    type: Object as PropType<PlaylistType>,
    required: true,
  },
  getStatus: {
    type: Function as PropType<(index: number) => string>,
    required: true,
  },
  getTitle: {
    type: Function as PropType<
      (item: DiscoverListSongType, isNameTitle?: boolean) => string | undefined
    >,
    required: true,
  },
  getRankNumber: {
    type: Function as PropType<(index: number) => number | undefined>,
    required: true,
  },
  format: {
    type: Function as PropType<
      (n: number, format: string, type?: formatType) => string | undefined
    >,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
$border_color: #eee;
.list {
  border: 1px solid $border_color;

  .item {
    width: 100%;
    padding: 6px 0;
    line-height: 18px;
    &:nth-child(2n + 1) {
      background-color: #f7f7f7;
    }
    div {
      font-size: 12px;
      span {
        font-size: 12px;
        color: #333;
      }
      img {
        width: 50px;
        height: 50px;
        border-radius: 5px;
        margin-right: 14px;
      }
    }
    &:hover {
      .time {
        span {
          display: none;
        }
        .icons {
          height: 20px;
          position: absolute;
          top: -8px;
          left: 0;
          opacity: 1;
          display: inline-block;
          width: 100%;
          height: 100%;

          a {
            margin-right: 2px;
          }
        }
      }
    }
  }
  .index {
    width: 78px;
    padding: 0 10px 0 20px;
    span:first-child {
      color: #999;
    }
    .rank_icon {
      width: 20px;
      justify-content: stretch;
      padding-left: 5px;
    }
  }
  .name {
    width: 327px;
    padding-left: 10px;
    span {
      margin-left: 8px;
    }
    i:last-child {
      margin: 0 3px;
    }
    .name-content {
      max-width: 253px;
    }
  }
  .time {
    width: 91px;
    padding-left: 10px;

    .icons {
      display: none;
      opacity: 0;
    }
  }
  .singer {
    width: 170px;
    padding-left: 10px;
  }
  .list-title {
    color: #666;
    div {
      font-size: 12px;
      height: 39px;
      line-height: 39px;
      border-right: 1px solid $border_color;
      border-bottom: 1px solid $border_color;
      background-image: linear-gradient(to bottom, #fff, #f8f8f8);
      &:last-child {
        border-right: none;
      }
    }

    height: 39px;
  }
}
</style>
