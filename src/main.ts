/*
 * @Author: wwssaabb
 * @Date: 2021-09-17 10:20:33
 * @LastEditTime: 2021-09-17 15:51:48
 * @FilePath: \CloudMusic-for-Vue3\src\main.ts
 */
import { createApp } from "vue";
import App from "./App.vue";

//element-plus
import elementPlus from "element-plus";
import "element-plus/dist/index.css";

//引入自己的样式
import "./index.scss";

createApp(App).use(elementPlus).mount("#app");
