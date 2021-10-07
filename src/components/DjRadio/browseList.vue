<template>
  <div class="borwse-list">
    <Title :title="title+'·电台'">
      <template #right>
        <span class="more td_u">更多 ></span>
      </template>
    </Title>
    <div class="list fss fw">
      <div class="item fss cur_p" v-for="item in list" :key="item.id">
        <img :src="item.picUrl+'?param=200y200'" alt="">
        <div class="right">
          <div class="name td_u">{{item.name}}</div>
          <div class="desc">{{item.rcmdtext}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {DjRadioType} from '../../types/types'
import {PropType} from 'vue'
import Title from '../Title.vue'

const props=defineProps({
  title:{
    type:String,
    required:true
  },
  list:{
    type:Array as PropType<DjRadioType[]>,
    required:true
  }
})

</script>

<style lang="scss" scoped>
.borwse-list{
  padding: 20px 0;

  .list{

    .item{
      width: 48%;
      padding: 20px 0;
      border-bottom: 1px solid #e7e7e7;
      &:nth-child(2n+1){
        margin-right: 4%;
      }

      img{
        width: 120px;
        height: 120px;
        margin-right: 20px;
        border-radius: 5px;
      }

      .right{
        .name{
          width: 290px;
          line-height: 20px;
          max-height: 40px;
          margin: 16px 0 20px;
          font-size: 18px;
          font-weight: bold;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .desc{
          line-height: 20px;
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
}
</style>