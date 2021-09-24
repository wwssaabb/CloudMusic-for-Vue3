<!--
 * @Author: wwssaabb
 * @Date: 2021-09-18 14:19:05
 * @LastEditTime: 2021-09-24 11:45:00
 * @FilePath: \CloudMusic-for-Vue3\src\views\TopList.vue
-->
<template>
  <div class="top-list-wrap">
    <div class="left"></div>
    <div class="right"></div>
  </div>
</template>

<script setup lang="ts">
import { DiscoverListType } from "../types/types";
import { reqDiscoverList, reqDiscoverListDetail } from "../api";
import { ref, onMounted } from "vue";

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
  showData: {};
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
  showData: {},
});

onMounted(async () => {
  let res = await reqDiscoverList();
  console.log(res.list);
  data.value.feature.list = res.list.slice(0, 4);
  data.value.media.list = res.list.slice(4);
  console.log(data.value);
  let firstShowData;
});
</script>

<style lang="scss" scoped>
.top-list-wrap {
  width: 980px;

  .left {
    display: inline-block;
    width: 240px;
    height: 500px;
    background-color: saddlebrown;
  }

  .right {
    display: inline-block;
    width: 740px;
    height: 500px;
    background-color: yellowgreen;
  }
}
</style>
