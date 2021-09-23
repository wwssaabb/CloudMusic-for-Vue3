<!--
 * @Author: wwssaabb
 * @Date: 2021-09-23 11:46:16
 * @LastEditTime: 2021-09-23 11:49:00
 * @FilePath: \CloudMusic-for-Vue3\src\components\Discover\login_block.vue
-->

<template>
  <div class="login_block">
    <p class="note">
      登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机
    </p>
    <div class="login_btn">用户登录</div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@mixin get_icon($x, $y, $size_x, $size_y) {
  width: #{$size_x}px;
  height: #{$size_y}px;
  background-position: #{$x}px #{$y}px;
}

.list_icon {
  cursor: pointer;
  background: url("https://music.163.com/style/web2/img/index/index.png?9c18c9e05976f1fa1a2d3872f8f2cecc")
    no-repeat;
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
</style>
