<!--
 * @Author: wwssaabb
 * @Date: 2021-09-17 16:24:12
 * @LastEditTime: 2021-09-17 17:59:10
 * @FilePath: \CloudMusic-for-Vue3\src\components\head.vue
-->
<template>
  <div class="head-wrap fsc">
    <div class="logo">
      <a hidefocus="true" href="/#">网易云音乐</a>
    </div>
    <div class="feature-list fcc">
      <div
        class="feature-item fcc"
        :class="chooseId === item.id ? 'active' : ''"
        v-for="item in features"
        :key="item.id"
        @click="change(item)"
      >
        <el-badge :value="item.badge" v-if="item.badge" color="#c20c0c">
          <span>{{ item.name }}</span>
        </el-badge>
        <span v-else>{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ElBagdge from "element-plus";
import { ref } from "vue";
import { useRouter } from "vue-router";

//中间的功能区
type featureType = {
  id: number;
  name: string;
  path: string;
  badge?: string;
};
const features: featureType[] = [
  { id: 1, name: "发现音乐", path: "/#" },
  { id: 2, name: "我的音乐", path: "/my" },
  { id: 3, name: "朋友", path: "/friend" },
  { id: 4, name: "商城", path: "/store/product" },
  { id: 5, name: "下载客户端", path: "/download", badge: "HOT" },
];
//选中的id
const chooseId = ref(1);

//router实例化
const router = useRouter();

const change = (item: featureType): void => {
  chooseId.value = item.id;
  router.push(item.path);
};
</script>

<style lang="scss" scoped>
$--fixed_width: 1100px; //内容的宽度
// $--fixed_height: 70px; //内容的宽度

.head-wrap {
  width: $--fixed_width;
  height: 100%;

  .logo {
    flex-shrink: 0;
    width: 177px;
    height: 100%;
    padding-right: 20px;
    background: url("https://music.163.com/style/web2/img/frame/topbar.png?e0c08febe05b67c7b5b3926d0bdc8ca6")
      no-repeat;
    background-size: 177px 70px cover;
    text-indent: -9999px;
  }

  .feature-list {
    height: 100%;

    .feature-item {
      flex-shrink: 0;
      height: 100%;
      padding: 0 19px;
      color: #ccc;

      &.active {
        background-color: #000;
      }
    }
  }
}
</style>
