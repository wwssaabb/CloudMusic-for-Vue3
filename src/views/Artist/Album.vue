<!--
 * @Author: wwssaabb
 * @Date: 2021-10-14 08:24:51
 * @LastEditTime: 2021-10-14 17:31:50
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
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { reqArtistAlbums } from "../../api";
import { AlbumType, PaginationClickType } from "../../types/types";
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
  data.value.endPage = Math.ceil(res.artist.albumSize / 12); //limit 12
};

onMounted(() => {
  //获取专辑列表
  getAlbums();
});

const changePage = (type: PaginationClickType, page?: number): void => {
  const p = data.value.currentPage;
  const handle = {
    page: () =>
      type === "page" && page ? (data.value.currentPage = page) : null,
    prev: () => (data.value.currentPage = p === 1 || p === 2 ? 1 : p - 1),
    next: () =>
      (data.value.currentPage =
        p === data.value.totalPage || p + 1 === data.value.totalPage
          ? data.value.totalPage
          : p + 1),
  };
  handle[type]();
};
watch(
  () => data.value.currentPage,
  () => {
    console.log(data.value.currentPage);
    data.value.list = [];
    getAlbums();
  },
  {
    deep: true,
  }
);
console.log(data.value);
</script>

<style lang="scss" scoped></style>
