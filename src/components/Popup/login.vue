<!--
 * @Author: wwssaabb
 * @Date: 2021-10-29 08:20:20
 * @LastEditTime: 2021-10-29 16:18:42
 * @FilePath: \CloudMusic-for-Vue3\src\components\Popup\login.vue
-->
<template>
  <Popup v-if="status" title="登录" :close="close">
    <div class="popup-login">
      <div class="content">
        <img
          class="phone-pic"
          src="https://s2.music.126.net/style/web2/img/qr_guide.png?9e98b85f77a8356819cc2c0e68251f6b"
          alt=""
        />
        <div class="qr-wrap d_ib">
          <span class="title">扫码登录</span>
          <div class="qr">
            <img :src="data.qrBase64" alt="" />
          </div>
          <span>使用 <span class="app td_u">网易云音乐APP</span> 扫码登录</span>
        </div>
      </div>
    </div>
  </Popup>
</template>

<script setup lang="ts">
import { ref, PropType, onMounted, onBeforeUnmount, watch } from "vue";
import { reqQrKey, reqQrContent, reqQrStatus } from "../../api";
import { qrStatusType } from "../../types/types";
import { BASE_URL } from "../../api/http";
import Popup from "../Popup.vue";

const props = defineProps({
  status: {
    type: Boolean,
    required: true,
  },
  close: {
    type: Function as PropType<() => void>,
    required: true,
  },
});

type dataType = {
  key: string;
  qrBase64: string;
  pollTimer: null | NodeJS.Timer;
  scanSuccessImg: string;
  status: qrStatusType;
  user: null | { avatarUrl: string; nickname: string };
};
const data = ref<dataType>({
  key: "",
  qrBase64: "",
  pollTimer: null,
  scanSuccessImg:
    "https://s2.music.126.net/style/web2/img/scan_success@2x.png?04686cf017faa629da155f56ee731500",
  status: 0,
  user: null,
});

const getKey = async () => {
  data.value.key = (await reqQrKey()).data.unikey;
};
const getQr = async () => {
  if (!data.value.key) return;
  data.value.qrBase64 = (await reqQrContent(data.value.key)).data.qrimg;
};
const onQrStatus = () => {
  if (!data.value.key) return;
  data.value.pollTimer = setInterval(async () => {
    let res = await reqQrStatus(data.value.key);
    data.value.status = res.code;
    if (res.code === 800) {
      //二维码不存在或已过期
      clearPollTimer();
    } else if (res.code === 803) {
      //成功授权
      document.cookie = res.cookies;
      data.value.user = {
        avatarUrl: res.avatarUrl,
        nickname: res.nickname,
      };
    }
  }, 1000);
};
const clearPollTimer = () => {
  if (data.value.pollTimer) clearInterval(data.value.pollTimer);
  data.value.key = "";
  data.value.qrBase64 = "";
};

const qrLogin = () => {
  if (!props.status) return;
  getKey().then(() => {
    getQr();
    onQrStatus();
  });
};

onMounted(() => {});
onBeforeUnmount(() => {
  //关闭二维码状态轮询
  clearPollTimer();
});
watch(
  () => props.status,
  () => {
    props.status ? qrLogin() : clearPollTimer();
  }
);
console.log(data.value);
</script>

<style lang="scss" scoped>
.popup-login {
  padding: 38px 0 20px;
  background: #fff;

  .content {
    .phone-pic {
      width: 125px;
      height: 220px;
      margin-left: 101px;
    }
    span {
      font-size: 12px;
      color: #00000066;
      &.app {
        color: #0c73c2;
      }
    }
    .qr-wrap {
      width: 200px;
      height: 205px;
      margin-left: 25px;
      text-align: center;
      .title {
        font-size: 18px;
        line-height: 24px;
        color: #333;
      }
      .qr {
        width: 138px;
        height: 138px;
        margin: 13px auto;
      }
    }
  }
}
</style>
