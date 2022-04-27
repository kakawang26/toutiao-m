<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="searchHistory.splice(0)">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon name="delete-o" v-else @click="isDeleteShow = true" />
    </van-cell>
    <van-cell
      :title="sh"
      v-for="(sh, index) in searchHistory"
      :key="index"
      @click="searchItemClick(sh, index)"
    >
      <van-icon name="close" v-if="isDeleteShow" />
    </van-cell>
  </div>
</template>
<script>
export default {
  name: "SearchHistory",
  props: ["searchHistory"],
  data() {
    return {
      isDeleteShow: false,
    };
  },
  methods: {
    // 点击搜索记录搜索内容
    searchItemClick(sh, index) {
      if (this.isDeleteShow) {
        // 删除状态
        this.searchHistory.splice(index, 1);
      } else {
        // 非删除状态，搜索
        this.$emit("search", sh);
      }
    },
  },
};
</script>
<style lang="less" scoped>
</style>