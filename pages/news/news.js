// pages/news/news.js
//引入新闻数据
const newsData = require("../../data/2");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    newsData, //新闻列表数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},
  // 跳转详情页
  toDetail(e) {
    const id = e.mark.postId;
    // console.log(id);
    // 跳转详情页
    wx.navigateTo({url:"/pages/news_detail/news_detail?id="+id})
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
