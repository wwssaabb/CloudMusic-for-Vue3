<!--
 * @Author: wwssaabb
 * @Date: 2021-10-23 14:32:16
 * @LastEditTime: 2021-10-23 16:10:00
 * @FilePath: \CloudMusic-for-Vue3\src\components\User\Event\EventList.vue
-->
<template>
  <div class="user-event-list">
    <div class="item fss" v-for="item in list" :key="item.id">
      <img class="avatar" :src="item.user.avatarUrl + '?param=45y45'" alt="" />
      <div class="right">
        <div class="nickname">
          <span class="td_u">{{ item.user.nickname }}</span
          ><span>{{ getEventType(item.type) }}</span>
        </div>
        <div class="time">{{ timeFormat2(item.showTime) }}</div>
        <div class="msg">{{ item.json.msg }}</div>
        <div class="resource fss">
          <img
            src="http://p4.music.126.net/KgN_Zxn-OMnqH7jxvF58NA==/109951166383027277.jpg?param=40y40&quality=100"
            alt=""
          />
          <div class="msg">
            <div class="name td_u">Paradise</div>
            <div class="artist td_u">Alan Walker/K-391/Boy In Space</div>
          </div>
        </div>
        <div class="pics" v-if="item.pics">
          <img
            :src="pic.squareUrl + '?param=110y110&quality=100'"
            alt=""
            v-for="pic in item.pics"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { UserEventType } from "../../../types/types";
import { getEventType, timeFormat2 } from "../../../utils";

const props = defineProps({
  list: {
    type: Array as PropType<UserEventType[]>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.user-event-list {
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
          width: 110px;
          height: 110px;
          margin-top: 4px;
          &:not(:nth-child(3n + 1)) {
            margin-left: 4px;
          }
        }
      }
    }
  }
}
</style>
