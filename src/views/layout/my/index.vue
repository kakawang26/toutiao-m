<template>
  <div>
    <!-- 已登录 -->
    <div class="header user-info" v-if="user">
      <div class="base-info">
        <div class="left">
          <van-image :src="userInfo.photo" class="avatar" round fit="cover" />
          <span class="text">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button size="mini" round to="/user/profile">编辑资料</van-button>
        </div>
      </div>
      <div class="stats">
        <div class="stats-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="info">头条</span>
        </div>
        <div class="stats-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="info">关注</span>
        </div>
        <div class="stats-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="info">粉丝</span>
        </div>
        <div class="stats-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="info">获赞</span>
        </div>
      </div>
    </div>
    <!-- 未登录 -->
    <div class="header not-login" v-else>
      <div class="login-btn" @click="$router.push('/login')">
        <img src="~@/assets/mobile.png" alt="" />
        <div class="text">登录 / 注册</div>
      </div>
    </div>

    <!-- 宫格导航 -->
    <van-grid column-num="2" class="grid-nav" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont icon-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont icon-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>

    <!-- 单元格 -->
    <van-cell title="消息通知" size="large" is-link />
    <van-cell title="小智同学" size="large" is-link />
    <van-cell
      title="退出登录"
      size="large"
      class="logout-cell"
      clickable
      v-if="user"
      @click="logout"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getUserInfo } from "@/api/user";
export default {
  name: "My",
  data() {
    return {
      userInfo: {}, // 存储用户基本信息
    };
  },
  mounted() {
    // 加载用户信息
    this.loadUserInfo();
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    // 退出登录
    logout() {
      this.$store.commit("setUser", null);
    },
    // 加载用户信息
    async loadUserInfo() {
      try {
        const { data } = await getUserInfo();
        this.userInfo = data.data;
      } catch (error) {
        this.$toast("获取用户信息失败");
      }
    },
  },
};
</script>

<style lang="less" scoped>
// 头部公共样式
.header {
  height: 361px;
  background: url("~@/assets/banner.png");
  background-size: cover;
}

// 未登录头部
.not-login {
  display: flex;
  justify-content: center;
  .login-btn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 132px;
      height: 132px;
      margin-bottom: 15px;
    }
    .text {
      font-size: 28px;
      color: #fff;
    }
  }
}

// 已登录头部
.user-info {
  .base-info {
    height: 231px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 80px 32px 0;
    box-sizing: border-box;
    .left {
      .avatar {
        width: 132px;
        height: 132px;
        border: 4px solid #fff;
        vertical-align: middle;
        margin-right: 22px;
      }
      .text {
        font-size: 30px;
        color: #fff;
      }
    }
  }
  .stats {
    display: flex;
    height: 135px;
    align-items: center;
    .stats-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #fff;
      .count {
        font-size: 36px;
      }
      .info {
        font-size: 23px;
      }
    }
  }
}

// 宫格导航
.grid-nav {
  height: 141px;
  margin-bottom: 45px;
  .grid-item {
    .iconfont {
      font-size: 45px;
    }
    .icon-shoucang {
      color: #eb5253;
    }
    .text {
      margin-top: 16px;
      font-size: 28px;
    }
    .icon-lishi {
      color: #ff9d1d;
    }
  }
}

// 单元格
.logout-cell {
  margin-top: 10px;
  text-align: center;
  color: #d86262;
}
</style>