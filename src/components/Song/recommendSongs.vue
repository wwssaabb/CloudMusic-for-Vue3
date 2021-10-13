<!--
 * @Author: wwssaabb
 * @Date: 2021-10-13 08:11:59
 * @LastEditTime: 2021-10-13 10:45:20
 * @FilePath: \CloudMusic-for-Vue3\src\components\Song\recommendSongs.vue
-->
<template>
  <div class="recommend-songs" v-loading="list.length === 0">
    <div class="item fpbc" v-for="item in list" :key="item.id">
      <div class="left fd_col">
        <span
          class="name d_ib t_ovl1 td_u"
          @click="router.push('/song?id=' + item.id)"
          >{{ item.name }}</span
        >
        <span class="artists d_ib t_ovl1" v-html="getArtistsHtml(item)"></span>
      </div>
      <div class="right fpbc">
        <i class="icon_song_play"></i>
        <i class="icon_song_add"></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SongType } from "../../types/types";
import { PropType } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
console.log(router);
router.beforeEach((to, from, next) => {
  const isSongPage = to.path === from.path && to.path === "/song";
  const idIsSame = to.query.id === from.query.id;
  next();
  //解决同路由不同参数时页面不加载问题
  if (!idIsSame && isSongPage) {
    setTimeout(() => location.reload(), 0);
  }
});

const props = defineProps({
  list: {
    type: Array as PropType<SongType[]>,
    required: true,
  },
});

const getArtistsHtml = (item: SongType): string => {
  const l = item.artists.length;
  return item.artists.reduce(
    (p, c, index) =>
      l === 1
        ? `<span class="td_u cur_p" style="font-size:12px;">${c.name}</span>`
        : index === 0
        ? p +
          `<span class="td_u cur_p" style="font-size:12px;">${c.name}</span>`
        : p +
          " / " +
          `<span class="td_u cur_p" style="font-size:12px;">${c.name}</span>`,
    ""
  );
};
</script>

<style lang="scss" scoped>
.recommend-songs {
  .item {
    height: 32px;
    margin-top: 10px;

    * {
      cursor: pointer;
    }
    .left {
      width: 156px;
      .name,
      .artists {
        width: 156px;
        font-size: 12px;
        line-height: 16px;
        color: #999;
      }

      span.name {
        color: #333;
      }
    }

    .right {
      width: 34px;

      .icon_song_play,
      .icon_song_add {
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
}
</style>
