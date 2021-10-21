<!--
 * @Author: wwssaabb
 * @Date: 2021-10-20 10:08:47
 * @LastEditTime: 2021-10-21 11:36:51
 * @FilePath: \CloudMusic-for-Vue3\src\components\User\head.vue
-->
<template>
  <div class="user-home-head fss" v-if="detail !== null">
    <div class="cover cur_p">
      <img :src="detail.avatarUrl + '?param=180y180'" alt="" />
    </div>
    <div class="right">
      <div class="top fsc">
        <span class="name">{{ detail.nickname }}</span>
        <img
          src="https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4357872479/15d6/b1b3/dff8/209585a9a787b00717324e75e55851d7.png"
          alt=""
        />
        <i class="icon_user_level pr" v-if="level"
          ><span>{{ level }}</span> <i class="close pa"></i
        ></i>
        <i
          :class="'icon_user_sex_' + (detail.gender === 1 ? 'm' : 'w')"
          v-if="detail.gender"
        ></i>
        <i class="icon_user_email">发私信</i>
        <i class="icon_user_follow">关注</i>
      </div>
      <div class="middle fss">
        <div
          class="item cur_p d_ib"
          v-for="item in countList"
          :key="item.count"
        >
          <span class="count">{{ item.count }}</span
          ><br />
          <span class="name">{{ item.name }}</span>
        </div>
      </div>
      <div class="bot">
        <div class="signature" v-if="detail.signature">
          <span>个人介绍：{{ detail.signature }}</span>
        </div>
        <div class="location" v-if="detail.province">
          <span>
            所在地区：{{ getCityName(detail.province, detail.city) }}
          </span>
          <span class="birthday" v-if="detail.birthday > 0"
            >年龄：{{ getAgeArea(detail.birthday) }}</span
          >
        </div>
        <!-- <div class="line"><span>社交网络：</span></div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed } from "vue";
import { UserDetailType } from "../../types/types";
import { getCityName, getAgeArea } from "../../utils";

const props = defineProps({
  detail: {
    type: Object as PropType<UserDetailType | null>,
    required: true,
    default: null,
  },
  level: {
    type: Number,
    default: 0,
  },
});

const countList = computed(() => [
  { name: "动态", count: props.detail?.eventCount },
  { name: "关注", count: props.detail?.follows },
  { name: "粉丝", count: props.detail?.followeds },
]);
</script>

<style lang="scss" scoped>
.user-home-head {
  margin-bottom: 43px;
  .cover {
    width: 189px;
    height: 189px;
    margin-right: 40px;
    border: 1px solid #d5d5d5;
    padding: 4px;
    img {
      width: 180px;
      height: 180px;
    }
  }

  .right {
    flex: 1;
    .top {
      height: 39px;
      padding-bottom: 12px;
      margin-bottom: 10px;
      border-bottom: 1px solid #ddd;
      span.name {
        font-size: 22px;
        line-height: 30px;
      }

      img {
        width: 57px;
        height: 20px;
        margin-left: 10px;
      }

      .icon_user_level {
        margin-left: 10px;
      }
      .icon_user_sex_m,
      .icon_user_sex_w {
        margin-left: 8px;
      }
    }
    .middle {
      margin-bottom: 15px;
      .item {
        height: 40px;
        padding-right: 40px;
        &:hover span {
          color: #0c73c2;
        }
        &:not(:first-child) {
          width: 86px;
          border-left: 1px solid #ddd;
          padding-left: 20px;
        }
        .count {
          width: 26px;
          font-size: 24px;
          line-height: 28px;
          color: #666;
        }
        .name {
          width: 26px;
          font-size: 12px;
          line-height: 16px;
          color: #666;
        }
      }
    }

    .bot {
      span {
        font-size: 12px;
        color: #666;
        line-height: 21px;
      }
      .signature,
      .location,
      .line {
        margin-bottom: 5px;
      }

      .birthday {
        margin-left: 20px;
      }
    }
  }
}
</style>
