<!--
 * @Author: wwssaabb
 * @Date: 2021-10-08 11:14:23
 * @LastEditTime: 2021-10-13 15:55:10
 * @FilePath: \CloudMusic-for-Vue3\src\components\Artists\nameList.vue
-->
<template>
  <div class="name-list fss fw">
    <div
      class="item fsc"
      v-for="item in list"
      :key="item.id"
      @click="goArtistDetail?.('/artist?id=' + item.id)"
    >
      <span class="d_ib td_u cur_p t_ovl1">{{ item.name }}</span>
      <i
        v-if="item.accountId"
        class="icon_personal cur_p"
        :title="item.name + '的个人主页'"
      ></i>
    </div>
  </div>
</template>

<script setup lang="ts">
import { artistType } from "../../types/types";
import { PropType, inject } from "vue";

const Props = defineProps({
  list: {
    type: Array as PropType<artistType[]>,
    required: true,
  },
});

// router跳转到歌手详情页
const goArtistDetail: ((path: string) => void) | undefined =
  inject("goArtistDetail");
</script>

<style lang="scss" scoped>
.item {
  width: 20%;
  height: 30px;
  span {
    max-width: calc(100% - 27px);
    font-size: 12px;
    margin-right: 2px;
  }
}
</style>
