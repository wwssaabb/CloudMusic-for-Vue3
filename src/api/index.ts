/*
 * @Author: wwssaabb
 * @Date: 2021-09-18 15:23:45
 * @LastEditTime: 2021-09-20 21:01:23
 * @FilePath: \CloudMusic-for-Vue3\src\api\index.ts
 */

import http from "./http";

//获取banner数据
export const reqBanner = () => http("/banner");

//获取首页推荐歌单分类
export const reqDiscoverRecommendCategory = () => http("/playlist/hot");

//获取首页推荐歌单列表
export const reqDiscoverRecommendList = () => http("/personalized?limit=8");
