<!--
 * @Author: wwssaabb
 * @Date: 2021-10-22 08:54:17
 * @LastEditTime: 2021-10-26 09:12:02
 * @FilePath: \CloudMusic-for-Vue3\src\components\User\djList.vue
-->
<template>
  <div class="user-dj-list" v-loading="list.length === 0">
    <Title>
      <template #title>
        <span class="title">{{ title }}</span>
      </template>
    </Title>
    <div class="list">
      <div class="item fsc" v-for="item in list" :key="item.id">
        <img :src="item.picUrl + '?param=50y50'" alt="" />
        <div class="name pr">
          <span class="td_u">{{ item.name }}</span>
          <div class="icons pa fcc">
            <i class="icon_user_record_share"></i>
          </div>
        </div>
        <div class="sub-count">订阅{{ item.subCount }}次</div>
        <div class="periodical">{{ item.programCount }}期</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { DjRadioType } from "../../types/types";
import Title from "../Title.vue";

const props = defineProps({
  list: {
    type: Array as PropType<DjRadioType[]>,
    required: true,
  },
  title: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped>
.user-dj-list {
  min-height: 70px;
  .title {
    font-size: 20px;
    line-height: 40px;
    color: #666;
    font-weight: normal;
  }
  .list {
    border: 1px solid #e5e5e5;
    border-top: none;
    .item {
      padding: 10px 0;

      &:nth-child(2n) {
        background: #f7f7f7;
      }

      &:hover {
        background: #eee;
        .name .icons {
          display: flex;
        }
      }

      img {
        width: 50px;
        height: 50px;
        margin-left: 20px;
      }
    }
    .name {
      width: 538px;
      height: 50px;
      line-height: 50px;
      margin-left: 10px;
      padding-right: 38px;
      span {
        font-size: 12px;
        color: #333;
      }

      .icons {
        width: 38px;
        height: 50px;
        top: 0;
        right: 0;
        display: none;
      }
    }
    .sub-count {
      width: 216px;
      height: 50px;
      line-height: 50px;
      margin-left: 10px;
      font-size: 12px;
      color: #666;
    }
    .periodical {
      width: 44px;
      height: 50px;
      line-height: 50px;

      margin-left: 10px;
      font-size: 12px;
      color: #999;
    }
  }
}
</style>
