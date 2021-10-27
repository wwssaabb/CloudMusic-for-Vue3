<!--
 * @Author: wwssaabb
 * @Date: 2021-10-25 16:21:13
 * @LastEditTime: 2021-10-26 10:22:05
 * @FilePath: \CloudMusic-for-Vue3\src\components\User\Follows\list.vue
-->
<template>
  <div class="user-follows-list" v-loading="list.length === 0">
    <div class="list fss fw">
      <div
        class="item fss"
        :class="
          index === list.length - 1 || index === list.length - 2 ? 'n' : ''
        "
        v-for="(item, index) in list"
      >
        <img :src="item.avatarUrl + '?param=60y60'" alt="" />
        <div class="center ml10">
          <div class="name-wrap">
            <span
              class="name c0 td_u"
              @click="router.push('/user/home?id=' + item.userId)"
              >{{ item.nickname }}</span
            >
            <i class="icon_user_follows_v" v-if="item.authStatus"></i>
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
          <i class="icon_user_follows_follow_btn"><span>关注</span></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { useRouter } from "vue-router";
import { UserFollowType } from "../../../types/types";

const router = useRouter();

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
  min-height: 300px;
  .list {
    .item {
      width: 450px;
      height: 100px;
      padding: 20px 20px 0;
      background: #fff;
      border-right: 1px solid #d5d5d5;
      &:nth-child(2n + 1) {
        border-left: 1px solid #d5d5d5;
      }
      &:nth-child(4n - 1) {
        background: #fafafa;
      }
      &:nth-child(4n) {
        background: #fafafa;
      }

      &.n {
        border-bottom: 1px solid #d5d5d5;
        img {
          margin-bottom: 20px;
        }
      }

      img {
        width: 60px;
        height: 60px;
        // margin-bottom: 20px;
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

      .right {
        padding-top: 5px;
        .icon_user_follows_follow_btn {
          padding-left: 30px;
          span {
            color: #fff;
            letter-spacing: 3px;
            line-height: 30px;
          }
        }
      }
    }
  }
}
</style>
