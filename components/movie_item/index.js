// components/movie_item/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    movie: Object,
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    // 跳转电影详情页
    onToDetail(e) {
      // 获取当前电影的id
      const { id } = this.properties.movie;
      console.log(id);
      // 跳转详情页
      wx.navigateTo({
        url: "/pages/movie_detail/movie_detail?id=" + id,
      });
    },
  },
});
