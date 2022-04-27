<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell :border="false">
      <div slot="title" class="title">我的频道</div>
      <van-button
        round
        size="mini"
        class="edit-btn"
        @click="isEdit = !isEdit"
        >{{ isEdit ? "完成" : "编辑" }}</van-button
      >
    </van-cell>

    <van-grid :gutter="10">
      <van-grid-item
        v-for="(channel, index) in myChannels"
        :key="channel.id"
        class="grid-item"
        @click="myChannelClick(channel, index)"
      >
        <van-icon
          slot="icon"
          name="clear"
          v-show="isEdit && !flexChannels.includes(channel.id)"
        ></van-icon>
        <span
          slot="text"
          class="grid-text"
          :class="{ active: index === active }"
          >{{ channel.name }}</span
        >
      </van-grid-item>
    </van-grid>

    <!-- 推荐频道 -->
    <van-cell :border="false">
      <div slot="title" class="title">频道推荐</div>
    </van-cell>

    <van-grid :gutter="10">
      <van-grid-item
        v-for="channel in recommendChannels"
        :key="channel.id"
        :text="channel.name"
        class="grid-item"
        icon="plus"
        @click="addChannel(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addMyChannels, deleteMyChannel } from "@/api/channel";
import { mapState } from "vuex";
import { setItem } from "@/utils/storage";
export default {
  name: "ChannelEdit",
  props: ["myChannels", "active"],
  data() {
    return {
      allChannels: [], //推荐频道列表
      isEdit: false, // 我的频道是否是编辑模式
      flexChannels: [0, 11],
    };
  },
  mounted() {
    this.loadAllChannels();
  },
  computed: {
    // 用户信息
    ...mapState(["user"]),
    // 计算推荐频道
    recommendChannels() {
      return this.allChannels.filter((channel) => {
        return !this.myChannels.find((mychannel) => {
          return mychannel.id == channel.id;
        });
      });
    },
  },
  methods: {
    // 获取所有频道列表
    async loadAllChannels() {
      try {
        const { data } = await getAllChannels();
        this.allChannels = data.data.channels;
      } catch (error) {
        this.$toast("获取推荐列表失败");
      }
    },
    // 添加我的频道
    async addChannel(channel) {
      this.myChannels.push(channel);

      // 数据持久化存储
      if (this.user) {
        // 已登录
        try {
          await addMyChannels([
            {
              id: channel.id,
              seq: this.myChannels.length,
            },
          ]);
        } catch (error) {
          this.$toast("添加频道失败，请稍后再试");
        }
      } else {
        // 未登录，本地存储
        setItem("TOUTIAO_CHANNELS", this.myChannels);
      }
    },
    // 我的频道点击事件
    myChannelClick(channel, index) {
      if (this.isEdit) {
        // 编辑状态
        // 点击的频道是默认频道时，退出
        if (this.flexChannels.includes(channel.id)) return;
        // 点击的频道在激活频道前面是，被激活频道的索引值要减1
        if (this.active >= index) {
          this.$emit("updataActive", this.active - 1);
        }
        // 删除被选中的频道
        this.myChannels.splice(index, 1);
        // 删除状态持久化
        this.deleteChannel(channel);
      } else {
        //  非编辑状态，跳转频道
        this.$emit("updataActive", index, false);
      }
    },
    // 删除频道
    async deleteChannel(channel) {
      if (this.user) {
        // 登录状态
        try {
          await deleteMyChannel(channel.id);
        } catch (error) {
          this.$toast("删除失败，请稍后重试");
        }
      } else {
        // 未登录状态
        setItem("TOUTIAO_CHANNELS", this.myChannels);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.channel-edit {
  padding-top: 80px;
  .title {
    font-size: 32px;
    counter-reset: #333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85c5c;
    border: 1px solid #f85c5c;
  }
  .van-cell {
    align-items: center;
  }
  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      background-color: #f4f5f6;
      .van-grid-item__text,
      .grid-text {
        font-size: 28px;
        color: #222;
        white-space: nowrap;
      }
      .van-icon-clear {
        position: absolute;
        top: -10px;
        right: -10px;
        font-size: 30px;
        color: #ccc;
        z-index: 2;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }
  /deep/ .van-grid-item__content {
    flex-direction: row;
    .van-icon-plus {
      font-size: 24px;
      margin-right: 6px;
    }
    .van-grid-item__text {
      margin-top: 0;
    }
  }
}
</style>