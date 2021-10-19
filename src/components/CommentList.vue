<!--
 * @Author: wwssaabb
 * @Date: 2021-09-27 17:20:03
 * @LastEditTime: 2021-10-19 17:33:48
 * @FilePath: \CloudMusic-for-Vue3\src\components\CommentList.vue
-->
<template>
  <div class="list" v-loading="comments.length === 0">
    <div class="item fss" v-for="item in comments">
      <img :src="item.user.avatarUrl + '?param=50y50'" alt="" />
      <div class="right">
        <div class="comment-content">
          <span
            class="comment-user-name td_u cur_p"
            @click="router.push('/user/home?id=' + item.user.userId)"
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
import { formatType, CommentType } from "../types/types";
import { PropType } from "vue";
import { useRouter } from "vue-router";
import moment from "../utils/moment";

const router = useRouter();

const props = defineProps({
  comments: {
    type: Array as PropType<CommentType[]>,
    required: true,
  },
  showBeReplied: {
    type: Boolean,
    default: true,
  },
});

const format = (n: number, format: string, type: formatType = "normal") => {
  const handle = {
    normal: () => moment(n).format(format), //正常格式化时间
    compare: () => {
      //比较时间
      let before = new Date(n);
      let now = new Date();
      //时间戳差，毫秒值
      let diff = now.getTime() - before.getTime();
      if (diff < 3600000) {
        //一个小时内 格式：多少分钟之前
        return moment(n).startOf("hour").fromNow();
      } else if (diff >= 3600000 && diff <= 86400000) {
        //一天以内  格式 16:44 或 昨天 16:45
        return moment(n).subtract(0, "days").calendar();
      } else if (diff >= 86400000 && diff <= 30758400000) {
        //一年以内 格式： 9月22日 06:55
        return moment(n).format("MM月DD日 HH:mm");
      } else if (diff > 30758400000) {
        //一年以外 格式：2014年6月30日
        return moment(n).format("YYYY年MM月DD日");
      }
    },
    duration: () => {
      //获取时间长度 例子：03:05
      let duration = moment.duration(n);
      let m = duration.minutes();
      let s = duration.seconds();
      return (m >= 10 ? m : "0" + m) + ":" + (s >= 10 ? s : "0" + s);
    },
  };

  //时间格式化
  return handle[type]();
};
</script>

<style lang="scss" scoped>
.list {
  min-height: 85px;
  .item {
    width: 100%;
    padding: 15px 0;
    &:not(:last-child) {
      border-bottom: 1px dotted #ccc;
    }

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
