<!--
 * @Author: wwssaabb
 * @Date: 2021-10-14 08:24:51
 * @LastEditTime: 2021-10-14 15:07:53
 * @FilePath: \CloudMusic-for-Vue3\src\views\Artist\Album.vue
-->
<template>
  <div>
    <AlbumCoverList
      :list="data.list"
      :size="120"
      :lineSize="4"
    ></AlbumCoverList>
    <Pagination
      :endPage="data.endPage"
      :currentPage="data.currentPage"
      :click="changePage"
    ></Pagination>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { reqArtistAlbums } from "../../api";
import { AlbumType } from "../../types/types";
import AlbumCoverList from "../../components/AlbumCoverList.vue";
import Pagination from "../../components/Pagination.vue";

//获取query id参数
const id: string | undefined =
  useRouter().currentRoute.value.query.id?.toString();

type dataType = {
  list: AlbumType[];
  currentPage: number;
  totalPage: number;
  endPage: number;
};

const data = ref<dataType>({
  list: [],
  currentPage: 1,
  totalPage: 0,
  endPage: 0,
});

const getAlbums = async () => {
  if (!id) return;
  let res = await reqArtistAlbums(id, data.value.currentPage);
  data.value.list = res.hotAlbums;
  data.value.totalPage = res.artist.mvSize;
  data.value.endPage = Math.ceil(res.artist.albumSize / data.value.list.length);
};

onMounted(() => {
  //获取专辑列表
  getAlbums();
});

const changePage = () => {};
</script>

<style lang="scss" scoped></style>
