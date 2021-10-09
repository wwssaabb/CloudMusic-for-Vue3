<!--
 * @Author: wwssaabb
 * @Date: 2021-09-28 15:59:12
 * @LastEditTime: 2021-10-09 16:21:20
 * @FilePath: \CloudMusic-for-Vue3\src\components\Toplist\rightHead.vue
-->
<template>
  <div class="list-head fss">
    <div class="cover pr">
      <img :src="showData.coverImgUrl + '?param=150y150'" alt="" />
      <i class="msk pa"></i>
    </div>
    <div class="msg">
      <div class="name">{{ showData.name }}</div>
      <div class="update-time fsc">
        <i class="icons_img"></i>
        <span>最近更新：{{ format(showData.updateTime, "MM月DD日") }}</span>
        <span>{{ "(" + getUpdateMsg() + ")" }}</span>
      </div>
      <div class="btns fsc">
        <span
          ><a class="icons1_img play_btn pr" href="javascript:;" title="播放"
            ><i class="icons1_img"
              ><i class="icons1_img" /><span class="text pa">播放</span></i
            ></a
          ><a
            class="icons1_img add_icon"
            href="javascript:;"
            title="添加到播放列表"
          ></a
        ></span>
        <span
          ><a class="icons1_img collect_icon pr" href="javascript:;"
            >{{ "(" + showData.subscribedCount + ")"
            }}<i class="icons1_img pa" /> </a
        ></span>
        <span
          ><a class="icons1_img share_icon pr" href="javascript:;"
            >{{ "(" + showData.shareCount + ")" }}<i class="icons1_img pa" /></a
        ></span>
        <span
          ><a class="icons1_img download_icon pr" href="javascript:;"
            >下载<i class="icons1_img pa" /></a
        ></span>
        <span
          ><a class="icons1_img comment_icon pr" href="javascript:;"
            >{{ "(" + showData.commentCount + ")"
            }}<i class="icons1_img pa" /></a
        ></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PlaylistType, formatType } from "../../types/types";
import { PropType } from "vue";
import { Props } from "element-plus";

const props = defineProps({
  showData: {
    type: Object as PropType<PlaylistType>,
    required: true,
  },
  format: {
    type: Function as PropType<
      (n: number, format: string, type?: formatType) => string | undefined
    >,
    required: true,
  },
  getUpdateMsg: {
    type: Function as PropType<() => string | undefined>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@mixin get_icon($x, $y, $size_x, $size_y) {
  width: #{$size_x}px;
  height: #{$size_y}px;
  background-position: #{$x}px #{$y}px;
}
.list-head {
  padding: 40px;

  .cover {
    box-sizing: border-box;
    display: inline-block;
    margin-right: 30px;
    border-radius: 5px;

    img {
      width: 150px;
      height: 150px;
      padding: 3px;
      border-radius: 5px;
      border: 1px solid #ccc;
    }
    .msk {
      top: 0;
      left: 0;
      background: url("https://music.163.com//style/web2/img/coverall.png?544674b7fdb18c4ed7fd416cdd1f1f33")
        no-repeat;
      @include get_icon(-230, -380, 150, 150);
    }
  }

  .msg {
    .name {
      font: 20px "Microsoft Yahei";
      color: #000;
      line-height: 24px;
      margin: 16px 0 4px;
    }
    .update-time {
      margin-bottom: 20px;

      i {
        display: inline-block;
        @include get_icon(-18, -682, 13, 13);
        margin-right: 5px;
      }
      span {
        line-height: 35px;
        font-size: 12px;
        color: #666;
        margin-right: 10px;
        &:last-child {
          color: #999;
        }
      }
    }

    .btns {
      align-items: stretch;
      span {
        display: inline-block;
        margin-right: 5px;
        a {
          display: inline-block;
          text-decoration: none;
          &.play_btn {
            @include get_icon(-184, -428, 66, 31);
            overflow: hidden;
            > i {
              display: inline-block;
              @include get_icon(0, -387, 66, 31);
              color: #fff;
              > i {
                display: inline-block;
                margin: 7px 2px 0 4px;
                @include get_icon(0, -1622, 20, 18);
                overflow: hidden;
              }
            }
            &:hover {
              > i {
                @include get_icon(0, -469, 66, 31);
                & > i {
                  @include get_icon(-28, -1622, 20, 18);
                }
              }
            }
            .text {
              top: 6px;
              left: 25px;
            }
          }
          &.add_icon {
            @include get_icon(0, -1588, 31, 31);
            &:hover {
              @include get_icon(-40, -1588, 31, 31);
            }
          }

          &.collect_icon {
            color: #333;
            font-size: 12px;
            @include get_icon(0, -977, 84, 31);
            padding: 8px 5px 0 28px;
            margin-right: 5px;

            i {
              right: -5px;
              top: 0;
              display: inline-block;
              @include get_icon(-245, -1020, 5, 31);
              z-index: 5;
            }

            &:hover {
              @include get_icon(0, -1063, 84, 31);
              i {
                @include get_icon(-245, -1106, 5, 31);
              }
            }
          }

          &.share_icon {
            color: #333;
            font-size: 12px;
            @include get_icon(0, -1225, 73, 31);
            padding: 8px 0 0 28px;
            margin-right: 5px;

            i {
              right: -5px;
              top: 0;
              display: inline-block;
              @include get_icon(-245, -1020, 5, 31);
              z-index: 5;
            }

            &:hover {
              @include get_icon(0, -1268, 73, 31);
              i {
                @include get_icon(-245, -1106, 5, 31);
              }
            }
          }

          &.download_icon {
            color: #333;
            font-size: 12px;
            @include get_icon(0, -2761, 56, 31);
            padding: 8px 0 0 28px;
            margin-right: 5px;

            i {
              right: -5px;
              top: 0;
              display: inline-block;
              @include get_icon(-245, -1020, 5, 31);
              z-index: 5;
            }

            &:hover {
              @include get_icon(0, -2805, 56, 31);
              i {
                @include get_icon(-245, -1106, 5, 31);
              }
            }
          }

          &.comment_icon {
            color: #333;
            font-size: 12px;
            @include get_icon(0, -1465, 80, 31);
            padding: 8px 0 0 28px;
            margin-right: 5px;

            i {
              right: -5px;
              top: 0;
              display: inline-block;
              @include get_icon(-245, -1020, 5, 31);
              z-index: 5;
            }

            &:hover {
              @include get_icon(0, -1508, 80, 31);
              i {
                @include get_icon(-245, -1106, 5, 31);
              }
            }
          }
        }
      }
    }
  }
}
</style>
