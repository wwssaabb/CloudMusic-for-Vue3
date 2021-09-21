<!--
 * @Author: wwssaabb
 * @Date: 2021-09-17 16:07:22
 * @LastEditTime: 2021-09-22 06:55:19
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
    <div class="hot-recommend">
      <div class="title fpbc pr">
        <div class="content fcc">
          <span>热门推荐</span>
          <div class="tags">
            <span class="tag" v-for="item in tags" :key="item.id">{{item.name}}</span>
          </div>
        </div>
        <div class="more fcc">
          <span>更多</span>
          <i></i>
        </div>
      </div>
      <div class="recommend-list fss fw">
        <div class="item" v-for="item in 8" :key="item">
          <div class="cover pr">
            <div class="bot pa fpbc">
              <span>{{'left'}}</span>
              <span>{{'right'}}</span>
            </div>
          </div>
          <div class="desc text_line3">{{'111111111111111111111111111111111111111'}}</div>
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
import { computed, ref, Ref, reactive } from "vue";
import { reqBanner,reqDiscoverRecommendCategory } from "../api/index";
import { onMounted } from "vue-demi";
import { watch } from "fs";
import { on } from "events";

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


//热门推荐相关
const tags=ref([])
onMounted(async ()=>{ //获取热门推荐分类
  let res=await reqDiscoverRecommendCategory()
  tags.value=res.tags.slice(0,5)
  console.log(tags.value)
})
onMounted(async ()=>{ //获取热门推荐列表
  let res=await reqDiscoverRecommendCategory()
  tags.value=res.tags.slice(0,5)
  console.log(tags.value)
})



</script>

<style lang="scss" scoped>
$fixed_width: 1100px;
$fixed_width_left: 730px;

.text_line3{
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
.banner-wrap {
  position: relative;
  width: 100%;
  height: 283.89px;
  background-color: #c20c0c;
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
    position: relative;
    width: 254px;
    height: 100%;
    background-color: #fff;
    background: url("https://music.163.com/style/web2/img/index/download.png?8d6503c9a35580cb0878815b8e054f5") ;
    z-index: 5;

    .btn{
      position: absolute;
      left: 19px;
      bottom: 43px;
      width: 216px;
      height: 58px;
      background: url("https://music.163.com/style/web2/img/index/download.png?8d6503c9a35580cb0878815b8e054f5");
      background-repeat: no-repeat;
      background-position: 0 -288px ;
      filter: brightness(1.2);
      &:hover{
        filter: brightness(1);
      }
    }

    p{
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
.hot-recommend{
  width: $fixed_width_left;
  height: 500px;
  padding: 20px 20px 40px;
  border-left: 1px solid #d3d3d3;

  .title{
    border-bottom:2px solid #C10D0C;
    line-height: 28px;
    padding: 0 10px 0 34px;

    &::after{
      position: absolute;
      content:'';
      top: 0;
      left: 0;
      width: 34px;
      height: 34px;
      background:url('https://s2.music.126.net/style/web2/img/index/index.png?f2aae9f5087098b4f6cd335f144555df') no-repeat -224px -158px;
    }

    span{
      font-size: 12px;
      color: #666;
    }

    .content{
      &>span{
        font-size: 20px;
        color: #333;
        margin-right: 10px;
      }
      .tags{
        span{
          padding: 0 10px;
          &:not(:last-child){
            border-right: 1px solid #ccc;
          }
        }
      }
    }

    .more{
      span{
        margin-right: 5px;
      }

      i{
        width: 12px;
        height: 12px;
        background:url('https://s2.music.126.net/style/web2/img/index/index.png?f2aae9f5087098b4f6cd335f144555df') no-repeat 0 -241px;
      }
    }
  }

  .recommend-list{
    padding: 20px 0;

    .item{
      width: 140px;
      border: 1px solid #eee;

      &:not(:nth-child(4n+1)){
        margin: 0 0 30px 42px;
      }

      .cover{
        width: 140px;
        height: 140px;
        margin-bottom: 10px;
        // background: radial-gradient(cricle at left top,#d2d2d2 0%,#d2d2d2 50%,#181818 51%,#181818 100%);
        background: radial-gradient(circle at -200% -200%,transparent, rgba(255,255,255,.3) 85%, rgba(0,0,0,.05) 85.5%,rgba(0,0,0,.05) 100%) ,url('http://p1.music.126.net/7M0_Ae5lbBV4S9cb8nFrbA==/109951165837009153.jpg?param=140y140');


        .bot{
          left: 0;
          bottom: 0;
          width: 100%;
          padding: 5px;
        }
      }

      .desc{
        width: 140px;
        word-wrap: break-word;
        line-height: 20px;
        max-height: 60px;
      }
    }
  }
}
</style>
