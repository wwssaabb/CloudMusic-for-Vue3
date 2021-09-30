<!--
 * @Author: wwssaabb
 * @Date: 2021-09-30 15:39:29
 * @LastEditTime: 2021-09-30 16:34:55
 * @FilePath: \CloudMusic-for-Vue3\src\components\DjRadio\recommendList.vue
-->
<template>
  <div class="recommend-list">
    <Title title="推荐节目">
      <template #right>
        <span class="more td_u cur_p">更多></span>
      </template>
    </Title>
    <div class="list" v-loading="list.length === 0">
      <div class="item fsc cur_p" v-for="item in list" :key="item.id">
        <div class="cover pr">
          <img :src="item.coverUrl + '?param=40x40'" alt="" />
          <i class="icon_program_play pa"></i>
        </div>
        <div class="center">
          <div class="name t_ovl1">
            <span class="td_u" :title="item.name">{{ item.name }}</span>
          </div>
          <div class="desc t_ovl1">
            <span class="td_u" :title="item.radio.name">{{ item.radio.name }}</span>
          </div>
        </div>
        <div class="tag cur_p">{{ item.radio.category }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Title from "../Title.vue";
import { programType } from "../../types/types";
import { PropType } from "vue";

const props = defineProps({
  list: {
    type: Array as PropType<programType[]>,
    required: true,
  },
});
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
      padding: 10px 20px;
      background: #fff;

      &:nth-child(2n) {
        background: #f7f7f7;
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
        width: 272px;
        margin-left: 10px;
        color: #333;
        .name,
        .desc {
          width: 254px;
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

      .tag {
        font-size: 12px;
        height: 16px;
        line-height: 16px;
        color: #999;
        border: 1px solid #999;
        padding: 0 6px;
        justify-self: end;

        &:hover {
          color: #666;
          border-color: #666;
        }
      }
    }
  }
}
</style>
