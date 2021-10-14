<!--
 * @Author: wwssaabb
 * @Date: 2021-09-18 14:19:05
 * @LastEditTime: 2021-10-14 11:26:59
 * @FilePath: \CloudMusic-for-Vue3\src\views\TopList.vue
-->
<template>
  <div class="top-list-page fss">
    <div class="top-list-wrap fss">
      <div class="left">
        <LeftList
          :feature="data.feature"
          :media="data.media"
          :showDataId="data.showData.id"
        />
      </div>
      <div
        class="right"
        v-loading="data.showData.id === 0"
        :style="data.showData.id === 0 ? 'height:calc(100vh - 105px)' : ''"
      >
        <RightHead
          :showData="data.showData"
          :format="format"
          :getUpdateMsg="getUpdateMsg"
        />
        <div class="list-wrap">
          <div class="title fpbc">
            <div>
              <span class="title-name">歌曲列表</span>
              <span>{{ data.showData.trackCount }}首歌</span>
            </div>
            <div>
              播放：<span style="color: #c20c0c">{{
                data.showData.playCount
              }}</span>
              次
            </div>
          </div>
          <SongList
            :list="data.showData.tracks"
            :getTitle="getTitle"
            :getStatus="getStatus"
            :getRankNumber="getRankNumber"
            :format="format"
          />
        </div>
        <div class="comment-list-wrap">
          <CommentHead
            :commentContent="commentContent"
            :commentCount="data.showData.commentCount"
          />
          <div class="comment-list-hot" v-if="data.currentPage === 1">
            <div class="comment-list-hot-title">精彩评论</div>
            <div class="list">
              <CommentList
                :comments="data.comments.hotComments"
                :showBeReplied="false"
              />
            </div>
          </div>
          <div class="comment-list-new">
            <div class="comment-list-new-title" v-if="data.currentPage === 1">
              最新评论({{ data.showData.commentCount }})
            </div>
            <CommentList :comments="data.comments.newComments" />
          </div>
        </div>
        <div class="pagination">
          <Pagination
            :currentPage="data.currentPage"
            :endPage="data.totalPage"
            :click="paginationHandle"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  DiscoverListType,
  PlaylistType,
  DiscoverListSongType,
  CommentType,
  formatType,
  PaginationClickType,
} from "../types/types";
import {
  reqTopList,
  reqTopListDetail,
  reqTopListNewComment,
  reqTopListHotComment,
} from "../api";
import { ref, onMounted, watch } from "vue";
import moment from "../utils/moment";
import CommentList from "../components/CommentList.vue";
import SongList from "../components/SongList.vue";
import LeftList from "../components/Toplist/leftList.vue";
import RightHead from "../components/Toplist/rightHead.vue";
import CommentHead from "../components/CommentHead.vue";
import Pagination from "../components/Pagination.vue";

const format = (n: number, format: string, type: formatType = "normal") => {
  const handle = {
    normal: () => moment(n).format(format), //正常格式化时间
    compare: () => {
      //比较时间
      let before = new Date(n);
      let now = new Date();
      //时间戳差，毫秒值
      let diff = now.getTime() - before.getTime();
      if (diff < 3600000) {
        //一个小时内 格式：多少分钟之前
        return moment(n).startOf("hour").fromNow();
      } else if (diff >= 3600000 && diff <= 86400000) {
        //一天以内  格式 16:44 或 昨天 16:45
        return moment(n).subtract(0, "days").calendar();
      } else if (diff >= 86400000 && diff <= 30758400000) {
        //一年以内 格式： 9月22日 06:55
        return moment(n).format("MM月DD日 HH:mm");
      } else if (diff > 30758400000) {
        //一年以外 格式：2014年6月30日
        return moment(n).format("YYYY年MM月DD日");
      }
    },
    duration: () => {
      //获取时间长度 例子：03:05
      let duration = moment.duration(n);
      let m = duration.minutes();
      let s = duration.seconds();
      return (m >= 10 ? m : "0" + m) + ":" + (s >= 10 ? s : "0" + s);
    },
  };

  //时间格式化
  return handle[type]();
};

type CommentsType = {
  newComments: CommentType[];
  hotComments: CommentType[];
};

type TopListDataType = {
  feature: {
    id: number;
    title: string;
    list: DiscoverListType[];
  };
  media: {
    id: number;
    title: string;
    list: DiscoverListType[];
  };
  showData: PlaylistType;
  comments: CommentsType;
  currentPage: number;
  totalPage: number;
};

