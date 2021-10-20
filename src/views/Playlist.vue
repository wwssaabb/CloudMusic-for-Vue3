<!--
 * @Author: wwssaabb
 * @Date: 2021-10-18 10:02:11
 * @LastEditTime: 2021-10-20 09:28:53
 * @FilePath: \CloudMusic-for-Vue3\src\views\Playlist.vue
-->
<template>
  <div class="playlist-page fss">
    <div class="left f_nosg">
      <div class="head-wrap" v-loading="data.detail === null">
        <Head :detail="data.detail" v-if="data.detail"></Head>
      </div>
      <Title v-if="data.detail">
        <template #title>
          <span class="sont-list-title">歌曲列表</span>
          <span class="sont-list-trackcount"
            >{{ data.detail.trackCount }}首歌</span
          >
        </template>
        <template #right>
          <span class="sont-list-outline td_u pr"
            ><i class="icon_music pa"></i>生成外链播放器</span
          ><span class="sont-list-playcount"
            >播放：<span class="playcount">{{ data.detail.playCount }}</span
            >次</span
          >
        </template>
      </Title>
      <SongList
        :list="data.tracks"
        v-if="data.detail"
        :specialTop="0"
        :getStatus="() => ''"
        :getRankNumber="() => undefined"
        :otherSlot="true"
      >
        <template #title><span>专辑</span></template>
        <template v-slot:other="{ item }">
          <span class="album_name td_u">{{ item.al.name }}</span>
        </template>
      </SongList>
      <Hint
        v-if="data.tracks.length !== 0"
        content="查看更多内容，请下载客户端"
        btnText="立即下载"
        :btnCallback="() => {}"
      ></Hint>
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
      <RelatedList :list="data.relatedList"></RelatedList>
      <AppDownload></AppDownload>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, provide } from "vue";
import { useRouter } from "vue-router";
import {
  PlaylistDetailType,
  RelatedPlaylistType,
  CommentType,
  DiscoverListSongType,
  PaginationClickType,
} from "../types/types";
import {
  reqPlaylistDetail,
  reqPlaylistRelatedList,
  reqPlaylistComments,
  reqSongDetail,
} from "../api";
import Head from "../components/Playlist/head.vue";
import SongList from "../components/SongList.vue";
import Likers from "../components/Playlist/likers.vue";
import RelatedList from "../components/Playlist/relatedList.vue";
import Hint from "../components/Playlist/hint.vue";
import AppDownload from "../components/AppDownload.vue";
import Combination from "../components/Combination.vue";
import Title from "../components/Title.vue";

const router = useRouter();
provide("push", router.push);

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
  tracks: DiscoverListSongType[];
};

const data = ref<dataType>({
  detail: null,
  relatedList: [],
  hotComments: [],
  comments: [],
  currentPage: 1,
  endPage: 0,
  comment: "",
  tracks: [],
});

const changePage = (type: PaginationClickType, page?: number): void => {
  const p = data.value.currentPage;
  const end = data.value.endPage;
  const handle = {
    page: () =>
      type === "page" && page ? (data.value.currentPage = page) : null,
    prev: () => (data.value.currentPage = p === 1 || p === 2 ? 1 : p - 1),
    next: () =>
      (data.value.currentPage = p === end || p + 1 === end ? end : p + 1),
  };
  handle[type]();
};

const getDetail = async () => {
  if (!id) return;
  data.value.detail = (await reqPlaylistDetail(id)).playlist;
};

const getSontDetail = async () => {
  if (!data.value.detail) return;
  const ids = data.value.detail.trackIds
    .slice(0, 20)
    .map((i) => i.id)
    .join(",");
  data.value.tracks = (await reqSongDetail(ids)).songs;
  // console.log(data.value.tracks.map((i) => i.name[0] + " : " + i.cd));
};

const getRelatedList = async () => {
  if (!id) return;
  data.value.relatedList = (await reqPlaylistRelatedList(id)).playlists;
};

const getComments = async () => {
  if (!id) return;
  data.value.comments = [];
  let res = await reqPlaylistComments(id, data.value.currentPage); //limit 20
  data.value.hotComments = res.hotComments;
  data.value.comments = res.comments;
  data.value.endPage = Math.ceil(res.total / 20);
};

onMounted(() => {
  getDetail().then((res) => getSontDetail());
  getRelatedList();
  getComments();
});

watch(() => data.value.currentPage, getComments);

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
      min-height: 250px;
      // margin-bottom: 27px;
    }

    .combination {
      margin-top: 40px;
    }

    @mixin setStyle($s, $lh, $color) {
      display: inline-block;
      font-size: #{$s + "px"};
      line-height: #{$lh + "px"};
      height: #{$lh + "px"};
      color: $color;
    }
    .sont-list- {
      &#{"title"} {
        @include setStyle(20, 26, #333);
        margin-right: 20px;
      }
      &trackcount {
        @include setStyle(12, 14, #666);
      }
      &outline {
        @include setStyle(12, 16, #4996d1);
        margin-right: 20px;
        i.icon_music {
          left: -16px;
          top: 0px;
        }
      }
      &playcount {
        @include setStyle(12, 14, #666);
        span.playcount {
          @include setStyle(12, 14, #c20c0c);
          font-weight: bold;
        }
      }
    }
    .album_name {
      font-size: 12px;
      color: #333;
      line-height: 14px;
    }

    .playlist-hint {
      margin-top: 30px;
    }
  }

  .right {
    width: 270px;
    padding: 20px 40px 40px 30px;
  }
}
</style>
