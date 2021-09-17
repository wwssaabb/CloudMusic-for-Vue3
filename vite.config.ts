/*
 * @Author: wwssaabb
 * @Date: 2021-09-17 11:23:13
 * @LastEditTime: 2021-09-17 14:02:51
 * @FilePath: \CloudMusic-for-Vue3\vite.config.ts
 */
import vue from "@vitejs/plugin-vue";

module.exports = {
  plugins: [vue()],
  base: "/",
  outDir: "dist",
  port: 3000,
  open: true,
};
