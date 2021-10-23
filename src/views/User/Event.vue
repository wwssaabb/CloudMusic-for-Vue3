<!--
 * @Author: wwssaabb
 * @Date: 2021-10-20 08:55:56
 * @LastEditTime: 2021-10-23 10:05:52
 * @FilePath: \CloudMusic-for-Vue3\src\views\User\Event.vue
-->
<template>
  <div class="user-event-page">
    <Title>
      <template #title>
        <span class="title">TA的动态（753）</span>
      </template>
    </Title>
    <div class="content fss">
      <div class="left"></div>
      <div class="right">
        <Follow :list="data.foolows"></Follow>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { reqUserEvents, reqUserFollows } from "../../api";
import { UserEventType, UserFollowType } from "../../types/types";
import Title from "../../components/Title.vue";
import Follow from "../../components/User/Event/follow.vue";

const router = useRouter();

const id: string | undefined = router.currentRoute.value.query.id?.toString();

type dataType = {
  size: number;
  events: UserEventType[];
  foolows: UserFollowType[];
};

const data = ref<dataType>({
  size: 0,
  events: [],
  foolows: [],
});

const getUserEvents = async () => {
  if (!id) return;
  let res = await reqUserEvents(id);
  data.value.size = res.size;
  data.value.events = res.events;
};

const getUserFollows = async () => {
  if (!id) return;
  data.value.foolows = (await reqUserFollows(id, 1, 6)).follow;
};

onMounted(() => {
  getUserEvents();
  getUserFollows();
});

console.log(data.value);
</script>

<style lang="scss" scoped>
.user-event-page {
  .title {
    font-size: 20px;
    color: #666;
    line-height: 26px;
  }

  .content {
    .left {
      width: 700px;
      min-height: 345px;
      padding: 10px 25px 0 0;
      border-right: 1px solid #d4d4d4;
    }
    .right {
      width: 250px;
    }
  }
}
</style>
