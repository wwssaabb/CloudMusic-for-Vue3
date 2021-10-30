<!--
 * @Author: wwssaabb
 * @Date: 2021-10-29 08:20:20
 * @LastEditTime: 2021-10-30 11:12:54
 * @FilePath: \CloudMusic-for-Vue3\src\components\Popup\login.vue
-->
<template>
  <Popup v-if="status" title="登录" :close="close">
    <div class="popup-login">
      <div class="content">
        <div
          v-if="data.status === 0 || data.status === 800 || data.status === 801"
        >
          <img
            class="phone-pic"
            src="https://s2.music.126.net/style/web2/img/qr_guide.png?9e98b85f77a8356819cc2c0e68251f6b"
            alt=""
          />
          <div class="qr-wrap d_ib">
            <span class="title">扫码登录</span>
            <div class="qr pr" v-loading="data.qrBase64 === ''">
              <img :src="data.qrBase64" alt="" />
              <div class="invalid pa fcc fdc" v-show="data.status === 800">
                <div class="invalid-text mb5">二维码已失效</div>
                <div class="refresh-btn" @click="refreshQr">点击刷新</div>
              </div>
            </div>
            <span
              >使用 <span class="app td_u">网易云音乐APP</span> 扫码登录</span
            >
          </div>
        </div>
        <div class="scan-success" v-if="data.status === 802">
          <img :src="data.scanSuccessImg" alt="" />
          <div class="text">扫描成功</div>
          <div class="tip">请在手机上确认登录</div>
        </div>
        <div class="changeOtherWay">
          <div class="btn cur_p">选择其他登录模式</div>
        </div>
      </div>
    </div>
  </Popup>
</template>

<script setup lang="ts">
import { ref, PropType, onMounted, onBeforeUnmount, watch } from "vue";
import { reqQrKey, reqQrContent, reqQrStatus } from "../../api";
import { qrStatusType } from "../../types/types";
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
      props.close();
    }
  }, 1000);
};
const clearPollTimer = () => {
  if (data.value.pollTimer) clearInterval(data.value.pollTimer);
  data.value.pollTimer = null;
};

const refreshQr = () => {
  data.value.status = 0;
  data.value.key = "";
  data.value.qrBase64 = "";
  qrLogin();
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

        .invalid {
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: rgba(255, 255, 255, 0.9);

          .invalid-text {
            font-size: 12px;
            color: rgba(0, 0, 0, 0.8);
            font-weight: 500;
          }
          .refresh-btn {
            width: 66px;
            height: 26px;
            line-height: 24px;
            text-align: center;
            border-radius: 4px;
            background: linear-gradient(180deg, #81dd81 0%, #55a055 100%);
            border: 1px solid #5baf5b;
            box-shadow: inset 0 -1px 1px 1px rgb(185 230 185 / 31%);
            color: #fff;
            font-size: 12px;
          }
        }
      }
    }

    .scan-success {
      img {
        display: block;
        width: 140px;
        height: 140px;
        margin: 0 auto;
      }
      .text {
        margin-top: 12px;
        font-size: 18px;
        font-weight: 450;
        line-height: 24px;
        color: #000000cc;
        text-align: center;
      }
      .tip {
        margin: 4px 0 30px;
        font-size: 14px;
        color: #333;
        text-align: center;
      }
    }

    .changeOtherWay {
      padding-top: 20px;
      .btn {
        width: 118px;
        height: 28px;
        margin: 20px auto 0;
        font-size: 12px;
        border: 1px solid #979797;
        border-radius: 15px;
        line-height: 28px;
        text-align: center;
        color: rgba(0, 0, 0, 0.8);
      }
    }
  }
}
</style>
