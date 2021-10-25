<!--
 * @Author: wwssaabb
 * @Date: 2021-10-25 16:21:13
 * @LastEditTime: 2021-10-25 17:51:23
 * @FilePath: \CloudMusic-for-Vue3\src\components\User\Follows\list.vue
-->
<template>
  <div class="user-follows-list">
    <div class="list fss fw">
      <div class="item fss" v-for="item in list">
        <img :src="item.avatarUrl + '?param=60y60'" alt="" />
        <div class="center ml10">
          <div class="name-wrap">
            <span class="name c0 td_u">{{ item.nickname }}</span>
            <i class="icon_user_follows_v"></i>
            <i
              :class="
                'icon_user_follows_gender_' + (item.gender === 1 ? 'm' : 'w')
              "
              v-if="item.gender"
            ></i>
          </div>
          <div class="msg">
            <span class="td_u"
              >动态<span class="c0">{{ item.eventCount }}</span></span
            >
            <span class="td_u"
              >关注<span class="c0">{{ item.eventCount }}</span></span
            >
            <span class="td_u"
              >粉丝<span class="c0">{{ item.eventCount }}</span></span
            >
          </div>
          <div class="desc">
            <span class="d_ib t_ovl1">{{ item.signature }}</span>
          </div>
        </div>
        <div class="right">
          <i class="user-follows-follow-btn"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { UserFollowType } from "../../../types/types";

const props = defineProps({
  list: {
    type: Array as PropType<UserFollowType[]>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.user-follows-list {
  width: 900px;
  .list {
    .item {
      width: 450px;
      padding: 20px 20px 0;
      border-right: 1px solid #d5d5d5;
      &:nth-child(2n + 1) {
        border-left: 1px solid #d5d5d5;
      }

      img {
        width: 60px;
        height: 60px;
      }
      span {
        font-size: 12px;
        color: #333;
        &.c0 {
          color: #0c73c2;
        }
      }
      .name-wrap {
        line-height: 16px;
        margin-bottom: 6px;
        .name {
          font-size: 14px;
        }
        i {
          margin: 0 2px;
        }
      }

      .msg {
        line-height: 16px;
        margin-bottom: 6px;
        span {
          padding-right: 8px;
          &:not(:first-child) {
            padding-left: 8px;
            border-left: 1px solid #999;
          }
        }
      }

      .desc span {
        width: 255px;
        color: #666;
      }
    }
  }
}
</style>
