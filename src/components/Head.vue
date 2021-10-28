<!--
 * @Author: wwssaabb
 * @Date: 2021-09-17 16:24:12
 * @LastEditTime: 2021-10-28 15:04:37
 * @FilePath: \CloudMusic-for-Vue3\src\components\Head.vue
-->
<template>
  <div
    class="head-wrap fpbc"
    :class="features.find((i) => i.id === chooseId)?.menu ? 'pb35' : 'pb5'"
  >
    <div class="left fsc">
      <div class="logo">
        <a hidefocus="true" href="/#">网易云音乐</a>
      </div>
      <div class="feature-list fcc">
        <div
          class="feature-item fcc"
          :class="chooseId === item.id ? 'active' : ''"
          v-for="item in features"
          :key="item.id"
          @click="changeFeature(item)"
        >
          <span>{{ item.name }}</span>
          <span v-if="item.badge" class="badge">
            {{ item.badge }}
          </span>
        </div>
      </div>
      <div
        class="bottom-bar animated animate__slideInDown"
        :class="features.find((i) => i.id === chooseId)?.menu ? 'show' : ''"
      >
        <div
          class="tab-list fsc"
          v-if="features.find((i) => i.id === chooseId)?.menu !== undefined"
        >
          <span
            class="tab-item fcc cur_p user_ns"
            :class="chooseMenuId === item.id ? 'active' : ''"
            v-for="item in features.find((i) => i.id === chooseId)?.menu"
            :key="item.id"
            @click="changeTab(item)"
            >{{ item.name
            }}<span v-if="item.badge" style="color: #ddd" class="badge">{{
              item.badge
            }}</span></span
          >
        </div>
      </div>
    </div>

    <div class="right fsc">
      <div class="search">
        <div class="input-wrap fcc">
          <input
            type="text"
            v-model="searchText"
            placeholder="音乐/视频/电台/用户"
          />
          <i class="el-input__icon el-icon-search search-icon"></i>
        </div>
      </div>
      <div class="framer">创作者中心</div>
      <div class="login" @click="changeLoginModuleStatus">登录</div>
    </div>
  </div>
  <Popup v-if="loginModuleStatus" title="登录" :close="changeLoginModuleStatus">
    <div>aaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
    <div>aaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
    <div>aaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
    <div>aaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
    <div>aaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
    <div>aaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
    <div>aaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
    <div>aaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
    <div>aaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
  </Popup>
</template>

<script setup lang="ts">
import { ElInput } from "element-plus";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import Popup from "./Popup.vue";

// const ;

//中间的功能区
type MenuType = {
  id: number;
  name: string;
  path: string;
  badge?: string;
};
/* interface featureType extends MenuType {
  menu?: MenuType[];
} */
type featureType = MenuType & { menu?: MenuType[] };

const features: featureType[] = [
  {
    id: 1,
    name: "发现音乐",
    path: "/",
    menu: [
      { id: 1, name: "推荐", path: "/discover" },
      { id: 2, name: "排行榜", path: "/discover/toplist" },
      { id: 3, name: "歌单", path: "/discover/playlist", badge: "®" },
      { id: 4, name: "主播电台", path: "/discover/djradio" },
      { id: 5, name: "歌手", path: "/discover/artists" },
      { id: 6, name: "新碟上架", path: "/discover/album" },
    ],
  },
  { id: 2, name: "我的音乐", path: "/my" },
  { id: 3, name: "朋友", path: "/friend" },
  { id: 4, name: "商城", path: "/store/product" },
  { id: 5, name: "下载客户端", path: "/download", badge: "HOT" },
];
// console.log(features);

//选中的id
const chooseId = ref(1);
const chooseMenuId = ref(0);

//router实例化
const router = useRouter();

router.beforeEach((to, from, next) => {
  let path = to.path;

  //discover 子路由跳转监听切换chooseMenuId
  if (path.includes("/discover")) {
    let menu = features[0].menu;
    if (menu) {
      let newMenuId = menu.find((i) => i.path === path)?.id;
      chooseMenuId.value = newMenuId ? newMenuId : chooseMenuId.value;
    }
  } else {
    chooseMenuId.value = 0;
  }

  next();
});

const changeFeature = (item: featureType): void => {
  chooseId.value = item.id;
  router.push(item.path);
};
const changeTab = (item: MenuType): void => {
  chooseMenuId.value = item.id;
  router.push(item.path);
};

