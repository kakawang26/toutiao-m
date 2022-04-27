<template>
  <div class="login-container">
    <van-nav-bar title="登录" class="page-nav-bar">
      <van-icon name="cross" slot="left" @click="$router.back()" />
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        name="mobile"
        placeholder="请输入手机号"
        v-model="user.mobile"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="iconfont icon-shouji"></i>
      </van-field>
      <van-field
        name="code"
        placeholder="请输入验证码"
        v-model="user.code"
        :rules="userFormRules.code"
        type="number"
        maxLength="6"
      >
        <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
        <template #button>
          <van-count-down
            :time="60000"
            format="ss s"
            v-if="isShowCountDown"
            @finish="isShowCountDown = false"
          />
          <van-button
            v-else
            size="small"
            type="default"
            round
            class="send-sms-btn"
            @click="onSendSms"
            native-type="button"
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>
<script>
import { login, sendSms } from "@/api/user";
export default {
  name: "Login",
  data() {
    return {
      user: {
        mobile: "13911111111",
        code: "246810",
      },
      // 表单验证
      userFormRules: {
        mobile: [
          {
            required: true,
            message: "请填写手机号",
          },
          {
            pattern: /^1[3578]\d{9}$/,
            message: "手机号格式不正确",
          },
        ],
        code: [
          {
            required: true,
            message: "请填写验证码",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式不正确",
          },
        ],
      },
      // 倒计时组件是否显示
      isShowCountDown: false,
    };
  },
  methods: {
    // 表单提交按钮
    async onSubmit() {
      // 获取用户数据
      const user = this.user;
      // 表单验证
      // 加载中提示
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true, // 禁用背景点击。
        duration: 0, // 展示时长(ms)，值为 0 时，toast 不会消失
      });
      // 发请求登录
      try {
        const res = await login(user);
        this.$toast.success("登录成功");
        this.$router.back();
        const { data } = res;
        this.$store.commit("setUser", data.data);
      } catch (error) {
        if (error.response.status === 400) {
          this.$toast.fail("手机号或密码错误");
        } else {
          this.$toast.fail("登录失败，请稍后重试");
        }
      }
    },
    // 获取验证码按钮
    async onSendSms() {
      // 1.校验手机号
      try {
        await this.$refs.loginForm.validate("mobile");
      } catch (error) {
        return console.log("验证失败", error);
      }
      // 2.显示倒计时
      this.isShowCountDown = true;
      // 3.请求发送验证码
      try {
        const res = await sendSms(this.user.mobile);
        this.$toast("发送成功");
      } catch (error) {
        this.isShowCountDown = false;
        if (error.response.status === 429) {
          this.$toast("发送太频繁了，请稍后重试");
        } else {
          this.$toast("发送失败，请稍后重试");
        }
      }
    },
  },
};
</script>
<style lang="less">
.login-container {
  .iconfont {
    font-size: 37px;
  }

  .send-sms-btn {
    width: 152px;
    height: 46px;
    padding: 0;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>