// components/movie_list/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    list: Array,
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    // 跳转更多电影页面
    toMoreMovie() {
      // 获取当前组件的标题
      const title = this.properties.title;
      wx.navigateTo({
        url: "/pages/more_movie/more_movie?title=" + title,
      });
    },
  },
});
