/*
 * @Author: wwssaabb
 * @Date: 2021-09-17 15:22:04
 * @LastEditTime: 2021-09-24 10:52:34
 * @FilePath: \CloudMusic-for-Vue3\typings\modules.d.ts
 */
declare module "xxx" {
  const content: any;
  /// 这里的 content 可以根据自己的需要，添加需要的类型，这的话可以让 ts 更好的提示
  /**
  type content = {
    test: string
  }
 */
  export = content;
}

/* declare module "*.ts" {
  const content: any;
  export = content;
}
 */
