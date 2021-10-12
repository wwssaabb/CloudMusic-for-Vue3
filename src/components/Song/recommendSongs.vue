<template>
  <div class="recommend-songs" v-loading="list.length===0">
    <div class="item fpbc" v-for="item in list" :key="item.id">
      <div class="left">
        <span class="name">{{item.name}}</span>
        <span class="artist" v-html="getArtistsHtml(item)"></span>
      </div>
      <div class="left">
        <i></i>
        <i></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SongType } from '../../types/types'
import { PropType } from 'vue'

const props=defineProps({
  list:{
    type:Array as PropType<SongType[]>,
    required:true
  }
})

const getArtistsHtml=(item:SongType):string=>{
  const l=item.artists.length
  return item.artists.reduce((p,c,index)=>
    l===1?`<span class="td_u">${c.name}</span>`:
    p+'/'+`<span class="td_u">${c.name}</span>`
  ,'')
}

</script>

<style lang="scss" scoped>

</style>