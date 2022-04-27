<template>
  <div class="search-container">
    <!-- 顶部搜索栏 -->
    <form action="/" class="form">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="onFocus"
      />
    </form>

    <!-- 搜索结果 -->
    <SearchResult v-if="showResult" :searchText="searchText" />

    <!-- 搜索建议 -->
    <SearchSuggestion
      v-else-if="searchText"
      :searchText="searchText"
      @search="onSearch"
    />

    <!-- 搜索历史 -->
    <SearchHistory v-else :searchHistory="searchHistory" @search="onSearch" />
  </div>
</template>

<script>
import SearchHistory from "./search-history";
import SearchResult from "./search-result";
import SearchSuggestion from "./search-suggestion";
import { setItem, getItem } from "@/utils/storage";
export default {
  name: "Search",
  components: { SearchHistory, SearchResult, SearchSuggestion },
  data() {
    return {
      searchText: "",
      showResult: false, // 是否展示搜索结果
      searchHistory: getItem("SEARCH_HISTORY") || [], // 存储历史记录
    };
  },
  watch: {
    searchHistory(val) {
      setItem("SEARCH_HISTORY", val);
    },
  },
  methods: {
    // 点击搜索（手机点击搜索，电脑回车）
    onSearch(val) {
      this.searchText = val;
      this.showResult = true;

      // 判断历史记录中是否有重复数据
      const index = this.searchHistory.indexOf(val);
      if (index !== -1) {
        this.searchHistory.splice(index, 1);
      }
      this.searchHistory.unshift(val);
    },
    // 点击取消按钮
    onCancel() {
      this.$router.back();
    },
    // 输入框获得焦点
    onFocus() {
      this.showResult = false;
    },
  },
};
</script>

<style lang="less" scoped>
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  /deep/ .van-icon-search {
    color: #9a9a9a;
  }
  .form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>