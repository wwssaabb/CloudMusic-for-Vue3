<!--
 * @Author: wwssaabb
 * @Date: 2021-10-12 11:17:28
 * @LastEditTime: 2021-10-13 15:35:47
 * @FilePath: \CloudMusic-for-Vue3\src\components\Song\recommendAlbums.vue
-->
<template>
  <div class="recommend-albums" v-loading="list.length === 0">
    <div class="item fsc" v-for="item in list" :key="item.id">
      <img :src="item.coverImgUrl + '?param=50y50'" alt="" />
      <div class="msg">
        <div class="name td_u t_ovl1">{{ item.name }}</div>
        <div class="creator t_ovl1">
          by <span class="td_u">{{ item.creator.nickname }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, onMounted } from "vue";
import { playListType } from "../../types/types";

const props = defineProps({
  list: {
    type: Array as PropType<playListType[]>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.recommend-albums {
  margin-bottom: 25px;
  min-height: 65px;
  .item {
    margin-bottom: 15px;

    img {
      width: 50px;
      height: 50px;
      margin-right: 10px;
    }

    .msg {
      .name {
        width: 140px;
        line-height: 25px;
      }

      .creator {
        width: 140px;
        font-size: 12px;
        color: #999;
        line-height: 25px;
        span {
          font-size: 12px;
          color: #666;
          line-height: 25px;
        }
      }
    }
  }
}
</style>
