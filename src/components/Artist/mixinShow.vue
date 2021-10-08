<!--
 * @Author: wwssaabb
 * @Date: 2021-10-08 11:13:03
 * @LastEditTime: 2021-10-08 15:52:15
 * @FilePath: \CloudMusic-for-Vue3\src\components\Artist\mixinShow.vue
-->
<template>
  <div class="mixin-show">
    <div class="enter-artist">
      <Title title="入驻歌手">
        <template #right><span class="td_u">更多 ></span></template>
      </Title>
      <div class="enter-artist-list" v-loading="enterList.length === 0">
        <CoverShow :list="enterList"></CoverShow>
      </div>
    </div>
    <div class="hot-artist">
      <Title title="热门歌手" />
      <div class="hot-artist-list" v-loading="hotList.length === 0">
        <CoverShow :list="hotList.slice(0, 10)"></CoverShow>
        <NameList :list="hotList.slice(10)"></NameList>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { artistType } from "../../types/types";
import { PropType } from "vue";
import Title from "../Title.vue";
import CoverShow from "./coverShow.vue";
import NameList from "./nameList.vue";

const props = defineProps({
  enterList: {
    type: Array as PropType<artistType[]>,
    required: true,
  },
  hotList: {
    type: Array as PropType<artistType[]>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.mixin-show {
  min-height: 100%;
}
.enter-artist-list {
  margin-top: 20px;
  width: 720px;
  height: 378px;
}

.hot-artist {
  // margin-top: 20px;

  .hot-artist-list {
    margin-top: 20px;
    width: 720px;
    min-height: 378px;

    .cover-list {
      border-bottom: 1px dotted #999;
    }
  }
}
</style>
