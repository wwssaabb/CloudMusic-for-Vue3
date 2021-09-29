/*
 * @Author: wwssaabb
 * @Date: 2021-09-22 09:32:37
 * @LastEditTime: 2021-09-29 15:54:57
 * @FilePath: \CloudMusic-for-Vue3\src\types\types.d.ts
 */

import { type } from "os";

//banner
export type BannerType = {
  encodeId: string;
  imageUrl: string;
  typeTitle: string;
};
//热门推荐类型tag
export type TagType = {
  id: number;
  name: string;
};
//热门推荐列表
export type RecommendType = {
  id: number;
  name: string;
  picUrl: string;
  playCount: number;
  type: number;
};

//新碟上架列表
//创作者type
export type ArtistType = {
  id: number;
  name: string;
};
//专辑type
export type AlbumType = {
  id: number;
  name: string;
  picUrl: string;
  artists: ArtistType[];
};

//榜单
type ALType = {
  //歌曲type
  id: number;
  name: string;
  picUrl: string;
};
type ARType = {
  //创作人type
  id: number;
  name: string;
};

export type DiscoverListSongType = {
  //榜单歌曲type
  id: number;
  name: string;
  al: ALType;
  alia: string[];
  ar: ARType[];
  dt: number;
  mv: number;
};
export type DiscoverListType = {
  //榜单type
  id: number;
  name: string;
  coverImgUrl: string;
  list: DiscoverListSongType[];
  updateFrequency: string; //更新频率
};
export type trackIdType = {
  id: number;
  lr?: number;
};
//  0: 歌曲 1: mv 2: 歌单 3: 专辑 4: 电台 5: 视频
export type getCommentType = 0 | 1 | 2 | 3 | 4 | 5;
//榜单返回的playlist的Type
export type PlaylistType = {
  id: number;
  name: string;
  coverImgUrl: string;
  trackIds: trackIdType[]; //列表的排行榜位置相关
  updateTime: number; //更新时间
  trackCount: number; //列表歌曲数量
  playCount: number; //播放数量
  subscribedCount: number; //订阅数量
  shareCount: number; //分享数量
  commentCount: number; //评论数量
  tracks: DiscoverListSongType[]; //列表
};
//vip信息
export type vipRightType = {
  redVipLevel: number;
};
export type CommentUserType = {
  userId: number;
  userType: number;
  nickname: string;
  avatarUrl: string;
  authStatus: number;
  vipRights: vipRightType | null;
};
export type CommentType = {
  user: CommentUserType;
  commentId: number;
  status: number;
  content: string;
  time: number;
  likedCount: number;
  beReplied: CommentType[];
  parentCommentId: number;
  liked: boolean;
};
export type reqCommentType = {
  isMusician: boolean;
  topComments: CommentType[];
  moreHot: boolean;
  hotComments: CommentType[];
  code: number;
  comments: CommentType[];
  total: number;
  more: boolean;
};
export type sortType = 1 | 2 | 3; //排序方式,1:按推荐排序,2:按热度排序,3:按时间排序

export type newApi_reqCommentType = {
  comments: CommentType[];
  totalCount: number;
  hasMore: boolean;
};

//热门主播
export type DiscoverDjType = {
  //热门主播type
  id: number;
  name: string;
  tag: string;
  picture: string;
};

//格式化类型
export type formatType = "normal" | "compare" | "duration";
//分页事件类型
export type PaginationClickType = "prev" | "page" | "next";

export type playListType = {
  id: number;
  playCount: number;
  name: string;
  coverImgUrl: string;
  creator: {
    userId: number;
    nickname: string;
    avatarUrl: string;
    avatarDetail: {
      identityIconUrl: string;
    };
  };
};

export type reqPlayListType = {
  cat: string;
  more: boolean;
  total: number;
  playlists: playListType[];
  code: number;
};

export type DjCategoryType = {
  id: number;
  name: string;
  picWebUrl: string;
};

export type reqDjCategoryType = {
  categories: DjCategoryType[];
  code: number;
};
