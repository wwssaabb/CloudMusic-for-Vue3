/*
 * @Author: wwssaabb
 * @Date: 2021-09-22 09:32:37
 * @LastEditTime: 2021-10-18 17:23:09
 * @FilePath: \CloudMusic-for-Vue3\src\types\types.d.ts
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
  picUrl: string;
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
export type PlaylistCreatorType = {
  userId: number;
  nickname: string;
  avatarUrl: string;
  avatarDetail: { identityIconUrl: string };
};
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
  creator: PlaylistCreatorType;
  tags: string[];
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

//dj主播 节目排行榜 相关类型
export type programType = {
  radio: { id: number; name: string; category: string };
  coverUrl: string;
  description: string;
  id: number;
  name: string;
  shareCount: number;
  likedCount: number;
  commentCount: number;
};

export type RankListType = {
  program: programType;
  rank: number;
  lastRank: number;
  score: number;
  programFeeType: number;
};

export type reqDjRankListType = {
  toplist: RankListType[];
  code: number;
  updateTime: number;
};

//dj主播 推荐节目 相关类型
export type reqProgramRecommendListType = {
  programs: programType[];
  code: number;
  name: string;
  more: boolean;
};

//dj 节目type
export type DjRadioType = {
  id: string;
  category: string;
  picUrl: string;
  name: string;
  desc: string;
  rcmdtext: string;
};

//dj 类型请求结果
export type reqDjHotListType = {
  djRadios: DjRadioType[];
  code: number;
  count: number;
  hasMore: boolean;
};

//歌手分类列表
//侧边栏渲染对象数组类型
export type listRenderType = "mixin" | "cover" | "index";
export type initialType =
  | "-1"
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V"
  | "W"
  | "X"
  | "Y"
  | "Z"
  | "0";

export type sidebarType = {
  id: number;
  name: string;
  list: {
    name: string;
    type: listRenderType;
    list: artistType[];
    initial: initialType;
  }[];
};

//歌手Type
export type artistType = {
  id: number;
  name: string;
  picUrl: string;
  accountId?: number;
};

export type reqArtistsType = {
  artists: artistType[];
  more: boolean;
  code: number;
};

//album category 类型
export type albumAreaType = "ALL" | "ZH" | "EA" | "KR" | "JP";

//all album 请求结果类型
export type reqAllAlbumsType = {
  total: number;
  albums: AlbumType[];
  code: number;
};

//获取歌曲详情请求类型
export type reqSongDetailType = {
  songs: DiscoverListSongType[];
  privileges: any[];
  code: number;
};

//获取歌词请求类型
export type SongLyricType = { version: number; lyric: string };
export type reqSongLyricType = {
  lrc: SongLyricType;
  code: number;
};

//获取歌曲评论请求类型
export type reqSongCommentsType = reqCommentType;

//获取包含歌曲的歌单请求类型
export type reqSimiPlaylistsType = { playlists: playListType[]; code: number };

//歌曲Type
export type SongType = {
  id: number;
  name: string;
  mp3Url: string;
  duration: number;
  artists: ArtistType[];
  album: AlbumType[];
};

//获取相似歌曲请求类型
export type reqSimiSongsType = { songs: SongType[]; code: number };

//获取相似歌手请求类型
export type reqSimiArtistsType = { artists: ArtistType[]; code: number };

//歌曲下拉筛选type
export type IdentitiesType = "作词" | "作曲";

//获取相似歌曲请求类型 ArtistType
export type ArtistDetailType = {
  id: number;
  name: string;
  picUrl: string;
  briefDesc: string;
  identities: IdentitiesType[];
  alias: string[];
  musicSize: number;
  albumSize: number;
  mvSize: number;
};

//获取歌手部分信息和热门歌曲
export type reqArtistIndexType = {
  artist: ArtistDetailType;
  hotSongs: DiscoverListSongType[];
  code: number;
  more: boolean;
};

//artist detailNavbar type
export type detailNavbarType = {
  id: number;
  name: string;
  path: string;
};

//artist index filter 的筛选的type
export type ArtistPage_filterType = {
  id: number;
  name: string;
};

//artist album 获取专辑请求类型
export type reqArtistAlbumsType = {
  artist: ArtistDetailType;
  hotAlbums: AlbumType[];
  more: boolean;
  code: number;
};

//mv 的type
export type MvType = {
  id: number;
  name: string;
  artistName: string;
  imgurl: string;
};

//获取歌手mv列表
export type reqArtistMvsType = {
  mvs: MvType[];
  more: boolean;
  code: number;
  time: number;
};

//歌手描述type
export type ArtistDescType = {
  ti: string;
  txt: string;
};

//获取歌手描述
export type reqArtistDescType = {
  introduction: ArtistDescType[];
  briefDesc: string;
  code: number;
};

//分辨率 type
export type PixelType = {
  size: number;
  br: number;
  point: number;
};

//Mv 类型
export type MvDetailType = {
  id: number;
  name: string;
  artistName: string;
  artistId: string;
  cover: string;
  desc: string;
  playCount: number;
  subCount: number;
  shareCount: number;
  commentCount: number;
  duration: number;
  price: number;
  publishTime: string;
  brs: PixelType[];
  commentThreadId: string;
  likedCount: number;
  liked: boolean;
};

//获取mv详情请求的type
export type reqMvDetailType = {
  data: MvDetailType;
  code: number;
};

//获取mv 点赞、分享、评论请求的type
export type reqMvDetailInfoType = {
  likedCount: number;
  shareCount: number;
  commentCount: number;
  liked: boolean;
  code: number;
};

//mv 视频视频地址的type
export type mvUrlDataType = {
  id: number;
  url: string;
  r: number;
  size: number;
};

//获取 mv地址请求的type
export type reqMvUrlType = {
  data: mvUrlDataType;
  code: number;
};

//获取 mv详情页 相关推荐 请求type
export type RecommendsType = {
  alg: string;
  title: string;
  coverUrl: string;
  vid: number;
  durationms: number;
  playTime: number;
  creator: { userId: number; userName: string }[];
};
export type reqRecommendMvsType = {
  data: RecommendsType[];
  code: number;
};

//获取 mv 评论列表请求type
export type reqMvCommentsType = reqSongCommentsType;

//获取 歌单详情请求type
export type SubscriberType = {
  userId: number;
  nickname: string;
  avatarUrl: string;
};
export type PlaylistDetailType = PlaylistType & {
  avatarUrl: string;
  description: string;
  createTime: number;
  subscribers: SubscriberType[];
};
export type reqPlaylistDetailType = {
  playlist: PlaylistDetailType;
  code: number;
};

//获取 相关歌单请求type
// export type RelatedPlaylistCreatorType = { userId: number ,nickName:string};
export type RelatedPlaylistType = {
  id: number;
  coverImgUrl: string;
  name: string;
  creator: { userId: number; nickname: string };
};
export type reqPlaylistRelatedListType = {
  playlists: RelatedPlaylistType[];
  code: number;
};
