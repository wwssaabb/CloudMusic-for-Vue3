<!--
 * @Author: wwssaabb
 * @Date: 2021-10-08 11:13:22
 * @LastEditTime: 2021-10-13 11:21:55
 * @FilePath: \CloudMusic-for-Vue3\src\components\Artists\indexShow.vue
-->
<template>
  <div class="index-show">
    <Title :title="title"></Title>
    <div class="cotent" v-loading="list.length === 0">
      <Initial :list="initialList" :chooseId="chooseId"></Initial>
      <CoverShow :list="list.slice(0, 10)"></CoverShow>
      <NameList :list="list.slice(10)"></NameList>
    </div>
  </div>
</template>

<script setup lang="ts">
import { artistType, initialType } from "../../types/types";
import { PropType, ref } from "vue";
import Title from "../Title.vue";
import CoverShow from "../Artists/coverShow.vue";
import NameList from "../Artists/nameList.vue";
import Initial from "../Artists/initial.vue";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  list: {
    type: Array as PropType<artistType[]>,
    default: [],
  },
  chooseId: {
    type: String as PropType<initialType>,
    default: -1,
  },
});

const initialList = ref<{ id: initialType; label: string | initialType }[]>([]);

const letters: initialType[] = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

initialList.value = letters.map((i) => ({ id: i, label: i }));
initialList.value.unshift({ id: "-1", label: "热门" });
initialList.value.push({ id: "0", label: "其它" });
</script>

<style lang="scss" scoped>
.index-show {
  min-height: 848px;

  .cotent {
    min-height: 800px;
    padding-top: 20px;
    .cover-list {
      border-bottom: 1px dotted #999;
      margin-bottom: 12px;
    }
  }
}
</style>
