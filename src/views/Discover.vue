<!--
 * @Author: wwssaabb
 * @Date: 2021-09-17 16:07:22
 * @LastEditTime: 2021-09-22 14:35:48
 * @FilePath: \CloudMusic-for-Vue3\src\views\Discover.vue
-->
<template>
  <div class="full">
    <div class="banner-wrap fss" v-loading="banners.length === 0">
      <div class="banner">
        <swiper
          class="banner-content"
          :slides-per-view="1"
          :space-between="50"
          :pagination="true"
          :autoplay="true"
          @swiper="onSwiper"
          :width="730"
          :height="283.89"
          @slideChange="onSlideChange"
        >
          <swiper-slide v-for="item in banners" :key="item.encodeId"
            ><img :src="item.imageUrl" :alt="item.typeTitle"
          /></swiper-slide>
        </swiper>
      </div>
      <div class="download">
        <div class="btn"></div>
        <p>PC 安卓 iPhone WP iPad Mac 六大客户端</p>
      </div>
      <div
        class="bgimg"
        :style="{
          background:
            'url(' + chooseBanner?.imageUrl + '?imageView&blur=40x20)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '6000px',
          backgroundPosition: 'center center',
        }"
      ></div>
    </div>
    <div class="hot-recommend wrap_l">
      <div class="title fpbc pr">
        <div class="content fcc">
          <span>热门推荐</span>
          <div class="tags" v-loading="tags.length === 0">
            <span class="tag" v-for="item in tags" :key="item.id">{{
              item.name
            }}</span>
          </div>
        </div>
        <div class="more fcc">
          <span>更多</span>
          <i></i>
        </div>
      </div>
      <div class="recommend-list fss fw" v-loading="recommendList.length === 0">
        <div class="item" v-for="item in recommendList" :key="item.id">
          <div
            class="cover pr"
            :style="{
              background:
                'radial-gradient(circle at -200% -200%,transparent,rgba(255, 255, 255, 0.3) 85%,rgba(0, 0, 0, 0.05) 85.5%,rgba(0, 0, 0, 0.05) 100%),url(' +
                item.picUrl +
                '?param=140y140)',
            }"
          >
            <div class="bot pa fpbc">
              <span class="fsc"
                ><i class="bg_cover_icon"></i
                >{{ playCountFormat(item.playCount) }}</span
              >
              <i class="bg_cover_icon play_icon"></i>
            </div>
          </div>
          <div class="desc text_line3">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="album-recommend wrap_l">
      <div class="title fpbc pr">
        <div class="content fcc"><span>新碟上架</span></div>
        <div class="more fcc"><span>更多</span> <i></i></div>
      </div>
      <div class="album-list">
        <swiper
          class="album-banner"
          :slides-per-view="5"
          :space-between="26"
          :autoplay="true"
          @swiper="onSwiper"
          :width="690"
          :height="186"
          @slideChange="onSlideChange"
        >
          <swiper-slide v-for="item in albums" :key="item.id">
            <div class="album-item">
              <div class="cover pr">
                <img :src="item.picUrl" alt="" />
                <i class="bg_cover_icon play_icon"></i>
              </div>

              <div class="name">{{ item.name }}</div>
              <div class="artists">
                {{ getArtistName(item) }}
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Head from "../components/Head.vue";
import Foot from "../components/Foot.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperClass from "swiper/types/swiper-class";
import {
  BannerType,
  TagType,
  RecommendType,
  AlbumType,
  ArtistType,
} from "../types/types";
import { computed, ref, Ref, reactive } from "vue";
import {
  reqBanner,
  reqDiscoverRecommendCategory,
  reqDiscoverRecommendList,
  reqDiscoverAlbumList,
} from "../api/index";
import { onMounted } from "vue-demi";
import { watch } from "fs";
import { on } from "events";

//banner相关
const banners = ref<BannerType[]>([]);
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
const onSwiper = (swiper: SwiperClass) => {
  console.log(swiper);
};
const onSlideChange = (val: SwiperClass) => {
  chooseBanner.value = banners.value[val.activeIndex];
};

