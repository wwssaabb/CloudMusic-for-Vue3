<!--
 * @Author: wwssaabb
 * @Date: 2021-09-27 17:20:03
 * @LastEditTime: 2021-09-28 14:58:49
 * @FilePath: \CloudMusic-for-Vue3\src\components\Toplist\CommentList.vue
-->
<template>
  <div class="list" v-loading="comments === null" v-if="comments !== null">
    <div class="item fss" v-for="item in comments.comments">
      <img :src="item.user.avatarUrl + '?param=50y50'" alt="" />
      <div class="right">
        <div class="comment-content">
          <span class="comment-user-name td_u cur_p"
            >{{ item.user.nickname }}
            <img
              v-if="item.user.vipRights !== null"
              :src="
                'https://p' +
                item.user.vipRights.redVipLevel +
                '.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4213923094/81eb/9288/68a5/a427a0dbf899d616c3f715272a71ee59.png'
              "
            />
          </span>
          <span>: {{ item.content }}</span>
        </div>
        <div
          class="other-comment-content"
          v-if="showBeReplied && item.beReplied.length !== 0"
        >
          <span class="comment-user-name td_u cur_p"
            >{{ item.beReplied[0].user.nickname }}：</span
          >
          <span>{{ item.beReplied[0].content }}</span>
        </div>
        <div class="comment-foot fpbc">
          <span>{{ format(item.time, "", "compare") }}</span>
          <span class="fcc"
            ><i class="icon_commend cur_p"></i
            ><span v-if="item.likedCount !== 0" class="liked_count"
              >({{ item.likedCount }})</span
            ><span class="btn_apply cur_p">回复</span></span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  reqCommentType,
  newApi_reqCommentType,
  formatType,
} from "../../types/types";
import { PropType } from "vue";
const props = defineProps({
  comments: {
    type: Object as PropType<reqCommentType | newApi_reqCommentType | null>,
    required: true,
  },
  format: {
    type: Function as PropType<
      (n: number, format: string, type: formatType) => string | undefined
    >,
    required: true,
  },
  showBeReplied: {
    type: Boolean,
    default: true,
  },
});
console.log(props);
</script>

<style lang="scss" scoped>
.list {
  .item {
    width: 100%;
    padding: 15px 0;
    border-bottom: 1px dotted #ccc;

    img {
      width: 50px;
      height: 50px;
      border-radius: 5px;
      margin-right: 10px;
    }

    .right {
      width: 658px;
      border: none;
      span {
        line-height: 20px;
        font-size: 12px;
        color: #333;
      }

      .other-comment-content {
        padding: 8px 19px;
        background: #f4f4f4;
        border: 1px solid #dedede;
        margin-top: 10px;
        span {
          color: #666;
        }
      }

      span.comment-user-name {
        display: inline-block;
        color: #0c73c2;
        margin-right: 5px;

        img {
          display: inline-block;
          width: 35px;
          height: 12px;
          line-height: 20px;
          margin: 0 0 0 5px;
        }
      }

      .comment-foot {
        margin-top: 15px;

        i {
          margin-right: 8px;
        }
        .liked_count {
          line-height: 14px;
          margin-right: 8px;
        }

        .btn_apply {
          line-height: 14px;
          padding-left: 8px;
          border-left: 1px solid #ccc;
        }
      }
    }
  }
}
</style>
