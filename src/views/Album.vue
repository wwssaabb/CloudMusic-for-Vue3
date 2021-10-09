<!--
 * @Author: wwssaabb
 * @Date: 2021-09-18 14:21:34
 * @LastEditTime: 2021-10-09 11:10:00
 * @FilePath: \CloudMusic-for-Vue3\src\views\Album.vue
-->
<template>
  <div class="album-list">
    <HotAlbums />
    <AllAlbums></AllAlbums>
  </div>
</template>

<script setup lang="ts">
import HotAlbums from "../components/Album/hotAlbums.vue";
import AllAlbums from "../components/Album/allAlbums.vue";
</script>

<style lang="scss" scoped>
.album-list {
  width: 982px;
  min-height: 100%;
  border-left: 1px solid #d3d3d3;
  border-right: 1px solid #d3d3d3;
  padding: 40px;
  background: #fff;
}
</style>
