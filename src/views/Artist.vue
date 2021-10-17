<!--
 * @Author: wwssaabb
 * @Date: 2021-10-12 11:04:23
 * @LastEditTime: 2021-10-16 17:20:40
 * @FilePath: \CloudMusic-for-Vue3\src\views\Artist.vue
-->
<template>
  <div class="artist-page fss">
    <div class="left">
      <div class="artist-msg" v-loading="data.detail === null">
        <ArtistDetail :detail="data.detail" v-if="data.detail"></ArtistDetail>
        <DetailNavbar
          :list="data.navbarList"
          :chooseIndex="data.chooseNavbarIndex"
          :changeNavbar="changeNavbar"
        ></DetailNavbar>
      </div>
      <div class="artist-content">
        <router-view></router-view>
      </div>
    </div>
    <div class="right">
      <SimiArtists :list="data.simiArtists.slice(0, 6)"></SimiArtists>
      <AppDownload />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, provide,watch } from "vue";
import { useRouter } from "vue-router";
import { reqSimiArtists, reqArtistIndex } from "../api";
import { ArtistType, ArtistDetailType, detailNavbarType } from "../types/types";
import SimiArtists from "../components/Artist/simiArtists.vue";
import ArtistDetail from "../components/Artist/artistDetail.vue";
import DetailNavbar from "../components/Artist/detailNavbar.vue";
import AppDownload from "../components/AppDownload.vue";

const router = useRouter();

//监听 子路由切换chooseNavbarIndex
router.beforeEach((to,from,next)=>{
  let path=to.path

  if(path.includes('/artist')){
    console.log(data.value.navbarList.findIndex(i=>i.path.includes(path)))
    data.value.chooseNavbarIndex=data.value.navbarList.findIndex(i=>i.path.includes(path))
  }
  next()
})

//获取页面 query参数 id
const id: string | undefined = router.currentRoute.value.query.id?.toString();

provide("router", router);

type DataType = {
  simiArtists: ArtistType[];
  detail: ArtistDetailType | null;
  navbarList: detailNavbarType[];
  chooseNavbarIndex: number;
};

const data = ref<DataType>({
  simiArtists: [],
  detail: null,
  navbarList: [
    { id: 1, name: "热门作品", path: "/artist?id=" + id },
    { id: 2, name: "所有专辑", path: "/artist/album?id=" + id },
    { id: 3, name: "相关MV", path: "/artist/mv?id=" + id },
    { id: 4, name: "艺人介绍", path: "/artist/desc?id=" + id },
  ],
  chooseNavbarIndex: 0 ,
});

const getSimiArtists = async () => {
  if (!id) return;
  data.value.simiArtists = (await reqSimiArtists(id)).artists;
};

const getArtistDetail = async () => {
  if (!id) return;
  data.value.detail = (await reqArtistIndex(id)).artist;
  data.value.navbarList[1].path = data.value.navbarList[1].path.concat(
    "&total=" + data.value.detail.albumSize
  );
  data.value.navbarList[2].path = data.value.navbarList[2].path.concat(
    "&total=" + data.value.detail.mvSize
  );
  data.value.navbarList[3].path = data.value.navbarList[3].path.concat(
    "&name=" + data.value.detail.name
  );
};

const checkNavbarIndex=()=>{
  let path=router.currentRoute.value.path

  if(path.includes('/artist')){
    console.log(data.value.navbarList.findIndex(i=>i.path.includes(path)))
    data.value.chooseNavbarIndex=data.value.navbarList.findIndex(i=>i.path.includes(path))
  }
}

//组件挂载
onMounted(() => {
  checkNavbarIndex()
  //获取相似歌手
  getSimiArtists();
  //获取歌手详情
  getArtistDetail();
});

//navbar 改变
const changeNavbar = (index: number) => {
  if (index === data.value.chooseNavbarIndex) return;
  data.value.chooseNavbarIndex = index;
  router.push(data.value.navbarList[index].path);
};

watch(()=>data.value.chooseNavbarIndex,()=>console.log(data.value.chooseNavbarIndex))

console.log(data.value);
</script>

<style lang="scss" scoped>
.artist-page {
  width: 982px;
  background: #fff;
  border-left: 1px solid #d3d3d3;
  border-right: 1px solid #d3d3d3;

  .left {
    width: 709px;
    border-right: 1px solid #d3d3d3;
    padding-bottom: 40px;
    min-height: 659px;
    padding: 25px 38px 40px 30px;

    .artist-msg {
      height: 376px;
    }
  }

  .right {
    width: 270px;
    padding: 20px 40px 30px 30px;
  }
}
</style>
