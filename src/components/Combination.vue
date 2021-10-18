<!--
 * @Author: wwssaabb
 * @Date: 2021-10-16 10:01:23
 * @LastEditTime: 2021-10-18 17:51:15
 * @FilePath: \CloudMusic-for-Vue3\src\components\combination.vue
-->
<template>
  <div class="combination">
    <!-- 评论框 -->
    <CommentHead
      :commentContent="commentContent"
      :commentCount="commentCount"
    ></CommentHead>
    <!-- 精彩评论 -->
    <template v-if="currentPage === 1">
      <div class="title" v-if="hotComments.length !== 0">精彩评论</div>
      <CommentList :comments="hotComments"></CommentList>
    </template>
    <!-- 最新评论 -->
    <div class="title" v-if="comments.length !== 0">最新评论</div>
    <CommentList :comments="comments"></CommentList>
    <!-- 最新评论 分页 -->
    <Pagination
      :endPage="endPage"
      :currentPage="currentPage"
      :click="changePage"
    ></Pagination>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import CommentHead from "./CommentHead.vue";
import CommentList from "./CommentList.vue";
import Pagination from "./Pagination.vue";
import { CommentType, PaginationClickType } from "../types/types";

const props = defineProps({
  commentContent: {
    type: String,
    required: true,
  },
  commentCount: {
    type: Number,
    required: true,
  },
  hotComments: {
    type: Array as PropType<CommentType[]>,
    required: true,
    default: [],
  },
  comments: {
    type: Array as PropType<CommentType[]>,
    required: true,
    default: [],
  },
  endPage: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
  changePage: {
    type: Function as PropType<
      (type: PaginationClickType, page?: number) => void
    >,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.title {
  font-size: 12px;
  color: #333;
  height: 21px;
  border-bottom: 1px solid #cfcfcf;
  font: bold 12px Arial, Helvetica, sans-serif;
  margin-top: 20px;
}
.pagination-wrap {
  margin-top: 20px;
}
</style>
