<!--
 * @Author: wwssaabb
 * @Date: 2021-10-19 11:31:38
 * @LastEditTime: 2021-10-19 11:45:08
 * @FilePath: \CloudMusic-for-Vue3\src\components\Playlist\hint.vue
-->
<template>
  <div class="playlist-hint fdc fpbc">
    <div class="content">{{ content }}</div>
    <div class="todo_btn cur_p" @click="btnCallback()">{{ btnText }}</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  content: {
    type: String,
    required: true,
  },
  btnText: {
    type: String,
    required: true,
  },
  btnCallback: {
    type: Function,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.playlist-hint {
  min-height: 66px;
  .content {
    text-align: center;
    font-size: 13px;
    color: #333;
    line-height: 17px;
  }
  .todo_btn {
    width: 120px;
    height: 30px;
    background-image: linear-gradient(90deg, #ff5a4c 0%, #ff1d12 100%);
    border-radius: 18px;
    line-height: 30px;
    font-size: 12px;
    color: #ffffff;
    text-align: center;
  }
}
</style>
