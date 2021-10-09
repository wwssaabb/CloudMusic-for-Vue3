<!--
 * @Author: wwssaabb
 * @Date: 2021-10-09 10:04:26
 * @LastEditTime: 2021-10-09 11:28:59
 * @FilePath: \CloudMusic-for-Vue3\src\components\Album\allAlbums.vue
-->
<template>
  <div class="album-all-list">
    <Title title="全部新碟">
      <template #center>
        <span
          class="album-category td_u cur_p"
          v-for="item in categories"
          :key="item.id"
          @click="chooseArea = item.id"
          >{{ item.label }}</span
        >
      </template>
    </Title>
    <AlbumCoverList :list="list"></AlbumCoverList>
    <Pagination
      :endPage="endPage"
      :currentPage="currentPage"
      :click="changePage"
    ></Pagination>
  </div>
</template>

<script setup lang="ts">
import Title from "../Title.vue";
import AlbumCoverList from "../AlbumCoverList.vue";
import Pagination from "../Pagination.vue";
import {
  AlbumType,
  PaginationClickType,
  albumAreaType,
} from "../../types/types";
import { ref, onMounted, watch } from "vue";
import { reqAllAlbums } from "../../api";

const categories: { id: albumAreaType; label: string }[] = [
  {
    id: "ALL",
    label: "全部",
  },
  {
    id: "ZH",
    label: "华语",
  },
  {
    id: "EA",
    label: "欧美",
  },
  {
    id: "KR",
    label: "韩国",
  },
  {
    id: "JP",
    label: "日本",
  },
];
const chooseArea = ref<albumAreaType>("ALL");
const total = ref(0);
const endPage = ref(0);
const currentPage = ref(1);
const list = ref<AlbumType[]>([]);

//获取全部新碟方法,limit=35
const getAllAlbums = async () => {
  let res = await reqAllAlbums(chooseArea.value, currentPage.value);
  list.value = res.albums;
  total.value = res.total;
  endPage.value = Math.ceil(res.total / 35);
};

//
const changePage = (type: PaginationClickType, page?: number): void => {
  let p = currentPage.value;
  const handle = {
    page: () => (type === "page" && page ? (currentPage.value = page) : null),
    prev: () => (currentPage.value = p === 1 || p === 2 ? 1 : p - 1),
    next: () => (currentPage.value = p === p || p + 1 === p ? p : p + 1),
  };
  handle[type]();
};

onMounted(() => getAllAlbums());
watch([() => chooseArea.value, () => currentPage.value], (newVal, oldVal) => {
  //区域改变时page应为1
  if (newVal[0] !== oldVal[0]) currentPage.value = 1;
  list.value = [];
  getAllAlbums();
});
</script>

<style lang="scss" scoped>
.album-all-list {
  .album-category {
    font-size: 12px;
    color: #666;
    padding-right: 15px;

    &:first-child {
      margin-left: 20px;
    }

    &:not(:first-child) {
      padding-left: 15px;
      border-left: 2px solid #d3d3d3;
    }
  }
}
</style>
