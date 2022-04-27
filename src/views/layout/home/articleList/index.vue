<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      :success-text="successText"
      :success-duration="1500"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <ArticleItem
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from "@/components/article-item";
import { getArticleList } from "@/api/article";
export default {
  name: "ArticleList",
  components: { ArticleItem },
  props: {
    channel: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      list: [], //文章推荐列表
      loading: false, //加载状态
      finished: false, //数据加载完成
      timestamp: null, //请求下一次数据的时间戳
      error: false, //请求失败
      refreshing: false, //下拉刷新
      successText: "刷新成功", // 刷新成功提示文本
    };
  },
  methods: {
    async onLoad() {
      try {
        // 1. 发请求获取文章推荐列表
        const { data } = await getArticleList({
          channel_id: this.channel.id, // 频道id
          timestamp: this.timestamp || Date.now(), // 时间戳，相当于页码
        });

        // 模拟请求失败
        // if (Math.random() > 0.5) {
        //   JSON.parse("11gghhsjjs");
        // }

        const { results } = data.data;
        // 2. 把新一页的列表合并到list中
        this.list.push(...results);
        // 3. 本次数据加载结束后，把加载状态修改为false
        this.loading = false;
        // 4. 所有数据加载完毕后，提示无更多数据
        if (results.length) {
          // 更新下一次请求数据的时间戳
          this.timestamp = data.data.pre_timestamp;
        } else {
          // 全部数据加载完毕
          this.finished = true;
        }
      } catch (error) {
        // 提示错误信息
        this.error = true;
        // 请求失败也需要关闭loading
        this.loading = false;
      }
    },
    async onRefresh() {
      try {
        // 1. 发请求获取文章推荐列表
        const { data } = await getArticleList({
          channel_id: this.channel.id, // 频道id
          timestamp: Date.now(), // 下拉刷新永远获取最新的数据
        });

        // 模拟请求失败
        // if (Math.random() > 0.5) {
        //   JSON.parse("11gghhsjjs");
        // }

        const { results } = data.data;

        // 判断是否有新数据
        if (results.length <= 0) {
          this.$toast("没有更多数据");
          this.loading = false;
        }
        // 2. 把新一页的列表合并到list中
        this.list.unshift(...results);
        // 3. 本次数据加载结束后，把加载状态修改为false
        this.refreshing = false;

        // 4.刷新成功提示
        this.successText = `刷新成功，更新了${results.length}条数据`;
        //
      } catch (error) {
        // 5.刷新失败提示
        this.refreshing = false;
        this.successText = "刷新失败";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.article-list {
  height: 80vh;
  overflow-y: auto;
}
</style>