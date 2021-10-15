<!--
 * @Author: wwssaabb
 * @Date: 2021-10-14 08:24:51
 * @LastEditTime: 2021-10-15 14:11:06
 * @FilePath: \CloudMusic-for-Vue3\src\views\Artist\Mv.vue
-->
<template>
  <div class="mv-list-page">
    <MvList :list="data.list"></MvList>
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
import { reqArtistMvs } from "../../api";
import { MvType, PaginationClickType } from "../../types/types";
import MvList from "../../components/MvList.vue";
import Pagination from "../../components/Pagination.vue";

//获取query id参数
const router = useRouter();
const id: string | undefined = router.currentRoute.value.query.id?.toString();
const total: string | undefined =
  router.currentRoute.value.query.total?.toString();

type dataType = {
  list: MvType[];
  currentPage: number;
  totalPage: string | undefined;
  endPage: number;
};

const data = ref<dataType>({
  list: [],
  currentPage: 1,
  totalPage: total,
  endPage: 0,
});

const getMvs = async () => {
  if (!id) return;
  data.value.list = [];
  data.value.list = (await reqArtistMvs(id, data.value.currentPage)).mvs;
  console.log(data.value);
};

onMounted(() => {
  if (total) {
    data.value.endPage = Math.ceil(parseInt(total) / 12); //limit 12
  }

  //获取mv列表
  getMvs();
});

const changePage = (type: PaginationClickType, page?: number): void => {
  const p = data.value.currentPage;
  const end = data.value.endPage;
  const handle = {
    page: () =>
      type === "page" && page ? (data.value.currentPage = page) : null,
    prev: () => (data.value.currentPage = p === 1 || p === 2 ? 1 : p - 1),
    next: () =>
      (data.value.currentPage = p === end || p + 1 === end ? end : p + 1),
  };
  handle[type]();
};

watch(
  () => data.value.currentPage,
  () => getMvs()
);
</script>

<style lang="scss" scoped></style>
