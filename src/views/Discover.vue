<!--
 * @Author: wwssaabb
 * @Date: 2021-09-17 16:07:22
 * @LastEditTime: 2021-09-23 11:10:30
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
    <div class="wrap fss">
      <div class="wrap_l">
        <div class="hot-recommend wrap_l_c">
          <div class="title fpbc pr">
            <div class="content fcc">
              <span>热门推荐</span>
              <div class="tags" v-loading="tags.length === 0">
                <span class="tag td_u" v-for="item in tags" :key="item.id">{{
                  item.name
                }}</span>
              </div>
            </div>
            <div class="more fcc">
              <span>更多</span>
              <i></i>
            </div>
          </div>
          <div
            class="recommend-list fss fw"
            v-loading="recommendList.length === 0"
          >
            <div class="item" v-for="item in recommendList" :key="item.id">
              <div
                class="cover pr box_bor_grad"
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
              <div class="desc text_line3 td_u">
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
        <div class="album-recommend wrap_l_c">
          <div class="title fpbc pr">
            <div class="content fcc"><span>新碟上架</span></div>
            <div class="more fcc td_u"><span>更多</span> <i></i></div>
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
                    <div
                      class="cover_img box_ref"
                      :style="{
                        background:
                          'radial-gradient(circle at -200% -200%,transparent,rgba(255, 255, 255, 0.3) 85%,rgba(0, 0, 0, 0.05) 85.5%,rgba(0, 0, 0, 0.05) 100%),url(' +
                          item.picUrl +
                          ')',
                        backgroundSize: '100px 100px',
                      }"
                    ></div>
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
        <div class="music-list wrap_l_c">
          <div class="title fpbc pr">
            <div class="content fcc"><span>榜单</span></div>
            <div class="more fcc"><span>更多</span> <i></i></div>
          </div>
          <div class="list-wrap fsc">
            <div class="list-item" v-for="list in musicList" :key="list.id">
              <div class="head fss">
                <!-- <img :src="list.coverImgUrl" alt="" /> -->
                <div
                  class="cover pr box_ref"
                  :style="{
                    background:
                      'radial-gradient(circle at -200% -200%,transparent,rgba(255, 255, 255, 0.3) 85%,rgba(0, 0, 0, 0.05) 85.5%,rgba(0, 0, 0, 0.05) 100%),url(' +
                      list.coverImgUrl +
                      ') ',
                    backgroundSize: '80px 80px',
                  }"
                ></div>

                <div class="info">
                  <div class="name td_u">
                    <span>{{ list.name }}</span>
                  </div>
                  <div class="icons fss">
                    <i class="list_icon play_icon"></i
                    ><i class="list_icon collect_icon"></i>
                  </div>
                </div>
              </div>
              <div class="content">
                <div
                  class="item fsc"
                  v-for="(item, index) in list.list"
                  :key="item.id"
                >
                  <span
                    class="fcc"
                    :style="{ color: Number(index) <= 2 ? '#c10d0c' : '#000' }"
                    >{{ Number(index) + 1 }}</span
                  >
                  <span class="fsc td_u">{{ item.name }}</span>
                  <span class="fsc"
                    ><i class="list_icon play_icon"></i
                    ><i class="icons_img addlist_icon"></i
                    ><i class="list_icon collect_icon"></i
                  ></span>
                </div>
              </div>
              <div class="foot">
                <span>查看更多>></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="wrap_r">
        <div class="login_block">
          <p class="note">
            登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机
          </p>
          <div class="login_btn">用户登录</div>
        </div>
        <div class="enter_singer">
          <div class="list_title fpbc">
            <span>入驻歌手</span>
            <span class="td_u">查看全部 ></span>
          </div>
          <div class="list">
            <div class="item fsc" v-for="item in enter_singers" :key="item.id">
              <img :src="item.picImg" alt="" />
              <div class="message">
                <span class="name">{{ item.name }}</span>
                <span class="tag">{{ item.tag }}</span>
              </div>
            </div>
          </div>
          <div class="apply_btn cur_p">申请成为网易音乐人</div>
        </div>
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
  DiscoverListSongType,
  DiscoverListType,
} from "../types/types";
import { computed, ref, Ref, reactive } from "vue";
import {
  reqBanner,
  reqDiscoverRecommendCategory,
  reqDiscoverRecommendList,
  reqDiscoverAlbumList,
  reqDiscoverList,
  reqDiscoverListDetail,
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
  let res_list = await reqDiscoverList();
  console.log(res_list);
  musicList.value = res_list.list.slice(0, 3);
  musicList.value.forEach((item: DiscoverListType, index) => {
    reqDiscoverListDetail(item.id).then((res) => {
      console.log(res);
      musicList.value[index].list = res.playlist.tracks.slice(0, 10);
    });
  });
});

