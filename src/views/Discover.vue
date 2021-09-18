<!--
 * @Author: wwssaabb
 * @Date: 2021-09-17 16:07:22
 * @LastEditTime: 2021-09-18 18:01:49
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
          :pagination="{ type: 'bullets' }"
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
      <div class="download"></div>
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
  </div>
</template>

<script setup lang="ts">
import Head from "../components/Head.vue";
import Foot from "../components/Foot.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperClass from "swiper/types/swiper-class";
import { computed, ref, Ref, reactive } from "vue";
import { reqBanner } from "../api/index";
import { onMounted } from "vue-demi";
import { watch } from "fs";

//http://p1.music.126.net/iiwcSSXUnch088qf4uaHig==/109951166422685262.jpg
//http://p1.music.126.net/w8YI8U1AmbMDGM4rSsoG7Q==/109951166422689599.jpg?imageView&blur=40x20

//banner相关
type BannerType = {
  encodeId: string;
  imageUrl: string;
  typeTitle: string;
};
const banners = ref<BannerType[]>([]);
let chooseBanner = ref<BannerType>({
  encodeId: "",
  imageUrl: "",
  typeTitle: "",
});
onMounted(async () => {
  const res: { banners: BannerType[] } = await reqBanner();
  banners.value = res.banners;
  console.log(banners.value);
  chooseBanner.value = banners.value[0];
});
const onSwiper = (swiper: SwiperClass) => {
  console.log(swiper);
};
const onSlideChange = (val: SwiperClass) => {
  chooseBanner.value = banners.value[val.activeIndex];
};
</script>

<style lang="scss" scoped>
$fixed_width: 1100px;
.pt5 {
  padding-top: 5px;
}
.pt35 {
  padding-top: 35px;
}
.banner-wrap {
  position: relative;
  width: 100%;
  height: 283.89px;
  background-color: skyblue;
  .banner {
    position: relative;
    width: 730px;
    height: 100%;
    filter: contrast(0.9);
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
    width: 254px;
    height: 100%;
    background-color: #fff;
    background: url("https://music.163.com/style/web2/img/index/download.png?8d6503c9a35580cb0878815b8e054f5");
    z-index: 5;
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
