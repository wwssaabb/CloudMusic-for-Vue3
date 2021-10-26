<!--
 * @Author: wwssaabb
 * @Date: 2021-10-23 14:32:16
 * @LastEditTime: 2021-10-26 09:15:37
 * @FilePath: \CloudMusic-for-Vue3\src\components\User\Event\EventList.vue
-->
<template>
  <div class="user-event-list" v-loading="list.length === 0">
    <div class="item fss" v-for="item in list" :key="item.id">
      <img class="avatar" :src="item.user.avatarUrl + '?param=45y45'" alt="" />
      <div class="right">
        <div class="nickname">
          <span class="td_u">{{ item.user.nickname }}</span
          ><span>{{ getEventType(item.type) }}</span>
        </div>
        <div class="time">{{ timeFormat2(item.showTime) }}</div>
        <div
          class="msg"
          v-html="getUserEventContent(item.json.msg, item.actName, item.actId)"
        ></div>
        <div class="resource fss">
          <img :src="item.json.song?.img80x80" alt="" />
          <div class="msg">
            <div class="name td_u" v-if="item.json.song">
              {{ item.json.song.name }}
            </div>
            <div
              class="artist"
              v-if="item.json.song"
              v-html="
                getCreatorHtml(
                  item.json.song.artists,
                  'name',
                  'id',
                  '/artist?id='
                )
              "
            ></div>
          </div>
        </div>
        <div class="pics" v-if="item.pics">
          <img
            :src="
              pic.squareUrl +
              (item.pics.length !== 1
                ? '?param=110y110&quality=100'
                : '?param=338x0&quality=100')
            "
            alt=""
            v-for="pic in item.pics"
          />
        </div>
        <div class="icons">
          <span class="td_u"
            ><i class="icon_user_liked"></i
            ><span v-if="item.info.likedCount"
              >({{ item.info.likedCount }})</span
            ></span
          >
          <span class="td_u"
            >转发<span v-if="item.info.shareCount"
              >({{ item.info.shareCount }})</span
            ></span
          >
          <span class="td_u"
            >评论<span v-if="item.info.commentCount"
              >({{ item.info.commentCount }})</span
            ></span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { UserEventType } from "../../../types/types";
import {
  getEventType,
  timeFormat2,
  getCreatorHtml,
  getUserEventContent,
} from "../../../utils";

const props = defineProps({
  list: {
    type: Array as PropType<UserEventType[]>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.user-event-list {
  min-height: 300px;

  .item {
    padding: 20px 0;
    border-bottom: 1px solid #e8e8e9;

    .avatar {
      width: 45px;
      height: 45px;
      margin-right: 10px;
    }
    .right {
      flex: 1;
      .nickname {
        height: 19px;
        span {
          color: #666;
          &:first-child {
            color: #0c73c2;
          }
        }
      }
      .time {
        margin-top: 7px;
        font-size: 12px;
        line-height: 14px;
        color: #999;
      }
      .msg {
        margin-top: 10px;
        color: #333;
        line-height: 24px;
      }
      .resource {
        width: 100%;
        margin: 4px 0 5px;
        padding: 10px 0;
        height: 60px;
        background: #f5f5f5;
        img {
          width: 40px;
          height: 40px;
          margin: 0 10px;
        }
        .msg {
          height: 20px;
          line-height: 20px;
          color: #333;
          margin-top: 0;
        }
        .artist {
          height: 20px;
          line-height: 20px;
          color: #666;
        }
      }
      .pics {
        width: 338px;
        img {
          // width: 110px;
          // height: 110px;
          max-width: 338px;
          max-height: 338px;
          margin-top: 4px;
          object-fit: contain;
          &:not(:nth-child(3n + 1)) {
            margin-left: 4px;
          }
        }
      }
      .icons {
        margin-top: 18px;
        text-align: right;
        color: #0c73c2;
        span {
          font-size: 12px;
          color: #0c73c2;
        }
        & > span {
          padding: 0 10px;
          &:nth-child(2) {
            padding: 0 12px;
            line-height: 10px;
            border-left: 1px solid #c7c7c7;
            border-right: 1px solid #c7c7c7;
          }
        }
        .icon_user_liked {
          margin-right: 3px;
        }
      }
    }
  }
}
</style>
