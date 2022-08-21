// pages/music/music.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    curIndex: -1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //初始化当前播放项下标

    //获取歌单列表,加载数据
    this._loadMusicData();
  },
  async _loadMusicData() {
    // 调用云函数获取数据
    const res = await wx.cloud.callFunction({
      name: "getMusicList",
    });
    const musicList = res.result.data;
    this.setData({
      musicList,
    });
    // 把当前歌单列表存入缓存,便于更快的加载上一首或下一首
    wx.setStorageSync("musicList", musicList);
  },
  // 控制音乐选项是否高亮
  onMusicTap(e) {
    // 拿到从子组件传递过来的下标
    const curIndex = e.detail.curIndex;
    this.setData({
      curIndex,
    });
    // 跳转歌曲播放页面
    wx.navigateTo({
      url: "/pages/player/player?index=" + curIndex,
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
      curIndex: app.currentMusicIndex,
    });
  },
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
