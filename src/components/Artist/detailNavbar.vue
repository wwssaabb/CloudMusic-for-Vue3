<!--
 * @Author: wwssaabb
 * @Date: 2021-10-13 17:53:00
 * @LastEditTime: 2021-10-16 17:17:00
 * @FilePath: \CloudMusic-for-Vue3\src\components\Artist\detailNavbar.vue
-->
<template>
  <div class="artist-detail-navbar icon_artist_detail_navbar_bg fsc">
    <div
      class="navbar d_ib user_ns"
      :class="index === chooseIndex ? 'active' : ''"
      @click="changeNavbar(index)"
      v-for="(item, index) in list"
      :key="item.id"
    >
      <div class="fcc cur_p">{{ item.name }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { detailNavbarType } from "../../types/types";

const props = defineProps({
  list: {
    type: Array as PropType<detailNavbarType[]>,
    required: true,
  },
  chooseIndex: {
    type: Number,
    required: true,
  },
  changeNavbar: {
    type: Function as PropType<(index: number) => void>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.artist-detail-navbar {
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  .navbar {
    width: 138px;
    height: 39px;
    div {
      width: 138px;
      height: 39px;
      color: #333;
    }

    @mixin div_bg {
      div {
        width: 137px;
        margin-left: 1px;
        background: url("https://s2.music.126.net/style/web2/img/tab.png?641601b89b25d2b32995146a4ac5d2c1")
          no-repeat;
        background-position: -370px -90px;
      }
    }

    &:hover {
      background: url("https://s2.music.126.net/style/web2/img/tab.png?641601b89b25d2b32995146a4ac5d2c1")
        no-repeat;
      background-position: -10px -45px;
    }

    &.active {
      background: url("https://s2.music.126.net/style/web2/img/tab.png?641601b89b25d2b32995146a4ac5d2c1")
        no-repeat;
      background-position: 0 -90px;
      @include div_bg;
    }
  }
}
</style>
