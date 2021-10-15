/*
 * @Author: wwssaabb
 * @Date: 2021-09-18 15:23:45
 * @LastEditTime: 2021-10-14 17:52:13
 * @FilePath: \CloudMusic-for-Vue3\src\api\index.ts
 */

import http from "./http";
import type {
  BannerType,
  TagType,
  RecommendType,
  AlbumType,
  DiscoverListType,
  PlaylistType,
  getCommentType,
  reqCommentType,
  sortType,
  newApi_reqCommentType,
  reqPlayListType,
  reqDjCategoryType,
  reqDjRankListType,
  reqProgramRecommendListType,
  reqDjHotListType,
  reqArtistsType,
  initialType,
  albumAreaType,
  reqAllAlbumsType,
  reqSongDetailType,
  reqSongLyricType,
  reqSongCommentsType,
  reqSimiPlaylistsType,
  reqSimiSongsType,
  reqSimiArtistsType,
  reqArtistIndexType,
  reqArtistAlbumsType,
  reqArtistMvsType,
  reqArtistDescType,
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
export const reqTopList = () =>
  http<{ list: DiscoverListType[]; code: number }>("/toplist");

//获取榜单歌曲
export const reqTopListDetail = (id: number) =>
  http<{ playlist: PlaylistType; code: number }>("/playlist/detail", {
    id,
  });

//获取榜单最新评论
export const reqTopListNewComment = (
  id: number,
  page: number = 1,
  type: getCommentType = 2,
  limit: number = 20
) =>
  http<reqCommentType>("comment/playlist", {
    id,
    offset: (page - 1) * limit,
    type,
    limit,
  });

//获取榜单精彩评论(新接口)
export const reqTopListHotComment = (
  id: number,
  type: getCommentType = 2,
  sortType: sortType = 1,
  pageSize: number = 15
) =>
  http<{ data: newApi_reqCommentType; code: number }>("/comment/new", {
    id,
    type,
    sortType,
    pageSize,
  });

//获取歌单列表
export const reqPlayLists = (page: number = 1, limit: number = 35) =>
  http<reqPlayListType>("/top/playlist", {
    page,
    limit,
    offset: (page - 1) * limit,
  });

//获取dj分类列表
export const reqDjCategories = () => http<reqDjCategoryType>("/dj/catelist");

//获取dj主播页面  推荐节目列表
export const reqDjRecommends = () =>
  http<reqProgramRecommendListType>("/program/recommend");

//获取dj主播页面  节目排行榜,默认获取10条
export const reqDjRankList = (limit: number = 10) =>
  http<reqDjRankListType>("/dj/program/toplist", {
    limit,
  });

//获取类别热门电台
export const reqDjHotList = (
  cateId: number,
  page: number = 1,
  limit: number = 20
) =>
  http<reqDjHotListType>("/dj/radio/hot", {
    cateId,
    offset: (page - 1) * limit,
    limit,
  });

//获取歌手列表
export const reqArtistsList = (
  type: number,
  area: number,
  initial: initialType,
  page: number = 1,
  limit: number = 10
) =>
  http<reqArtistsType>("/artist/list", {
    type,
    area,
    initial,
    page,
    offset: (page - 1) * limit,
    limit,
  });

//获取全部新碟列表
export const reqAllAlbums = (
  area: albumAreaType,
  page: number = 1,
  limit: number = 35
) =>
  http<reqAllAlbumsType>("/album/new", {
    area,
    offset: (page - 1) * limit,
    limit,
  });

//获取歌曲详情
export const reqSongDetail = (ids: number) =>
  http<reqSongDetailType>("/song/detail", { ids });

//获取歌词
export const reqSongLyric = (id: number) =>
  http<reqSongLyricType>("/lyric", { id });

//获取歌曲评论
export const reqSongComments = (
  id: number,
  page: number = 1,
  limit = 20,
  before?: number //分页参数，上一页最后一项的time，获取超过5000条评论时需要用到
) =>
  http<reqSongCommentsType>("/comment/music", {
    id,
    offset: (page - 1) * limit,
    limit,
    before,
  });

//获取包含这首歌的歌单
export const reqSimiPlaylists = (id: number | string) =>
  http<reqSimiPlaylistsType>("/simi/playlist", { id });

//获取相识歌曲
export const reqSimiSongs = (id: number | string) =>
  http<reqSimiSongsType>("/simi/song", { id });

//获取相似歌手
export const reqSimiArtists = (id: number | string) =>
  http<reqSimiArtistsType>("/simi/artist", { id });

//获取歌手部分信息和热门歌曲
export const reqArtistIndex = (id: number | string) =>
  http<reqArtistIndexType>("/artists", { id });

//获取歌手描述
export const reqArtistDesc = (id: number | string) =>
  http<reqArtistDescType>("/artist/desc", { id });

//获取歌手专辑
export const reqArtistAlbums = (
  id: number | string,
  page: number = 1,
  limit: number = 12
) =>
  http<reqArtistAlbumsType>("/artist/album", {
    id,
    offset: (page - 1) * limit,
    limit,
  });

//获取歌手mv
export const reqArtistMvs = (
  id: number | string,
  page: number = 1,
  limit: number = 12
) =>
  http<reqArtistMvsType>("/artist/mv", {
    id,
    offset: (page - 1) * limit,
    limit,
  });
