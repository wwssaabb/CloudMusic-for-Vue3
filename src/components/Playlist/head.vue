<!--
 * @Author: wwssaabb
 * @Date: 2021-10-18 10:09:13
 * @LastEditTime: 2021-10-18 16:36:07
 * @FilePath: \CloudMusic-for-Vue3\src\components\Playlist\head.vue
-->
<template>
  <div class="playlist-head fss">
    <div class="left icon_playlist_cover_bg f_nos">
      <img :src="detail.coverImgUrl + '?param=200y200'" alt="" />
    </div>
    <div class="right">
      <div class="name fsc">
        <i class="icon_playlist_tag"></i>
        <span>{{ detail.name }}</span>
      </div>
      <div class="creator fsc">
        <img :src="detail.creator.avatarUrl" alt="" />
        <span class="creator_name td_u"
          >{{ detail.creator.nickname }}
          <img
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
      <div class="intro">
        <span>介绍：</span>
        <span>{{ detail.description }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { PlaylistDetailType } from "../../types/types";
import { timeFormat } from "../../utils";
import PlayAddList from "../Button/play_addlist.vue";
import Normal from "../Button/normal.vue";

const props = defineProps({
  detail: {
    type: Object as PropType<PlaylistDetailType>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.playlist-head {
  height: 250px;

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
      height: 24px;
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
      margin-top: 4px;
      span {
        font-size: 12px;
        color: #666;
        line-height: 18px;
      }
    }
  }
}
</style>
