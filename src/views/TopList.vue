<!--
 * @Author: wwssaabb
 * @Date: 2021-09-18 14:19:05
 * @LastEditTime: 2021-09-27 18:01:52
 * @FilePath: \CloudMusic-for-Vue3\src\views\TopList.vue
-->
<template>
  <div class="top-list-page fss">
    <div class="top-list-wrap fss">
      <div class="left">
        <div
          class="list"
          v-for="lists in [data.feature, data.media]"
          :key="lists.id"
        >
          <div class="title">
            <span>{{ lists.title }}</span>
          </div>
          <div
            class="content"
            v-loading="lists.list.length === 0"
            :style="lists.list.length === 0 ? 'height:240px' : ''"
          >
            <div
              class="item fsc"
              :class="data.showData.id === item.id ? 'active' : ''"
              v-for="item in lists.list"
              :key="item.id"
            >
              <img :src="item.coverImgUrl + '?param=40y40'" alt="" />
              <div class="msg fd_col">
                <span class="name">{{ item.name }}</span>
                <span class="update_msg">{{ item.updateFrequency }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="right"
        v-loading="data.showData.id === 0"
        :style="data.showData.id === 0 ? 'height:calc(100vh - 105px)' : ''"
      >
        <div class="list-head fss">
          <div class="cover pr">
            <img :src="data.showData.coverImgUrl + '?param=150y150'" alt="" />
            <i class="msk pa"></i>
          </div>
          <div class="msg">
            <div class="name">{{ data.showData.name }}</div>
            <div class="update-time fsc">
              <i class="icons_img"></i>
              <span
                >最近更新：{{
                  format(data.showData.updateTime, "MMM Do DD")
                }}</span
              >
              <span>{{ "(" + getUpdateMsg() + ")" }}</span>
            </div>
            <div class="btns fsc">
              <span
                ><a
                  class="icons1_img play_btn pr"
                  href="javascript:;"
                  title="播放"
                  ><i class="icons1_img"
                    ><i class="icons1_img" /><span class="text pa"
                      >播放</span
                    ></i
                  ></a
                ><a
                  class="icons1_img add_icon"
                  href="javascript:;"
                  title="添加到播放列表"
                ></a
              ></span>
              <span
                ><a class="icons1_img collect_icon pr" href="javascript:;"
                  >{{ "(" + data.showData.subscribedCount + ")"
                  }}<i class="icons1_img pa" /> </a
              ></span>
              <span
                ><a class="icons1_img share_icon pr" href="javascript:;"
                  >{{ "(" + data.showData.shareCount + ")"
                  }}<i class="icons1_img pa" /></a
              ></span>
              <span
                ><a class="icons1_img download_icon pr" href="javascript:;"
                  >下载<i class="icons1_img pa" /></a
              ></span>
              <span
                ><a class="icons1_img comment_icon pr" href="javascript:;"
                  >{{ "(" + data.showData.commentCount + ")"
                  }}<i class="icons1_img pa" /></a
              ></span>
            </div>
          </div>
        </div>
        <div class="list-wrap">
          <div class="title fpbc">
            <div>
              <span class="title-name">歌曲列表</span>
              <span>{{ data.showData.trackCount }}首歌</span>
            </div>
            <div>
              播放：<span style="color: #c20c0c">{{
                data.showData.playCount
              }}</span>
              次
            </div>
          </div>
          <div class="list">
            <div class="list-title fsc">
              <div class="index"></div>
              <div class="name">标题</div>
              <div class="time">时长</div>
              <div class="singer">歌手</div>
            </div>
            <div class="content">
              <div
                class="item fsc"
                v-for="(item, index) in data.showData.tracks"
                :key="item.id"
              >
                <div class="index fpbc">
                  <span>{{ index + 1 }}</span>
                  <span class="rank_icon fcc"
                    ><i :class="getStatus(index)">{{
                      getRankNumber(index) === undefined
                        ? ""
                        : getRankNumber(index)
                    }}</i></span
                  >
                </div>
                <div class="name cur_p fsc">
                  <img
                    v-if="index <= 2"
                    :src="item.al.picUrl + '?param=50y50&quality=100'"
                    alt=""
                  />
                  <i class="play_icon f_nos"></i>
                  <span
                    class="name-content td_u f_nos t_ovl1"
                    :title="getTitle(item)"
                    >{{ item.name }}</span
                  >
                  <span
                    class="t_ovl1 f_nog"
                    style="color: #aeaeae"
                    v-if="item.alia?.length !== 0"
                    :title="getTitle(item, false)"
                    >- ({{ item.alia?.[0] }})</span
                  >
                  <i class="mv_icon f_nosg" v-if="item.mv !== 0"></i>
                </div>
                <div class="time fsc pr">
                  <span>{{ format(item.dt, "LT", false) }}</span>
                  <div class="icons fsc">
                    <a
                      href="javascript:;"
                      title="添加到播放列表"
                      class="playlist_icon"
                    ></a>
                    <a
                      href="javascript:;"
                      title="收藏"
                      class="addlist_icon"
                    ></a>
                    <a
                      href="javascript:;"
                      title="分享"
                      class="collectlist_icon"
                    ></a>
                    <a
                      href="javascript:;"
                      title="下载"
                      class="downloadlist_icon"
                    ></a>
                  </div>
                </div>
                <div class="singer t_ovl1">
                  <span>{{ item.ar.map((i) => i.name).join("/") }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="comment-list-wrap">
          <div class="comment-list-head">
            <div class="comment-list-title">
              <span>评论</span>
              <span>共{{ data.showData.commentCount }}条评论</span>
            </div>
            <div class="comment-input-wrap fss">
              <img
                src="http://s4.music.126.net/style/web2/img/default/default_avatar.jpg?param=50y50"
                alt=""
              />
              <div class="comment-input pr">
                <textarea
                  placeholder="评论"
                  v-model="commentContent"
                ></textarea>
              </div>
            </div>
            <div class="comment-input-bottom fpbc">
              <div class="fast-icons">
                <i class="icon_smlie_face cur_p"></i>
                <i class="icon_at cur_p"></i>
              </div>
              <div class="btn-wrap">
                <span>{{ 140 - commentContent.length }}</span>
                <span class="icon_btn_comment cur_p">评论</span>
              </div>
            </div>
          </div>
          <div class="comment-list-hot">
            <div class="comment-list-hot-title">精彩评论</div>
            <div class="list">
              <!-- <div class="item"></div> -->
            </div>
          </div>
          <div class="comment-list-new">
            <div class="comment-list-new-title">
              最新评论({{ data.showData.commentCount }})
            </div>
            <div class="list" v-loading="data.comments === null">
              <div class="item fss" v-for="item in data.comments?.comments">
                <img :src="item.user.avatarUrl + '?param=50y50'" alt="" />
                <div class="right">
                  <div class="comment-content">
                    <span class="comment-user-name td_u cur_p"
                      >{{ item.user.nickname }}：</span
                    >
                    <span>{{ item.content }}</span>
                  </div>
                  <div
                    class="other-comment-content"
                    v-if="item.beReplied.length !== 0"
                  >
                    <span class="comment-user-name td_u cur_p"
                      >{{ item.beReplied[0].user.nickname }}：</span
                    >
                    <span>{{ item.beReplied[0].content }}</span>
                  </div>
                  <div class="comment-foot fpbc">
                    <span>{{ item.time }}</span>
                    <span class="fcc"
                      ><i class="icon_commend"></i
                      ><span v-if="item.likedCount !== 0" class="liked_count"
                        >({{ item.likedCount }})</span
                      ><span>回复</span></span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  DiscoverListType,
  PlaylistType,
  DiscoverListSongType,
  trackIdType,
  reqCommentType,
} from "../types/types";
import { reqTopList, reqTopListDetail, reqTopListComment } from "../api";
import { ref, onMounted } from "vue";
import moment from "moment";

const format = (n: number, format: string, isNormal: boolean = true) => {
  //时间格式化
  let res: string;
  if (isNormal) {
    res = moment(n).format(format);
  } else {
    let duration = moment.duration(n);
    let m = duration.minutes();
    let s = duration.seconds();
    res = (m >= 10 ? m : "0" + m) + ":" + (s >= 10 ? s : "0" + s);
  }
  return res;
};

type TopListDataType = {
  feature: {
    id: number;
    title: string;
    list: DiscoverListType[];
  };
  media: {
    id: number;
    title: string;
    list: DiscoverListType[];
  };
  showData: PlaylistType;
  comments: reqCommentType | null;
};

const data = ref<TopListDataType>({
  feature: {
    id: 1,
    title: "云音乐特色榜",
    list: [],
  },
  media: {
    id: 2,
    title: "全球媒体榜",
    list: [],
  },
  showData: {
    id: 0,
    name: "",
    coverImgUrl: "",
    updateTime: 0, //更新时间
    trackCount: 0, //列表歌曲数量
    playCount: 0, //播放数量
    subscribedCount: 0, //订阅数量
    shareCount: 0, //分享数量
    commentCount: 0, //评论数量
    tracks: [], //列表
    trackIds: [], //列表上一次排行
  },
  comments: null,
});

onMounted(async () => {
  let res = await reqTopList();
  data.value.feature.list = res.list.slice(0, 4);
  data.value.media.list = res.list.slice(4);
  let res_showData = await reqTopListDetail(data.value.feature.list[0].id);
  data.value.showData = res_showData.playlist;
  console.log(data.value);
  let res_comments = await reqTopListComment(data.value.showData.id, 2, 20);
  console.log(res_comments);
  data.value.comments = res_comments;
});

const getUpdateMsg = () => {
  let list = [...data.value.feature.list, ...data.value.media.list];
  return list.find((i) => i.id === data.value.showData.id)?.updateFrequency;
};
const getTitle = (
  item: DiscoverListSongType,
  isNameTitle: boolean = true
): string | undefined => {
  if (isNameTitle) {
    return item.alia.length !== 0
      ? item.name + "-(" + item.alia?.[0] + ")"
      : item.name;
  } else {
    return item.alia?.join("/");
  }
};

const getStatus = (index: number): string => {
  //获取排行榜位置状态icon
  const Status = {
    0: "status_icon_new",
    1: "status_icon_stay",
    2: "status_icon_up",
    3: "status_icon_down",
  };
  let targer = data.value.showData.trackIds[index];
  if (targer.lr !== undefined) {
    return targer.lr === 0
      ? Status[1]
      : index > targer.lr
      ? Status[3]
      : Status[2];
  } else {
    return Status[0];
  }
};
const getRankNumber = (index: number): number | undefined => {
  let lr = data.value.showData.trackIds[index].lr;
  return lr === undefined || lr === 0 ? lr : Math.abs(lr + 1 - index);
};

//评论相关
const commentContent = ref<string>("");
</script>

<style lang="scss" scoped>
@mixin get_icon($x, $y, $size_x, $size_y) {
  width: #{$size_x}px;
  height: #{$size_y}px;
  background-position: #{$x}px #{$y}px;
}
@mixin get_btn(
  $extendClassIndex,
  $x_f,
  $y_f,
  $size_x_f,
  $size_y_f,
  $x_n: false,
  $y_n: false
) {
  display: inline-block;
  @extend .#{"icons" + $extendClassIndex + "_img"};
  @include get_icon($x_f, $y_f, $size_x_f, $size_y_f);
  @if ($size_y_f, $x_n, $y_n) {
    &:hover {
      @include get_icon($x_n, $y_n, $size_x_f, $size_y_f);
    }
  }
}

.icons_img {
  background: url("https://music.163.com/style/web2/img/icon.png?7a7e3fe737f9f8c50aefdfeffabe5d20")
    no-repeat;
}
.icons1_img {
  background: url("https://music.163.com/style/web2/img/button2.png?121f168fd59c64de034a737fa613a137")
    no-repeat;
}
.icons2_img {
  background: url("https://music.163.com/style/web2/img/table.png?a58e4187ce8625d374d6085b2c4e7f0f")
    no-repeat;
}
.icons3_img {
  background: url("https://music.163.com/style/web2/img/button.png?6c44aac4f8e2faab560469bf9b7ed1b9")
    no-repeat;
}
.icons4_img {
  background: url("https://music.163.com/style/web2/img/icon2.png?c34052cb37c1e490b43ff505c4e2f71a")
    no-repeat;
}
.play_icon {
  display: inline-block;
  @extend .icons2_img;
  @include get_icon(0, -103, 17, 17);
  &:hover {
    @include get_icon(0, -128, 17, 17);
  }
}
.playlist_icon {
  display: inline-block;
  @extend .icons_img;
  @include get_icon(2.5, -700, 18, 16);
  &:hover {
    @include get_icon(-19.5, -700, 18, 16);
  }
}
.addlist_icon {
  display: inline-block;
  @extend .icons2_img;
  @include get_icon(0, -174, 18, 16);
  &:hover {
    @include get_icon(-20, -174, 18, 16);
  }
}
.collectlist_icon {
  display: inline-block;
  @extend .icons2_img;
  @include get_icon(0, -194, 18, 16);
  &:hover {
    @include get_icon(-20, -194, 18, 16);
  }
}
.downloadlist_icon {
  display: inline-block;
  @extend .icons2_img;
  @include get_icon(-81, -174, 18, 16);
  &:hover {
    @include get_icon(-104, -174, 18, 16);
  }
}

.mv_icon {
  display: inline-block;
  @extend .icons2_img;
  @include get_icon(0, -151, 23, 17);
  &:hover {
    @include get_icon(-30, -151, 23, 17);
  }
}

.status_icon {
  &_new {
    display: inline-block;
    @extend .icons_img;
    @include get_icon(-67, -283, 16, 17);
    padding-left: 16px;
  }
  &_stay {
    display: inline-block;
    @extend .icons_img;
    @include get_icon(-74, -268, 8, 17);
    font-size: 10px;
    color: #999;
    padding-left: 8px;
  }
  &_up {
    display: inline-block;
    @extend .icons_img;
    @include get_icon(-74, -299, 8, 17);
    font-size: 10px;
    color: #bb2128;
    padding-left: 8px;
  }
  &_down {
    display: inline-block;
    @extend .icons_img;
    @include get_icon(-74, -318, 8, 17);
    font-size: 10px;
    color: #bb2128;
    padding-left: 8px;
  }
}

.icon_ {
  &smlie_face {
    display: inline-block;
    @extend .icons_img;
    @include get_icon(-40, -490, 18, 18);
  }
  &at {
    display: inline-block;
    @extend .icons_img;
    @include get_icon(-60, -490, 18, 18);
  }
  &btn_comment {
    @include get_btn(3, -84, -64, 46, 25, -84, -94);
  }
  &commend {
    @include get_btn(4, -150, 0, 15, 14);
  }
}

.top-list-page {
  background: #f5f5f5;
}
.top-list-wrap {
  box-sizing: border-box;
  width: 982px;
  border-left: 1px solid #d3d3d3;
  border-right: 1px solid #d3d3d3;

  .left {
    display: inline-block;
    width: 240px;
    padding: 40px 0;
    background-color: #f9f9f9;

    .list {
      width: 100%;
      padding-bottom: 20px;
      .title {
        padding: 0 20px 10px;
        span {
          font-size: 14px;
          font-weight: bold;
          color: #000;
          font-family: simsun, \5b8b\4f53;
        }
      }
      .content {
        background: #f9f9f9;
        .item {
          padding: 10px 20px;

          img {
            width: 40px;
            height: 40px;
            border-radius: 5px;
            margin-right: 10px;
          }
          .msg {
            color: #999;
            span {
              font-size: 12px;
            }
            .name {
              color: #000;
              margin-bottom: 5px;
            }
          }
          &:hover,
          &.active {
            background: #e6e6e6;
          }
        }
      }
    }
  }

  .right {
    display: inline-block;
    width: 739px;
    background: #fff;
    border-left: 1px solid #d3d3d3;

    .list-head {
      padding: 40px;

      .cover {
        box-sizing: border-box;
        display: inline-block;
        margin-right: 30px;
        border-radius: 5px;

        img {
          width: 150px;
          height: 150px;
          width: 150px;
          height: 150px;
          padding: 3px;
          border-radius: 5px;
          border: 1px solid #ccc;
        }
        .msk {
          top: 0;
          left: 0;
          background: url("https://music.163.com//style/web2/img/coverall.png?544674b7fdb18c4ed7fd416cdd1f1f33")
            no-repeat;
          @include get_icon(-230, -380, 150, 150);
        }
      }

      .msg {
        .name {
          font: 20px "Microsoft Yahei";
          color: #000;
          line-height: 24px;
          margin: 16px 0 4px;
        }
        .update-time {
          margin-bottom: 20px;

          i {
            display: inline-block;
            @include get_icon(-18, -682, 13, 13);
            margin-right: 5px;
          }
          span {
            line-height: 35px;
            font-size: 12px;
            color: #666;
            margin-right: 10px;
            &:last-child {
              color: #999;
            }
          }
        }

        .btns {
          align-items: stretch;
          span {
            display: inline-block;
            margin-right: 5px;
            a {
              display: inline-block;
              text-decoration: none;
              &.play_btn {
                @include get_icon(-184, -428, 66, 31);
                overflow: hidden;
                > i {
                  display: inline-block;
                  @include get_icon(0, -387, 66, 31);
                  color: #fff;
                  > i {
                    display: inline-block;
                    margin: 7px 2px 0 4px;
                    @include get_icon(0, -1622, 20, 18);
                    overflow: hidden;
                  }
                }
                &:hover {
                  > i {
                    @include get_icon(0, -469, 66, 31);
                    & > i {
                      @include get_icon(-28, -1622, 20, 18);
                    }
                  }
                }
                .text {
                  top: 7px;
                  left: 28px;
                }
              }
              &.add_icon {
                @include get_icon(0, -1588, 31, 31);
                &:hover {
                  @include get_icon(-40, -1588, 31, 31);
                }
              }

              &.collect_icon {
                color: #333;
                font-size: 12px;
                @include get_icon(0, -977, 84, 31);
                padding: 8px 5px 0 28px;
                margin-right: 5px;

                i {
                  right: -5px;
                  top: 0;
                  display: inline-block;
                  @include get_icon(-245, -1020, 5, 31);
                  z-index: 5;
                }

                &:hover {
                  @include get_icon(0, -1063, 84, 31);
                  i {
                    @include get_icon(-245, -1106, 5, 31);
                  }
                }
              }

              &.share_icon {
                color: #333;
                font-size: 12px;
                @include get_icon(0, -1225, 73, 31);
                padding: 8px 0 0 28px;
                margin-right: 5px;

                i {
                  right: -5px;
                  top: 0;
                  display: inline-block;
                  @include get_icon(-245, -1020, 5, 31);
                  z-index: 5;
                }

                &:hover {
                  @include get_icon(0, -1268, 73, 31);
                  i {
                    @include get_icon(-245, -1106, 5, 31);
                  }
                }
              }

              &.download_icon {
                color: #333;
                font-size: 12px;
                @include get_icon(0, -2761, 56, 31);
                padding: 8px 0 0 28px;
                margin-right: 5px;

                i {
                  right: -5px;
                  top: 0;
                  display: inline-block;
                  @include get_icon(-245, -1020, 5, 31);
                  z-index: 5;
                }

                &:hover {
                  @include get_icon(0, -2805, 56, 31);
                  i {
                    @include get_icon(-245, -1106, 5, 31);
                  }
                }
              }

              &.comment_icon {
                color: #333;
                font-size: 12px;
                @include get_icon(0, -1465, 80, 31);
                padding: 8px 0 0 28px;
                margin-right: 5px;

                i {
                  right: -5px;
                  top: 0;
                  display: inline-block;
                  @include get_icon(-245, -1020, 5, 31);
                  z-index: 5;
                }

                &:hover {
                  @include get_icon(0, -1508, 80, 31);
                  i {
                    @include get_icon(-245, -1106, 5, 31);
                  }
                }
              }
            }
          }
        }
      }
    }

    .list-wrap {
      padding: 0 40px 40px;
      .title {
        height: 35px;
        border-bottom: 2px solid #c20c0c;

        div,
        span {
          color: #666;
          font-size: 12px;
          &.title-name {
            font: 20px Microsoft Yahei;
            color: #333;
            margin-right: 20px;
          }
        }
      }

      $border_color: #eee;
      .list {
        border: 1px solid $border_color;

        .item {
          width: 100%;
          padding: 6px 0;
          line-height: 18px;
          &:nth-child(2n + 1) {
            background-color: #f7f7f7;
          }
          div {
            font-size: 12px;
            span {
              font-size: 12px;
              color: #333;
            }
            img {
              width: 50px;
              height: 50px;
              border-radius: 5px;
              margin-right: 14px;
            }
          }
          &:hover {
            .time {
              span {
                display: none;
              }
              .icons {
                height: 20px;
                position: absolute;
                top: -8px;
                left: 0;
                opacity: 1;
                display: inline-block;
                width: 100%;
                height: 100%;

                a {
                  margin-right: 2px;
                }
              }
            }
          }
        }
        .index {
          width: 78px;
          padding: 0 10px 0 20px;
          span:first-child {
            color: #999;
          }
          .rank_icon {
            width: 20px;
            justify-content: stretch;
            padding-left: 5px;
          }
        }
        .name {
          width: 327px;
          padding-left: 10px;
          span {
            margin-left: 8px;
          }
          i:last-child {
            margin: 0 3px;
          }
          .name-content {
            max-width: 253px;
          }
        }
        .time {
          width: 91px;
          padding-left: 10px;

          .icons {
            display: none;
            opacity: 0;
          }
        }
        .singer {
          width: 170px;
          padding-left: 10px;
        }
        .list-title {
          color: #666;
          div {
            font-size: 12px;
            height: 39px;
            line-height: 39px;
            border-right: 1px solid $border_color;
            border-bottom: 1px solid $border_color;
            background-image: linear-gradient(to bottom, #fff, #f8f8f8);
            &:last-child {
              border-right: none;
            }
          }

          height: 39px;
        }
      }
    }

    .comment-list-wrap {
      padding: 0 40px;

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
              width: 583px;
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

      .comment-list-hot,
      .comment-list-new {
        &-title {
          height: 21px;
          border-bottom: 1px solid #cfcfcf;
          font: bold 12px Arial, Helvetica, sans-serif;
          margin-top: 20px;
        }
      }

      .list {
        .item {
          padding: 15px 0;
          border-bottom: 1px dotted #ccc;

          img {
            width: 50px;
            height: 50px;
            border-radius: 5px;
            margin-right: 10px;
          }

          .right {
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
              color: #0c73c2;
            }

            .comment-foot {
              margin-top: 15px;

              i {
                margin-right: 8px;
              }
              .liked_count {
                line-height: 14px;
                padding-right: 8px;
                border-right: 1px solid #ccc;
                margin-right: 8px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
