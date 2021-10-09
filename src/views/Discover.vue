<!--
 * @Author: wwssaabb
 * @Date: 2021-09-17 16:07:22
 * @LastEditTime: 2021-10-09 10:09:54
 * @FilePath: \CloudMusic-for-Vue3\src\views\Discover.vue
-->
<template>
  <div>
    <banner
      :banners="banners"
      :chooseBanner="chooseBanner"
      :onSlideChange="onSlideChange"
    ></banner>

    <div class="wrap fss">
      <div class="wrap_l">
        <hotRecommend
          :tags="tags"
          :recommendList="recommendList"
          :playCountFormat="playCountFormat"
        ></hotRecommend>
        <albumRecommend
          :albums="albums"
          :getArtistName="getArtistName"
        ></albumRecommend>
        <music_list :musicList="musicList"></music_list>
      </div>
      <div class="wrap_r">
        <loginBlock></loginBlock>
        <enterSinger></enterSinger>
        <djHot></djHot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Head from "../components/Head.vue";
import Foot from "../components/Foot.vue";
import enterSinger from "../components/Discover/enter_singer.vue";
import loginBlock from "../components/Discover/login_block.vue";
import banner from "../components/Discover/banner.vue";
import hotRecommend from "../components/Discover/hot_recommend.vue";
import albumRecommend from "../components/Discover/album_recommend.vue";
import music_list from "../components/Discover/music_list.vue";
import djHot from "../components/Discover/dj_hot.vue";
import SwiperClass from "swiper/types/swiper-class";
import { ref, onMounted } from "vue";
import {
  reqBanner,
  reqDiscoverRecommendCategory,
  reqDiscoverRecommendList,
  reqDiscoverAlbumList,
  reqTopList,
  reqTopListDetail,
} from "../api/index";
import type {
  BannerType,
  TagType,
  RecommendType,
  AlbumType,
  ArtistType,
  DiscoverListSongType,
  DiscoverListType,
} from "../types/types";

//banner相关
const banners = ref<BannerType[] | []>([]);
let chooseBanner = ref<BannerType>({
  encodeId: "",
  imageUrl: "",
  typeTitle: "",
});
onMounted(async () => {
  const res: { banners: BannerType[] } = await reqBanner();
  banners.value = res.banners;
  chooseBanner.value = banners.value[0];
});
/* const onSwiper = (swiper: SwiperClass) => {
  console.log(swiper);
}; */
const onSlideChange = (val: SwiperClass) => {
  chooseBanner.value = banners.value[val.activeIndex];
};

//热门推荐相关
const tags = ref<TagType[]>([]);
//获取热门推荐分类
onMounted(async () => {
  let res = await reqDiscoverRecommendCategory();
  tags.value = res.tags.slice(0, 5);
  console.log(tags.value);
});
const recommendList = ref<RecommendType[]>([]);
//获取热门推荐列表
onMounted(async () => {
  let res: { result: RecommendType[]; code: number } =
    await reqDiscoverRecommendList();
  recommendList.value = res.result;
});
const playCountFormat = (num: number): string | number => {
  return num > 10000 ? (num / 1000).toFixed(0) + "万" : num;
};

//新碟上架相关
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

//榜单相关
const musicList = ref<DiscoverListType[]>([]);
onMounted(async () => {
  let res_list = await reqTopList();
  musicList.value = res_list.list.slice(0, 3);
  musicList.value.forEach((item: DiscoverListType, index) => {
    musicList.value[index].list = [];
    reqTopListDetail(item.id).then((res) => {
      setTimeout(() => {
        musicList.value[index].list = res.playlist.tracks.slice(0, 10);
      }, 5000);
    });
  });
});
</script>

<style lang="scss" scoped>
$fixed_width: 980px;
$fixed_width_left: 730px;
$fixed_width_right: 250px;
.bg_cover_icon {
  cursor: pointer;
  background: url("https://music.163.com/style/web2/img/iconall.png?3b842806447563578eadc3999414e2e1")
    no-repeat;
}
.list_icon {
  cursor: pointer;
  background: url("https://music.163.com/style/web2/img/index/index.png?9c18c9e05976f1fa1a2d3872f8f2cecc")
    no-repeat;
}
.icons_img {
  cursor: pointer;
  background: url("https://music.163.com/style/web2/img/icon.png?3ebcc5e99f593ffe4e3546e30253a2ce")
    no-repeat;
}

@mixin get_icon($x, $y, $size_x, $size_y) {
  width: #{$size_x}px;
  height: #{$size_y}px;
  background-position: #{$x}px #{$y}px;
}

.text_line3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

.pt5 {
  padding-top: 5px;
}
.pt35 {
  padding-top: 35px;
}

.wrap {
  width: $fixed_width;
  border-right: 1px solid #d3d3d3;
}
.wrap_l {
  display: inline-block;
  width: $fixed_width_left;
  border-left: 1px solid #d3d3d3;
  border-right: 1px solid #d3d3d3;
}
.wrap_r {
  display: inline-block;
  width: $fixed_width_right;
  // border-left: 1px solid #d3d3d3;
}

.wrap_l_c,
.wrap_r_c {
  width: 100%;
}

.title {
  border-bottom: 2px solid #c10d0c;
  line-height: 28px;
  padding: 0 10px 0 34px;

  &::after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 34px;
    height: 34px;
    background: url("https://s2.music.126.net/style/web2/img/index/index.png?f2aae9f5087098b4f6cd335f144555df")
      no-repeat -224px -158px;
  }

  span {
    font-size: 12px;
    color: #666;
  }

  .content {
    & > span {
      font-size: 20px;
      color: #333;
      margin: 0 10px 3px 0;
    }
    .tags {
      span {
        padding: 0 10px;
        &:not(:last-child) {
          border-right: 1px solid #ccc;
        }
      }
    }
  }
  .more {
    span {
      margin-right: 5px;
      &:hover {
        text-decoration: underline;
      }
    }

    i {
      width: 12px;
      height: 12px;
      background: url("https://s2.music.126.net/style/web2/img/index/index.png?f2aae9f5087098b4f6cd335f144555df")
        no-repeat 0 -241px;
    }
  }
}

.list_title {
  padding-bottom: 5px;
  border-bottom: 1px solid #ccc;

  span {
    &:first-child {
      font-weight: bold;
      line-height: 20px;
    }
    &:last-child {
      color: #666;
    }
  }
}
</style>
