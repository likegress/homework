// pages/circle/circle.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    circleArr: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.showLoading({
      title: "玩命加载中",
    });
    // 调用云函数获取朋友圈数据
    this._loadData();
  },
  // 封装函数实现数据加载
  async _loadData() {
    console.log(this.data.circleArr);
    const res = await wx.cloud.callFunction({
      name: "getCircleData",
      data: {
        start: this.data.circleArr.length,
        count: 5,
      },
    });

    const circleArr = res.result.data;
    console.log("朋友圈数据", circleArr);
    this.setData({
      // 在已有数据的基础上拼接上新拿到的5条数据重新绑定到页面上
      circleArr: this.data.circleArr.concat(circleArr),
    });
    wx.hideLoading();
  },
  // 点击发布朋友圈按钮,弹出授权框,获取用户的昵称和头像
  onTap() {
    wx.getUserProfile({
      desc: "获取头像和昵称",
      success: (res) => {
        // 允许授权
        console.log(res);
        const { avatarUrl, nickName } = res.userInfo;
        // 跳转发布页面,携带昵称和头像
        wx.navigateTo({
          url: `/pages/publish/publish?nickName=${nickName}&avatarUrl=${avatarUrl}`,
        });
      },
      fail: (err) => {
        // 不允许授权
        console.log(err);
        wx.showModal({
          title: "需要授权才能发布朋友圈",
          showCancel: false, //不需要取消按钮
        });
      },
    });
  },
  
  onReachBottom() {
    this._loadData();
  },
  // 下拉刷新
  onPullDownRefresh() {
    // 清空之前的所有内容重新加载
    this.data.circleArr = [];
    this._loadData();
    // 关闭下拉刷新
    wx.stopPullDownRefresh();
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