//入驻歌手相关
const enter_singers = [
  {
    id: 10559,
    name: "张惠妹aMEI",
    tag: "台湾歌手张惠妹",
    picImg:
      "http://p1.music.126.net/rCsLFXha6SLis0tV7yZ5fA==/109951165588539704.jpg?param=62y62",
  },
  {
    id: 100167517,
    name: "Fine乐团",
    tag: "独立音乐人",
    picImg:
      "http://p1.music.126.net/wDxCsT3YEYdNg-UZU_ZKeg==/109951166047225823.jpg?param=62y62",
  },
  {
    id: 58426904,
    name: "萬曉利",
    tag: "民谣歌手、中国现代民谣的代表人物之一",
    picImg:
      "http://p1.music.126.net/TiRAIiIihOgtBgYB6DZRXA==/109951162916034289.jpg?param=62y62",
  },
  {
    id: 93504818,
    name: "音乐人赵雷",
    tag: "民谣歌手",
    picImg:
      "http://p1.music.126.net/w_UWOls2uCkFN_U62788Xg==/18806046882229308.jpg?param=62y62",
  },
  {
    id: 46998208,
    name: "王三溥",
    tag: "音乐人",
    picImg:
      "http://p1.music.126.net/NDsX060FnCtiDMZN-c_9Gw==/3438172872737957.jpg?param=62y62",
  },
];
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
    right: 2px;
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
            @include get_icon(0, 0, 16, 16);
            &:hover {
              filter: brightness(1.5);
            }
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
  padding: 0 20px 40px;

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
          margin-bottom: 5px;

          .cover_img {
            width: 100px;
            height: 100px;
          }
          .play_icon {
            position: absolute;
            right: 5px;
            bottom: 5px;
            cursor: pointer;
            @include get_icon(0, -140, 28, 28);
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

.music-list {
  padding: 0 20px;

  .list-wrap {
    height: 472px;
    margin-top: 20px;
    background-color: #f4f4f4;
    border: 1px solid #d2d2d2;

    .list-item {
      width: calc(100% / 3);
      height: 472px;
      border-right: 1px solid #d2d2d2;
      color: #333;
      &:last-child {
        border: none;
      }

      .head {
        padding: 20px;

        .cover {
          width: 80px;
          height: 80px;
          border-radius: 5px;
          margin-right: 10px;
        }

        .info {
          flex: 1;

          .name {
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 5px;
          }

          .icons {
            width: 100%;
            height: 50px;
            i.play_icon {
              @include get_icon(-265, -202, 26, 26);
              margin-right: 10px;
              &:hover {
                opacity: 0.7;
              }
            }
            i.collect_icon {
              @include get_icon(-297.5, -202, 26, 26);
              &:hover {
                opacity: 0.7;
              }
            }
          }
        }
      }

      .content {
        .item {
          height: 32px;
          padding-left: 10px;

          &:nth-child(2n + 1) {
            background-color: #e8e8e8;
          }

          span {
            &:first-child {
              width: 35px;
              height: 32px;
              font-size: 16px;
            }

            &:nth-child(2) {
              display: inline-block;
              width: 175px;
              font-size: 12px;
              height: 32px;
              line-height: 32px;
              color: #000;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            &:last-child {
              display: block;
              width: 0;
              height: 32px;

              i.play_icon {
                margin-top: 3px;
                display: inline-block;
                margin-right: 2px;
              }
              i.collect_icon {
                margin-top: 3px;
                display: inline-block;
                margin-right: 2px;
              }
              i.addlist_icon {
                margin-top: 3px;
                display: inline-block;
              }
            }
          }

          &:hover {
            & span:nth-child(2) {
              width: 93px;
            }
            & span:last-child {
              width: 82px;
              i.play_icon {
                @include get_icon(-265, -202, 26, 26);
                &:hover {
                  opacity: 0.7;
                }
              }
              i.collect_icon {
                @include get_icon(-297.5, -202, 26, 26);
                &:hover {
                  opacity: 0.7;
                }
              }
              i.addlist_icon {
                @include get_icon(5, -692, 26, 26);
                border-radius: 50%;
                &:hover {
                  opacity: 0.7;
                }
              }
            }
          }
        }
      }

      .foot {
        padding: 0 10px;
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        background-color: #e8e8e8;
        height: 32px;
        color: #000;
        span {
          font-size: 12px;
        }
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}

.login_block {
  height: 126px;
  @extend .list_icon;
  @include get_icon(-1, 0, 250, 126);

  .note {
    padding: 16px 22.5px;
    font-size: 12px;
    line-height: 22px;
    color: #666;
  }

  .login_btn {
    margin: 0 auto;
    width: 100px;
    height: 31px;
    @extend .list_icon;
    @include get_icon(0, -195, 100, 31);
    line-height: 31px;
    font-size: 12px;
    color: #fff;
    text-align: center;
    text-shadow: 0 1px 0 #8a060b;
    &:hover {
      @include get_icon(-110, -195, 100, 31);
    }
  }
}

.enter_singer {
  margin-top: 15px;
  padding: 0 20px;
  span {
    font-size: 12px;
    color: #333;
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

  .list {
    padding: 0 0 10px;

    .item {
      width: 100%;
      height: 62px;
      border: 1px solid #e9e9e9;
      margin-top: 14px;
      background: #fafafa;
      border-radius: 5px;
      overflow: hidden;

      &:hover {
        background: #f4f4f4;
      }

      img {
        width: 62px;
        height: 62px;
        border-radius: 5px;
        margin-right: 10px;
      }

      .message {
        flex: 1;
        height: 62px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .name {
          font-size: 14px;
          line-height: 19px;
          font-weight: bold;
          margin-bottom: 8px;
        }
        .tag {
          width: 136px;
          color: #666;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }
    }
  }

  .apply_btn {
    width: 210px;
    height: 31px;
    margin-top: 14px;
    line-height: 31px;
    text-align: center;
    font-weight: bold;
    color: #333;
    background-color: #f8f8f8;
    border: 1px solid #ccc;
    border-radius: 5px;

    &:hover {
      background-color: #fefefe;
    }
  }
}
</style>
