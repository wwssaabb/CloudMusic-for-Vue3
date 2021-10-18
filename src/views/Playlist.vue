<!--
 * @Author: wwssaabb
 * @Date: 2021-10-18 10:02:11
 * @LastEditTime: 2021-10-18 17:20:42
 * @FilePath: \CloudMusic-for-Vue3\src\views\Playlist.vue
-->
<template>
  <div class="playlist-page fss">
    <div class="left f_nosg">
      <div class="head-wrap" v-loading="data.detail === null">
        <Head :detail="data.detail" v-if="data.detail"></Head>
      </div>
    </div>
    <div class="right f_nosg">
      <Likers v-if="data.detail" :list="data.detail.subscribers"></Likers>
      <relatedList :list="data.relatedList"></relatedList>
      <AppDownload></AppDownload>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { PlaylistDetailType, RelatedPlaylistType } from "../types/types";
import { reqPlaylistDetail, reqPlaylistRelatedList } from "../api";
import Head from "../components/Playlist/head.vue";
import Likers from "../components/Playlist/likers.vue";
import RelatedList from "../components/Playlist/relatedList.vue";
import AppDownload from "../components/AppDownload.vue";

const router = useRouter();

//获取query id 参数
const id: string | undefined = router.currentRoute.value.query.id?.toString();

type dataType = {
  detail: PlaylistDetailType | null;
  relatedList: RelatedPlaylistType[];
};

const data = ref<dataType>({
  detail: null,
  relatedList: [],
});

const getDetail = async () => {
  if (!id) return;
  data.value.detail = (await reqPlaylistDetail(id)).playlist;
};

const getRelatedList = async () => {
  if (!id) return;
  data.value.relatedList = (await reqPlaylistRelatedList(id)).playlists;
};

onMounted(() => {
  getDetail();
  getRelatedList();
});

console.log(data.value);
</script>

<style lang="scss" scoped>
.playlist-page {
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

    .head-wrap {
      height: 250px;
      margin-bottom: 27px;
    }
  }

  .right {
    width: 270px;
    padding: 20px 40px 40px 30px;
  }
}
</style>
