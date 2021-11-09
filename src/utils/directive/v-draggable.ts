/*
 * @Author: wwssaabb
 * @Date: 2021-11-09 08:28:27
 * @LastEditTime: 2021-11-09 15:01:27
 * @FilePath: \CloudMusic-for-Vue3\src\utils\directive\v-draggable.ts
 */
/* 
  拖拽指令，v-draggable,可在页面可视区域任意拖拽组件或元素
  实现：
    1.鼠标按下（onmousedown）时记录目标元素当前的left和top
    2.鼠标移动（onmousemove）时计算每次移动的横向和纵向偏移值，并改变元素的left和top
    3.鼠标松开（onmouseup）  时完成一次拖拽事件
 */

import { VueElement } from "vue/dist/vue";

const draggable = {
  mounted: function (el: VueElement) {
    el.style.cursor = "move";
    el.onmousedown = function (
      ev: MouseEvent & { target: ({ className?: string } & EventTarget) | null }
    ) {
      let disx = ev.pageX - el.offsetLeft;
      let disy = ev.pageY - el.offsetTop;
      if (ev.target?.className?.includes("head")) {
        document.onmousemove = function (ed: MouseEvent) {
          let x = ed.pageX - disx;
          let y = ed.pageY - disy;

          //处理边界问题
          let maxX =
            document.body.clientWidth -
            parseInt(window.getComputedStyle(el).width);
          let maxY =
            document.body.clientHeight -
            parseInt(window.getComputedStyle(el).height);

          if (x < 0) {
            x = 0;
          } else if (x > maxX) {
            x = maxX;
          }
          if (y < 0) {
            y = 0;
          } else if (y > maxY) {
            y = maxY;
          }
          el.style.left = x + "px";
          el.style.top = y + "px";
        };
      }
      document.onmouseup = function () {
        document.onmousemove = document.onmouseup = null;
      };
    };
  },
};

export default draggable;
