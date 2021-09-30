<!--
 * @Author: wwssaabb
 * @Date: 2021-09-29 17:58:06
 * @LastEditTime: 2021-09-30 09:18:45
 * @FilePath: \CloudMusic-for-Vue3\src\components\DjRadio\categoryList.vue
-->
<template>
  <div class="category-list-wrap" v-loading="list.length === 0">
    <div
      class="category-item d_ib user_ns cur_p"
      v-for="item in list"
      :key="item.id"
    >
      <div
        class="cover cur_p"
        :style="{ backgroundImage: 'url(' + item.picWebUrl + ')' }"
      ></div>
      <div class="name cur_p">{{ item.name }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DjCategoryType } from "../../types/types";
import { PropType } from "vue";

const props = defineProps({
  list: {
    type: Array as PropType<DjCategoryType[]>,
    required: true,
  },
});
console.log(props.list);
</script>

<style lang="scss" scoped>
.category-list-wrap {
  width: 100%;
  height: 194px;
  margin-bottom: 20px;

  .category-item {
    width: 70px;
    height: 70px;
    margin: 0 0 25px 33px;
    background-color: #fff;
    border-radius: 5px;
    border: 2px solid #fff;

    &:nth-child(9n + 1) {
      margin: 0 0 25px 0;
    }

    &:hover {
      background-color: #f6f7f7;
      &.active {
        background-color: #fff;
      }
    }

    &.active {
      border: 2px solid #d35757;
      .cover {
        background-position: -48px 0;
      }
      .name {
        color: #d35757;
      }
    }

    .cover {
      width: 48px;
      height: 48px;
      margin: 0 11px;
      background-repeat: no-repeat;
      background-size: 96px 48px;
    }
    .name {
      font-size: 12px;
      color: #888;
      text-align: center;
    }
  }
}
</style>
