<!--
 * @Author: wwssaabb
 * @Date: 2021-10-20 08:55:44
 * @LastEditTime: 2021-10-20 16:48:46
 * @FilePath: \CloudMusic-for-Vue3\src\views\User\Home.vue
-->
<template>
  <div class="user-home-page" v-loading="data.detail === null">
    <Head
      :detail="data.detail?.profile"
      :level="data.detail.level"
      v-if="data.detail"
    ></Head>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { reqUserDetail } from "../../api";
import { reqUserDetailType } from "../../types/types";
import Head from "../../components/User/head.vue";

const router = useRouter();

//获取query Id参数
const id: string | undefined = router.currentRoute.value.query.id?.toString();

type dataType = {
  detail: reqUserDetailType | null;
};

const data = ref<dataType>({
  detail: null,
});

const getUserDetail = async () => {
  if (!id) return;
  data.value.detail = await reqUserDetail(id);
};

onMounted(() => {
  getUserDetail();
});

console.log(data.value);
</script>

<style lang="scss" scoped>
.user-home-page {
  width: 982px;
  min-height: 659px;
  border-left: 1px solid #d3d3d3;
  border-right: 1px solid #d3d3d3;
  background: #fff;
  overflow: hidden;
  padding: 40px;
}
</style>
