<template>
  <div>
    <!-- 路由出口 -->
    <router-view />

    <!-- 标签栏 -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item to="/home">
        <i slot="icon" class="iconfont icon-shouye"></i>
        首页
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <i slot="icon" class="iconfont icon-wenda"></i>
        问答
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <i slot="icon" class="iconfont icon-shipin"></i>
        视频
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <i slot="icon" class="iconfont icon-wode"></i>
        我的
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "Layout",
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style lang="less">
.van-tabbar-item {
  font-size: 20px;
  .iconfont {
    font-size: 40px;
  }
}
</style>