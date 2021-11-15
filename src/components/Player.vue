<!--
 * @Author: wwssaabb
 * @Date: 2021-11-11 17:11:06
 * @LastEditTime: 2021-11-15 10:14:33
 * @FilePath: \CloudMusic-for-Vue3\src\components\Player.vue
-->
<template>
  <div class="musice-player pr" ref="player" :class="isShow ? 'show' : ''">
    <div class="response-area" ref="response"></div>
    <div class="main-area icon_player_bg pr">
      <div class="lock-hand icon_player_hand_bg pa">
        <div
          class="lock pa"
          :class="'icon_player_lock_' + (isLock ? 1 : 0)"
          @click="isLock = !isLock"
        ></div>
      </div>
    </div>
    <div class="content pa fsc">
      <div class="btns fsc">
        <div class="icon_player_last" title="上一首"></div>
        <div
          class="icon_player_play"
          v-if="data.status === 'pause'"
          @click="data.status = 'play'"
          title="播放"
        ></div>
        <div
          class="icon_player_pause"
          v-else
          @click="data.status = 'pause'"
          title="暂停"
        ></div>
        <div class="icon_player_next" title="下一首"></div>
      </div>
      <div class="cover pr">
        <img
          src="https://p1.music.126.net/aAup-qkupRYaLdTD0b7yHw==/1394180754062172.jpg?param=34y34"
          alt=""
        />
        <i class="icon_player_cover_mask pa"></i>
      </div>
      <div class="msg_precess fss fdc">
        <div class="msg fsc">
          <span class="song_name td_u">{{ "7 Years" }}</span>
          <i class="mv icon_player_mv"></i>
          <span class="artists td_u">{{ "MADILYN/Josh Evans" }}</span>
          <i class="link icon_player_link"></i>
        </div>
        <div class="process_wrap pr">
          <div class="process_line icon_player_process_bg pa"></div>
          <div
            class="load_line icon_player_process_load pa"
            style="width: 30%"
          ></div>

          <div class="done_line icon_player_process_done pa" style="width: 10%">
            <i class="icon_player_process_done_dot pa cur_p"></i>
          </div>
          <div class="time_count pa">
            <span class="cur">{{ "00:00" }}</span> / <span>{{ "02:33" }}</span>
          </div>
        </div>
      </div>
      <div class="other_handles fsc">
        <div class="icon_player_lyric cur_p" title="画中画歌词"></div>
        <div class="icon_player_collect cur_p" title="收藏"></div>
        <div class="icon_player_share cur_p" title="分享"></div>
      </div>
      <div class="handles fsc pr">
        <i class="icon_player_space"></i>
        <div
          class="icon_player_voice cur_p"
          @click="data.isShowVoiceControl = !data.isShowVoiceControl"
        ></div>
        <div
          class="cur_p"
          :class="'icon_player_mode_' + data.mode"
          :title="modeTitle"
          @click="changeMode"
        ></div>
        <!-- <div class="icon_player_mode_random"></div> -->
        <!-- <div class="icon_player_mode_one"></div> -->
        <div class="icon_player_list pr cur_p">
          <span class="count pr">18</span>
        </div>
        <div
          class="player_mode_show pa icon_player_mode_show_bg cur_p"
          v-if="data.isShowModeTitle"
        >
          {{ modeTitle }}
        </div>
        <div
          class="player_voice_control icon_player_voice_control pa"
          v-if="data.isShowVoiceControl"
        >
          <div class="voice_bar pa">
            <div class="voice_cur icon_player_voice_cur pa" style="height: 50%">
              <div
                class="voice_cur_dot icon_player_voice_cur_dot cur_p pa user_ns"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
const response = ref();
const player = ref();
const isShow = ref(false);
const isLock = ref(false);
const timer = ref<null | NodeJS.Timeout>(null);
type dataType = {
  status: "pause" | "play";
  mode: "loop" | "random" | "one";
  isShowModeTitle: boolean;
  isShowVoiceControl: boolean;
  ShowModeTitleTimer: null | NodeJS.Timeout;
};
const data = ref<dataType>({
  status: "pause",
  mode: "loop",
  isShowModeTitle: false,
  isShowVoiceControl: false,
  ShowModeTitleTimer: null,
});

const changeMode = () => {
  const clearTimer = () => {
    if (data.value.ShowModeTitleTimer) {
      clearTimeout(data.value.ShowModeTitleTimer);
      data.value.ShowModeTitleTimer = null;
    }
  };
  const setTimer = () =>
    setTimeout(() => {
      data.value.isShowModeTitle = false;
      clearTimer();
    }, 2000);
  let str = data.value.mode;
  data.value.mode =
    str === "loop" ? "random" : str === "random" ? "one" : "loop";
  if (data.value.ShowModeTitleTimer) {
    clearTimer();
    data.value.ShowModeTitleTimer = setTimer();
  }
  if (!data.value.isShowModeTitle) {
    data.value.isShowModeTitle = true;
    data.value.ShowModeTitleTimer = setTimer();
  }
};

