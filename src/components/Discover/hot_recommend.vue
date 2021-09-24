<!--
 * @Author: wwssaabb
 * @Date: 2021-09-23 15:26:23
 * @LastEditTime: 2021-09-23 17:31:49
 * @FilePath: \CloudMusic-for-Vue3\src\components\Discover\hot_recommend.vue
-->

<template>
  <div class="hot-recommend wrap_l_c">
    <ElSkeleton
      :loading="tags.length === 0 || recommendList.length === 0"
      animated
      style="width: 730px; height: 513px"
    >
      <template #template>
        <div style="width: 728px; height: 513px">
          <div style="width: 688px; height: 33px">
            <ElSkeletonItem
              style="width: 100%; height: 100%"
              variant="text"
            ></ElSkeletonItem>
          </div>
          <div style="width: 688px; height: 480px; padding: 20px 0">
            <div
              v-for="item in 8"
              :style="
                'display:inline-block;width:140px;height:190px;' +
                (item % 4 === 1
                  ? 'margin-bottom:30px;'
                  : 'margin: 0 0 30px 42px;')
              "
            >
              <ElSkeletonItem
                style="
                  width: 140px;
                  height: 140px;
                  margin-bottom: 10px;
                  border-radius: 5px;
                "
                variant="image"
              ></ElSkeletonItem>
              <ElSkeletonItem
                style="width: 140px; height: 40px"
                variant="text"
              ></ElSkeletonItem>
            </div>
          </div>
        </div>
      </template>
      <template #default>
        <div class="title fpbc pr">
          <div class="content fcc">
            <span>热门推荐</span>
            <div class="tags" v-loading="tags.length === 0">
              <span class="tag td_u" v-for="item in tags" :key="item.id">{{
                item.name
              }}</span>
            </div>
          </div>
          <div class="more fcc">
            <span>更多</span>
            <i></i>
          </div>
        </div>
        <div
          class="recommend-list fss fw"
          v-loading="recommendList.length === 0"
        >
          <div class="item" v-for="item in recommendList" :key="item.id">
            <div
              class="cover pr box_bor_grad"
              :style="{
                background:
                  'radial-gradient(circle at -200% -200%,transparent,rgba(255, 255, 255, 0.3) 85%,rgba(0, 0, 0, 0.05) 85.5%,rgba(0, 0, 0, 0.05) 100%),url(' +
                  item.picUrl +
                  '?param=140y140)',
              }"
            >
              <div class="bot pa fpbc">
                <span class="fsc"
                  ><i class="bg_cover_icon"></i
                  >{{ playCountFormat(item.playCount) }}</span
                >
                <i class="bg_cover_icon play_icon"></i>
              </div>
            </div>
            <div class="desc text_line3 td_u">
              {{ item.name }}
            </div>
          </div>
        </div>
      </template>
    </ElSkeleton>
  </div>
</template>

<script setup lang="ts">
import { ElSkeleton, ElSkeletonItem } from "element-plus";
import { TagType, RecommendType } from "../../types/types";
import { PropType } from "vue";

const props = defineProps({
  tags: {
    type: Array as PropType<TagType[]>,
    required: true,
  },
  recommendList: {
    type: Array as PropType<RecommendType[]>,
    required: true,
  },
  playCountFormat: {
    type: Function,
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
.wrap_r_c {
  width: 100%;
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

.bg_cover_icon {
  cursor: pointer;
  background: url("https://music.163.com/style/web2/img/iconall.png?3b842806447563578eadc3999414e2e1")
    no-repeat;
}
.hot-recommend {
  padding: 20px 20px 40px;

  .recommend-list {
    padding: 20px 0;

    .item {
      width: 140px;

      &:not(:nth-child(4n + 1)) {
        margin: 0 0 30px 42px;
      }

      .cover {
        width: 140px;
        height: 140px;
        margin-bottom: 10px;
        border-radius: 5px 5px 0 0;
        overflow: hidden;

        .bot {
          left: 0;
          bottom: 0;
          width: 100%;
          height: 30px;
          padding: 0 5px;
          color: #ccc;
          background: rgba(0, 0, 0, 0.6);
          &::after {
            content: "";
            position: absolute;
            top: 2px;
            left: 0;
            width: 100%;
            height: 1px;
            background-color: #aaa;
            transform: scaleY(0.2);
          }

          span {
            font-size: 12px;
            i {
              width: 16px;
              height: 16px;
              background-position: 0 -20px;
              margin-right: 5px;
            }
          }

          .play_icon {
            @include get_icon(0, 0, 16, 16);
            &:hover {
              filter: brightness(1.5);
            }
          }
        }
      }

      .desc {
        width: 140px;
        word-wrap: break-word;
        line-height: 20px;
        max-height: 60px;
      }
    }
  }
}
</style>
