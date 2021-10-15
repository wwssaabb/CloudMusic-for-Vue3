<!--
 * @Author: wwssaabb
 * @Date: 2021-10-14 17:41:41
 * @LastEditTime: 2021-10-15 16:15:11
 * @FilePath: \CloudMusic-for-Vue3\src\components\MvList.vue
-->
<template>
  <div class="mv-list fss fw" v-loading="list.length === 0">
    <div class="item" v-for="item in list" :key="item.id">
      <div class="cover pr" @click="goMvPage(item.id)">
        <img :src="item.imgurl + '?param=137y103'" alt="" />
        <i class="icon_mv_cover_mask pa"></i>
        <i class="icon_mv_play_bg pa">
          <i class="icon_mv_play d_ib"></i>
        </i>
      </div>
      <div class="name t_ovl1" @click="goMvPage(item.id)">
        <span class="td_u">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { useRouter } from "vue-router";
import { MvType } from "../types/types";

const router = useRouter();

const goMvPage = (id: number) => router.push("/mv?id=" + id);

const props = defineProps({
  list: {
    type: Array as PropType<MvType[]>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.mv-list {
  height: 456px;
  margin: 20px 0 40px;
  overflow: hidden;

  .item {
    width: 137px;

    margin-bottom: 30px;

    &:not(:nth-child(4n + 1)) {
      margin-left: 29px;
    }

    .cover {
      width: 137px;
      height: 103px;

      img {
        width: 137px;
        height: 103px;
      }

      .icon_mv_cover_mask {
        top: 0;
        left: 0;
      }
      .icon_mv_play_bg {
        left: 46.5px;
        top: 29.5px;
        z-index: 10;
        .icon_mv_play {
          width: 44px;
          height: 44px;
        }
      }

      &:hover {
        .icon_mv_play {
          background: url("https://music.163.com/style/web2/img/ie6/icn_ply5.png?c1b59eaddf82e841ede47541fe1876d0");
        }
      }
    }

    .name {
      width: 137px;
      margin: 8px 0 3px;
    }
  }
}
</style>
