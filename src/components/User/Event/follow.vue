<!--
 * @Author: wwssaabb
 * @Date: 2021-10-23 09:54:58
 * @LastEditTime: 2021-10-23 10:07:14
 * @FilePath: \CloudMusic-for-Vue3\src\components\User\Event\follow.vue
-->
<template>
  <div class="user-event-follows">
    <div class="title">TA的关注</div>
    <div class="list">
      <div class="item d_ib" v-for="item in list">
        <img :src="item.avatarUrl + '?param=64y64'" alt="" />
        <div class="name t_ovl1">
          <span class="td_d">{{ item.nickname }}</span>
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
.user-event-follows {
  width: 250px;
  padding: 10px 0 0 25px;

  .title {
    line-height: 24px;
    font-size: 12px;
    color: #333;
    border-bottom: 1px solid #ccc;
  }

  .list {
    padding-top: 15px;

    .item {
      width: 64px;
      height: 105px;
      img {
        width: 64px;
        height: 64px;
        margin-bottom: 5px;
      }
      .name span {
        font-size: 12px;
        line-height: 14px;
        color: #333;
      }

      &:not(:nth-child(3n + 1)) {
        margin-left: 16px;
      }
    }
  }
}
</style>
