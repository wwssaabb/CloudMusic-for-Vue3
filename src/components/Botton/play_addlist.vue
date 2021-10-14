<!--
 * @Author: wwssaabb
 * @Date: 2021-10-14 08:47:42
 * @LastEditTime: 2021-10-14 08:47:43
 * @FilePath: \CloudMusic-for-Vue3\src\components\Botton\play_addlist.vue
-->
<template>
  <div class="play_addlist">
    <i class="icon_btn_play_bg pr cur_p" title="播放">
      <span class="text pa">播放</span>
    </i>
    <i class="icon_add_play cur_p" title="添加到播放列表"></i>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.play_addlist {
  height: 31px;
  margin-right: 5px;
  span.text {
    line-height: 21px;
    font-size: 12px;
    color: #fff;
    left: 33px;
    top: 5px;
  }
}
</style>
