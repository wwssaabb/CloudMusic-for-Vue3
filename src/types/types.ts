/*
 * @Author: wwssaabb
 * @Date: 2021-09-22 09:32:37
 * @LastEditTime: 2021-09-22 15:02:08
 * @FilePath: \CloudMusic-for-Vue3\src\types\types.ts
 */

import { exec } from "child_process";

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
};
