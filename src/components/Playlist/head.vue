<!--
 * @Author: wwssaabb
 * @Date: 2021-10-18 10:09:13
 * @LastEditTime: 2021-10-19 17:44:33
 * @FilePath: \CloudMusic-for-Vue3\src\components\Playlist\head.vue
-->
<template>
  <div class="playlist-head fss">
    <div class="left icon_playlist_cover_bg f_nos">
      <img :src="detail.coverImgUrl + '?param=200y200'" alt="" />
    </div>
    <div class="right">
      <div class="name fss">
        <i class="icon_playlist_tag f_nosg"></i>
        <span>{{ detail.name }}</span>
      </div>
      <div class="creator fsc">
        <img :src="detail.creator.avatarUrl" alt="" />
        <span
          class="creator_name td_u"
          @click="router.push('/user/home?id=' + detail.creator.userId)"
          >{{ detail.creator.nickname }}
          <img
            v-if="detail.creator.avatarDetail"
            :src="detail.creator.avatarDetail.identityIconUrl + '?param=40y40'"
            alt=""
        /></span>
        <span class="create_time"
          >{{ timeFormat(detail.createTime) }} 创建</span
        >
      </div>
      <div class="feature fss">
        <PlayAddList></PlayAddList>
        <Normal
          iconBg="icon_playlist_collect"
          :text="'(' + detail.subscribedCount + ')'"
        ></Normal>
        <Normal
          iconBg="icon_playlist_share"
          :text="'(' + detail.shareCount + ')'"
        ></Normal>
        <Normal iconBg="icon_playlist_download" text="下载"></Normal>
        <Normal
          iconBg="icon_playlist_comment"
          :text="'(' + detail.commentCount + ')'"
        ></Normal>
      </div>
      <div class="tags">
        <span>标签：</span>
        <Normal
          v-for="tag in detail.tags"
          iconBg="icon_playlist_t_tag user_ns"
          :text="tag"
        ></Normal>
      </div>
      <div class="intro pr" ref="intro" :class="showFullIntro ? 'show' : ''">
        <span>介绍：</span>
        <span>{{ detail.description }}</span>
        <span
          class="btn_expand pa td_u"
          style="color: #0c73c2"
          @click="showFullIntro = !showFullIntro"
          v-if="isShowFullIntroControl"
          >{{ showFullIntro ? "收起" : "展开"
          }}<i class="icon_expand_arrow" :class="showFullIntro ? 'rot' : ''"></i
        ></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { PlaylistDetailType } from "../../types/types";
import { timeFormat } from "../../utils";
import PlayAddList from "../Button/play_addlist.vue";
import Normal from "../Button/normal.vue";

const router = useRouter();

const props = defineProps({
  detail: {
    type: Object as PropType<PlaylistDetailType>,
    required: true,
  },
});

const showFullIntro = ref(false);
const isShowFullIntroControl = ref(false);
const intro = ref<HTMLElement>();
onMounted(() => {
  if (!intro.value) return;
  let h = intro.value.clientHeight;
  console.log(h);
  isShowFullIntroControl.value = h >= 162;
  console.log(isShowFullIntroControl.value);
});
</script>

<style lang="scss" scoped>
.playlist-head {
  min-height: 250px;
  margin-bottom: 20px;

  .left {
    width: 208px;
    height: 208px;
    padding: 4px;
    margin-right: 20px;
    img {
      width: 200px;
      height: 200px;
    }
  }

  .right {
    .name {
      line-height: 24px;
      margin-bottom: 12px;
      span {
        margin-left: 10px;
        font-size: 20px;
        color: #333;
        line-height: 24px;
      }
    }

    .creator {
      margin-bottom: 20px;
      img {
        width: 35px;
        height: 35px;
        margin-right: 10px;
      }
      .creator_name {
        font-size: 12px;
        color: #0c73c2;
        margin-right: 20px;
        img {
          width: 13px;
          height: 13px;
        }
      }
      .create_time {
        font-size: 12px;
        color: #999;
      }
    }

    .feature {
      margin-bottom: 20px;

      .play_addlist {
        flex-shrink: 0;
        margin-right: 3px;
      }

      .icon_playlist_collect,
      .icon_playlist_share,
      .icon_playlist_download,
      .icon_playlist_comment {
        flex-shrink: 0;
        margin-right: 6px;
      }
    }

    .tags {
      width: 411px;
      height: 22px;
      margin-bottom: 5px;
      & span:first-child {
        font-size: 12px;
        color: #666;
        line-height: 22px;
      }
      .icon_playlist_t_tag.pr {
        margin: 0 16px 3px 0;
        .icon_close {
          width: calc(100% + 6px);
        }
      }
    }

    .intro {
      width: 411px;
      padding-bottom: 18px;
      margin: 6px 0 0;
      max-height: 163px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 8;
      -webkit-box-orient: vertical;

      .btn_expand {
        width: 411px;
        height: 18px;
        background: #fff;
        left: 0;
        bottom: 0;
        font-size: 12px;
        text-align: right;
      }
      &.show {
        height: auto;
        display: inline;
      }
      span {
        font-size: 12px;
        color: #666;
        line-height: 18px;
        white-space: pre-line;
      }
    }
  }
}
</style>
