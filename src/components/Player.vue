<!--
 * @Author: wwssaabb
 * @Date: 2021-11-11 17:11:06
 * @LastEditTime: 2021-11-11 18:02:36
 * @FilePath: \CloudMusic-for-Vue3\src\components\Player.vue
-->
<template>
  <div class="musice-player" :class="isShow ? 'show' : ''">
    <div class="response-area" ref="response"></div>
    <div class="main-area icon_player_bg pr">
      <div class="lock-hand icon_player_hand_bg pa"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
const response = ref();
const isShow = ref(false);

onMounted(() => {
  console.log(response.value);
  response.value.addEventListener("mousemove", () => (isShow.value = true));
  // response.value.addEventListener("mouseleave", () => (isShow.value = false));
});
watch(
  () => isShow.value,
  () => console.log(isShow.value)
);
</script>

<style lang="scss" scoped>
.musice-player {
  position: fixed;
  left: 0;
  bottom: -47px;
  width: 100vw;
  height: 53px;
  z-index: 5000;

  &.show {
    bottom: 0;
    transition: 0.5s ease-in;
  }

  .response-area {
    position: absolute;
    top: -14px;
    width: 100vw;
    height: 20px;
    margin-bottom: -6px;
  }

  .main-area {
    .lock-hand {
      top: -8px;
      right: -67px;
    }
  }
}
</style>
