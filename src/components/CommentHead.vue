<!--
 * @Author: wwssaabb
 * @Date: 2021-09-28 16:17:14
 * @LastEditTime: 2021-10-12 09:35:20
 * @FilePath: \CloudMusic-for-Vue3\src\components\commentHead.vue
-->
<template>
  <div class="comment-list-head">
    <div class="comment-list-title">
      <span>评论</span>
      <span>共{{ commentCount }}条评论</span>
    </div>
    <div class="comment-input-wrap fss">
      <img
        src="http://s4.music.126.net/style/web2/img/default/default_avatar.jpg?param=50y50"
        alt=""
      />
      <div class="comment-input pr">
        <textarea placeholder="评论" v-model="commentContent"></textarea>
      </div>
    </div>
    <div class="comment-input-bottom fpbc">
      <div class="fast-icons">
        <i class="icon_smile_face cur_p"></i>
        <i class="icon_at cur_p"></i>
      </div>
      <div class="btn-wrap">
        <span>{{ 140 - commentContent.length }}</span>
        <span class="icon_btn_comment cur_p">评论</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  commentCount: {
    type: Number,
    required: true,
  },
  commentContent: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.comment-list-head {
  margin-bottom: 20px;
  .comment-list-title {
    border-bottom: 2px solid #c20c0c;
    span {
      font-size: 12px;
      color: #666;
      &:first-child {
        font-size: 20px;
        color: #333;
        margin-right: 20px;
      }
    }
  }

  .comment-input-wrap {
    margin-top: 20px;

    img {
      width: 50px;
      height: 50px;
    }
    .comment-input {
      flex: 1;
      border: 1px solid #cdcdcd;
      padding: 5px;
      margin-left: 15px;

      textarea {
        width: 88.60182%;
        height: 50px;
        border: none;
        outline: none;
        resize: none;
      }

      &::after {
        content: "";
        position: absolute;
        top: 15px;
        left: -5px;
        width: 10px;
        height: 10px;
        border-bottom: 1px solid #cdcdcd;
        border-left: 1px solid #cdcdcd;
        transform: rotate(45deg);
        background-color: #fff;
      }
    }
  }

  .comment-input-bottom {
    margin-top: 10px;
    padding-left: 65px;
    span {
      color: #999;
    }

    .fast-icons {
      i {
        margin-right: 10px;
      }
    }

    .btn-wrap {
      span.icon_btn_comment {
        color: #fff;
        font-size: 12px;
        text-align: center;
        line-height: 25px;
        margin-left: 10px;
      }
    }
  }
}
</style>
