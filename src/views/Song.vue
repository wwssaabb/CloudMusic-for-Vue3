<!--
 * @Author: wwssaabb
 * @Date: 2021-10-09 11:38:04
 * @LastEditTime: 2021-10-09 17:51:16
 * @FilePath: \CloudMusic-for-Vue3\src\views\Song.vue
-->
<template>
  <div class="song-page fss">
    <div class="left d_ib">
      <Detail :data="data.detail" :lyric="data.lyric"></Detail>
    </div>
    <div class="right d_ib"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { reqSongDetail, reqSongLyric } from "../api";
import { SongType } from "../types/types";
import { useRouter } from "vue-router";
import Detail from "../components/Song/detail.vue";

//获取hash路由的query里的id
const id: string | undefined =
  useRouter().currentRoute.value.query.id?.toString();

type DataType = {
  detail: SongType | undefined;
  lyric: string | undefined;
};
const data = ref<DataType>({
  detail: undefined,
  lyric: undefined,
});

const getDetail = async () => {
  if (!id) return;
  data.value.detail = (await reqSongDetail(parseInt(id))).songs[0];
  console.log(data.value);
};
const getLyric = async () => {
  if (!id) return;
  data.value.lyric = (await reqSongLyric(parseInt(id))).lrc.lyric;
};
onMounted(() => {
  //获取歌曲详情
  getDetail();
  //获取歌词
  getLyric();
});
</script>

<style lang="scss" scoped>
$min_height: 655px;
.song-page {
  width: 982px;
  background: #fff;
  border-left: 1px solid #d3d3d3;
  border-right: 1px solid #d3d3d3;

  .left {
    width: 709px;
    border-right: 1px solid #d3d3d3;
  }

  .right {
    width: 270px;
  }
}
</style>
