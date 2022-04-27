<template>
  <div class="photo-container">
    <img :src="img" ref="img" />

    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="onConfirm">完成</div>
    </div>
  </div>
</template>

<script>
import { updateUserAvatar } from "@/api/user";
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
export default {
  name: "UpdatePhoto",
  props: ["img"],
  data() {
    return {
      cropper: null,
    };
  },
  mounted() {
    const image = this.$refs.img;
    this.cropper = new Cropper(image, {
      aspectRatio: 16 / 9,
      viewMode: 1,
      dragMode: "move",
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
    });
  },
  methods: {
    onConfirm() {
      // 基于服务端的裁切使用 getData 方法获取裁切参数
      console.log(this.cropper.getData());

      // 纯客户端的裁切使用 getCroppedCanvas 获取裁切的文件对象
      this.cropper.getCroppedCanvas().toBlob((blob) => {
        this.loadUserPhoto(blob);
      });
    },
    async loadUserPhoto(blob) {
      this.$toast.loading({
        message: "保存中...",
        forbidClick: true, // 禁止北京点击
        duration: 0, // 持续展示
      });
      try {
        // 如果接口要求的 Content-Type 是 application/json
        // 则传递普通的 js 对象
        // updateUserAvatar({ photo: blob });

        // 如果接口要求的 Content-Type  是	multipart/form-data
        // 则需要传递 FormData 对象

        const formData = new FormData();
        formData.append("photo", blob);

        const { data } = await updateUserAvatar(formData);

        this.$emit("close");

        this.$emit("update-photo", data.data.photo);
        this.$toast("保存成功");
      } catch (error) {
        this.$toast("保存失败，请稍后再试");
      }
    },
  },
};
</script>

<style lang='less' scoped>
.photo-container {
  background-color: #000;
  height: 100%;
  img {
    display: block;
    max-width: 100%;
  }
  .toolbar {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    .cancel,
    .confirm {
      width: 90px;
      height: 90px;
      line-height: 90px;
      font-size: 40px;
      text-align: center;
      color: #fff;
    }
  }
}
</style>