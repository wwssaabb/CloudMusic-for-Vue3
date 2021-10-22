<!--
 * @Author: wwssaabb
 * @Date: 2021-10-20 08:55:44
 * @LastEditTime: 2021-10-22 10:04:13
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
      v-if="data.detail && data.detail.peopleCanSeeMyPlayRecord"
    ></SongRank>
    <DjList
      v-if="data.detail"
      :list="data.djRadios"
      :title="data.detail.profile.nickname + '创建的电台'"
    ></DjList>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { reqUserDetail, reqUserPlayRecord, reqUserDjRadio } from "../../api";
import {
  reqUserDetailType,
  PlayRecordType,
  DjRadioType,
} from "../../types/types";
import Head from "../../components/User/head.vue";
import SongRank from "../../components/User/songRank.vue";
import DjList from "../../components/User/djList.vue";

const router = useRouter();

//获取query Id参数
const id: string | undefined = router.currentRoute.value.query.id?.toString();

type dataType = {
  detail: reqUserDetailType | null;
  playRecordType: 0 | 1;
  playRecord: PlayRecordType[];
  djRadios: DjRadioType[];
  jRadiosIsEmpty: boolean;
};

const data = ref<dataType>({
  detail: null,
  playRecordType: 1,
  playRecord: [],
  djRadios: [],
  jRadiosIsEmpty: false,
});

const changeType = (type: 0 | 1) => {
  data.value.playRecordType = type;
};

const getUserDetail = async () => {
  if (!id) return;
  data.value.detail = await reqUserDetail(id);
};

const getUserDjRadio = async () => {
  if (!id) return;
  data.value.djRadios = await (await reqUserDjRadio(id)).djRadios;
  if (data.value.djRadios.length === 0) data.value.jRadiosIsEmpty = true;
};

const getPlayRecord = async () => {
  if (!id) return;
  data.value.playRecord = (
    await reqUserPlayRecord(id, data.value.playRecordType)
  )[data.value.playRecordType ? "weekData" : "allData"];
};

onMounted(() => {
  getUserDetail().then((res) => {
    if (!data.value.detail?.peopleCanSeeMyPlayRecord) return;
    getPlayRecord();
  });
  getUserDjRadio();
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
