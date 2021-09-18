/*
 * @Author: wwssaabb
 * @Date: 2021-09-17 10:20:33
 * @LastEditTime: 2021-09-18 16:39:42
 * @FilePath: \CloudMusic-for-Vue3\src\main.ts
 */
import { createApp } from "vue";
import App from "./App.vue";

//router
import router from "./router/router";

//element-plus
import elementPlus from "element-plus";
import "element-plus/dist/index.css";

//引入swiper样式
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

//引入animate.css动画库
import "animate.css";

//引入自己的样式
import "./index.scss";

createApp(App).use(router).use(elementPlus).mount("#app");
