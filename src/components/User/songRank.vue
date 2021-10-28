<!--
 * @Author: wwssaabb
 * @Date: 2021-10-21 11:30:51
 * @LastEditTime: 2021-10-27 15:16:12
 * @FilePath: \CloudMusic-for-Vue3\src\components\User\songRank.vue
-->
<template>
  <div class="user-song-rank">
    <Title>
      <template #title>
        <span class="title">听歌排行</span>
        <span class="count">累积听歌{{ listenSongs }}首</span>
        <i class="icon_user_tip"></i>
      </template>
      <template #right>
        <span
          class="aweek cur_p"
          :class="chooseType === 1 ? 'active' : ''"
          @click="changeType(1)"
          >最近一周</span
        >
        <span
          class="all_time cur_p"
          :class="chooseType === 0 ? 'active' : ''"
          @click="changeType(0)"
          >所有时间</span
        >
      </template>
    </Title>
    <div
      class="rank-list"
      v-loading="!isEmpty && list.length === 0"
      v-if="!isEmpty"
    >
      <div class="item fss" v-for="(item, index) in list" :key="item.song.id">
        <div class="index">{{ index + 1 }}.</div>
        <div class="center fsc t_ovl1">
          <div class="content t_ovl1 pr">
            <i class="play_icon mr10 f_nos pa"></i>
            <span
              class="name mr10 td_u f_nos cur_p"
              @click="router.push('/song?id=' + item.song.id)"
              >{{ item.song.name }}</span
            >
            <span
              class="artist f_nos"
              v-html="
                '<span class=mr5>-</span>' +
                getCreatorHtml(item.song.ar, 'name', 'id', '/artist?id=')
              "
            ></span>
          </div>

          <span class="icons fsc f_nos">
            <i
              class="icon_user_record_add mr5 cur_p"
              title="添加到播放列表"
            ></i>
            <i class="icon_user_record_collect mr5 cur_p" title="收藏"></i>
            <i class="icon_user_record_share mr5 cur_p" title="分享"></i>
            <i class="icon_user_record_download cur_p" title="下载"></i>
          </span>
        </div>
        <div class="right">
          <div class="bar" :style="'width:' + item.score + '%;'"></div>
        </div>
      </div>
    </div>
    <div class="empty fcc" v-else="isEmpty">
      <div class="content fcc">
        <i class="icon_user_home_empty"></i>
        <h2 class="text">暂无听歌记录</h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { useRouter } from "vue-router";
import { PlayRecordType } from "../../types/types";
import { getCreatorHtml } from "../../utils";
import Title from "../Title.vue";

const router = useRouter();

const props = defineProps({
  list: {
    type: Array as PropType<PlayRecordType[]>,
    required: true,
  },
  listenSongs: {
    type: Number,
    required: true,
  },
  chooseType: {
    type: Number,
    required: true,
  },
  changeType: {
    type: Function as PropType<(type: 0 | 1) => void>,
    required: true,
  },
  isEmpty: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.user-song-rank {
  margin-bottom: 36px;
  span {
    font-size: 12px;
    color: #666;
  }
  .title {
    font-size: 20px;
    color: #666;
    line-height: 26px;
    margin-right: 10px;
  }

  .aweek,
  .all_time {
    padding: 0 8px;
    font-size: 12px;
    line-height: 12px;
    color: #666;
    &:hover {
      color: #333;
    }
    &.active {
      color: #333;
      font-weight: bold;
    }
  }
  .aweek {
    border-right: 1px solid #999;
  }

  .rank-list {
    min-height: 38px;
    border: 1px solid #e2e2e2;
    border-top: none;

    .item {
      height: 38px;
      &:nth-child(2n) {
        background: #f7f7f7;
      }
      &:hover {
        background: #e6e6e6;
        .center .icons {
          display: flex;
        }
      }
      .index {
        width: 50px;
        height: 38px;
        font-size: 16px;
        color: #666;
        padding: 0 8px 0 5px;
        line-height: 38px;
        text-align: right;
      }
      .center {
        width: 529px;
        height: 38px;
        padding-right: 10px;

        .content {
          flex: 1;
          line-height: 38px;
          .name {
            margin-left: 27px;
            font-size: 12px;
            color: #333;
            font-weight: bold;
          }

          .play_icon {
            top: 11px;
          }
          .artist,
          .artist span {
            font-size: 12px;
            color: #aeaeae;
            line-height: 38px;
            height: 38px;
          }
        }

        .icons {
          display: none;
          background: #e6e6e6;
        }
      }
      .right {
        width: 319px;
        height: 38px;
        .bar {
          height: 38px;
          background: #4eb4f5;
          opacity: 0.1;
        }
      }
    }
  }
  .empty {
    height: 298px;
    padding: 105px 0;

    .content {
      padding-bottom: 38px;
      .text {
        font-size: 18px;
        font-weight: bold;
        margin-left: 20px;
      }
    }
  }
}
</style>
