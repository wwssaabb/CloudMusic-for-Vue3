<!--
 * @Author: wwssaabb
 * @Date: 2021-10-22 14:24:51
 * @LastEditTime: 2021-10-28 13:44:20
 * @FilePath: \CloudMusic-for-Vue3\src\components\User\playlist.vue
-->
<template>
  <div class="user-playlist" v-loading="list.length === 0">
    <Title>
      <template #title>
        <span class="title">
          {{ title }}
        </span>
      </template>
    </Title>
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
  min-height: 171px;

  .title {
    font-size: 20px;
    line-height: 26px;
    color: #333;
  }
}
</style>