const modeTitle = computed(() => {
  let str = data.value.mode;
  return str === "loop" ? "循环" : str === "random" ? "随机" : "单曲循环";
});

const packageEventDebounce = (delay: number = 2000) => {
  const fn = () => (isShow.value = false);
  const clearTimer = () => {
    if (timer.value) {
      clearTimeout(timer.value);
      timer.value = null;
    }
  };
  return function () {
    if (isLock.value) {
      isShow.value = true;
      clearTimer();
      return;
    }
    if (!isShow.value) isShow.value = true;
    if (timer.value) {
      clearTimer();
      isShow.value = true;
    }
    timer.value = setTimeout(fn, delay);
  };
};

onMounted(() => {
  response.value.addEventListener("mousemove", packageEventDebounce());
  player.value.addEventListener("mousemove", packageEventDebounce());
});
watch(
  () => isShow.value,
  () => console.log(isShow.value)
);
watch(() => isLock.value, packageEventDebounce());
</script>

<style lang="scss" scoped>
.musice-player {
  position: fixed;
  left: 0;
  bottom: -47px;
  width: 100vw;
  height: 53px;
  z-index: 5000;
  transition: 0.5s ease-out;

  &.show {
    bottom: 0;
    transition: 0.1s ease-in;
  }

  .response-area {
    // top: -14px;
    // width: 100vw;
    margin-top: -14px;
    height: 20px;
    margin-bottom: -6px;
    // border: 1px solid #ddd;
  }

  .main-area {
    // border: 1px solid #ddd;

    .lock-hand {
      top: -8px;
      right: 0;
      .lock {
        top: -1px;
        left: 19px;
      }
    }
  }
  .content {
    top: 7px;
    left: 50%;
    transform: translateX(-50%);
    width: 980px;
    height: 46px;
    .btns {
      width: 137px;
      div:not(:last-child) {
        margin-right: 8px;
      }
    }
    .cover {
      width: 34px;
      height: 34px;
      margin-right: 15px;
      img {
        width: 34px;
        height: 34px;
        border-radius: 3px;
      }
    }
    .msg_precess {
      width: 581px;
      height: 100%;

      .msg {
        height: 28px;
        .song_name {
          height: 28px;
          line-height: 28px;
          font-size: 12px;
          color: #e8e8e8;
        }
        .mv {
          margin-left: 3px;
        }
        .artists {
          max-width: 220px;
          font-size: 12px;
          color: #9b9b9b;
          margin-left: 15px;
        }
        .link {
          margin-left: 13px;
        }
      }

      .process_wrap {
        width: 581px;
        height: 9px;
        z-index: 20;
        .load_line {
          height: 9px;
          top: 0;
          left: 2px;
        }

        .process_line {
          width: 466px;
          height: 9px;
          top: 0;
          left: 0;
        }

        .done_line {
          height: 9px;
          top: 1px;
          left: 0;
        }
        .time_count {
          width: 70px;
          height: 14px;
          line-height: 14px;
          top: -4px;
          right: 30px;
          font-size: 12px;
          color: #797979;
          white-space: nowrap;
          span {
            font-size: 12px;
            color: #797979;
            &.cur {
              color: #a1a1a1;
            }
          }
        }
      }
    }

    .other_handles {
      width: 87px;
      height: 46px;
      div:not(:last-child) {
        margin-right: 2px;
      }
    }
    .handles {
      width: 126px;
      height: 46px;
      .count {
        display: inline-block;
        width: 26px;
        text-align: center;
        font-size: 12px;
        line-height: 27px;
        color: #666;
        text-shadow: 0 1px 0 #080707;
      }

      .player_mode_show {
        width: 81px;
        height: 39px;
        top: -36px;
        left: 10px;
        color: #fff;
        font-size: 12px;
        line-height: 39px;
        text-align: center;
        // display: none;
      }
      .player_voice_control {
        top: -113px;
        left: 10px;

        .voice_bar {
          top: 10px;
          left: 14px;
          width: 4px;
          height: 93px;
          padding: 0;
          // background: #eee;

          .voice_cur {
            left: 0;
            bottom: 0px;
            width: 4px;
            .voice_cur_dot {
              top: -10px;
              left: -7px;
            }
          }
        }
      }
    }
  }
}
</style>
