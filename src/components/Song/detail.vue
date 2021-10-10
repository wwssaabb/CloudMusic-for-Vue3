<!--
 * @Author: wwssaabb
 * @Date: 2021-10-09 15:18:37
 * @LastEditTime: 2021-10-09 18:00:15
 * @FilePath: \CloudMusic-for-Vue3\src\components\Song\detail.vue
-->
<template>
  <div class="song-detail fss">
    <div class="left">
      <div class="cover pr" v-if="data">
        <img :src="data.al.picUrl + '?param=130y130'" alt="" />
        <i class="disk icon_cover_disk pa"></i>
      </div>
      <div class="out-path fcc">
        <i class="icon_music"></i>
        <span>生成外链播放器</span>
      </div>
    </div>
    <div class="right">
      <div class="song-name fsc">
        <i class="icon_single_song"></i>
        <span>{{ data?.name }}</span>
        <i class="icon_mv"></i>
      </div>
      <div class="desc">
        <div class="artist">
          歌手: <span class="td_u">{{ data?.ar[0].name }}</span>
        </div>
        <div class="album">
          所属专辑: <span class="td_u">{{ data?.al.name }}</span>
        </div>
      </div>
      <div class="features fsc">
        <div class="play_addlist">
          <i class="icon_btn_play_bg pr cur_p" title="播放">
            <span class="text pa">播放</span>
          </i>
          <i class="icon_add_play cur_p" title="添加到播放列表"></i>
        </div>
        <div class="collect pr cur_p">
          <i class="icon_btn_collect_bg"><span class="text pa">收藏</span></i>
        </div>
        <div class="share pr cur_p">
          <i class="icon_btn_share_bg"><span class="text pa">分享</span></i>
        </div>
        <div class="download pr cur_p">
          <i class="icon_btn_download_bg"><span class="text pa">下载</span></i>
        </div>
        <div class="comment cur_p">
          <i class="icon_btn_comment_bg"
            ><span class="text"
              >(<span>{{ 454545 }}</span
              >)</span
            ></i
          >
        </div>
      </div>
      <div class="lyric pr">
        {{ lyric.replace(/((\[[\d\:\.]+\])+)/g, "") }}

        <div class="expand-btn pa">展开<i class="icon_expand_arrow"></i></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SongType } from "../../types/types";
import { PropType } from "vue";
const props = defineProps({
  data: {
    type: Object as PropType<SongType | undefined>,
    default: undefined,
  },
  lyric: {
    type: String,
    default: "",
  },
});
console.log(props.lyric);
</script>

<style lang="scss" scoped>
.song-detail {
  padding: 47px 30px;

  .left {
    width: 206px;

    .cover {
      width: 206px;
      height: 205px;
      padding: 38px 38px;
      .disk {
        left: 0px;
        top: 0px;
      }
      margin-bottom: 20px;
    }
    .out-path {
      width: 205px;
      text-align: center;
      span {
        font-size: 12px;
        color: #0c73c2;
        text-decoration: underline;
      }
    }
  }
  .right {
    width: 420px;
    margin-left: 20px;

    .song-name {
      span {
        font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
        font-size: 24px;
        color: #333;
        margin: 0 10px;
      }
    }

    .desc {
      .artist,
      .album {
        font-size: 12px;
        color: #999;
        margin: 10px 0;
        span {
          font-size: 12px;
          color: #0c73c2;
        }
      }
    }

    .features {
      margin-bottom: 25px;
      .play_addlist {
        height: 31px;
        margin-right: 5px;
        span.text {
          line-height: 21px;
          font-size: 12px;
          color: #fff;
          left: 33px;
          top: 5px;
        }
      }
      .collect,
      .share,
      .comment,
      .download {
        width: 60px;
        height: 31px;
        margin-right: 5px;
        background: url("https://music.163.com/style/web2/img/button2.png?28b755c9f690485ed9b4e84553693db5")
          no-repeat;
        background-position: right -1020px;

        &:hover {
          background-position: right -1106px;
        }

        span.text {
          line-height: 21px;
          font-size: 12px;
          color: #333;
          left: 27px;
          top: 6px;
        }
      }

      .comment {
        width: auto;
        padding-right: 3px;

        i.icon_btn_comment_bg {
          width: auto;
          padding: 5px 0 0 29px;
          overflow: hidden;
        }
        span.text {
          display: inline-block;
          overflow: hidden;
          span {
            font-size: 12px;
            color: #333;
          }
        }
      }
    }

    .lyric {
      margin: 13px;
      white-space: pre-line;
      font-size: 12px;
      color: #333;
      line-height: 23px;
      max-height: 322px;
      overflow: hidden;
    }
  }
}
</style>
