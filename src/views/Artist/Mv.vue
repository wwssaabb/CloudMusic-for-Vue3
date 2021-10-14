<template>
  <div>我是mv</div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { reqArtistMvs } from "../../api";
import { MvType, PaginationClickType } from "../../types/types";

//获取query id参数
const id: string | undefined =
  useRouter().currentRoute.value.query.id?.toString();

type dataType = {
  list: MvType[];
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

const getMvs = async () => {
  if (!id) return;
  let res = await reqArtistMvs(id, data.value.currentPage);
  data.value.list = res.mvs;
  data.value.totalPage = res.artist.mvSize;
  data.value.endPage = Math.ceil(res.artist.albumSize / 12); //limit 12
};

onMounted(() => {
  //获取mv列表
  getMvs();
});
</script>

<style lang="scss" scoped></style>
