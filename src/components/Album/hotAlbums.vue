<!--
 * @Author: wwssaabb
 * @Date: 2021-10-09 08:39:35
 * @LastEditTime: 2021-10-09 11:04:44
 * @FilePath: \CloudMusic-for-Vue3\src\components\Album\hotAlbums.vue
-->
<template>
  <div class="album-hot-list">
    <Title title="热门新碟"></Title>
    <AlbumCoverList :list="albums.slice(0, 10)"></AlbumCoverList>
  </div>
</template>

<script setup lang="ts">
import Title from "../Title.vue";
import AlbumCoverList from "../AlbumCoverList.vue";
import { AlbumType, ArtistType } from "../../types/types";
import { ref, onMounted } from "vue";
import { reqDiscoverAlbumList } from "../../api";

//获取热门新碟，数量10
const albums = ref<AlbumType[]>([]);
onMounted(async () => {
  let res = await reqDiscoverAlbumList();
  albums.value = res.albums;
});
const getArtistName = (item: AlbumType): string => {
  if (item.artists.length === 1) {
    return item.artists[0].name;
  } else {
    return item.artists.map((i: ArtistType) => i.name).join("/");
  }
};
</script>

<style lang="scss" scoped></style>
