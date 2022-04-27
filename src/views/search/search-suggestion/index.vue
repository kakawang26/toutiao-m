<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      v-for="(text, index) in options"
      :key="index"
      @click="$emit('search', text)"
    >
      <span slot="title" v-html="hightLight(text)"></span>
    </van-cell>
  </div>
</template>
<script>
import { debounce } from "lodash";
import { getSuggestion } from "@/api/search";
export default {
  name: "SearchSuggestion",
  props: ["searchText"],
  data() {
    return {
      options: [],
    };
  },
  watch: {
    searchText: {
      immediate: true,
      handler: debounce(function (value) {
        // 获取联想建议
        this.loadSuggestions(value.trim());
      }, 200),
    },
  },
  methods: {
    // 获取联想建议
    async loadSuggestions(q) {
      try {
        const { data } = await getSuggestion({ q });
        this.options = data.data.options;
      } catch (error) {
        this.$toast("获取数据失败，请稍后再试");
      }
    },
    //
    hightLight(text) {
      if (!text) return;
      const hightLightTExt = `<span class="active">${this.searchText}</span>`;

      // new RegExp定义正则，可以传入字符串格式，第二个参数是匹配模式g：全局匹配，i：不区分大小写
      const reg = new RegExp(this.searchText, "gi");
      return text.replace(reg, hightLightTExt);
    },
  },
};
</script>
<style lang="less" scoped>
.search-suggestion {
  /deep/ .active {
    color: #3296fa;
  }
}
</style>