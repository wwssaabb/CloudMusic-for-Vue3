<template>
  <div class="borwse-list">
    <Title :title="title">
      <template #right>
        <span class="more td_u">更多 ></span>
      </template>
    </Title>
    <div class="list">
      <div class="item" v-for="item in list" :key="item.id">
        <img src="item.pictrue" alt="">
        <div class="right">
          <div class="name">{{}}</div>
          <div class="desc">{{}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Title from '../Title.vue'

const props=defineProps({
  title:{
    type:String,
    required:true
  },
  list:{
    type:[],
    required:true
  }
})

</script>

<style scoped>

</style>