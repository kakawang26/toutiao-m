<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import dayjs from "dayjs";
import { editUserProfile } from "@/api/user";
export default {
  name: "UpdateBirthday",
  props: ["value"],
  data() {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value),
    };
  },
  methods: {
    async onConfirm() {
      try {
        await editUserProfile({
          birthday: dayjs(this.currentDate).format("YYYY-MM-DD"),
        });
        this.$emit("input", dayjs(this.currentDate).format("YYYY-MM-DD"));
        this.$emit("close");
      } catch (error) {
        this.$toast("更新失败，请稍后再试");
      }
    },
  },
};
</script>

<style>
</style>