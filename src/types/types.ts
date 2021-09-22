/*
 * @Author: wwssaabb
 * @Date: 2021-09-22 09:32:37
 * @LastEditTime: 2021-09-22 09:53:26
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

//
export type ArtistType = {
  id: number;
  name: string;
};

export type AlbumType = {
  id: number;
  name: string;
  picUrl: string;
  artists: ArtistType[];
};
