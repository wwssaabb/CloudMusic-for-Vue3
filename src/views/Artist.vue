<!--
 * @Author: wwssaabb
 * @Date: 2021-10-12 11:04:23
 * @LastEditTime: 2021-10-13 17:57:52
 * @FilePath: \CloudMusic-for-Vue3\src\views\Artist.vue
-->
<template>
  <div class="artist-page fss">
    <div class="left">
      <ArtistDetail :detail="data.detail"></ArtistDetail>
      <DetailNavbar></DetailNavbar>
    </div>
    <div class="right">
      <SimiArtists :list="data.simiArtists.slice(0, 6)"></SimiArtists>
      <AppDownload />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { reqSimiArtists, reqArtistDetail } from "../api";
import { ArtistType, ArtistDetailType } from "../types/types";
import SimiArtists from "../components/Artist/simiArtists.vue";
import ArtistDetail from "../components/Artist/artistDetail.vue";
import DetailNavbar from "../components/Artist/detailNavbar.vue";
import AppDownload from "../components/AppDownload.vue";

//获取页面 query参数 id
const id: string | undefined =
  useRouter().currentRoute.value.query.id?.toString();
console.log(id);

type DataType = {
  simiArtists: ArtistType[];
  detail: ArtistDetailType;
};

const data = ref<DataType>({
  simiArtists: [],
  detail: null,
});

const getSimiArtists = async () => {
  if (!id) return;
  data.value.simiArtists = (await reqSimiArtists(id)).artists;
};

const getArtistDetail = async () => {
  if (!id) return;
  data.value.detail = (await reqArtistDetail(id)).data;
};

//组件挂载
onMounted(() => {
  //获取相似歌手
  getSimiArtists();
  //获取歌手详情
  getArtistDetail();
});

console.log(data.value);
</script>

<style lang="scss" scoped>
.artist-page {
  width: 982px;
  background: #fff;
  border-left: 1px solid #d3d3d3;
  border-right: 1px solid #d3d3d3;

  .left {
    width: 709px;
    border-right: 1px solid #d3d3d3;
    padding-bottom: 40px;
    min-height: 659px;
    padding: 25px 30px 40px 30px;
  }

  .right {
    width: 270px;
    padding: 20px 40px 30px 30px;
  }
}
</style>
