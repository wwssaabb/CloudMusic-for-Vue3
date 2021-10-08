<!--
 * @Author: wwssaabb
 * @Date: 2021-09-18 14:21:13
 * @LastEditTime: 2021-10-08 18:04:01
 * @FilePath: \CloudMusic-for-Vue3\src\views\Artist.vue
-->
<template>
  <div class="artist-page fss">
    <div class="artist-sidebar">
      <Sidebar
        :list="sidebarList"
        :choose="chooseSidebar"
        :clickEvent="setChooseSidebar"
      />
    </div>
    <div class="artist-list">
      <MixinShow
        :enterList="enterArtists"
        :hotList="data.mixinHotData"
        v-if="chooseSidebar[0] === -1 && chooseSidebar[1] === 0"
      ></MixinShow>
      <IndexShow
        v-else
        :title="
          sidebarList.find((i) => i.id === chooseSidebar[0])?.list[
            chooseSidebar[1]
          ].name
        "
        :list="
          sidebarList.find((i) => i.id === chooseSidebar[0])?.list[
            chooseSidebar[1]
          ].list
        "
      ></IndexShow>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { sidebarType, artistType,initialType } from "../types/types";
import { onMounted, ref,provide } from "vue";
import { reqArtistsList } from "../api";
import Sidebar from "../components/Artist/sidebar.vue";
import IndexShow from "../components/Artist/indexShow.vue";
import MixinShow from "../components/Artist/mixinShow.vue";

//获取侧边栏的渲染对象数组
const categorys = ["男歌手", "女歌手", "组合/乐队"];
const renderMap: Map<number, string> = new Map([
  [7, "华语"],
  [96, "欧美"],
  [8, "日本"],
  [16, "韩国"],
  [0, "其他"],
]);
const sidebarList = ref<sidebarType[]>([]);
renderMap.forEach((v: string, k: number) => {
  sidebarList.value.push({
    id: k,
    name: v,
    list: categorys.map((i) => ({
      name: v + i,
      type: "index",
      list: [],
      initial: -1,
    })),
  });
});
sidebarList.value.unshift({
  id: -1,
  name: "推荐",
  list: [
    { name: "推荐歌手", type: "mixin", list: [], initial: -1 },
    { name: "入驻歌手", type: "cover", list: [], initial: -1 },
  ],
});

//选中的sidebar，[-1,0]
const chooseSidebar = ref([-1, 0]);
//点击sidebar时的回调
const setChooseSidebar = (id: number, index: number): void => {
  if (id === -1 && index === 1) {
    console.log("接口暂不支持入驻歌手列表获取");
    return;
  }
  if (chooseSidebar.value[0] === id && chooseSidebar.value[1] === index) return; //避免重复请求
  chooseSidebar.value = [id, index];
  console.log(chooseSidebar.value);
  if (id !== -1) {
    getIndexArtistsList();
  }
};

console.log(sidebarList);

//右侧数据展示
//mixin 推荐歌手列表的展示，cover 入驻歌手列表的展示，歌手的cover为主，index 以名字的首字母为索引
const getIndexArtistsList = async () => {
  let target = sidebarList.value.find((i) => i.id === chooseSidebar.value[0]);
  console.log(target);
  if (target) {
    target.list[chooseSidebar.value[1]].list = await getArtistsList(
      chooseSidebar.value[0],
      chooseSidebar.value[1] + 1,
      1,
      100
    );
    console.log(target.list[chooseSidebar.value[1]].list);
  }
};
//入驻歌手列表10个，接口暂时无法提供
const enterArtists: artistType[] = [
  {
    id: 10559,
    name: "张惠妹",
    accountId: 10559,
    picUrl:
      "http://p2.music.126.net/rCsLFXha6SLis0tV7yZ5fA==/109951165588539704.jpg",
  },
  {
    id: 1160085,
    name: "Fine乐团",
    accountId: 1160085,
    picUrl:
      "http://p2.music.126.net/wDxCsT3YEYdNg-UZU_ZKeg==/109951166047225823.jpg",
  },
  {
    id: 5345,
    name: "万晓利",
    accountId: 5345,
    picUrl:
      "http://p2.music.126.net/TiRAIiIihOgtBgYB6DZRXA==/109951162916034289.jpg",
  },
  {
    id: 6731,
    name: "赵雷",
    accountId: 6731,
    picUrl:
      "http://p1.music.126.net/w_UWOls2uCkFN_U62788Xg==/18806046882229308.jpg",
  },
  {
    id: 3669,
    name: "王三溥",
    accountId: 3669,
    picUrl:
      "http://p1.music.126.net/mS2PtUF2F_x949tJHS5Kog==/109951166457235020.jpg",
  },
  {
    id: 166009,
    name: "吴莫愁",
    accountId: 166009,
    picUrl:
      "http://p1.music.126.net/TQZGbxp-xnJla-q7ii9z0A==/1364493985498917.jpg",
  },
  {
    id: 3069,
    name: "洪启",
    accountId: 3069,
    picUrl:
      "http://p1.music.126.net/RXvADgBstUDBEXxl-UDrCg==/109951166146811273.jpg",
  },
  {
    id: 8614,
    name: "李霄云",
    accountId: 8614,
    picUrl:
      "http://p1.music.126.net/Qy9BJh_vFSXVrMaJrKU9Uw==/109951166182311274.jpg",
  },
  {
    id: 4941,
    name: "孙楠",
    accountId: 4941,
    picUrl:
      "http://p1.music.126.net/ZEEvSOoXV7Dv2QEkqUN3zg==/109951165625860507.jpg",
  },
  {
    id: 3682,
    name: "老狼",
    accountId: 3682,
    picUrl:
      "http://p1.music.126.net/1GIlkxKmvKu66ufU83FyvA==/31885837222663.jpg",
  },
];

type DataType = {
  mixinHotData: artistType[];
};
const data = ref<DataType>({
  mixinHotData: [],
});
const getArtistsList = async (
  area: number = -1,
  type: number = -1,
  page: number = 1,
  limit: number = 10
) => {
  return (await reqArtistsList(type, area, page, limit)).artists;
};
const showType = ["mixin", "cover", "index"];
onMounted(async () => {
  data.value.mixinHotData = await getArtistsList(-1, -1, 1, 100);
});

//首字母组件change方法
const initialChange=(initial:initialType):void=>{
  console.log(initial);
  let target = sidebarList.value.find((i) => i.id === chooseSidebar.value[0]);
  console.log(target);
  if (target) {
    target.list[chooseSidebar.value[1]].initial = initial
  }
}
provide(
  'initialChange',initialChange
)
</script>

<style lang="scss" scoped>
$--fixed_width: 982px;

.artist-page {
  width: $--fixed_width;
  border-left: 1px solid #d3d3d3;
  border-right: 1px solid #d3d3d3;
  .artist-sidebar {
    width: 180px;
    background: #f9f9f9;
  }

  .artist-list {
    width: 800px;
    min-height: 100%;
    padding: 40px;
    background: #ffffff;
    border-left: 1px solid #d3d3d3;
  }
}
</style>
