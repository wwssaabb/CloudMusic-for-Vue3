<!--
 * @Author: wwssaabb
 * @Date: 2021-10-20 08:55:44
 * @LastEditTime: 2021-10-21 15:57:35
 * @FilePath: \CloudMusic-for-Vue3\src\views\User\Home.vue
-->
<template>
  <div class="user-home-page" v-loading="data.detail === null">
    <Head
      :detail="data.detail?.profile"
      :level="data.detail.level"
      v-if="data.detail"
    ></Head>
    <SongRank
      :list="data.playRecord.slice(0, 10)"
      :listenSongs="data.detail.listenSongs"
      :changeType="changeType"
      :chooseType="data.playRecordType"
      v-if="data.detail"
    ></SongRank>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { reqUserDetail, reqUserPlayRecord } from "../../api";
import { reqUserDetailType, PlayRecordType } from "../../types/types";
import Head from "../../components/User/head.vue";
import SongRank from "../../components/User/songRank.vue";

const router = useRouter();

//获取query Id参数
const id: string | undefined = router.currentRoute.value.query.id?.toString();

type dataType = {
  detail: reqUserDetailType | null;
  playRecordType: 0 | 1;
  playRecord: PlayRecordType[];
};

const data = ref<dataType>({
  detail: null,
  playRecordType: 1,
  playRecord: [],
});

const changeType = (type: 0 | 1) => {
  data.value.playRecordType = type;
};

const getUserDetail = async () => {
  if (!id) return;
  data.value.detail = await reqUserDetail(id);
};

const getPlayRecord = async () => {
  if (!id) return;
  data.value.playRecord = (
    await reqUserPlayRecord(id, data.value.playRecordType)
  )[data.value.playRecordType ? "weekData" : "allData"];
};

onMounted(() => {
  getUserDetail();
  getPlayRecord();
});

watch(() => data.value.playRecordType, getPlayRecord);

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
