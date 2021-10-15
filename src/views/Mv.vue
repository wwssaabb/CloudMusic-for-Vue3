<!--
 * @Author: wwssaabb
 * @Date: 2021-10-15 15:43:45
 * @LastEditTime: 2021-10-15 17:16:36
 * @FilePath: \CloudMusic-for-Vue3\src\views\Mv.vue
-->
<template>
  <div class="mv-page">
    <div class="left">
      <MvPlay
        :mvName="data.detail.name"
        :artist-name="data.detail.artistName"
        :cover="data.detail.cover"
        :mvUrl="data.mvUrlData.url"
        v-if="data.detail && data.mvUrlData"
      ></MvPlay>
    </div>
    <div class="right"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { reqMvDetail, reqMvUrl, reqSimiMvs } from "../api";
import { MvDetailType, mvUrlDataType } from "../types/types";
import MvPlay from "../components/Mv/mvPlay.vue";

const router = useRouter();
const id: string | undefined = router.currentRoute.value.query.id?.toString();

type dataType = {
  detail: MvDetailType | null;
  simiMvs: MvDetailType[];
  mvUrlData: mvUrlDataType | null;
};

const data = ref<dataType>({
  detail: null,
  simiMvs: [],
  mvUrlData: null,
});

const getMvDetail = async () => {
  //获取mv 详情
  if (!id) return;
  data.value.detail = (await reqMvDetail(id)).data;
};
const getMvUrl = async () => {
  //获取mv 播放地址
  if (!id) return;
  data.value.mvUrlData = (await reqMvUrl(id)).data;
};
const getSimiMvs = async () => {
  //获取相似mv 详情
  if (!id) return;
  data.value.simiMvs = (await reqSimiMvs(id)).mvs;
};

onMounted(() => {
  getMvDetail();
  getMvUrl();
  getSimiMvs();
});
console.log(data.value);
</script>

<style lang="scss" scoped>
.mv-page {
  width: 982px;
  min-height: 659px;
  border-left: 1px solid #d3d3d3;
  border-right: 1px solid #d3d3d3;
  background: #fff;

  .left {
    width: 709px;
    min-height: 659px;
    border-right: 1px solid #d3d3d3;
    padding: 25px 30px 40px 39px;
  }
  .right {
    width: 270px;
  }
}
</style>
