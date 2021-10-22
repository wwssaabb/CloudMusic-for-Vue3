/*
 * @Author: wwssaabb
 * @Date: 2021-09-18 15:23:45
 * @LastEditTime: 2021-10-22 09:33:02
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
  reqMvDetailType,
  reqMvDetailInfoType,
  reqMvUrlType,
  reqRecommendMvsType,
  reqMvCommentsType,
  reqPlaylistDetailType,
  reqPlaylistRelatedListType,
  reqPlaylistCommentsType,
  reqUserDetailType,
  reqCountiesCodeType,
  reqUserPlayRecordType,
  reqUserDjRadioType,
  reqUserPlaylistType,
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
export const reqSongDetail = (ids: number | string) =>
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

//获取mv详情
export const reqMvDetail = (mvid: number | string) =>
  http<reqMvDetailType>("/mv/detail", { mvid });

//获取mv 评论、点赞、转发数据
export const reqMvDetailInfo = (mvid: number | string) =>
  http<reqMvDetailInfoType>("/mv/detail/info", { mvid });

//获取mv播放地址  r为分辨率，默认1080
export const reqMvUrl = (id: number | string, r: number = 1080) =>
  http<reqMvUrlType>("/mv/url", { id, r });

//获取相关mv推荐
export const reqRecommendMvs = (id: number | string) =>
  http<reqRecommendMvsType>("/related/allvideo", { id });

//获取mv 评论列表
export const reqMvComments = (
  id: number | string,
  page: number = 1,
  limit: number = 20
) =>
  http<reqMvCommentsType>("/comment/mv", {
    id,
    offset: (page - 1) * limit,
    limit,
  });

//获取歌单详情  ,s为最近的收藏者，默认8个
export const reqPlaylistDetail = (id: number | string, s: number = 8) =>
  http<reqPlaylistDetailType>("/playlist/detail", { id, s });

//获取相关歌单推荐
export const reqPlaylistRelatedList = (id: number | string) =>
  http<reqPlaylistRelatedListType>("/related/playlist", { id });

//获取歌单评论
export const reqPlaylistComments = (
  id: number | string,
  page: number = 1,
  limit: number = 20,
  before?: number
) =>
  http<reqPlaylistCommentsType>("/comment/playlist", {
    id,
    offset: (page - 1) * limit,
    limit,
    before,
  });

//获取用户详情信息
export const reqUserDetail = (uid: number | string) =>
  http<reqUserDetailType>("/user/detail", { uid });

//获取国家编码列表
export const reqCountriesCode = () =>
  http<reqCountiesCodeType>("/countries/code/list");

//获取用户播放记录  ,type 1为weekData 0为allData
export const reqUserPlayRecord = (uid: number | string, type: 1 | 0 = 1) =>
  http<reqUserPlayRecordType>("/user/record", { uid, type });

//获取用户创建电台列表
export const reqUserDjRadio = (uid: number | string) =>
  http<reqUserDjRadioType>("/user/audio", { uid });

//获取用户创建的歌单列表
export const reqUserPlaylist = (
  uid: number | string,
  page: number = 1,
  limit: number = 20
) =>
  http<reqUserPlaylistType>("/user/playlist", {
    uid,
    offset: (page - 1) * limit,
    limit,
  });
