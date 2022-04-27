<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
      />
    </van-list>
  </div>
</template>
<script>
import { getSearchResult } from "@/api/search";
export default {
  name: "SearchResult",
  props: ["searchText"],
  data() {
    return {
      list: [], // 搜索结果列表
      loading: false,
      finished: false,
      page: 1,
      error: false,
    };
  },
  methods: {
    async onLoad() {
      try {
        // 异步更新数据
        const { data } = await getSearchResult({
          page: this.page,
          per_page: 15,
          q: this.searchText,
        });

        // if (Math.random() > 0.2) {
        //   JSON.parse("wwwwssssss");
        // }

        // 把数据添加到数组中
        const { results, page } = data.data;
        this.list.push(...results);

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (results.length) {
          this.page++;
        } else {
          this.finished = true;
        }
      } catch (error) {
        this.error = true;
        this.loading = false;
        // this.$toast("获取数据失败，请稍后再试");
      }
    },

    // 获取搜索结果
  },
};
</script>
<style lang="less" scoped>
</style>