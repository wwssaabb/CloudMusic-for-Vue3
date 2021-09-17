/*
 * @Author: wwssaabb
 * @Date: 2021-09-17 10:45:14
 * @LastEditTime: 2021-09-17 15:27:55
 * @FilePath: \CloudMusic-for-Vue3\src\sfc.d.ts
 */

/* 
  解决TS对.vue文件的报错
*/
declare module "*.vue" {
  import { ComponentOptions } from "vue";
  const componentOptions: ComponentOptions;
  export default componentOptions;
}
