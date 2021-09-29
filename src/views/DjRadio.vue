<!--
 * @Author: wwssaabb
 * @Date: 2021-09-18 14:20:47
 * @LastEditTime: 2021-09-29 17:57:04
 * @FilePath: \CloudMusic-for-Vue3\src\views\DjRadio.vue
-->
<template>
  <div class="dj_radio-page">
    <CategoryList></CategoryList>
  </div>
</template>

<script setup lang="ts">
import CategoryList from "../components/DjRadio/categoryList.vue";
import { reqDjCategories } from "../api";
import { ref, onMounted } from "vue";

const data = ref({});

const getCategory = () => reqDjCategories();

onMounted(async () => {
  let res = await getCategory();
  console.log(res);
});
</script>

<style lang="scss" scoped>
$--fixed_width: 982px;
.dj_radio-page {
  width: $--fixed_width;
  min-height: calc(100vh - 280px);
  padding: 40px;
  background: #fff;
  border-left: 1px solid #d3d3d3;
  border-right: 1px solid #d3d3d3;
}
</style>
