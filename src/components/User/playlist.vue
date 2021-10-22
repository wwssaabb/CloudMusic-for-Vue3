<!--
 * @Author: wwssaabb
 * @Date: 2021-10-22 14:24:51
 * @LastEditTime: 2021-10-22 16:05:13
 * @FilePath: \CloudMusic-for-Vue3\src\components\User\playlist.vue
-->
<template>
  <div class="user-playlist" v-loading="list.length === 0">
    <Title :title="title"></Title>
    <AlbunList :playLists="list" :showCreator="false"></AlbunList>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { playListType } from "../../types/types";
import Title from "../Title.vue";
import AlbunList from "../AlbumList.vue";

const props = defineProps({
  list: {
    type: Array as PropType<playListType[]>,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.user-playlist {
  min-height: 884px;
}
</style>
