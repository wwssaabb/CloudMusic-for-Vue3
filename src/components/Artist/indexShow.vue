<!--
 * @Author: wwssaabb
 * @Date: 2021-10-08 11:13:22
 * @LastEditTime: 2021-10-08 18:04:25
 * @FilePath: \CloudMusic-for-Vue3\src\components\Artist\indexShow.vue
-->
<template>
  <div class="index-show">
    <Title :title="title"></Title>
    <div class="cotent" v-loading="list.length === 0">
      <CoverShow :list="list.slice(0, 10)"></CoverShow>
      <NameList :list="list.slice(10)"></NameList>
    </div>
  </div>
</template>

<script setup lang="ts">
import { artistType } from "../../types/types";
import { PropType } from "vue";
import Title from "../Title.vue";
import CoverShow from "../Artist/coverShow.vue";
import NameList from "../Artist/nameList.vue";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  list: {
    type: Array as PropType<artistType[]>,
    default: [],
  },
});

console.log(props);
</script>

<style lang="scss" scoped>
.index-show {
  min-height: 848px;

  .cotent {
    min-height: 800px;
    padding-top: 20px;
    .cover-list {
      border-bottom: 1px dotted #999;
    }
  }
}
</style>