//热门推荐相关
const tags = ref<TagType[]>([]);
//获取热门推荐分类
onMounted(async () => {
  let res = await reqDiscoverRecommendCategory();
  tags.value = res.tags.slice(0, 5);
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

//新歌上架相关
const albums = ref<AlbumType[]>([]);
onMounted(async () => {
  let res = await reqDiscoverAlbumList();
  console.log(res);
  albums.value = res.albums.slice(0, 10);
  console.log(albums.value);
});
const getArtistName = (item: AlbumType): string => {
  if (item.artists.length === 1) {
    return item.artists[0].name;
  } else {
    return item.artists.map((i: ArtistType) => i.name).join("/");
  }
};
</script>

<style lang="scss" scoped>
$fixed_width: 1100px;
$fixed_width_left: 730px;

.bg_cover_icon {
  background: url("https://music.163.com/style/web2/img/iconall.png?3b842806447563578eadc3999414e2e1")
    no-repeat;
}

@mixin play_icon($x, $y, $size_x, $size_y) {
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

.wrap_l {
  width: $fixed_width_left;
  border-left: 1px solid #d3d3d3;
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

.banner-wrap {
  position: relative;
  width: 100%;
  height: 283.89px;

  .banner {
    position: relative;
    width: 730px;
    height: 100%;
    filter: contrast(1);
    z-index: 5;

    &:hover {
      filter: contrast(1.1);
    }
    .banner-content {
      width: 730px;
      height: 100%;
      z-index: 5;

      img {
        width: 730px;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .download {
    position: relative;
    width: 254px;
    height: 100%;
    background-color: #fff;
    background: url("https://music.163.com/style/web2/img/index/download.png?8d6503c9a35580cb0878815b8e054f5");
    z-index: 5;

    .btn {
      position: absolute;
      left: 19px;
      bottom: 43px;
      width: 216px;
      height: 58px;
      background: url("https://music.163.com/style/web2/img/index/download.png?8d6503c9a35580cb0878815b8e054f5");
      background-repeat: no-repeat;
      background-position: 0 -288px;
      filter: brightness(1.2);
      &:hover {
        filter: brightness(1);
      }
    }

    p {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      font-size: 12px;
      color: #8d8d8d;
      line-height: 16px;
      padding: 10px 0;
      text-align: center;
    }
  }

  .bgimg {
    position: absolute;
    top: 0;
    width: 100vw;
    height: 283.89px;
    z-index: 1;
    left: calc(#{$fixed_width} / 2 - 50vw);
  }
}
.hot-recommend {
  padding: 20px 20px 40px;

  .recommend-list {
    padding: 20px 0;

    .item {
      width: 140px;

      &:not(:nth-child(4n + 1)) {
        margin: 0 0 30px 42px;
      }

      .cover {
        width: 140px;
        height: 140px;
        margin-bottom: 10px;
        border-radius: 5px 5px 0 0;
        overflow: hidden;

        .bot {
          left: 0;
          bottom: 0;
          width: 100%;
          height: 30px;
          padding: 0 5px;
          color: #ccc;
          background: rgba(0, 0, 0, 0.6);
          &::after {
            content: "";
            position: absolute;
            top: 2px;
            left: 0;
            width: 100%;
            height: 1px;
            background-color: #aaa;
            transform: scaleY(0.2);
          }

          span {
            font-size: 12px;
            i {
              width: 16px;
              height: 16px;
              background-position: 0 -20px;
              margin-right: 5px;
            }
          }

          .play_icon {
            @include play_icon(0, 0, 16, 16);
          }
        }
      }

      .desc {
        width: 140px;
        word-wrap: break-word;
        line-height: 20px;
        max-height: 60px;
      }
    }
  }
}
.album-recommend {
  padding: 0 20px 20px;
  border-left: 1px solid #d3d3d3;

  .album-list {
    margin-top: 20px;
    padding: 20px 0;
    background-color: #f5f5f5;
    border: 1px solid #d3d3d3;

    .album-banner {
      height: 146px;
      padding: 0 20px;

      .album-item {
        width: 118px;
        .cover {
          width: 100px;
          height: 100px;
          z-index: 10;
          .play_icon {
            position: absolute;
            right: 5px;
            bottom: 5px;
            cursor: pointer;
            @include play_icon(0, -140, 28, 28);
            opacity: 0;
            transition: 0.3s;
          }

          &:hover {
            .play_icon {
              opacity: 1;
              transition: 0.3s;
            }
          }
        }

        @mixin content_type {
          width: 100px;
          font-size: 12px;
          line-height: 18px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          &:hover {
            text-decoration: underline;
          }
        }

        .name {
          @include content_type;
        }
        .artists {
          @include content_type;
          color: #666;
        }
      }
    }

    .swiper-slide {
      position: relative;
      width: 100px;
      height: 100px;
      padding: 1px;
      // background-color: skyblue;
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 118px;
        height: 100px;
        background: url("https://music.163.com/style/web2/img/coverall.png?f0b44559c59a4f6686187553c8ce6cee")
          no-repeat 0 -570px;
      }

      img {
        width: 100px;
        height: 100px;
      }
    }
  }
}
</style>
