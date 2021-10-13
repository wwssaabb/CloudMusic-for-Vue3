<!--
 * @Author: wwssaabb
 * @Date: 2021-10-09 11:38:04
 * @LastEditTime: 2021-10-13 11:17:25
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
    <div class="right d_ib">
      <div class="recommend-albums" v-if="!data.simiPlaylistsIsEmpty">
        <div class="title">包含这首歌的歌单</div>
        <div class="list">
          <RecommendAlbum :list="data.simiPlaylists"></RecommendAlbum>
        </div>
      </div>
      <div class="recommend-songs" v-if="!data.simiSongsIsEmpty">
        <div class="title">相似歌曲</div>
        <div class="list">
          <RecommendSongs :list="data.simiSongs"></RecommendSongs>
        </div>
      </div>
      <div class="app-download">
        <div class="title">网易云音乐多端下载</div>
        <div class="download-area icon_song_app_download_bg">
          <a class="ios" href="https://itunes.apple.com/cn/app/id590338362"></a>
          <a class="pc" href="https://music.163.com/api/pc/download/latest"></a>
          <a
            class="android"
            href="https://music.163.com/api/android/download/latest2"
          ></a>
        </div>
        <div class="desc">同步歌单，随时畅听320k好音乐</div>
      </div>
      <div class="other">
        <span class="d_ib td_u">补充或修改歌曲资料></span>
        <span class="d_ib td_u">用户wiki任务中心></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import {
  reqSongDetail,
  reqSongLyric,
  reqSongComments,
  reqSimiPlaylists,
  reqSimiSongs,
} from "../api";
import {
  DiscoverListSongType,
  CommentType,
  PaginationClickType,
  playListType,
  SongType,
} from "../types/types";
import { useRouter } from "vue-router";
import Detail from "../components/Song/detail.vue";
import CommentHead from "../components/CommentHead.vue";
import CommentList from "../components/CommentList.vue";
import Pagination from "../components/Pagination.vue";
import RecommendAlbum from "../components/Song/recommendAlbums.vue";
import RecommendSongs from "../components/Song/recommendSongs.vue";

//获取hash路由的query里的id
const id: string | undefined =
  useRouter().currentRoute.value.query.id?.toString();

type DataType = {
  detail: DiscoverListSongType | undefined;
  lyric: string | undefined;
  hotComments: CommentType[];
  newComments: CommentType[];
  total: number;
  currentPage: number;
  endPage: number;
  comment: string;
  simiPlaylists: playListType[];
  simiSongs: SongType[];
  simiSongsIsEmpty: boolean;
  simiPlaylistsIsEmpty: boolean;
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
  simiPlaylists: [],
  simiSongs: [],
  simiSongsIsEmpty: false,
  simiPlaylistsIsEmpty: false,
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
const getSimiPlaylists = async () => {
  if (!id) return;
  data.value.simiPlaylists = (await reqSimiPlaylists(id)).playlists;
  if (data.value.simiPlaylists.length === 0)
    data.value.simiPlaylistsIsEmpty = true;
};

const getSimiSongs = async () => {
  if (!id) return;
  data.value.simiSongs = (await reqSimiSongs(id)).songs;
  if (data.value.simiSongs.length === 0) data.value.simiSongsIsEmpty = true;
};
onMounted(() => {
  //获取歌曲详情
  getDetail();
  //获取歌词
  getLyric();
  //获取歌曲评论（hot和最新评论）
  getSongComments();
  //获取包含此歌曲的专辑
  getSimiPlaylists();
  //获取相似歌曲
  getSimiSongs();
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
    padding: 20px 40px 30px 30px;

    .recommend-albums,
    .recommend-songs,
    .app-download {
      .title {
        line-height: 23px;
        font-size: 12px;
        color: #333;
        margin-bottom: 20px;
        border-bottom: 1px solid #ccc;
        font-weight: bold;
      }

      .list {
        margin-bottom: 20px;
      }
    }

    .app-download {
      margin: 20px 0;
      .download-area {
        margin-bottom: 10px;
        a {
          display: inline-block;
        }
        .ios {
          width: 42px;
          height: 48px;
          &:hover {
            background: url("https://music.163.com/style/web2/img/sprite.png?951fdbfbda929ed4150bb7afc9fa6d1e")
              no-repeat;
            background-position: 0 -472px;
          }
        }
        .pc {
          width: 60px;
          height: 48px;
          margin: 0 26px 0 30px;

          &:hover {
            background: url("https://music.163.com/style/web2/img/sprite.png?951fdbfbda929ed4150bb7afc9fa6d1e")
              no-repeat;
            background-position: -72px -472px;
          }
        }

        .android {
          width: 42px;
          height: 48px;

          &:hover {
            background: url("https://music.163.com/style/web2/img/sprite.png?951fdbfbda929ed4150bb7afc9fa6d1e")
              no-repeat;
            background-position: -158px -472px;
          }
        }
      }

      .desc {
        font-size: 12px;
        color: #999;
        text-align: center;
      }
    }

    .other {
      span {
        font-size: 12px;
        color: #333;
      }
    }
  }
}
</style>
