<!--
 * @Author: wwssaabb
 * @Date: 2021-09-23 11:41:28
 * @LastEditTime: 2021-09-23 11:41:28
 * @FilePath: \CloudMusic-for-Vue3\src\components\Discover\enter_singer.vue
-->
<template>
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
</template>

<script setup lang="ts">
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
.enter_singer {
  margin: 15px 0 20px 0;
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
    font-size: 12px;
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
