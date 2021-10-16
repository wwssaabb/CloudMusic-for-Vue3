<!--
 * @Author: wwssaabb
 * @Date: 2021-10-13 15:39:52
 * @LastEditTime: 2021-10-16 17:31:21
 * @FilePath: \CloudMusic-for-Vue3\src\components\Artist\simiArtists.vue
-->
<template>
  <div class="simi-artists">
    <div class="title">相似歌手</div>
    <div class="list fss fw" v-loading="list.length === 0">
      <div
        class="item fd_col"
        v-for="item in list"
        :key="item.id"
        @click="goArtistPage(item.id)"
      >
        <img :src="item.picUrl + '?param=50y50'" alt="" />
        <div class="name t_ovl1">
          <span class="td_u cur_p">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArtistType } from "../../types/types";
import { PropType, inject } from "vue";
import { Router } from "vue-router/dist/vue-router";

const props = defineProps({
  list: {
    type: Array as PropType<ArtistType[]>,
    required: true,
  },
});

const push = inject<Router>("router")?.push;
const goArtistPage = (id: number) => {
  push?.("/artist?id=" + id);
  setTimeout(() => location.reload(), 0);
};
</script>

<style lang="scss" scoped>
.simi-artists {
  margin-bottom: 20px;
  .title {
    line-height: 23px;
    font-size: 12px;
    color: #333;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    font-weight: bold;
  }

  .list {
    height: 184px;
    overflow: hidden;
    .item {
      height: 92px;
      img {
        width: 50px;
        height: 50px;
      }
      .name {
        width: 50px;
        margin-top: 7px;
        text-align: center;
        span {
          font-size: 12px;
          color: #333;
        }
      }
      &:not(:nth-child(3n + 1)) {
        margin-left: 25px;
      }
    }
  }
}
</style>
