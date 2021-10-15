<!--
 * @Author: wwssaabb
 * @Date: 2021-10-14 08:24:51
 * @LastEditTime: 2021-10-15 14:58:10
 * @FilePath: \CloudMusic-for-Vue3\src\views\Artist\Desc.vue
-->
<template>
  <div class="artist-desc-page" v-loading="data.introduction.length === 0">
    <div class="brief-desc">
      <div class="title">{{ name }}简介</div>
      <p>{{ data.briefDesc }}</p>
    </div>
    <div class="introduction">
      <div class="item" v-for="item in data.introduction">
        <div class="title">{{ item.ti }}</div>
        <p>{{ item.txt }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { ArtistDescType } from "../../types/types";
import { reqArtistDesc } from "../../api";

const router = useRouter();

//获取页面 query参数 id、name
const id: string | undefined = router.currentRoute.value.query.id?.toString();
const name: string | undefined =
  router.currentRoute.value.query.name?.toString();

type dataType = {
  introduction: ArtistDescType[];
  briefDesc: string;
};

const data = ref<dataType>({
  introduction: [],
  briefDesc: "",
});

const getArtistDesc = async () => {
  if (!id) return;
  let res = await reqArtistDesc(id);
  data.value.introduction = res.introduction;
  data.value.briefDesc = res.briefDesc;
};

onMounted(getArtistDesc);
console.log(data.value);
</script>

<style lang="scss" scoped>
.artist-desc-page {
  min-height: 300px;
}
.brief-desc,
.introduction {
  .title {
    margin: 28px 0 8px;
    font-weight: bold;
  }

  p {
    font-size: 12px;
    color: #666;
    line-height: 25px;
    white-space: pre-line;
  }
}

.brief-desc {
  .title {
    border-left: 4px solid #c10d0c;
    padding-left: 11px;
    line-height: 16px;
  }

  p {
    white-space: normal;
    text-indent: 2em;
  }
}
</style>
