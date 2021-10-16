<!--
 * @Author: wwssaabb
 * @Date: 2021-10-13 16:53:14
 * @LastEditTime: 2021-10-16 17:15:39
 * @FilePath: \CloudMusic-for-Vue3\src\components\Artist\artistDetail.vue
-->
<template>
  <div class="wrap" v-loading="detail === null">
    <div class="name-wrap" v-if="detail">
      <span class="name">{{ detail.name }}</span>
      <span class="alias">{{ detail.alias.join(";") }}</span>
    </div>
    <div class="cover pr" v-if="detail">
      <img :src="detail.picUrl + '?param=640y300'" alt="" />
      <i class="icon_artist_cover_mask cover_bg pa"></i>
      <div class="icons pa">
        <i class="icon_artist_collect collect_icon d_ib pa"></i>
        <i class="icon_artist_personal personal_icon d_ib pa"></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { ArtistDetailType } from "../../types/types";

const props = defineProps({
  detail: {
    type: Object as PropType<ArtistDetailType>,
    default: null,
  },
});
</script>

<style lang="scss" scoped>
.wrap {
  height: 336px;
}
.name-wrap {
  span.name {
    font-size: 24px;
    color: #333;
    line-height: 34px;
    margin-right: 10px;
  }
  span.alias {
    font-size: 14px;
    color: #999;
    line-height: 32px;
  }
}

.cover {
  width: 640px;
  height: 300px;
  img {
    width: 640px;
    height: 300px;
    margin: 0;
  }

  .cover_bg {
    top: 0;
    left: 0;
  }

  .icons {
    width: 100%;
    right: 0;
    bottom: 18px;

    i {
      &.collect_icon {
        right: 20px;
        bottom: 0;
      }

      &.personal_icon {
        right: 114px;
        bottom: 0;
      }
    }
  }
}
</style>
