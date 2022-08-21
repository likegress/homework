// pages/mag/mag.js
// 大图 / 小图的 横纵向比例
let deltaW, deltaH;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    moveW: 0,
    moveH: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const query = wx.createSelectorQuery();
    query
      .select(".smallImg")
      .fields({ size: true })
      .select(".bigImg")
      .fields({ size: true })
      .select(".displayer")
      .fields({ size: true })
      .exec((res) => {
        console.log(res);
        // 求整体放大的倍数 = 大图 / 小图
        deltaW = res[1].width / res[0].width;
        deltaH = res[1].height / res[0].height;
        // (由镜片 ->显示器) 求局部放大的倍数 delta = 显示器 / 镜片
        // 镜片 = 显示器 / delta
        const moveW = res[2].width / deltaW;
        const moveH = res[2].height / deltaH;
        this.setData({
          moveW,
          moveH,
        });
      });
  },
  //滑块拖拽
  onDrag(e) {
    const { x: disX, y: disY } = e.detail;
    //  大图的偏移距离
    this.setData({
      bigImgLeft: -disX * deltaW,
      bigImgTop: -disY * deltaH,
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
