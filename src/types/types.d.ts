/*
 * @Author: wwssaabb
 * @Date: 2021-09-22 09:32:37
 * @LastEditTime: 2021-09-24 15:55:36
 * @FilePath: \CloudMusic-for-Vue3\src\types\types.d.ts
 */

/* 
  ==============discover 页面的types==============
*/
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
export type DiscoverListSongType = {
  //榜单歌曲type
  id: number;
  name: string;
};
export type DiscoverListType = {
  //榜单type
  id: number;
  name: string;
  coverImgUrl: string;
  list: DiscoverListSongType[];
  updateFrequency: string; //更新频率
};
//榜单返回的playlist的Type
export type PlaylistType = {
  id: number;
  name: string;
  coverImgUrl: string;
  updateTime: number; //更新时间
  trackCount: number; //列表歌曲数量
  playCount: number; //播放数量
  subscribedCount: number; //订阅数量
  shareCount: number; //分享数量
  commentCount: number; //评论数量
  tracks: DiscoverListSongType[]; //列表
};

//热门主播
export type DiscoverDjType = {
  //热门主播type
  id: number;
  name: string;
  tag: string;
  picture: string;
};
