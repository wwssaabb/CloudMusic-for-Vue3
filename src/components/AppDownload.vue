<!--
 * @Author: wwssaabb
 * @Date: 2021-10-13 15:23:08
 * @LastEditTime: 2021-10-13 15:26:55
 * @FilePath: \CloudMusic-for-Vue3\src\components\AppDownload.vue
-->
<template>
  <div class="app-download">
    <div class="title">网易云音乐多端下载</div>
    <div class="download-area icon_song_app_download_bg">
      <a class="ios" href="https://itunes.apple.com/cn/app/id590338362"></a>
      <a class="pc" href="https://music.163.com/api/pc/download/latest"></a>
      <a
        class="android"
        href="https://music.163.com/api/android/download/latest2"
      ></a>
    </div>
    <div class="desc">同步歌单，随时畅听320k好音乐</div>
  </div>
  <div class="other">
    <span class="d_ib td_u">补充或修改歌曲资料></span>
    <span class="d_ib td_u">用户wiki任务中心></span>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.app-download {
  margin: 20px 0;
  .title {
    line-height: 23px;
    font-size: 12px;
    color: #333;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    font-weight: bold;
  }

  .download-area {
    margin-bottom: 10px;
    a {
      display: inline-block;
    }
    .ios {
      width: 42px;
      height: 48px;
      &:hover {
        background: url("https://music.163.com/style/web2/img/sprite.png?951fdbfbda929ed4150bb7afc9fa6d1e")
          no-repeat;
        background-position: 0 -472px;
      }
    }
    .pc {
      width: 60px;
      height: 48px;
      margin: 0 26px 0 30px;

      &:hover {
        background: url("https://music.163.com/style/web2/img/sprite.png?951fdbfbda929ed4150bb7afc9fa6d1e")
          no-repeat;
        background-position: -72px -472px;
      }
    }

    .android {
      width: 42px;
      height: 48px;

      &:hover {
        background: url("https://music.163.com/style/web2/img/sprite.png?951fdbfbda929ed4150bb7afc9fa6d1e")
          no-repeat;
        background-position: -158px -472px;
      }
    }
  }

  .desc {
    font-size: 12px;
    color: #999;
    text-align: center;
  }
}
.other {
  span {
    font-size: 12px;
    color: #333;
  }
}
</style>
