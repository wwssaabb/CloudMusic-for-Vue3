<!--
 * @Author: wwssaabb
 * @Date: 2021-10-08 11:13:22
 * @LastEditTime: 2021-10-08 18:04:25
 * @FilePath: \CloudMusic-for-Vue3\src\components\Artist\indexShow.vue
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
import { artistType,initialType } from "../../types/types";
import { PropType,ref } from "vue";
import Title from "../Title.vue";
import CoverShow from "../Artist/coverShow.vue";
import NameList from "../Artist/nameList.vue";
import Initial from "../Artist/initial.vue";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  list: {
    type: Array as PropType<artistType[]>,
    default: [],
  },
});

const initialList=ref<{id:initialType,label:string|initialType}[]>([])

const letters:initialType[]=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]

initialList.value=letters.map(i=>({id:i,label:i}))
initialList.value.unshift({id:-1,label:'热门'})
initialList.value.push({id:0,label:'其它'})

const chooseId=ref<initialType>(-1)

console.log(initialList.value);
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
