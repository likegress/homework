// pages/movie_detail/movie_detail.js
import Base from "../../utils/base";
const base = new Base();
Page({
  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    // 拿到当前电影的id
    const { id } = options;
    // 根据电影id请求服务器
    const res = await base.request("subject/" + id);
    console.log(res);
    this.setData({
      ...res,
    });
  },
  // 图片预览
  previewImg() {
    wx.previewImage({
      urls: [this.data.images.large],
    });
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