//搜索框的值
const searchText = ref("");

//登录
const loginModuleStatus = ref(false);
const changeLoginModuleStatus = () =>
  (loginModuleStatus.value = !loginModuleStatus.value);
</script>

<style lang="scss" scoped>
$--fixed_width: 1100px; //内容的宽度
// $--fixed_height: 70px; //内容的宽度

.head-wrap {
  width: $--fixed_width;
  height: 100%;
  flex-shrink: 0;

  &.pb5 {
    height: 75px;
    padding-bottom: 5px;
  }
  &.pb35 {
    height: 105px;
    padding-bottom: 35px;
  }

  .left {
    position: relative;
    height: 100%;
    flex-shrink: 0;

    .logo {
      flex-shrink: 0;
      width: 177px;
      height: 100%;
      padding-right: 20px;
      background: url("https://music.163.com/style/web2/img/frame/topbar.png?e0c08febe05b67c7b5b3926d0bdc8ca6")
        no-repeat;
      background-size: 177px 70px cover;
      text-indent: -9999px;
    }

    .feature-list {
      height: 100%;

      .feature-item {
        position: relative;
        flex-shrink: 0;
        height: 100%;
        padding: 0 19px;
        color: #ccc;

        .badge {
          position: absolute;
          background-color: #c20c0c;
          font-size: 11px;
          padding: 2px 5px;
          border-radius: 20px;
          color: #fff;
          right: -20%;
          top: 50%;
          transform: translate(0, -100%) scale(0.8);
        }

        &.active {
          position: relative;
          background-color: #000;
          &::after {
            position: absolute;
            content: "";
            width: 100%;
            height: 100%;
            background-color: #c20c0c;
            clip-path: polygon(
              0 0,
              0 100%,
              42% 100%,
              50% 90%,
              58% 100%,
              0 100%
            );
          }
        }
      }
    }

    .bottom-bar {
      position: absolute;
      left: 0;
      bottom: -5px;
      width: $--fixed_width;
      height: 5px;
      background-color: #c20c0c;

      &.show {
        height: 35px;
        bottom: -35px;
      }

      &::after {
        content: "";
        position: absolute;
        width: 100vw;
        height: inherit;
        top: inherit;
        background-color: #c20c0c;
        left: calc(#{$--fixed_width} / 2 - 50vw);
      }

      .tab-list {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 10;
        padding-left: 199px;

        span.tab-item {
          position: relative;
          font-size: 12px;
          height: 20px;
          line-height: 20px;
          color: #fff;
          padding: 2px 13px;
          border-radius: 10px;
          margin-right: 20px;

          &:hover {
            background-color: #9b0909;
          }
          &.active {
            background-color: #9b0909;
          }

          span.badge {
            width: 10px;
            height: 10px;
            line-height: 10px;
            position: absolute;
            color: #eee;
            margin-right: 2px;
            top: 0;
            right: 0;
            overflow: hidden;
            transform: scale(0.9);
          }
        }
      }
    }
  }

  .right {
    height: 100%;
    flex-shrink: 0;

    .search {
      width: 158px;
      height: 32px;

      .input-wrap {
        position: relative;
        width: 100%;
        height: 32px;
        padding: 0 10px 0 30px;
        border-radius: 16px;
        background-color: #fff;
        overflow: hidden;
        flex-shrink: 0;

        input {
          width: 100%;
          height: 100%;
          outline: none;
          border: none;
          font-size: 12px;
          color: #333;

          &::-webkit-input-placeholder {
            color: #9b9b9b;
          }
        }

        .search-icon {
          position: absolute;
          width: 20px;
          height: 20px;
          line-height: 20px;
          font-size: 16px;
          left: 5px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
    .framer {
      color: #ccc;
      border: 1px solid #4f4f4f;
      border-radius: 15px;
      margin-left: 12px;
      padding: 0 16px;
      line-height: 30px;
      font-size: 12px;
      text-align: center;
      flex-shrink: 0;

      &:hover {
        border-color: #ccc;
        color: #fff;
        transition: 0.2s;
      }
    }

    .login {
      color: #787878;
      font-size: 12px;
      margin: 0 22px 0 20px;
      flex-shrink: 0;
    }
  }
}
</style>
