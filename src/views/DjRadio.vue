<!--
 * @Author: wwssaabb
 * @Date: 2021-09-18 14:20:47
 * @LastEditTime: 2021-10-08 08:41:58
 * @FilePath: \CloudMusic-for-Vue3\src\views\DjRadio.vue
-->
<template>
  <div class="dj_radio-page">
    <CategoryList :list="data.categories"></CategoryList>
    <div class="list-wrap fpbc">
      <div class="recommend">
        <RecommendList :list="data.programRecommends"></RecommendList>
      </div>
      <div class="rank">
        <RankList :list="data.rankList"></RankList>
      </div>
    </div>
    <div class="browse-list">
      <BroweList title="音乐推荐" :list="data.musicRecommendRadios"></BroweList>
      <BroweList title="生活" :list="data.liveRadios"></BroweList>
      <BroweList title="情感" :list="data.feelRadios"></BroweList>
      <BroweList
        title="创作翻唱"
        :list="data.createdAndCoverRadios"
      ></BroweList>
      <BroweList title="知识" :list="data.knowledgeRadios"></BroweList>
    </div>
  </div>
</template>

<script setup lang="ts">
import CategoryList from "../components/DjRadio/categoryList.vue";
import Title from "../components/Title.vue";
import RecommendList from "../components/DjRadio/recommendList.vue";
import RankList from "../components/DjRadio/rankList.vue";
import BroweList from "../components/DjRadio/browseList.vue";
import {
  reqDjCategories,
  reqDjRankList,
  reqDjRecommends,
  reqDjHotList,
} from "../api";
import {
  DjCategoryType,
  RankListType,
  programType,
  DjRadioType,
} from "../types/types";
import { ref, onMounted } from "vue";

type dataType = {
  categories: DjCategoryType[];
  rankList: RankListType[];
  programRecommends: programType[];
  musicRecommendRadios: DjRadioType[];
  liveRadios: DjRadioType[];
  feelRadios: DjRadioType[];
  createdAndCoverRadios: DjRadioType[];
  knowledgeRadios: DjRadioType[];
};
const data = ref<dataType>({
  categories: [],
  rankList: [],
  programRecommends: [],
  musicRecommendRadios: [],
  liveRadios: [],
  feelRadios: [],
  createdAndCoverRadios: [],
  knowledgeRadios: [],
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
  //获取推荐节目
  let res = await reqDjRecommends();
  data.value.programRecommends = res.programs;
};

const getDjBrowseList = async (id: 2 | 6 | 3 | 2001 | 11): Promise<void> => {
  type indexType = keyof Pick<
    typeof data.value,
    | "musicRecommendRadios"
    | "liveRadios"
    | "feelRadios"
    | "createdAndCoverRadios"
    | "knowledgeRadios"
  >;
  let index: indexType =
    id === 2
      ? "musicRecommendRadios"
      : id === 6
      ? "liveRadios"
      : id === 3
      ? "feelRadios"
      : id === 2001
      ? "createdAndCoverRadios"
      : "knowledgeRadios";
  data.value[index] = (await reqDjHotList(id, 1, 4)).djRadios.slice(0, 4);
};

onMounted(async () => {
  //获取电台分类
  getCategory();
  //获取节目排行榜
  getRankList();
  //获取推荐节目
  getProgramRecommends();

  //获取音乐推荐电台，类型id: 2
  getDjBrowseList(2);
  //获取生活电台，类型id: 6
  getDjBrowseList(6);
  //获取情感电台，类型id: 3
  getDjBrowseList(3);
  //获取创作翻唱电台，类型id: 2001
  getDjBrowseList(2001);
  //获取知识电台，类型id: 11
  getDjBrowseList(11);
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

  .browse-list {
    margin-top: 20px;
  }
}
</style>
