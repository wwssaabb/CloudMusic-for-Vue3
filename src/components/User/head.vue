<!--
 * @Author: wwssaabb
 * @Date: 2021-10-20 10:08:47
 * @LastEditTime: 2021-10-20 10:48:10
 * @FilePath: \CloudMusic-for-Vue3\src\components\User\head.vue
-->
<template>
  <div class="user-home-head" v-if="detail !== null">
    <div class="cover pr cur_p">
      <img :src="detail.avatarUrl" alt="" />
      <i class="icon_user_cover_mask"></i>
    </div>
    <div class="right">
      <div class="top">
        <span class="name">{{ detail.nickname }}</span>
        <img
          src="https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4357872479/15d6/b1b3/dff8/209585a9a787b00717324e75e55851d7.png"
          alt=""
        />
        <i class="icon_user_level"></i>
        <i class="icon_user_sex"></i>
        <i class="icon_user_email"></i>
        <i class="icon_user_follow"></i>
      </div>
      <div class="middle">
        <div class="item" v-for="item in countList" :key="item.count">
          <span class="count">{{ item.count }}</span>
          <span class="name">{{ item.count }}</span>
        </div>
      </div>
      <div class="bot">
        <div class="signature"></div>
        <div class="location">
          <span class="birthday" v-if="detail.birthday"></span>
        </div>
        <div class="location"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed } from "vue";
import { UserDetailType } from "../../types/types";

const props = defineProps({
  detail: {
    type: Object as PropType<UserDetailType | null>,
    required: true,
  },
});

computed: {
  countList: () => [
    { name: "动态", count: props.detail?.eventCount },
    { name: "关注", count: props.detail?.follows },
    { name: "粉丝", count: props.detail?.followeds },
  ];
}
</script>

<style lang="scss" scoped>
.user-home-head {
}
</style>
