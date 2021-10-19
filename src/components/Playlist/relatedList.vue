<!--
 * @Author: wwssaabb
 * @Date: 2021-10-18 10:11:49
 * @LastEditTime: 2021-10-19 15:46:14
 * @FilePath: \CloudMusic-for-Vue3\src\components\Playlist\relatedList.vue
-->
<template>
  <div class="playlist-ralated">
    <div class="title">热门歌单</div>
    <div class="list">
      <div class="item fsc" v-for="item in list">
        <img
          :src="item.coverImgUrl + '?param=50y50'"
          alt=""
          @click="router.push('playlist?id=' + item.id)"
        />
        <div class="right fd_col t_ovl1">
          <span
            class="name d_ib t_ovl1 td_u"
            @click="router.push('playlist?id=' + item.id)"
            >{{ item.name }}</span
          >
          <span class="creator d_ib"
            >by
            <span
              class="nick-name td_u"
              @click="router.push('/user/home?id=' + item.creator.userId)"
              >{{ item.creator.nickname }}</span
            ></span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { useRouter } from "vue-router";
import { RelatedPlaylistType } from "../../types/types";

const router = useRouter();

const props = defineProps({
  list: {
    type: Array as PropType<RelatedPlaylistType[]>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.playlist-ralated {
  .title {
    line-height: 24px;
    height: 24px;
    font-size: 12px;
    color: #333;
    font-weight: bold;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
  }

  .list {
    margin-bottom: 25px;

    .item {
      margin-bottom: 15px;
      img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }

      .right {
        width: 140px;

        > span {
          width: 140px;
          font-size: 12px;
          color: #999;
          line-height: 25px;
          &.name {
            font-size: 14px;
            color: #000;
          }
          &.nick-name {
            color: #666;
          }
        }
      }
    }
  }
}
</style>
