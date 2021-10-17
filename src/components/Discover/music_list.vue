<!--
 * @Author: wwssaabb
 * @Date: 2021-09-23 16:12:04
 * @LastEditTime: 2021-09-28 16:54:32
 * @FilePath: \CloudMusic-for-Vue3\src\components\Discover\music_list.vue
-->
<template>
  <div class="music-list wrap_l_c">
    <div class="title fpbc pr">
      <div class="content fcc"><span>榜单</span></div>
      <div class="more fcc"><span>更多</span> <i></i></div>
    </div>
    <div class="list-wrap fsc">
      <div class="list-item" v-for="(list, index) in musicList" :key="list.id">
        <div style="display: inline-block; width: 227.66px; height: 472px">
          <div class="head fss">
            <div
              class="cover pr box_ref"
              :style="{
                background:
                  'radial-gradient(circle at -200% -200%,transparent,rgba(255, 255, 255, 0.3) 85%,rgba(0, 0, 0, 0.05) 85.5%,rgba(0, 0, 0, 0.05) 100%),url(' +
                  list.coverImgUrl +
                  ') ',
                backgroundSize: '80px 80px',
              }"
            ></div>

            <div class="info">
              <div class="name td_u">
                <span>{{ list.name }}</span>
              </div>
              <div class="icons fss">
                <i class="list_icon play_icon"></i
                ><i class="list_icon collect_icon"></i>
              </div>
            </div>
          </div>
          <div class="content" v-loading="list.list.length === 0">
            <div
              class="item fsc"
              v-for="(item, index) in list.list"
              :key="item.id"
            >
              <span
                class="fcc"
                :style="{ color: Number(index) <= 2 ? '#c10d0c' : '#000' }"
                >{{ Number(index) + 1 }}</span
              >
              <span class="fsc td_u cur_p">{{ item.name }}</span>
              <span class="fpac"
                ><i class="list_icon play_icon"></i
                ><i class="list_icon addlist_icon"></i
                ><i class="icons_img collect_icon"></i
              ></span>
            </div>
          </div>
          <div class="foot">
            <span>查看更多>></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { } from "element-plus";
import type { DiscoverListType } from "../../types/types";
import { PropType } from "vue";

const props = defineProps({
  musicList: {
    type: Array as PropType<DiscoverListType[]>,
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
.list_icon {
  cursor: pointer;
  background: url("https://music.163.com/style/web2/img/index/index.png?9c18c9e05976f1fa1a2d3872f8f2cecc")
    no-repeat;
}
.icons_img {
  cursor: pointer;
  background: url("https://music.163.com/style/web2/img/icon.png?3ebcc5e99f593ffe4e3546e30253a2ce")
    no-repeat;
}

.title {
  border-bottom: 2px solid #c10d0c;
  line-height: 28px;
  padding: 0 10px 0 34px;

  &::after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 34px;
    height: 34px;
    background: url("https://s2.music.126.net/style/web2/img/index/index.png?f2aae9f5087098b4f6cd335f144555df")
      no-repeat -224px -158px;
  }

  span {
    font-size: 12px;
    color: #666;
  }

  .content {
    & > span {
      font-size: 20px;
      color: #333;
      margin: 0 10px 3px 0;
    }
    .tags {
      span {
        padding: 0 10px;
        &:not(:last-child) {
          border-right: 1px solid #ccc;
        }
      }
    }
  }
  .more {
    span {
      margin-right: 5px;
      &:hover {
        text-decoration: underline;
      }
    }

    i {
      width: 12px;
      height: 12px;
      background: url("https://s2.music.126.net/style/web2/img/index/index.png?f2aae9f5087098b4f6cd335f144555df")
        no-repeat 0 -241px;
    }
  }
}
.music-list {
  padding: 0 20px 40px 20px;

  .list-wrap {
    height: 472px;
    margin-top: 20px;
    background-color: #f4f4f4;
    border: 1px solid #d2d2d2;

    .list-item {
      width: calc(100% / 3);
      height: 472px;
      border-right: 1px solid #d2d2d2;
      color: #333;
      &:last-child {
        border: none;
      }

      .head {
        padding: 20px;

        .cover {
          width: 80px;
          height: 80px;
          border-radius: 5px;
          margin-right: 10px;
        }

        .info {
          flex: 1;

          .name {
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 5px;
          }

          .icons {
            width: 100%;
            height: 50px;
            i.play_icon {
              @include get_icon(-265, -202, 26, 26);
              margin-right: 10px;
              &:hover {
                opacity: 0.7;
              }
            }
            i.collect_icon {
              @include get_icon(-297.5, -202, 26, 26);
              &:hover {
                opacity: 0.7;
              }
            }
          }
        }
      }

      .content {
        height: 320px;

        .item {
          height: 32px;
          padding-left: 10px;

          &:nth-child(2n + 1) {
            background-color: #e8e8e8;
          }

          span {
            &:first-child {
              width: 35px;
              height: 32px;
              font-size: 16px;
            }

            &:nth-child(2) {
              display: inline-block;
              width: 175px;
              font-size: 12px;
              height: 32px;
              line-height: 32px;
              color: #000;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            &:last-child {
              display: none;
              width: 0;
              height: 32px;

              i.play_icon {
                margin-top: 2px;
                display: inline-block;
                margin-right: 2px;
              }
              i.collect_icon {
                margin-top: 2px;
                display: inline-block;
                margin-right: 2px;
              }
              i.addlist_icon {
                margin-top: 2px;
                display: inline-block;
              }
            }
          }

          &:hover {

            & span:nth-child(2) {
              width: 93px;
            }
            & span:last-child {
              display: flex;
              width: 82px;
              i.play_icon {
                @include get_icon(-267, -268, 17, 17);
                &:hover {
                  opacity: 0.7;
                }
              }
              i.collect_icon {
                @include get_icon(0, -698, 17, 17);
                &:hover {
                  opacity: 0.7;
                }
              }
              i.addlist_icon {
                @include get_icon(-297, -268, 17, 17);
                // border-radius: 50%;
                &:hover {
                  opacity: 0.7;
                }
              }
            }
          }
        }
      }

      .foot {
        padding: 0 10px;
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        background-color: #e8e8e8;
        height: 32px;
        color: #000;
        span {
          font-size: 12px;
        }
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
