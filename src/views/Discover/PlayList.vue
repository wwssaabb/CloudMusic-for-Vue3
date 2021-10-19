<!--
 * @Author: wwssaabb
 * @Date: 2021-09-18 14:19:39
 * @LastEditTime: 2021-09-29 16:54:31
 * @FilePath: \CloudMusic-for-Vue3\src\views\PlayList.vue
-->
<template>
  <div class="playlist-wrap" v-loading="pageInfo.isLoading">
    <Title title="全部">
      <template #right>
        <span class="icon_btn_hot">热门</span>
      </template>
    </Title>
    <AlbumList
      v-if="data !== undefined"
      :playLists="data?.playlists"
    ></AlbumList>
    <Pagination
      :currentPage="pageInfo.currentPage"
      :endPage="pageInfo.totalPage"
      :click="paginationHandle"
    ></Pagination>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, provide } from "vue";
import { useRouter } from "vue-router";
import Title from "../../components/Title.vue";
import AlbumList from "../../components/AlbumList.vue";
import Pagination from "../../components/Pagination.vue";
import { reqPlayListType, PaginationClickType } from "../../types/types";
import { reqPlayLists } from "../../api/";

const router = useRouter();
provide("router", router);

const data = ref<reqPlayListType>();
const pageInfo = ref({
  currentPage: 1,
  totalPage: 0,
  isLoading: false,
});

const paginationHandle = (type: PaginationClickType, page?: number): void => {
  const p = pageInfo.value.currentPage;
  const handle = {
    page: () =>
      type === "page" && page ? (pageInfo.value.currentPage = page) : null,
    prev: () => (pageInfo.value.currentPage = p === 1 || p === 2 ? 1 : p - 1),
    next: () =>
      (pageInfo.value.currentPage =
        p === pageInfo.value.totalPage || p + 1 === pageInfo.value.totalPage
          ? pageInfo.value.totalPage
          : p + 1),
  };
  handle[type]();
};

const getPlaylists = async (page: number = 1) => {
  pageInfo.value.isLoading = true;
  data.value = await reqPlayLists(page);
  pageInfo.value.totalPage = Math.ceil(
    data.value.total / 35 //limit 35
  );
  pageInfo.value.isLoading = false;
};

onMounted(async () => {
  getPlaylists();
});

watch(
  () => pageInfo.value.currentPage,
  () => {
    getPlaylists(pageInfo.value.currentPage).then(() =>
      document.querySelector(".page")?.scrollTo(0, 0)
    );
  }
);
</script>

<style lang="scss" scoped>
$--fixed_width: 982px;
.playlist-wrap {
  width: $--fixed_width;
  min-height: calc(100vh - 280px);
  padding: 40px;
  background: #fff;
  border-left: 1px solid #d3d3d3;
  border-right: 1px solid #d3d3d3;
}
</style>
