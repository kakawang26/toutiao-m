<template>
  <div>
    <!--   @change="onChange" -->
    <van-picker
      title="性别"
      show-toolbar
      :columns="columns"
      :default-index="localGender"
      @confirm="updateGender"
      @cancel="$emit('close')"
      @change="onChange"
    />
  </div>
</template>

<script>
import { editUserProfile } from "@/api/user";
export default {
  name: "UpdateGender",
  props: ["value"],
  data() {
    return {
      columns: ["男", "女"],
      localGender: this.value,
    };
  },
  methods: {
    async updateGender() {
      try {
        const localGender = this.localGender;
        await editUserProfile({
          gender: localGender,
        });
        // 更新视图
        this.$emit("input", localGender);
        // 更新成功，关闭弹出层
        this.$emit("close");
        // 提示成功
        this.$toast("更新成功");
      } catch (error) {
        this.$toast("更新失败，请稍后再试");
      }
    },

    onChange(picker, value, index) {
      this.localGender = index;
    },
  },
};
</script>

<style>
</style>