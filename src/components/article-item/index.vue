<template>
  <div class="article-item">
    <van-cell :to="`/article/${article.art_id}`">
      <!-- 标题 -->
      <div class="title van-multi-ellipsis--l2" slot="title">
        {{ article.title }}
      </div>

      <!-- 中间label -->
      <div slot="label">
        <div v-if="article.cover.type === 3" class="cover-img-wrap">
          <van-image
            class="cover-img-item"
            :src="img"
            v-for="(img, index) in article.cover.images"
            :key="index"
            fit="cover"
          />
        </div>
        <div class="cover-info-wrap">
          <span>{{ article.aut_name }}</span>
          <span>{{ article.comm_count }}评论</span>
          <span>{{ article.pubdate | relativeTime }}</span>
        </div>
      </div>

      <!-- 右侧图片 -->
      <div class="right-cover" slot="default" v-if="article.cover.type === 1">
        <van-image
          :src="article.cover.images[0]"
          class="right-cover-img"
          fit="cover"
        />
      </div>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "ArticleItem",
  props: {
    article: {
      type: Object,
      require: true,
    },
  },
};
</script>

<style lang="less" scoped>
.article-item {
  // 标题
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  // 中间label
  .cover-img-wrap {
    display: flex;
    .cover-img-item {
      flex: 1;
      padding: 30px 0;
      width: 232px;
      height: 146px;
      &:not(:last-child) {
        margin-right: 4px;
      }
    }
  }
  .cover-info-wrap {
    span {
      margin-right: 26px;
      font-size: 23px;
      color: #b4b4b4;
    }
  }

  // 右侧图片
  .van-cell__value {
    flex: unset;
    margin-left: 25px;
    .right-cover-img {
      width: 232px;
      height: 146px;
    }
  }
}
</style>