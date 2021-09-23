<!--
 * @Author: wwssaabb
 * @Date: 2021-09-23 11:49:43
 * @LastEditTime: 2021-09-23 16:31:40
 * @FilePath: \CloudMusic-for-Vue3\src\components\Discover\banner.vue
-->
<template>
  <div class="banner-wrap fss">
    <ElSkeleton
      :loading="props.banners.length === 0"
      animated
      style="width: 930px"
    >
      <template #template>
        <ElSkeletonItem
          variant="image"
          style="width: 930px; height: 283.88px"
        ></ElSkeletonItem>
      </template>
      <template #default>
        <div class="banner">
          <Swiper
            class="banner-content"
            :slides-per-view="1"
            :space-between="0"
            :pagination="{ el: '.swiper-pagination' }"
            :loop="false"
            :autoplay="true"
            @swiper="onSwiper"
            :width="730"
            :height="283.89"
            @slideChange="props.onSlideChange"
          >
            <SwiperSlide v-for="item in props.banners" :key="item.encodeId"
              ><img :src="item.imageUrl" :alt="item.typeTitle" />
            </SwiperSlide>
          </Swiper>
          <div class="swiper-pagination"></div>
        </div>
        <div class="download">
          <div class="btn"></div>
          <p>PC 安卓 iPhone WP iPad Mac 六大客户端</p>
        </div>
        <div
          class="bgimg"
          v-if="props.chooseBanner.imageUrl !== ''"
          :style="{
            background:
              'url(' + props.chooseBanner.imageUrl + '?imageView&blur=40x20)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '6000px',
            backgroundPosition: 'center center',
          }"
        ></div>
      </template>
    </ElSkeleton>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { ElSkeleton, ElSkeletonItem } from "element-plus";
import SwiperClass from "swiper/types/swiper-class";
import { BannerType } from "../../types/types";
import { ref, PropType, onMounted, watch } from "vue";

const props = defineProps({
  banners: {
    type: Array as PropType<BannerType[]>,
    required: true,
  },
  chooseBanner: {
    type: Object as PropType<BannerType>,
    required: true,
    default: {
      encodeId: "",
      imageUrl: "",
      typeTitle: "",
    },
  },
  onSlideChange: {
    type: Function,
    required: true,
  },
});
/* let chooseBanner = ref<BannerType>({
  encodeId: "",
  imageUrl: "",
  typeTitle: "",
}); */

const onSwiper = (swiper: SwiperClass) => {
  // console.log(swiper);
};

onMounted(() => {
  // console.log(banners.value);
});

/* watch(
  //监听props
  () => props.banners,
  () => {
    console.log("props banner change");
    props.chooseBanner = props.banners[0];
  }
); */
</script>

<style lang="scss" scoped>
$fixed_width: 980px;
$fixed_width_left: 730px;
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
</style>
