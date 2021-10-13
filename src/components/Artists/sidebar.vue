<!--
 * @Author: wwssaabb
 * @Date: 2021-10-08 09:35:53
 * @LastEditTime: 2021-10-08 18:07:00
 * @FilePath: \CloudMusic-for-Vue3\src\components\Artist\sidebar.vue
-->
<template>
  <div class="sidebar">
    <div v-for="outside in list" :key="outside.id">
      <div class="title">{{ outside.name }}</div>
      <ul class="list">
        <li
          class="item td_u user_ns"
          :class="
            outside.id === choose[0] && index === choose[1] ? 'active' : ''
          "
          v-for="(item, index) in outside.list"
          :key="item.name"
          @click="clickEvent(outside.id, index)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { sidebarType } from "../../types/types";
import { PropType } from "vue";

const props = defineProps({
  list: {
    type: Array as PropType<sidebarType[]>,
    required: true,
  },
  choose: {
    type: Array as PropType<number[]>,
    required: true,
  },
  clickEvent: {
    type: Function as PropType<(id: number, index: number) => void>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.sidebar {
  padding: 51px 10px 5px;

  .title {
    height: 25px;
    padding-left: 14px;
    font-size: 16px;
    font-family: "Microsoft Yahei";
    font-weight: bold;
  }

  .list {
    padding-bottom: 5px;
    &:not(:first-child) {
      margin-bottom: 16px;
      border-bottom: 1px solid #d3d3d3;
    }

    .item {
      width: 160px;
      padding-left: 27px;
      background: url("https://music.163.com//style/web2/img/singer.png?4129dc589a2da288d8bebfcaa1fa8e55")
        no-repeat;
      background-position: 0 -30px;
      color: #333;
      height: 30px;
      line-height: 30px;
      font-size: 12px;

      &.active {
        background-position: 0 0;
        text-decoration: none;
        color: #c20c0c;
      }
    }
  }
}
</style>
