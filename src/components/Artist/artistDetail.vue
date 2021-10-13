<!--
 * @Author: wwssaabb
 * @Date: 2021-10-13 16:53:14
 * @LastEditTime: 2021-10-13 17:49:45
 * @FilePath: \CloudMusic-for-Vue3\src\components\Artist\artistDetail.vue
-->
<template>
  <div class="wrap" v-loading="detail === null">
    <div class="name-wrap" v-if="detail">
      <span class="name">{{ detail?.artist.name }}</span>
      <span class="alias">{{ getAlias(detail?.artist.briefDesc) }}</span>
    </div>
    <div class="cover pr" v-if="detail">
      <img :src="detail?.artist.cover + '?param=640y300'" alt="" />
      <i class="icon_artist_cover_mask cover_bg pa"></i>
      <div class="icons pa">
        <i class="icon_artist_collect collect_icon d_ib pa"></i>
        <i class="icon_artist_personal personal_icon d_ib pa"></i>
        <i></i>
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

const getAlias = (desc: string | undefined): string | undefined =>
  desc?.match(/(?<=\（)[^\）]+(?=\）)/g)?.[0];
</script>

<style lang="scss" scoped>
.wrap {
  height: 333px;
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
