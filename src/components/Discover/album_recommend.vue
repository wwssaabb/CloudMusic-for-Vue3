<!--
 * @Author: wwssaabb
 * @Date: 2021-09-23 16:01:37
 * @LastEditTime: 2021-10-09 08:45:18
 * @FilePath: \CloudMusic-for-Vue3\src\components\Discover\album_recommend.vue
-->
<template>
  <div class="album-recommend wrap_l_c">
    <ElSkeleton
      :loading="albums.length === 0"
      animated
      style="width: 730px; height: 241px"
    >
      <template #template>
        <div style="width: 728px; height: 241px">
          <div style="width: 688px; height: 33px">
            <ElSkeletonItem
              style="width: 100%; height: 100%"
              variant="text"
            ></ElSkeletonItem>
          </div>
          <div
            style="
              box-sizing: border-box;
              width: 728px;
              height: 188px;
              margin-top: 20px;
              padding: 20px;
            "
          >
            <div
              style="
                display: inline-block;
                width: 118px;
                height: 141px;
                margin-right: 18px;
              "
              v-for="item in 5"
            >
              <ElSkeletonItem
                style="width: 100%; height: 100px; margin-bottom: 5px"
                variant="image"
              ></ElSkeletonItem>
              <ElSkeletonItem
                style="width: 100%; height: 18px"
                variant="text"
              ></ElSkeletonItem>
              <ElSkeletonItem
                style="width: 100%; height: 18px"
                variant="text"
              ></ElSkeletonItem>
            </div>
          </div>
        </div>
      </template>
      <template #default>
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
            :width="690"
            :height="186"
          >
            <swiper-slide v-for="item in albums" :key="item.id">
              <div class="album-item cur_p">
                <div class="cover pr" @click="goAlbum(item.id)">
                  <div
                    class="cover_img box_ref"
                    :style="{
                      background:
                        'radial-gradient(circle at -200% -200%,transparent,rgba(255, 255, 255, 0.3) 85%,rgba(0, 0, 0, 0.05) 85.5%,rgba(0, 0, 0, 0.05) 100%),url(' +
                        item.picUrl +
                        '?param=100y100)',
                      backgroundSize: '100px 100px',
                    }"
                    :title="item.name"
                  ></div>
                  <i class="bg_cover_icon play_icon"></i>
                </div>
                <div class="name" :title="item.name">{{ item.name }}</div>
                <div class="artists" :title="getArtistName(item)" @click="goArtist(item.artists[0].id)">
                  {{ getArtistName(item) }}
                </div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </template>
    </ElSkeleton>
  </div>
</template>

<script setup lang="ts">
import { ElSkeleton, ElSkeletonItem } from "element-plus";
import { Swiper, SwiperSlide } from "swiper/vue";
import type { AlbumType } from "../../types/types";
import { PropType } from "vue";
import { useRouter } from 'vue-router'

const router=useRouter()

const props = defineProps({
  albums: {
    type: Array as PropType<AlbumType[]>,
    required: true,
  },
  getArtistName: {
    type: Function,
    required: true,
  },
});

const goAlbum=(id:number)=>router.push('/album?id='+id)
const goArtist=(id:number)=>router.push('/artist?id='+id)
</script>

<style lang="scss" scoped>
@mixin get_icon($x, $y, $size_x, $size_y) {
  width: #{$size_x}px;
  height: #{$size_y}px;
  background-position: #{$x}px #{$y}px;
}

.bg_cover_icon {
  cursor: pointer;
  background: url("https://music.163.com/style/web2/img/iconall.png?3b842806447563578eadc3999414e2e1")
    no-repeat;
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
</style>
