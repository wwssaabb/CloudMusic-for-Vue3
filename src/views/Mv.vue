<!--
 * @Author: wwssaabb
 * @Date: 2021-10-15 15:43:45
 * @LastEditTime: 2021-10-16 16:53:36
 * @FilePath: \CloudMusic-for-Vue3\src\views\Mv.vue
-->
<template>
  <div class="mv-page fss">
    <div class="left">
      <MvPlay
        :detail="data.detail"
        :mvUrl="data.mvUrlData.url"
        v-if="data.detail && data.mvUrlData"
      ></MvPlay>
      <Combination
        v-if="data.detail"
        :commentCount="data.detail.commentCount"
        :commentContent="data.commentContent"
        :hotComments="data.hotComments"
        :comments="data.comments"
        :endPage="data.endPage"
        :currentPage="data.currentPage"
        :changePage="changePage"
      ></Combination>
    </div>
    <div class="right">
      <Introduction :detail="data.detail" v-if="data.detail"></Introduction>
      <Recommends :list="data.recommends"></Recommends>
      <AppDownload :showCode="true"></AppDownload>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, provide } from "vue";
import { useRouter } from "vue-router";
import {
  reqMvDetail,
  reqMvUrl,
  reqRecommendMvs,
  reqMvDetailInfo,
  reqMvComments,
} from "../api";
import {
  MvDetailType,
  RecommendsType,
  mvUrlDataType,
  reqMvDetailInfoType,
  CommentType,
  PaginationClickType,
} from "../types/types";
import MvPlay from "../components/Mv/mvPlay.vue";
import Combination from "../components/Mv/combination.vue";
import Introduction from "../components/Mv/introduction.vue";
import Recommends from "../components/Mv/recommends.vue";
import AppDownload from "../components/AppDownload.vue";

const router = useRouter();
const id: string | undefined = router.currentRoute.value.query.id?.toString();

//提供路由
provide("router", router);

type dataType = {
  detail: MvDetailType | null;
  detailInfo: reqMvDetailInfoType | null;
  recommends: RecommendsType[];
  mvUrlData: mvUrlDataType | null;
  hotComments: CommentType[];
  comments: CommentType[];
  currentPage: number;
  endPage: number;
  // total: number;
  commentContent: string;
};

const data = ref<dataType>({
  detail: null,
  detailInfo: null,
  recommends: [],
  mvUrlData: null,
  hotComments: [],
  comments: [],
  currentPage: 1,
  endPage: 1,
  // total: 0,
  commentContent: "",
});

const getEndPage = (total: number, limit: number = 20) =>
  Math.ceil(total / limit);

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

const getMvDetail = async () => {
  //获取mv 详情
  if (!id) return;
  data.value.detail = (await reqMvDetail(id)).data;
  data.value.detail.likedCount = 0;
  data.value.endPage = getEndPage(data.value.detail.commentCount);
};
const getMvDetailInfo = async () => {
  //获取mv 点赞数、分享数、评论数
  if (!id) return;
  let res = await reqMvDetailInfo(id);
  data.value.detailInfo = res;
  if (!data.value.detail)
    return Promise.resolve(function () {
      if (!data.value.detail) return;
      data.value.detail.shareCount = res.shareCount;
      data.value.detail.commentCount = res.commentCount;
      data.value.detail.likedCount = res.likedCount;
      data.value.detail.liked = res.liked;
      data.value.endPage = getEndPage(res.commentCount);
    });
};

const getMvComments = async () => {
  //获取mv评论列表
  if (!id) return;
  data.value.comments = [];
  let res = await reqMvComments(id, data.value.currentPage);
  data.value.hotComments = res.hotComments;
  data.value.comments = res.comments;
};

const getMvUrl = async () => {
  //获取mv 播放地址
  if (!id) return;
  data.value.mvUrlData = (await reqMvUrl(id)).data;
};
const getSimiMvs = async () => {
  //获取相似mv 详情
  if (!id) return;
  data.value.recommends = (await reqRecommendMvs(id)).data;
};

onMounted(() => {
  let callball: (() => void) | undefined;
  getMvDetailInfo().then((res) => (callball = res));
  getMvDetail().then(() => callball?.());
  getMvComments();
  getMvUrl();
  getSimiMvs();
});

watch(
  () => data.value.currentPage,
  () => getMvComments()
);
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

    .mv-play {
      margin-bottom: 45px;
    }
  }
  .right {
    width: 270px;
    padding: 20px 40px 40px 30px;
  }
}
</style>
