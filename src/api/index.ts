/*
 * @Author: wwssaabb
 * @Date: 2021-09-18 15:23:45
 * @LastEditTime: 2021-09-24 11:18:16
 * @FilePath: \CloudMusic-for-Vue3\src\api\index.ts
 */

import http from "./http";
import {
  BannerType,
  TagType,
  RecommendType,
  AlbumType,
  DiscoverListSongType,
  DiscoverListType,
} from "../types/types";

//获取banner数据
export const reqBanner = () =>
  http<{ banners: BannerType[]; code: number }>("/banner");

//获取首页推荐歌单分类
export const reqDiscoverRecommendCategory = () =>
  http<{ tags: TagType[]; code: number }>("/playlist/hot");

//获取首页推荐歌单列表
export const reqDiscoverRecommendList = () =>
  http<{ result: RecommendType[]; code: number }>("/personalized?limit=8");

//获取首页新歌上架列表
export const reqDiscoverAlbumList = () =>
  http<{ albums: AlbumType[]; code: number }>("/album/newest");

//获取榜单
export const reqDiscoverList = () =>
  http<{ list: DiscoverListType[]; code: number }>("/toplist");

//获取榜单歌曲
type ListDetailType = {
  id: number;
  name: string;
  coverImgUrl: string;
  updateTime: number; //更新时间
  trackCount: number; //列表歌曲数量
  playCount: number; //播放数量
  subscribedCount: number; //收藏数量
  tracks: DiscoverListSongType[]; //列表
};
export const reqDiscoverListDetail = (id: number) =>
  http<{ playlist: { tracks: DiscoverListSongType[] }; code: number }>(
    "/playlist/detail",
    {
      id,
    }
  );
