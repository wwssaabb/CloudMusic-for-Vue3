<!--
 * @Author: wwssaabb
 * @Date: 2021-10-28 13:51:34
 * @LastEditTime: 2021-11-09 15:04:00
 * @FilePath: \CloudMusic-for-Vue3\src\components\Popup.vue
-->
<template>
  <div class="popup-wrap pa" :style="style" ref="popup" v-draggable>
    <div class="head user_ns cur_m pr">
      {{ title }}
      <div class="close pa fcc cur_p" title="关闭窗口" @click="close">
        <i class="icon_popup_close"></i>
      </div>
    </div>
    <slot @mousemove.stop=""></slot>
  </div>
  <div class="m-mask"></div>
</template>

<script setup lang="ts">
import { computed, PropType, onMounted, ref, onUnmounted } from "vue";

const props = defineProps({
  width: {
    type: String,
    default: "530px",
  },
  height: {
    type: String,
    default: "auto",
  },
  title: {
    type: String,
    default: "",
  },
  close: {
    type: Function as PropType<() => void>,
    default: () => {},
  },
});
const popup = ref<Element>();
const position = ref({
  w: 0,
  h: 0,
});

const style = computed(
  () =>
    `width:${props.width};height:${props.height};top:${position.value.h}px;left:${position.value.w}px;`
);

const getPosition = () => {
  if (!popup.value) return;
  let c_w = window.document.body.clientWidth;
  let c_h = window.document.body.clientHeight;
  let w = props.width.match(/\d+/)?.[0];
  position.value.w = (c_w - parseInt(w ? w : "0")) / 2;
  position.value.h = (c_h - popup.value.clientHeight) / 2;
};

onMounted(() => {
  getPosition();
  window.addEventListener("resize", getPosition);
});
onUnmounted(() => {
  window.removeEventListener("resize", getPosition);
});
</script>

<style lang="scss" scoped>
.popup-wrap {
  border-radius: 4px;
  border: none;
  box-shadow: 0 5px 16px rgb(0 0 0 / 80%);
  z-index: 9998;
  overflow: hidden;

  .head {
    height: 38px;
    line-height: 38px;
    font-size: 14px;
    font-weight: bold;
    color: #fff;
    padding: 0 45px 0 18px;
    background: #2d2d2d;
    border-radius: 4px 4px 0 0;
    border-bottom: 1px solid #191919;

    .close {
      top: 11px;
      right: 15px;
      width: 20px;
      height: 20px;
    }
  }
}
</style>
