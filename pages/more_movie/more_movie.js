// pages/more_movie/more_movie.js
import Base from "../../utils/base";
const base = new Base();
let url = ""; //定义变量保存当前页面的请求路径
Page({
  /**
   * 页面的初始数据
   */
  data: {
    movieList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const title = options.title;
    wx.setNavigationBarTitle({
      title,
    });
    // 根据导航栏标题获取当前页面需要请求的路径
    this.getUrl(title);
    // 获取更多电影页面的数据
    this.getMovieData();
  },
  // 获取路径
  getUrl(title) {
    switch (title) {
      case "正在热映":
        url = "in_theaters";
        break;
      case "即将上映":
        url = "coming_soon";
        break;
      default:
        url = "top250";
    }
  },
  async getMovieData() {
    // 数据没加载出来之前显示导航栏加载动画
    wx.showNavigationBarLoading();
    const res = await base.request(url, {
      start: this.data.movieList.length,
      count: 10,
    });
    // console.log(res.subjects);
    this.setData({
      movieList: this.data.movieList.concat(res.subjects),
      // 在原来数据的基础上拼接新获取到的数据
    });
    // 数据加载完成
    wx.hideNavigationBarLoading();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    // 清空原有数据
    this.data.movieList = [];
    this.getMovieData();
    // 关闭下拉刷新
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    this.getMovieData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
