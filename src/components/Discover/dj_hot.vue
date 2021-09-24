<!--
 * @Author: wwssaabb
 * @Date: 2021-09-24 09:57:34
 * @LastEditTime: 2021-09-24 11:14:48
 * @FilePath: \CloudMusic-for-Vue3\src\components\Discover\dj_hot.vue
-->
<template>
  <div class="dj_hot">
    <div class="list_title fpbc">
      <span>热门主播</span>
    </div>
    <div class="content">
      <div class="item fsc" v-for="item in list" :key="item.id">
        <img :src="item.picture" alt="" />
        <div class="mesaage">
          <span class="td_u">{{ item.name }}</span>
          <span class="t_ovl1">{{ item.tag }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DiscoverDjType } from "../../types/types";
const list: DiscoverDjType[] = [
  {
    id: 278438485,
    name: "陈立",
    tag: "心理学家、美食家陈立教授",
    picture:
      "http://p1.music.126.net/H3QxWdf0eUiwmhJvA4vrMQ==/1407374893913311.jpg?param=40y40",
  },
  {
    id: 559210341,
    name: "刘维-Julius",
    tag: "歌手、播客节目《维维道来》主理人",
    picture:
      "http://p1.music.126.net/GgXkjCzeH4rqPCsrkBV1kg==/109951164843970584.jpg?param=40y40",
  },
  {
    id: 259292486,
    name: "莫非定律MoreFeel",
    tag: "男女双人全创作独立乐团",
    picture:
      "http://p1.music.126.net/C8jFbOTjUOnTKEHX6uuzOg==/109951166239584597.jpg?param=40y40",
  },
  {
    id: 1450418799,
    name: "碎嘴许美达",
    tag: "脱口秀网络红人",
    picture:
      "http://p1.music.126.net/NHjNoFpLDEZ-3OR9h35z1w==/109951165825466770.jpg?param=40y40",
  },
  {
    id: 2688170,
    name: "银临Rachel",
    tag: "古风音乐人",
    picture:
      "http://p1.music.126.net/CpUdHPNvBvN7kebvL21TTA==/109951163676573083.jpg?param=40y40",
  },
];
</script>

<style lang="scss" scoped>
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
.dj_hot {
  padding: 0 20px;

  .list_title {
    span {
      color: #333;
      font-size: 12px;
    }
  }

  .content {
    .item {
      margin-top: 14px;

      img {
        margin-right: 10px;
        border-radius: 5px;
      }

      span {
        display: block;
        font-size: 12px;
        &:last-child {
          color: #666;
          width: 160px;
          margin-top: 5px;
        }
      }
    }
  }
}
</style>
