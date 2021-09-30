<!--
 * @Author: wwssaabb
 * @Date: 2021-09-18 14:20:47
 * @LastEditTime: 2021-09-30 15:36:12
 * @FilePath: \CloudMusic-for-Vue3\src\views\DjRadio.vue
-->
<template>
  <div class="dj_radio-page">
    <CategoryList :list="data.categories"></CategoryList>
    <div class="list-wrap fpbc">
      <div class="recommend">
        <RecommendList :list="data.programRecommends"></RecommendList>
      </div>
      <div class="rank"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CategoryList from "../components/DjRadio/categoryList.vue";
import Title from "../components/Title.vue";
import RecommendList from "../components/DjRadio/recommendList.vue";
import { reqDjCategories, reqDjRankList, reqDjRecommends } from "../api";
import { DjCategoryType, RankListType, programType } from "../types/types";
import { ref, onMounted } from "vue";

type dataType = {
  categories: DjCategoryType[];
  rankList: RankListType[];
  programRecommends: programType[];
};
const data = ref<dataType>({
  categories: [],
  rankList: [],
  programRecommends: [],
});

const getCategory = async () => {
  //获取分类
  let res = await reqDjCategories();
  data.value.categories = res.categories;
};
const getRankList = async () => {
  //获取节目排行榜
  let res = await reqDjRankList();
  data.value.rankList = res.toplist;
};
const getProgramRecommends = async () => {
  //获取节目排行榜
  let res = await reqDjRecommends();
  data.value.programRecommends = res.programs;
};

onMounted(async () => {
  //获取电台分类
  getCategory();
  //获取节目排行榜
  getRankList();
  //获取推荐节目
  getProgramRecommends();
});

console.log(data.value);
</script>

<style lang="scss" scoped>
$--fixed_width: 982px;
.dj_radio-page {
  width: $--fixed_width;
  min-height: calc(100vh - 280px);
  padding: 40px 40px;
  background: #fff;
  border-left: 1px solid #d3d3d3;
  border-right: 1px solid #d3d3d3;
}
</style>
