<!--
 * @Author: wwssaabb
 * @Date: 2021-10-20 08:56:36
 * @LastEditTime: 2021-10-26 09:06:17
 * @FilePath: \CloudMusic-for-Vue3\src\views\User\Fans.vue
-->
<template>
  <div class="user-fans-page">
    <Title>
      <template #title>
        <span class="title">
          {{ "粉丝（" + total + "）" }}
        </span>
      </template>
    </Title>
    <List :list="data.list"></List>
    <Pagination
      :currentPage="data.currentPage"
      :endPage="data.endPage"
      :click="changePage"
      v-if="data.list.length !== 0"
    ></Pagination>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { UserFollowType, PaginationClickType } from "../../types/types";
import { reqUserFolloweds } from "../../api";
import Title from "../../components/Title.vue";
import List from "../../components/User/Follows/list.vue";
import Pagination from "../../components/Pagination.vue";

const router = useRouter();

//获取id参数
const id: undefined | string = router.currentRoute.value.query.id?.toString();
const total: undefined | string =
  router.currentRoute.value.query.total?.toString();

type dataType = {
  list: UserFollowType[];
  currentPage: number;
  endPage: number;
};

const data = ref<dataType>({
  list: [],
  currentPage: 1,
  endPage: 0,
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

const getUserFolloweds = async () => {
  if (!id) return;
  data.value.list = [];
  data.value.list = (
    await reqUserFolloweds(id, data.value.currentPage)
  ).followeds;
};

onMounted(() => {
  if (total) data.value.endPage = Math.ceil(parseInt(total) / 20);
  getUserFolloweds();
});

watch(() => data.value.currentPage, getUserFolloweds);

console.log(data.value);
</script>

<style lang="scss" scoped>
.user-fans-page {
  .title {
    font-size: 20px;
    line-height: 26px;
    color: #666;
  }
  .pagination-wrap {
    margin: 20px 0;
  }
}
</style>
