/*
 * @Author: wwssaabb
 * @Date: 2021-09-17 11:23:13
 * @LastEditTime: 2021-11-30 15:36:02
 * @FilePath: \CloudMusic-for-Vue3\vite.config.ts
 */
import vue from "@vitejs/plugin-vue";

module.exports = {
  plugins: [vue()],
  base: "/CloudMusic-for-Vue3/",
  outDir: "dist",
  port: 3000,
  open: true,
};
