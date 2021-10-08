<template>
  <div class="initial-list">
    <span class="item d_ib td_u cur_p" :class="{'active':item.id===chooseId,'special':item.id===-1||item.id===0}" v-for="item in list" :key="item.id" @click="initialChange(item.id)">{{item.label}}</span>
  </div>
</template>

<script setup lang="ts">
import { initialType } from '../../types/types'
import { PropType,inject,ref } from 'vue'
const props=defineProps({
  list:{
    type:Array as PropType<{id:initialType,label:string | 0 | -1}[]>,
    required:true
  },
  chooseId:{
    type:String as PropType<initialType>,
    required:true
  }
})
const initialChange=ref<(initial:initialType)=>void>(inject('initialChange'))
</script>

<style lang="scss" scoped>
.initial-list{
  margin-bottom: 20px;

  .item{
    width: 21px;
    line-height: 24px;
    font-size: 14px;
    color:#333;
    text-align: center;

    &.special{
      width: 45px;
      font-size: 12px;
    }

    &:not(:last-child){
      margin-right: 3px;
    }

    &.active{
      color:#fff;
      background: #c20c0c;
      border-radius: 2px;
      text-decoration: none;
    }
  }
}
</style>