const data = ref<TopListDataType>({
  feature: {
    id: 1,
    title: "云音乐特色榜",
    list: [],
  },
  media: {
    id: 2,
    title: "全球媒体榜",
    list: [],
  },
  showData: {
    id: 0,
    name: "",
    coverImgUrl: "",
    updateTime: 0, //更新时间
    trackCount: 0, //列表歌曲数量
    playCount: 0, //播放数量
    subscribedCount: 0, //订阅数量
    shareCount: 0, //分享数量
    commentCount: 0, //评论数量
    tracks: [], //列表
    trackIds: [], //列表上一次排行
  },
  comments: { newComments: [], hotComments: [] },
  currentPage: 1,
  totalPage: 0,
});

const getNewComments = (page: number = 1): void => {
  reqTopListNewComment(data.value.showData.id, page).then((res) => {
    data.value.comments.newComments = res.comments;
    data.value.totalPage = Math.ceil(
      res.total / data.value.comments.newComments.length
    );
  });
};

onMounted(async () => {
  let res = await reqTopList();
  data.value.feature.list = res.list.slice(0, 4);
  data.value.media.list = res.list.slice(4);
  let res_showData = await reqTopListDetail(data.value.feature.list[0].id);
  data.value.showData = res_showData.playlist;
  console.log(data.value);

  //获取最新评论列表，默认page=1
  getNewComments();

  reqTopListHotComment(data.value.showData.id).then(
    (res) => (data.value.comments.hotComments = res.data.comments)
  );
  console.log(data.value);
});

const getUpdateMsg = (): string | undefined => {
  let list = [...data.value.feature.list, ...data.value.media.list];
  return list.find((i) => i.id === data.value.showData.id)?.updateFrequency;
};
const getTitle = (
  item: DiscoverListSongType,
  isNameTitle: boolean = true
): string | undefined => {
  if (isNameTitle) {
    return item.alia.length !== 0
      ? item.name + "-(" + item.alia?.[0] + ")"
      : item.name;
  } else {
    return item.alia?.join("/");
  }
};

const getStatus = (index: number): string => {
  //获取排行榜位置状态icon
  const Status = {
    0: "status_icon_new",
    1: "status_icon_stay",
    2: "status_icon_up",
    3: "status_icon_down",
  };
  let targer = data.value.showData.trackIds[index];
  if (targer.lr !== undefined) {
    return targer.lr === 0
      ? Status[1]
      : index > targer.lr
      ? Status[3]
      : Status[2];
  } else {
    return Status[0];
  }
};
const getRankNumber = (index: number): number | undefined => {
  let lr = data.value.showData.trackIds[index].lr;
  return lr === undefined || lr === 0 ? lr : Math.abs(lr - index);
};

//评论相关
const commentContent = ref<string>("");

//分页相关
const paginationHandle = (type: PaginationClickType, page?: number): void => {
  const p = data.value.currentPage;
  const handle = {
    page: () =>
      type === "page" && page ? (data.value.currentPage = page) : null,
    prev: () => (data.value.currentPage = p === 1 || p === 2 ? 1 : p - 1),
    next: () =>
      (data.value.currentPage =
        p === data.value.totalPage || p + 1 === data.value.totalPage
          ? data.value.totalPage
          : p + 1),
  };
  handle[type]();
};
watch(
  () => data.value.currentPage,
  () => {
    console.log(data.value.currentPage);
    getNewComments(data.value.currentPage);
  },
  {
    deep: true,
  }
);
</script>

<style lang="scss" scoped>
@mixin get_icon($x, $y, $size_x, $size_y) {
  width: #{$size_x}px;
  height: #{$size_y}px;
  background-position: #{$x}px #{$y}px;
}
.top-list-wrap {
  background: #f5f5f5;
  box-sizing: border-box;
  width: 982px;
  border-left: 1px solid #d3d3d3;
  border-right: 1px solid #d3d3d3;

  .left {
    display: inline-block;
    width: 240px;
    padding: 40px 0;
    background-color: #f9f9f9;
  }

  .right {
    display: inline-block;
    width: 739px;
    background: #fff;
    border-left: 1px solid #d3d3d3;
    padding-bottom: 100px;

    .list-wrap {
      padding: 0 40px 40px;
      .title {
        height: 35px;
        border-bottom: 2px solid #c20c0c;

        div,
        span {
          color: #666;
          font-size: 12px;
          &.title-name {
            font: 20px Microsoft Yahei;
            color: #333;
            margin-right: 20px;
          }
        }
      }
    }

    .comment-list-wrap {
      padding: 0 40px;

      .comment-list-hot,
      .comment-list-new {
        margin: 20px 0;
        &-title {
          height: 21px;
          border-bottom: 1px solid #cfcfcf;
          font: bold 12px Arial, Helvetica, sans-serif;
        }
      }

      .list {
        .item {
          padding: 15px 0;
          border-bottom: 1px dotted #ccc;

          img {
            width: 50px;
            height: 50px;
            border-radius: 5px;
            margin-right: 10px;
          }
        }
      }
    }

    .pagination {
      padding: 20px 0;
    }
  }
}
</style>
