<!--
 * @Author: wwssaabb
 * @Date: 2021-10-09 11:38:04
 * @LastEditTime: 2021-10-12 11:00:31
 * @FilePath: \CloudMusic-for-Vue3\src\views\Song.vue
-->
<template>
  <div class="song-page fss">
    <div class="left d_ib">
      <Detail
        :data="data.detail"
        :lyric="data.lyric"
        :commentCount="data.total"
      ></Detail>
      <div class="comments">
        <CommentHead
          :commentCount="data.total"
          :commentContent="data.comment"
        ></CommentHead>
        <div class="title-hot-comments" v-if="data.hotComments?.length !== 0">
          精彩评论
        </div>
        <CommentList
          :comments="data.hotComments"
          :showBeReplied="false"
          v-if="data.hotComments?.length !== 0"
        ></CommentList>
        <div class="title-new-comments">最新评论({{ data.total }})</div>
        <CommentList :comments="data.newComments"></CommentList>
        <Pagination
          :endPage="data.endPage"
          :currentPage="data.currentPage"
          :click="pageChange"
        ></Pagination>
      </div>
    </div>
    <div class="right d_ib"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { reqSongDetail, reqSongLyric, reqSongComments } from "../api";
import { SongType, CommentType, PaginationClickType } from "../types/types";
import { useRouter } from "vue-router";
import Detail from "../components/Song/detail.vue";
import CommentHead from "../components/CommentHead.vue";
import CommentList from "../components/CommentList.vue";
import Pagination from "../components/Pagination.vue";

//获取hash路由的query里的id
const id: string | undefined =
  useRouter().currentRoute.value.query.id?.toString();

type DataType = {
  detail: SongType | undefined;
  lyric: string | undefined;
  hotComments: CommentType[];
  newComments: CommentType[];
  total: number;
  currentPage: number;
  endPage: number;
  comment: string;
};
const data = ref<DataType>({
  detail: undefined,
  lyric: undefined,
  hotComments: [],
  newComments: [],
  total: 0,
  currentPage: 1,
  endPage: 1,
  comment: "",
});

const getDetail = async () => {
  if (!id) return;
  data.value.detail = (await reqSongDetail(parseInt(id))).songs[0];
  console.log(data.value);
};
const getLyric = async () => {
  if (!id) return;
  data.value.lyric = (await reqSongLyric(parseInt(id))).lrc.lyric;
};
const getSongComments = async (page: number = 1) => {
  if (!id) return;
  data.value.newComments = [];
  let res = await reqSongComments(parseInt(id), page);
  if (data.value.hotComments.length === 0)
    data.value.hotComments = res.hotComments;
  data.value.newComments = res.comments;
  data.value.total = res.total;
  data.value.endPage = Math.ceil(data.value.total / res.comments.length);
};
onMounted(() => {
  //获取歌曲详情
  getDetail();
  //获取歌词
  getLyric();
  //获取歌曲评论（hot和正常评论）
  getSongComments();
});

const pageChange = (type: PaginationClickType, page?: number): void => {
  const p = data.value.currentPage;
  const handle = {
    page: () =>
      type === "page" && page ? (data.value.currentPage = page) : null,
    prev: () => (data.value.currentPage = p === 1 || p === 2 ? 1 : p - 1),
    next: () =>
      (data.value.currentPage =
        p === data.value.total || p + 1 === data.value.total
          ? data.value.total
          : p + 1),
  };
  handle[type]();
};

watch(
  () => data.value.currentPage,
  () => getSongComments(data.value.currentPage)
);
</script>

<style lang="scss" scoped>
$min_height: 655px;
.song-page {
  width: 982px;
  background: #fff;
  border-left: 1px solid #d3d3d3;
  border-right: 1px solid #d3d3d3;

  .left {
    width: 709px;
    border-right: 1px solid #d3d3d3;
    padding-bottom: 40px;

    .comments {
      padding: 0 40px;
    }

    .title-hot-comments,
    .title-new-comments {
      line-height: 21px;
      font-size: 12px;
      color: #333;
      font-weight: bold;
      border-bottom: 1px solid #cfcfcf;
      margin-top: 28px;
    }

    .pagination-wrap {
      margin-top: 20px;
    }
  }

  .right {
    width: 270px;
  }
}
</style>
