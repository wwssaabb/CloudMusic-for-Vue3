<!--
 * @Author: wwssaabb
 * @Date: 2021-10-16 11:38:53
 * @LastEditTime: 2021-10-19 15:41:20
 * @FilePath: \CloudMusic-for-Vue3\src\components\Mv\recommends.vue
-->
<template>
  <div class="recommend-mvs" v-if="list.length !== 0">
    <div class="title">相关推荐</div>
    <div class="list">
      <div class="item fss" v-for="item in list" :key="item.vid">
        <div class="cover pr f_nos">
          <img :src="item.coverUrl + '?param=96y54'" alt="" />
          <div class="playCount pa d_ib">
            <span class="fsc">
              <span>{{ playCountFormat(item.playTime) }}</span>
              <i class="icon_mv_camera"></i>
            </span>
          </div>
        </div>
        <div class="msg fd_col t_ovl1 f_nog">
          <span class="name d_ib t_ovl1 td_u">{{ item.title }}</span>
          <span class="duration d_ib t_ovl1">{{
            longTimeFormat(item.durationms)
          }}</span>
          <span class="artist d_ib t_ovl1"
            >by
            <span
              class="td_u"
              v-html="
                getCreatorHtml(
                  item.creator,
                  'userName',
                  'userId',
                  '/user/home?id='
                )
              "
            ></span
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { RecommendsType } from "../../types/types";
import { longTimeFormat, playCountFormat, getCreatorHtml } from "../../utils";

const Props = defineProps({
  list: {
    type: Array as PropType<RecommendsType[]>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.recommend-mvs {
  margin-bottom: 20px;
  .title {
    margin-bottom: 20px;
    line-height: 24px;
    font-size: 12px;
    color: #333;
    border-bottom: 1px solid #ccc;
    font-weight: bold;
  }

  .list {
    .item {
      margin-bottom: 15px;
      .cover {
        margin-right: 10px;
        img {
          width: 96px;
          height: 54px;
        }
        .playCount {
          // width: 96px;
          left: 0;
          height: 20px;
          line-height: 20px;
          top: 0;
          right: 0;
          padding-right: 5px;
          text-align: right;
          background: linear-gradient(
            to right,
            rgba(#000, 0.3),
            rgba(#000, 0.8)
          );
          text-shadow: -2px 1px rgb(0 0 0 / 40%);

          .icon_mv_camera {
            margin-right: 2px;
          }

          span {
            font-size: 12px;
            color: #fff;
          }

          & > span {
            flex-direction: row-reverse;
          }
        }
      }
      .msg {
        width: 95px;
        span {
          font-size: 12px;
          color: #999;
          line-height: 18px;

          &.name {
            color: #333;
          }
        }
      }
    }
  }
}
</style>
