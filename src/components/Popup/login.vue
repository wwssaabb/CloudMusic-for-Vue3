<template>
  <Popup v-if="status" title="登录" :close="close">
    <div class="popup-login">
      <div class="content">
        <img class="phone-pic" src="https://s2.music.126.net/style/web2/img/qr_guide.png?9e98b85f77a8356819cc2c0e68251f6b" alt="">
        <div class="qr-wrap d_ib">
          <span class="title">扫码登录</span>
          <div class="qr">
            <img src="http://music.163.com/login?codekey=b36aa858-7c47-45a6-9674-bb72bb24d43a" alt="">
          </div>
          <span>使用 <span class="app td_u">网易云音乐APP</span> 扫码登录</span>
        </div>
      </div>
    </div>
  </Popup>
</template>

<script setup lang="ts">
import { ref,PropType } from 'vue'
import Popup from '../Popup.vue'

const props=defineProps({
  status:{
    type:Boolean,
    required:true
  },
  close:{
    type:Function as PropType<()=>void>,
    required:true
  }
})

const data=ref({

})

</script>

<style lang="scss" scoped>
.popup-login{
  padding:38px 0 20px;
  background: #fff;

  .content{
    .phone-pic{
      width: 125px;
      height: 220px;
      margin-left: 101px;
    }
    span{
        font-size: 12px;
        color: #00000066;
        &.app{
          color: #0c73c2;
        }
      }
    .qr-wrap{
      width: 200px;
      height: 205px;
      margin-left: 25px;
      text-align: center;
      .title{
        font-size: 18px;
        line-height: 24px;
        color: #333;
        
      }
      .qr{
        width: 138px;
        height: 138px;
        margin: 13px 0;
      }
    }
  }
}
</style>