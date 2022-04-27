<template>
  <div>
    <!--  -->
    <van-nav-bar
      title="昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="updateName"
    />
    <div class="name-wrap">
      <van-field
        v-model.trim="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { editUserProfile } from "@/api/user";
export default {
  name: "UpdateName",
  props: ["value"],
  data() {
    return {
      localName: this.value,
    };
  },
  methods: {
    async updateName() {
      try {
        const localName = this.localName;
        if (!localName.length) {
          this.$toast("昵称不能为空");
        }
        const { data } = await editUserProfile({
          name: localName,
        });
        // 更新视图
        this.$emit("input", localName);
        // 更新成功，关闭弹出层
        this.$emit("close");
        // 提示成功
        this.$toast("更新成功");
      } catch (error) {
        this.$toast("更新失败，请稍后再试");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.name-wrap {
  padding: 20px;
}
</style>