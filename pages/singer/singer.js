// pages/singer/singer.js
import singerList from "../../data/1";
// 定义空数组保存每项需要滚动的距离
const scrollArr = [];
Page({
  /**
   * 页面的初始数据
   */
  data: {
    singerList,
    currentIndex: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},
  // 点击右侧导航控制左侧滚动
  onTap(e) {
    // 拿到当前选项的index
    const index = e.mark.index;
    // 设置高亮样式
    this.setData({
      currentIndex: index,
    });
    // 让左侧滚动到对应位置
    wx.pageScrollTo({
      duration: 0, //没有过度动画
      scrollTop: scrollArr[index], //跳转对应高度
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    // 获取每个分类(楼层)的高度
    const query = wx.createSelectorQuery();
    query
      .selectAll(".singer_box")
      .fields({ size: true }, (res) => {
        // 把全局变量数组处理成[0,第一个盒子的高度,第一个盒子的高度+第二个盒子高度,....]
        let height = 0;
        scrollArr.push(height);
        res.forEach((item) => {
          // 解决浮点数精度问题
          height += Math.ceil(item.height);
          scrollArr.push(height);
        });
      })
      .exec();
  },
  // 页面滚动函数监听高亮
  onPageScroll(e) {
    // 获取页面的滚动距离
    const sT = Math.ceil(e.scrollTop);
    // 根据滚动距离判断落在哪个区间的下标
    //n为符合条件的下标
    let n = scrollArr.findIndex(
      (item, index, arr) => sT >= item && sT < arr[index + 1]
    );
    // console.log(n);
    this.setData({
      currentIndex: n,
    });
  },
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
