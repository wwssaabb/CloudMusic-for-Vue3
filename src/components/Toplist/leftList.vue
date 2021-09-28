<!--
 * @Author: wwssaabb
 * @Date: 2021-09-28 15:35:25
 * @LastEditTime: 2021-09-28 15:35:26
 * @FilePath: \CloudMusic-for-Vue3\src\components\Toplist\leftList.vue
-->
<template>
  <div class="list" v-for="lists in [feature, media]" :key="lists.id">
    <div class="title">
      <span>{{ lists.title }}</span>
    </div>
    <div
      class="content"
      v-loading="lists.list.length === 0"
      :style="lists.list.length === 0 ? 'height:240px' : ''"
    >
      <div
        class="item fsc"
        :class="showDataId === item.id ? 'active' : ''"
        v-for="item in lists.list"
        :key="item.id"
      >
        <img :src="item.coverImgUrl + '?param=40y40'" alt="" />
        <div class="msg fd_col">
          <span class="name">{{ item.name }}</span>
          <span class="update_msg">{{ item.updateFrequency }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DiscoverListType } from "../../types/types";
import { PropType } from "vue";

const props = defineProps({
  feature: {
    type: Object as PropType<{
      id: number;
      title: string;
      list: DiscoverListType[];
    }>,
    required: true,
  },
  media: {
    type: Object as PropType<{
      id: number;
      title: string;
      list: DiscoverListType[];
    }>,
    required: true,
  },
  showDataId: {
    type: Number,
    default: 0,
  },
});
</script>

<style lang="scss" scoped>
.list {
  width: 100%;
  padding-bottom: 20px;
  .title {
    padding: 0 20px 10px;
    span {
      font-size: 14px;
      font-weight: bold;
      color: #000;
      font-family: simsun, \5b8b\4f53;
    }
  }
  .content {
    background: #f9f9f9;
    .item {
      padding: 10px 20px;

      img {
        width: 40px;
        height: 40px;
        border-radius: 5px;
        margin-right: 10px;
      }
      .msg {
        color: #999;
        span {
          font-size: 12px;
        }
        .name {
          color: #000;
          margin-bottom: 5px;
        }
      }
      &:hover,
      &.active {
        background: #e6e6e6;
      }
    }
  }
}
</style>
