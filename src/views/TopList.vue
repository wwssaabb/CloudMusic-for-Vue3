<!--
 * @Author: wwssaabb
 * @Date: 2021-09-18 14:19:05
 * @LastEditTime: 2021-09-24 17:42:14
 * @FilePath: \CloudMusic-for-Vue3\src\views\TopList.vue
-->
<template>
  <div class="top-list-page fss">
    <div class="top-list-wrap fss">
      <div class="left">
        <div class="list" v-for="lists in [data.feature, data.media]">
          <div class="title">
            <span>{{ lists.title }}</span>
          </div>
          <div
            class="content"
            v-loading="lists.list.length === 0"
            :style="lists.list.length === 0 ? 'height:240px' : ''"
          >
            <div
              class="item fsc"
              :class="data.showData.id === item.id ? 'active' : ''"
              v-for="item in lists.list"
              :key="item.id"
            >
              <img :src="item.coverImgUrl + '?param=40y40'" alt="" />
              <div class="msg fss fdc">
                <span class="name">{{ item.name }}</span>
                <span class="update_msg">{{ item.updateFrequency }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="right"
        v-loading="data.showData.id === 0"
        :style="data.showData.id === 0 ? 'height:calc(100vh - 105px)' : ''"
      >
        <div class="list-head">
          <div class="cover pr">
            <img :src="data.showData.coverImgUrl + '?param=150y150'" alt="" />
            <i class="msk pa"></i>
          </div>
          <div class="msg">
            <div class="name">{{ data.showData.name }}</div>
            <div class="update-time">
              <i></i>
              <span>最近更新：{{ data.showData.updateTime }}</span>
              <span>{{ "(" + getUpdateMsg() + ")" }}</span>
            </div>
            <div class="btns"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DiscoverListType, PlaylistType } from "../types/types";
import { reqDiscoverList, reqDiscoverListDetail } from "../api";
import { ref, onMounted } from "vue";

type TopListDataType = {
  feature: {
    id: number;
    title: string;
    list: DiscoverListType[];
  };
  media: {
    id: number;
    title: string;
    list: DiscoverListType[];
  };
  showData: PlaylistType;
};

const data = ref<TopListDataType>({
  feature: {
    id: 1,
    title: "云音乐特色榜",
    list: [],
  },
  media: {
    id: 2,
    title: "全球媒体榜",
    list: [],
  },
  showData: {
    id: 0,
    name: "",
    coverImgUrl: "",
    updateTime: 0, //更新时间
    trackCount: 0, //列表歌曲数量
    playCount: 0, //播放数量
    subscribedCount: 0, //订阅数量
    shareCount: 0, //分享数量
    commentCount: 0, //评论数量
    tracks: [], //列表
  },
});

onMounted(async () => {
  let res = await reqDiscoverList();
  data.value.feature.list = res.list.slice(0, 4);
  data.value.media.list = res.list.slice(4);
  let res_showData = await reqDiscoverListDetail(data.value.feature.list[0].id);
  data.value.showData = res_showData.playlist;
  console.log(data.value);
});

const getUpdateMsg = () => {
  let list = [...data.value.feature.list, ...data.value.media.list];
  return list.find((i) => i.id === data.value.showData.id)?.updateFrequency;
};
</script>

<style lang="scss" scoped>
@mixin get_icon($x, $y, $size_x, $size_y) {
  width: #{$size_x}px;
  height: #{$size_y}px;
  background-position: #{$x}px #{$y}px;
}
.top-list-page {
  background: #f5f5f5;
}
.top-list-wrap {
  box-sizing: border-box;
  width: 982px;
  border-left: 1px solid #d3d3d3;
  border-right: 1px solid #d3d3d3;

  .left {
    display: inline-block;
    width: 240px;
    padding: 40px 0;
    background-color: #f9f9f9;

    .list {
      width: 100%;
      padding-bottom: 20px;
      .title {
        padding: 0 20px 10px;
        span {
          font-size: 14px;
          font-weight: bold;
          color: #000;
          font-family: simsun, \5b8b\4f53;
        }
      }
      .content {
        background: #f9f9f9;
        .item {
          padding: 10px 20px;

          img {
            width: 40px;
            height: 40px;
            border-radius: 5px;
            margin-right: 10px;
          }
          .msg {
            color: #999;
            span {
              font-size: 12px;
            }
            .name {
              color: #000;
              margin-bottom: 5px;
            }
          }
          &:hover,
          &.active {
            background: #e6e6e6;
          }
        }
      }
    }
  }

  .right {
    display: inline-block;
    width: 739px;
    background: #fff;
    border-left: 1px solid #d3d3d3;

    .list-head {
      padding: 40px;

      .cover {
        box-sizing: border-box;
        display: inline-block;
        margin-right: 30px;
        border-radius: 5px;

        img {
          width: 150px;
          height: 150px;
          width: 150px;
          height: 150px;
          padding: 3px;
          border-radius: 5px;
          border: 1px solid #ccc;
        }
        .msk {
          top: 0;
          left: 0;
          background: url("https://music.163.com//style/web2/img/coverall.png?544674b7fdb18c4ed7fd416cdd1f1f33")
            no-repeat;
          @include get_icon(-230, -380, 150, 150);
        }
      }

      .msg {
      }
    }
  }
}
</style>
