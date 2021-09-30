<!--
 * @Author: wwssaabb
 * @Date: 2021-09-30 16:21:42
 * @LastEditTime: 2021-09-30 17:39:42
 * @FilePath: \CloudMusic-for-Vue3\src\components\DjRadio\rankList.vue
-->

<template>
  <div class="recommend-list">
    <Title title="节目排行榜">
      <template #right>
        <span class="more td_u cur_p">更多></span>
      </template>
    </Title>
    <div class="list" v-loading="list.length === 0">
      <div
        class="item fsc cur_p"
        v-for="item in list"
        :key="item.program.id"
      >
        <div class="rank fd_col fcc">
          <span>{{ item.rank < 10 ? "0" + item.rank : item.rank }}</span>
          <span class="fcc"
            ><i :class="getRankIcon(item.lastRank, item.rank)"></i
            ><span v-if="item.lastRank > 0">{{
              Math.abs(item.rank - item.lastRank)
            }}</span></span
          >
        </div>
        <div class="cover pr">
          <img :src="item.program.coverUrl + '?param=40x40'" alt="" />
          <i class="icon_program_play pa"></i>
        </div>
        <div class="center">
          <div class="name t_ovl1">
            <span class="td_u" :title="item.program.name">{{ item.program.name }}</span>
          </div>
          <div class="desc t_ovl1">
            <span class="td_u" :title="item.program.radio.name">{{ item.program.radio.name }}</span>
          </div>
        </div>
        <div class="hot pr">
          <i
            class="hot-bar d_ib pa"
            :style="'width: ' + getHotRatio(list[0].score, item.score) + '%'"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Title from "../Title.vue";
import { RankListType } from "../../types/types";
import { PropType } from "vue";

const props = defineProps({
  list: {
    type: Array as PropType<RankListType[]>,
    required: true,
  },
});

const getRankIcon = (last: number, now: number): string => {
  const prefixed = "status_icon_";
  const status = {
    new: prefixed + "new",
    stay: prefixed + "stay",
    up: prefixed + "up",
    down: prefixed + "down",
  };

  return (
    prefixed +
    (last < 0 ? "new" : last === now ? "stay" : last < now ? "down" : "up")
  );
};
const getHotRatio = (max: number, self: number): number => {
  console.log((self / max) * 100)
  return (self / max) * 100;
};
</script>

<style lang="scss" scoped>
.recommend-list {
  width: 426px;

  .more {
    font-size: 12px;
    color: #666;
  }

  .list {
    width: 100%;
    height: 601px;
    border: 1px solid #e2e2e2;
    border-top: none;

    .item {
      height: 60px;
      padding: 10px 0;
      background: #fff;

      &:nth-child(2n) {
        background: #f7f7f7;
      }

      .rank {
        width: 47px;
        color: #da4545;
        text-align: center;
        overflow: hidden;
        span {
          font-size: 12px;
        }

        .status_icon_stay + span {
          color: #999;
        }
        .status_icon_up + span {
          color: #ba2226;
        }
        .status_icon_down + span {
          color: #4abbeb;
        }
      }

      .cover {
        i {
          display: none;
          opacity: 1;
          left: 9px;
          top: 9px;
        }
      }

      &:hover {
        background: #eeeeee;
        .cover {
          i {
            display: block;
            opacity: 1;
          }
        }
      }

      .center {
        margin-left: 10px;
        color: #333;
        .name,
        .desc {
          width: 208px;
          height: 20px;
          line-height: 20px;
          span {
            font-size: 12px;
          }
        }
        .desc {
          color: #999;
        }
      }

      .hot {
        width: 100px;
        height: 8px;
        background: url("https://music.163.com//style/web2/img/table.png?66c616bbd6d49f9b9acff4d398211404")
          no-repeat;
        background-position: 0 -240px;

        i.hot-bar {
          top: 0;
          left: 0;
          height: 8px;
          background: url("https://music.163.com//style/web2/img/table.png?66c616bbd6d49f9b9acff4d398211404")
            no-repeat;
          background-position: right -318px;
          overflow: hidden;
          &::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: calc(100% - 3px);
            height: 8px;
            background: url("https://music.163.com//style/web2/img/table.png?66c616bbd6d49f9b9acff4d398211404")
              no-repeat;
            background-position: 0 -304px;
          }
        }
      }
    }
  }
}
</style>
