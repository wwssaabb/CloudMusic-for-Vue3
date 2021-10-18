<!--
 * @Author: wwssaabb
 * @Date: 2021-10-18 10:02:11
 * @LastEditTime: 2021-10-18 17:59:20
 * @FilePath: \CloudMusic-for-Vue3\src\views\Playlist.vue
-->
<template>
  <div class="playlist-page fss">
    <div class="left f_nosg">
      <div class="head-wrap" v-loading="data.detail === null">
        <Head :detail="data.detail" v-if="data.detail"></Head>
      </div>
      <SongList
        :list="data.detail.tracks"
        v-if="data.detail"
        :specialTop="0"
      ></SongList>
      <Combination
        v-if="data.detail"
        :commentContent="data.comment"
        :commentCount="data.detail.commentCount"
        :hotComments="data.hotComments"
        :comments="data.comments"
        :endPage="data.endPage"
        :currentPage="data.currentPage"
        :changePage="changePage"
      ></Combination>
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
import {
  PlaylistDetailType,
  RelatedPlaylistType,
  CommentType,
} from "../types/types";
import {
  reqPlaylistDetail,
  reqPlaylistRelatedList,
  reqPlaylistComments,
} from "../api";
import Head from "../components/Playlist/head.vue";
import SongList from "../components/SongList.vue";
import Likers from "../components/Playlist/likers.vue";
import RelatedList from "../components/Playlist/relatedList.vue";
import AppDownload from "../components/AppDownload.vue";
import Combination from "../components/Combination.vue";

const router = useRouter();

//获取query id 参数
const id: string | undefined = router.currentRoute.value.query.id?.toString();

type dataType = {
  detail: PlaylistDetailType | null;
  relatedList: RelatedPlaylistType[];
  hotComments: CommentType[];
  comments: CommentType[];
  currentPage: number;
  endPage: number;
  comment: string;
};

const data = ref<dataType>({
  detail: null,
  relatedList: [],
  hotComments: [],
  comments: [],
  currentPage: 1,
  endPage: 0,
  comment: "",
});

const changePage = () => {};

const getDetail = async () => {
  if (!id) return;
  data.value.detail = (await reqPlaylistDetail(id)).playlist;
};

const getRelatedList = async () => {
  if (!id) return;
  data.value.relatedList = (await reqPlaylistRelatedList(id)).playlists;
};

const getComments = async () => {
  if (!id) return;
  let res = await reqPlaylistComments(id, data.value.currentPage); //limit 20
  data.value.hotComments = res.hotComments;
  data.value.comments = res.comments;
  data.value.endPage = Math.ceil(res.total / 20);
};

onMounted(() => {
  getDetail();
  getRelatedList();
  getComments();
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
  overflow: hidden;

  .left {
    width: 709px;
    min-height: 659px;
    border-right: 1px solid #d3d3d3;
    padding: 25px 30px 40px 39px;

    .head-wrap {
      height: 250px;
      margin-bottom: 27px;
    }

    .combination {
      margin-top: 40px;
    }
  }

  .right {
    width: 270px;
    padding: 20px 40px 40px 30px;
  }
}
</style>
