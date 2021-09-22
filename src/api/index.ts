/*
 * @Author: wwssaabb
 * @Date: 2021-09-18 15:23:45
 * @LastEditTime: 2021-09-22 10:20:48
 * @FilePath: \CloudMusic-for-Vue3\src\api\index.ts
 */

import http from "./http";
import { BannerType, TagType, RecommendType, AlbumType } from "../types/types";

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
