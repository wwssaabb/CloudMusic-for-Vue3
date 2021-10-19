<!--
 * @Author: wwssaabb
 * @Date: 2021-10-14 08:24:51
 * @LastEditTime: 2021-10-19 11:09:50
 * @FilePath: \CloudMusic-for-Vue3\src\views\Artist\Index.vue
-->
<template>
  <div class="artist-hot-works">
    <Head
      :filters="data.filters"
      :chooseFilterIndex="data.chooseFilterIndex"
      :changeFilterIndex="changeFilterIndex"
      v-loading="data.hotSongs.length === 0"
    ></Head>
    <SongList
      :list="data.hotSongs"
      :showRank="false"
      :showHead="false"
      :specialTop="0"
      :getStatus="() => ''"
      :getRankNumber="() => 0"
      :singerSlot="true"
    >
      <template v-slot:singer="{ item }">
        <span class="album_text td_u">{{ item.al?.name }}</span>
      </template>
    </SongList>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ArtistPage_filterType, DiscoverListSongType } from "../../types/types";
import { reqArtistIndex } from "../../api";
import Head from "../../components/Artist/Index/head.vue";
import SongList from "../../components/SongList.vue";

//获取页面 query参数 id
const id: string | undefined =
  useRouter().currentRoute.value.query.id?.toString();

type DataType = {
  filters: ArtistPage_filterType[];
  chooseFilterIndex: number;
  hotSongs: DiscoverListSongType[];
};

const data = ref<DataType>({
  filters: [
    { id: 1, name: "热门单曲" },
    { id: 2, name: "作词作品" },
    { id: 3, name: "作曲作品" },
  ],
  chooseFilterIndex: 0,
  hotSongs: [],
});
//改变filter
const changeFilterIndex = (index: number) =>
  (data.value.chooseFilterIndex = index);

const getArtistIndex = async () => {
  if (!id) return;
  data.value.hotSongs = (await reqArtistIndex(id)).hotSongs;
};

onMounted(() => {
  //获取歌手hot 50首歌曲
  getArtistIndex();
});
</script>

<style lang="scss" scoped>
.artist-hot-works {
  .album_text {
    font-size: 12px;
    color: #333;
  }
}
</style>
