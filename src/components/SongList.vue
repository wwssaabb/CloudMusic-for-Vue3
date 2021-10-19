<!--
 * @Author: wwssaabb
 * @Date: 2021-09-28 15:14:46
 * @LastEditTime: 2021-10-19 16:37:14
 * @FilePath: \CloudMusic-for-Vue3\src\components\SongList.vue
-->
<template>
  <div class="list">
    <div class="list-title fsc" v-if="showHead">
      <div class="index f_nos"></div>
      <div class="name" :class="otherSlot ? 'other' : ''">标题</div>
      <div class="time f_nos">时长</div>
      <div class="singer f_nos" :class="otherSlot ? 'other' : ''">歌手</div>
      <div class="other" v-if="otherSlot">
        <slot name="title" v-if="otherSlot"></slot>
      </div>
    </div>
    <div class="content" v-if="list.length !== 0">
      <div
        class="item fsc"
        :style="'padding:' + (index <= 2 ? '10px 0' : '6px 0')"
        v-for="(item, index) in list"
        :key="item.id"
      >
        <div class="index fpbc f_nos">
          <span>{{ index + 1 }}</span>
          <span class="rank_icon fcc" v-if="showRank"
            ><i :class="getStatus(index)">{{
              getRankNumber(index) === undefined ? "" : getRankNumber(index)
            }}</i></span
          >
        </div>
        <div class="name cur_p fsc f_nos" :class="otherSlot ? 'other' : ''">
          <img
            v-if="index <= specialTop - 1"
            :src="item.al.picUrl + '?param=50y50&quality=100'"
            alt=""
            @click="goSongDetail(item.id)"
          />
          <i class="play_icon f_nos"></i>
          <span
            class="name-content d_ib td_u f_nos t_ovl1"
            :class="otherSlot ? 'other' : ''"
            :title="getTitle(item)"
            @click="goSongDetail(item.id)"
            >{{ item.name }}</span
          >
          <span
            class="t_ovl1 f_nog"
            style="color: #aeaeae"
            v-if="item.alia?.length !== 0"
            :title="getTitle(item, false)"
            >- ({{ item.alia?.[0] }})</span
          >
          <i class="mv_icon f_nosg cur_p" v-if="item.mv !== 0"></i>
        </div>
        <div class="time fsc pr f_nos">
          <span>{{ format(item.dt, "", "duration") }}</span>
          <div class="icons fsc">
            <a
              href="javascript:void;"
              title="添加到播放列表"
              class="playlist_icon"
            ></a>
            <a href="javascript:void;" title="收藏" class="addlist_icon"></a>
            <a
              href="javascript:void;"
              title="分享"
              class="collectlist_icon"
            ></a>
            <a
              href="javascript:void;"
              title="下载"
              class="downloadlist_icon"
            ></a>
          </div>
        </div>
        <div class="singer t_ovl1 f_nos" :class="otherSlot ? 'other' : ''">
          <span
            v-if="!singerSlot"
            v-html="getCreatorHtml(item.ar, 'name', 'id', '/artist?id=')"
          ></span>
          <slot name="singer" :item="item" v-else></slot>
        </div>
        <div class="other t_ovl1" v-if="otherSlot">
          <slot name="other" :item="item"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  PlaylistType,
  DiscoverListSongType,
  SongType,
  formatType,
} from "../types/types";
import { PropType } from "vue";
import { useRouter } from "vue-router";
import moment from "../utils/moment";
import { getCreatorHtml } from "../utils";

const router = useRouter();

const props = defineProps({
  list: {
    type: Array as PropType<DiscoverListSongType[]>,
    required: true,
  },
  getStatus: {
    type: Function as PropType<(index: number) => string>,
    required: true,
    default: () => {},
  },
  /* getTitle: {
    type: Function as PropType<
      (item: DiscoverListSongType, isNameTitle?: boolean) => string | undefined
    >,
    required: true,
  }, */
  getRankNumber: {
    type: Function as PropType<(index: number) => number | undefined>,
    required: true,
    default: () => {},
  },
  showHead: {
    type: Boolean,
    default: true,
  },
  showRank: {
    type: Boolean,
    default: true,
  },
  specialTop: {
    type: Number,
    default: 3,
  },
  singerSlot: {
    type: Boolean,
    default: false,
  },
  otherSlot: {
    type: Boolean,
    default: false,
  },
});
const goSongDetail = (id: number) => router.push("/song?id=" + id);
const goArtistDetail = (id: number) => router.push("/artist?id=" + id);
const con = (e: any) => console.log(e);

const getTitle = (
  item: DiscoverListSongType,
  isNameTitle: boolean = true
): string | undefined => {
  if (isNameTitle) {
    return item.alia.length !== 0
      ? item.name + "-(" + item.alia?.[0] + ")"
      : item.name;
  } else {
    return item.alia?.join("/");
  }
};

const format = (n: number, format: string, type: formatType = "normal") => {
  const handle = {
    normal: () => moment(n).format(format), //正常格式化时间
    compare: () => {
      //比较时间
      let before = new Date(n);
      let now = new Date();
      //时间戳差，毫秒值
      let diff = now.getTime() - before.getTime();
      if (diff < 3600000) {
        //一个小时内 格式：多少分钟之前
        return moment(n).startOf("hour").fromNow();
      } else if (diff >= 3600000 && diff <= 86400000) {
        //一天以内  格式 16:44 或 昨天 16:45
        return moment(n).subtract(0, "days").calendar();
      } else if (diff >= 86400000 && diff <= 30758400000) {
        //一年以内 格式： 9月22日 06:55
        return moment(n).format("MM月DD日 HH:mm");
      } else if (diff > 30758400000) {
        //一年以外 格式：2014年6月30日
        return moment(n).format("YYYY年MM月DD日");
      }
    },
    duration: () => {
      //获取时间长度 例子：03:05
      let duration = moment.duration(n);
      let m = duration.minutes();
      let s = duration.seconds();
      return (m >= 10 ? m : "0" + m) + ":" + (s >= 10 ? s : "0" + s);
    },
  };

  //时间格式化
  return handle[type]();
};
</script>

<style lang="scss" scoped>
$border_color: #eee;
.list {
  border: 1px solid $border_color;
  .content {
    min-height: 200px;
  }
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
    &.other {
      width: 236px;
    }
    span {
      margin-left: 8px;
    }
    i:last-child {
      margin: 0 3px;
    }
    .name-content {
      max-width: 253px;
      &.other {
        max-width: 213px;
      }
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
    &.other {
      width: 170px;
      width: 90px;
    }
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
    .other {
      width: 127;
    }
    height: 39px;
  }
}
</style>
