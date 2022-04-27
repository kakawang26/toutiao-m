<template>
  <div>
    <div class="home-container">
      <!-- 顶部搜索 -->
      <van-nav-bar title="登录" class="page-nav-bar" fixed>
        <van-button
          slot="title"
          round
          size="small"
          icon="search"
          class="search-btn"
          type="info"
          to="/search"
          >搜索</van-button
        >
      </van-nav-bar>

      <!-- 频道列表 -->
      <van-tabs v-model="active" animated swipeable>
        <van-tab
          :title="channel.name"
          v-for="channel in channels"
          :key="channel.id"
        >
          <ArticleList :channel="channel" />
        </van-tab>
        <div slot="nav-right" class="placeholder"></div>
        <div slot="nav-right" class="more-btn" @click="show = true">
          <i class="iconfont icon-gengduo"></i>
        </div>
      </van-tabs>

      <!-- 频道弹出层 -->
      <van-popup
        v-model="show"
        closeable
        position="bottom"
        close-icon-position="top-left"
        :style="{ height: '100%' }"
      >
        <ChannelEdit
          :myChannels="channels"
          :active="active"
          @updataActive="updataActive"
      /></van-popup>
    </div>
  </div>
</template>

<script>
import ArticleList from "./articleList";
import ChannelEdit from "@/components/channel-edit";
import { getUserChannels } from "@/api/user";
import { mapState } from "vuex";
import { getItem } from "@/utils/storage";
export default {
  name: "Home",
  components: { ArticleList, ChannelEdit },
  data() {
    return {
      active: 0,
      channels: [], // 用户频道
      show: false, //频道弹出层显示与隐藏
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  mounted() {
    // 获取用户频道
    this.loadUserChannels();
  },
  methods: {
    // 获取用户频道的方法
    async loadUserChannels() {
      let channels = [];
      try {
        if (this.user) {
          //  已登录
          const { data } = await getUserChannels();
          channels = data.data.channels;
        } else {
          // 未登录，判断本地存储是否有数据，
          const localChannels = getItem("TOUTIAO_CHANNELS");
          if (localChannels) {
            //有则展示
            channels = localChannels;
          } else {
            // 没有就发请求获取服务器默认列表
            const { data } = await getUserChannels();
            channels = data.data.channels;
          }
        }
      } catch (error) {
        this.$toast("请求失败，请稍后重试");
      }
      this.channels = channels;
    },
    // 跳转频道
    updataActive(index, show = true) {
      this.active = index;
      this.show = show;
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .home-container {
  padding-top: 172px;
  padding-bottom: 100px;
  // 顶部搜索
  .van-nav-bar__title {
    max-width: 100%;
    .search-btn {
      width: 555px;
      height: 64px;
      background-color: rgba(255, 255, 255, 0.2);
      font-size: 28px;
      .van-icon {
        font-size: 32px;
      }
    }
  }

  // 频道导航
  .van-tabs__wrap {
    height: 80px;
    position: fixed;
    z-index: 1;
    top: 92px;
    left: 0;
    right: 0;
    .van-tab {
      border-right: 1px solid #edeff3;
      width: 200px;
      font-size: 28px;
      color: #777;
    }
    .van-tabs__nav--line {
      padding-right: 0;
    }
    .van-tab--active {
      font-size: 30px;
      color: #333333;
    }
    .van-tabs__line {
      width: 31px;
      height: 6px;
      margin-bottom: 8px;
      background-color: #3296fa;
    }
    .more-btn {
      position: fixed;
      right: 0;
      width: 66px;
      height: 82px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(255, 255, 255, 0.9)
        url("~@/assets/gradient-gray-line.png") no-repeat;
      .iconfont {
        font-size: 33px;
      }
    }
    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }
  }
}
</style>