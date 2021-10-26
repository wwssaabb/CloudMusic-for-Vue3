<!--
 * @Author: wwssaabb
 * @Date: 2021-10-20 08:55:44
 * @LastEditTime: 2021-10-26 09:57:37
 * @FilePath: \CloudMusic-for-Vue3\src\views\User\Home.vue
-->
<template>
  <div class="user-home-page" v-loading="data.detail === null">
    <Head
      :detail="data.detail?.profile"
      :level="data.detail.level"
      v-if="data.detail"
    ></Head>
    <template v-if="data.isHome">
      <DjList
        v-if="data.detail && !data.jRadiosIsEmpty"
        :list="data.djRadios"
        :title="data.detail.profile.nickname + '创建的电台'"
      ></DjList>
      <SongRank
        :list="data.playRecord.slice(0, 10)"
        :listenSongs="data.detail.listenSongs"
        :changeType="changeType"
        :chooseType="data.playRecordType"
        v-if="data.detail && data.detail.peopleCanSeeMyPlayRecord"
      ></SongRank>
      <Playlist
        v-if="data.detail && !data.playlist.isEmpty"
        :title="
          data.detail.profile.nickname +
          '创建的歌单®（' +
          data.detail.profile.playlistCount +
          '）'
        "
        :list="data.playlist.list"
      ></Playlist>
    </template>
    <RouterView v-else></RouterView>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from "vue";
import { useRouter, RouterView } from "vue-router";
import {
  reqUserDetail,
  reqUserPlayRecord,
  reqUserDjRadio,
  reqUserPlaylist,
} from "../../api";
import {
  reqUserDetailType,
  PlayRecordType,
  DjRadioType,
  playListType,
} from "../../types/types";
import Head from "../../components/User/head.vue";
import SongRank from "../../components/User/songRank.vue";
import DjList from "../../components/User/djList.vue";
import Playlist from "../../components/User/playlist.vue";

const router = useRouter();

//获取query Id参数
const id: string | undefined = router.currentRoute.value.query.id?.toString();

type dataType = {
  detail: reqUserDetailType | null;
  playRecordType: 0 | 1;
  playRecord: PlayRecordType[];
  djRadios: DjRadioType[];
  jRadiosIsEmpty: boolean;
  playlist: {
    currentPage: number;
    more: boolean;
    list: playListType[];
    isEmpty: boolean;
  };
  isHome: boolean;
};

const data = ref<dataType>({
  detail: null,
  playRecordType: 1,
  playRecord: [],
  djRadios: [],
  jRadiosIsEmpty: false,
  playlist: {
    currentPage: 1,
    more: false,
    list: [],
    isEmpty: false,
  },
  isHome: true,
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

const getUserPlaylist = async () => {
  if (!id) return;
  let res = await reqUserPlaylist(id, data.value.playlist.currentPage, 19);
  data.value.playlist.list = res.playlist;
  data.value.playlist.more = res.more;
  if (data.value.playlist.currentPage === 1 && res.playlist.length === 0)
    data.value.playlist.isEmpty = true;
};

const getPlayRecord = async () => {
  if (!id) return;
  data.value.playRecord = (
    await reqUserPlayRecord(id, data.value.playRecordType)
  )[data.value.playRecordType ? "weekData" : "allData"];
};

const checkIsHome = () => {
  nextTick(() => {
    console.log(router.currentRoute.value.path);
    data.value.isHome = router.currentRoute.value.path === "/user/home";
    console.log(data.value.isHome);
  });
};

onMounted(() => {
  checkIsHome();
  getUserDetail().then((res) => {
    if (!data.value.detail?.peopleCanSeeMyPlayRecord) return;
    getPlayRecord();
  });
  getUserDjRadio();
  getUserPlaylist();
});

watch(() => data.value.playRecordType, getPlayRecord);

router.beforeEach((to,form,next)=>{
  console.log(to.path)
  data.value.isHome=to.path=== "/user/home"
  next()
})

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
  padding: 40px 40px 0;

  .user-dj-list {
    margin-bottom: 24px;
  }
}
</style>
