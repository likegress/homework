// components/music_item/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    order: Number,
    music: Object,
    status: Boolean,
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    onMusicTap(e) {
      // 当前点击项的下标
      const curIndex = this.properties.order - 1;
      // 将当前点击项的下标传递给父组件
      this.triggerEvent("musicTap", { curIndex });
      // 跳转歌曲播放页面
      wx.navigateTo({
        url: "/pages/player/player",
      });
    },
  },
});
