<!--
 * @Author: wwssaabb
 * @Date: 2021-10-16 11:03:56
 * @LastEditTime: 2021-10-16 11:34:30
 * @FilePath: \CloudMusic-for-Vue3\src\components\Mv\introduction.vue
-->
<template>
  <div class="mv-introduction">
    <div class="title">MV简介</div>
    <div class="msg fd_col" v-if="detail">
      <span>发布时间：{{ detail.publishTime }}</span>
      <span>播放次数：{{ playCountFormat(detail.playCount) }}</span>
    </div>
    <div class="content" v-if="detail">
      {{ detail.desc }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { MvDetailType } from "../../types/types";

const porps = defineProps({
  detail: {
    type: Object as PropType<MvDetailType>,
    required: true,
  },
});

const playCountFormat = (count: number): string =>
  count >= 10000 ? (count / 10000).toFixed(0) + "万次" : count + "次";
</script>

<style lang="scss" scoped>
.mv-introduction {
  margin-bottom: 34px;

  .title {
    margin-bottom: 20px;
    line-height: 24px;
    font-size: 12px;
    color: #333;
    border-bottom: 1px solid #ccc;
    font-weight: bold;
  }

  .msg {
    margin-bottom: 10px;
    span {
      line-height: 18px;
      font-size: 12px;
      color: #999;
    }
  }

  .content {
    line-height: 18px;
    font-size: 12px;
    color: #333;
  }
}
</style>
