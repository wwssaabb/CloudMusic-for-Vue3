/*
 * @Author: wwssaabb
 * @Date: 2021-11-09 08:49:46
 * @LastEditTime: 2021-11-09 15:24:23
 * @FilePath: \CloudMusic-for-Vue3\src\utils\directive\index.ts
 */

/* 
  注册自定义事件
*/

import draggable from "./v-draggable";
import { App } from "vue";

const directives = {
  draggable: draggable,
};

export default {
  install(Vue: App) {
    Object.keys(directives).forEach((key: string) =>
      Vue.directive(key, directives[key])
    );
  },
};
