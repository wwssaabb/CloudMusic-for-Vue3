/*
 * @Author: wwssaabb
 * @Date: 2021-09-18 15:23:45
 * @LastEditTime: 2021-09-18 15:33:06
 * @FilePath: \CloudMusic-for-Vue3\src\api\index.ts
 */

import http from "./http";

//获取banner数据
export const reqBanner = (): { banners: []; code: number } => http("/banner");
