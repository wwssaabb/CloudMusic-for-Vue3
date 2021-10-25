<!--
 * @Author: wwssaabb
 * @Date: 2021-10-20 08:56:12
 * @LastEditTime: 2021-10-25 17:22:09
 * @FilePath: \CloudMusic-for-Vue3\src\views\User\Follows.vue
-->
<template>
  <div class="user-follows-page">
    <Title :title="'关注（' + total + '）'"></Title>
    <List :list="data.list"></List>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { UserFollowType } from "../../types/types";
import { reqUserFollows } from "../../api";
import Title from "../../components/Title.vue";
import List from "../../components/User/Follows/list.vue";

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

const getUserFollows = async () => {
  if (!id) return;
  let res = await reqUserFollows(id, data.value.currentPage);
  console.log(res);
  data.value.list = res.follow;
};

onMounted(() => {
  if (total) data.value.endPage = Math.ceil(parseInt(total) / 20);
  getUserFollows();
});

console.log(data.value);
</script>

<style lang="scss" scoped>
.user-follows-page {
}
</style>
