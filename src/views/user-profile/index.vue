<template>
  <div>
    <!-- 导航 -->
    <van-nav-bar
      title="个人信息"
      class="page-nav-bar"
      left-arrow
      @click-left="$router.back()"
    >
    </van-nav-bar>
    <input type="file" hidden ref="file" @change="onFileChange" />

    <!-- 用户个人信息 -->
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image class="avatar" round :src="userProfile.photo" fit="cover" />
    </van-cell>

    <van-cell
      title="昵称"
      is-link
      :value="userProfile.name"
      @click="isUpdateNameShow = true"
    >
    </van-cell>

    <van-cell
      title="性别"
      is-link
      :value="userProfile.gender == 0 ? '男' : '女'"
      @click="isUpdateGenderShow = true"
    ></van-cell>

    <van-cell
      title="生日"
      is-link
      :value="userProfile.birthday"
      @click="isUpdateBirthdayShow = true"
    />

    <!-- 编辑昵称弹出层 -->
    <van-popup
      v-model="isUpdateNameShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <UpdateName
        @close="isUpdateNameShow = false"
        v-model="userProfile.name"
        v-if="isUpdateNameShow"
      />
    </van-popup>

    <!-- 编辑性别弹出层 -->
    <van-popup v-model="isUpdateGenderShow" position="bottom">
      <UpdateGender
        v-if="isUpdateGenderShow"
        @close="isUpdateGenderShow = false"
        v-model="userProfile.gender"
      />
    </van-popup>

    <!-- 编辑生日弹出层 -->
    <van-popup v-model="isUpdateBirthdayShow" position="bottom">
      <UpdateBirthday
        v-if="isUpdateBirthdayShow"
        @close="isUpdateBirthdayShow = false"
        v-model="userProfile.birthday"
      />
    </van-popup>

    <!-- 编辑头像弹出层 -->
    <van-popup
      v-model="isUpdatePhotoShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <UpdatePhoto
        v-if="isUpdatePhotoShow"
        @close="isUpdatePhotoShow = false"
        v-model="userProfile.photo"
        :img="img"
        @update-photo="userProfile.photo = $event"
      />
    </van-popup>
  </div>
</template>

<script>
import UpdatePhoto from "./update-photo";
import UpdateBirthday from "./update-birthday";
import UpdateName from "./update-name";
import UpdateGender from "./update-gender";
import { getUserProfile } from "@/api/user";
export default {
  name: "UserProfile",
  components: { UpdateName, UpdateGender, UpdateBirthday, UpdatePhoto },
  data() {
    return {
      userProfile: {}, // 用户个人资料
      isUpdateNameShow: false,
      isUpdateGenderShow: false,
      isUpdateBirthdayShow: false,
      isUpdatePhotoShow: false,
      img: null,
    };
  },
  mounted() {
    this.loadUserProfile();
  },
  methods: {
    // 获取用户基本信息
    async loadUserProfile() {
      try {
        const { data } = await getUserProfile();
        this.userProfile = data.data;
      } catch (error) {
        this.$toast("获取数据失败，请稍后再试");
      }
    },
    // 头像文件发生改变
    onFileChange() {
      // 获取文件对象
      const file = this.$refs.file.files[0];
      // 基于文章获取 blob 数据
      this.img = window.URL.createObjectURL(file);

      this.isUpdatePhotoShow = true;

      // file-input 如果选了同一个文件不会触发 change 事件
      // 解决办法就是每次使用完毕，把它的 value 清空
      this.$refs.file.value = "";
    },
  },
};
</script>

<style lang="less" scoped>
.avatar {
  width: 60px;
  height: 60px;
}
.van-popup {
  background-color: #f5f7f9;
}
</style>