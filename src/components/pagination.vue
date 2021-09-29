<!--
 * @Author: wwssaabb
 * @Date: 2021-09-29 08:37:32
 * @LastEditTime: 2021-09-29 11:36:04
 * @FilePath: \CloudMusic-for-Vue3\src\components\pagination.vue
-->
<template>
  <div class="pagination-wrap fcc" v-if="endPage !== 0">
    <div class="pagination fsc">
      <span
        class="prev-btn icon_btn_pagination_prev"
        :class="currentPage === 1 ? 'cannot_click' : ''"
        @click="click('prev')"
        >上一页</span
      >
      <div class="pages fsc">
        <span
          class="first-page icon_btn_pagination_page"
          :class="currentPage === 1 ? 'active' : ''"
          @click="click('page', 1)"
          >1</span
        >
        <span class="space" v-if="showSpace[0]">...</span>
        <span
          class="page-item icon_btn_pagination_page"
          v-for="item in showPage"
          :key="item"
          :class="currentPage === item ? 'active' : ''"
          @click="click('page', item)"
          >{{ item }}</span
        >
        <span class="space" v-if="showSpace[1]">...</span>
        <span
          class="end-page icon_btn_pagination_page"
          :class="currentPage === endPage ? 'active' : ''"
          @click="click('page', endPage)"
          v-if="endPage !== 1"
          >{{ endPage }}</span
        >
      </div>
      <span
        class="next-btn icon_btn_pagination_next"
        :class="currentPage === endPage ? 'cannot_click' : ''"
        @click="click('next')"
        >下一页</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType, ref } from "vue";
import { PaginationClickType } from "../types/types";
const props = defineProps({
  endPage: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
  click: {
    type: Function as PropType<
      (type: PaginationClickType, page?: number) => void
    >,
    required: true,
  },
});
console.log(props);

const showSpace = ref<boolean[]>([false, false]);

const showPage = computed((): number[] => {
  if (props.currentPage < 6) {
    showSpace.value = props.endPage > 9 ? [false, true] : [false, false];
    return props.endPage === 1
      ? []
      : props.endPage <= 8
      ? Array(props.endPage - 2)
          .fill(0)
          .map((_, i) => i + 2)
      : [2, 3, 4, 5, 6, 7, 8];
  } else if (props.currentPage === 6 && props.endPage === 6) {
    return showPage.value;
  } else if (props.currentPage >= 6 && props.currentPage < props.endPage - 5) {
    showSpace.value = [true, true];
    return Array(7)
      .fill(0)
      .map((_, index) => props.currentPage - 3 + index);
  } else {
    showSpace.value = [true, false];
    return Array(7)
      .fill(0)
      .map((_, index) => props.endPage - 7 + index);
  }
});
</script>

<style lang="scss" scoped>
.pagination {
  .first-page,
  .end-page,
  .prev-btn {
    margin-right: 2px;
  }

  .pages {
    .page-item,
    .space {
      margin-right: 2px;
    }
  }
}
</style>
