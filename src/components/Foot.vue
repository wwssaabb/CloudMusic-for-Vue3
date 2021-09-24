<!--
 * @Author: wwssaabb
 * @Date: 2021-09-17 16:32:23
 * @LastEditTime: 2021-09-24 17:59:38
 * @FilePath: \CloudMusic-for-Vue3\src\components\Foot.vue
-->
<template>
  <div class="page-foot">
    <div class="left">
      <div class="links-wrap fsc">
        <a
          :href="item.href"
          v-for="item in links"
          :key="item.id"
          @click="item.actions?.()"
          >{{ item.name }}</a
        >
      </div>
      <div class="message">
        <span>网易公司版权所有©1997-2021</span>
        <span>杭州乐读科技有限公司运营：</span>
        <a href="#" class="td_u">浙网文[2021] 1186-054号</a>
      </div>
      <div class="contact">
        <span>违法和不良信息举报电话：xxxx-xxxxxx</span>
        <span>举报邮箱：</span>
        <a href="#" class="td_u">xxxxxxx@163.com</a>
      </div>
      <div class="other">
        <span class="td_u">粤xx-xxxxxxx-xx 工业和信息化部备案管理系统网站</span>
        <span class="td_u"><i></i>浙公网安备 xxxxxxxxxxxxxxx号</span>
      </div>
    </div>
    <div class="right">
      <div class="icons fpec">
        <span class="item" v-for="item in 5">
          <i class="icon icons_img cur_p"></i>
          <i class="name icons_name_img"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const links = [
  {
    id: 1,
    name: "服务条款",
    href: "https://st.music.163.com/official-terms/service",
  },
  {
    id: 2,
    name: "隐私政策",
    href: "https://st.music.163.com/official-terms/privacy",
  },
  {
    id: 3,
    name: "儿童隐私政策",
    href: "https://st.music.163.com/official-terms/children",
  },
  {
    id: 4,
    name: "版权投诉指引",
    href: "https://music.163.com/st/staticdeal/complaints.html",
  },
  {
    id: 5,
    name: "意见反馈",
    href: "#",
    actions: () => console.log("意见反馈"),
  },
  { id: 6, name: "广告合作", href: "mailto:yyyx@list.nie.netease.com" },
];
</script>

<style lang="scss" scoped>
@mixin get_icon($x, $y, $size_x, $size_y) {
  width: #{$size_x}px;
  height: #{$size_y}px;
  background-position: #{$x}px #{$y}px;
}

.icons_img {
  background: url("https://music.163.com/style/web2/img/foot_enter_new.png?a08180467b5ab0cf2dc3f4cf0998137b")
    no-repeat;
  background-size: 110px 552px;
}
.icons_name_img {
  background: url("https://music.163.com/style/web2/img/foot_enter_tt.png?be9e61b4b868ecc26250b1f9dc7b5241")
    no-repeat;
  background-size: 180px 139px;
}

a {
  text-decoration: none;
}
.left {
  width: 520px;
  padding-top: 15px;
  margin-right: 40px;

  .links-wrap {
    width: 100%;
    height: 24px;
    a {
      font-size: 12px;
      line-height: 10px;
      text-align: center;
      color: #999;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
      &:not(:first-child) {
        padding-left: 12px;
        border-left: 1px solid #c2c2c2;
      }
      &:not(:last-child) {
        padding-right: 12px;
      }
    }
  }

  .message,
  .contact,
  .other {
    height: 24px;
    line-height: 24px;
    span,
    a {
      font-size: 12px;
      color: #666;
    }
    span:first-child {
      margin-right: 10px;
    }
    i {
      display: inline-block;
      width: 14px;
      height: 14px;
      line-height: 24px;
      vertical-align: -2px;
      margin: 0 2px;
      background: url("https://music.163.com/style/web2/img/3rd/police.png?38bc27988ded2ab0828468af9feeb2fe")
        no-repeat;
      background-size: cover;
    }
  }
}

@mixin getIcons($index, $icon_x, $icon_y, $name_x, $name_y) {
  &:nth-child(#{$index}) {
    i {
      display: inline-block;
      &.icon {
        @include get_icon($icon_x, $icon_y, 50, 45);
        margin-bottom: 5px;
      }
      &.name {
        @include get_icon($name_x, $name_y, 72, 14);
      }
    }
  }
}

.right {
  width: 420px;
  padding-top: 33px;

  .item {
    width: 60px;
    height: 70px;

    &:nth-child(1) {
      @include getIcons(1, -63, -456.5, 0, -108);
      .name {
        margin-left: -10px;
      }
    }
    &:nth-child(2) {
      @include getIcons(2, -63, -101, -1, -91);
    }
    &:nth-child(3) {
      @include getIcons(3, 0, 0, 0, 0);
    }
    &:nth-child(4) {
      @include getIcons(4, -60, -50, 0, -54);
    }
    &:nth-child(5) {
      @include getIcons(5, 0, -101, -1, -72);
    }
  }
}
</style>
