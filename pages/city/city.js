// pages/city/city.js
import { city } from "../../data/city";
//定义全局变量来保存滚动距离数组
const scrollArr = [];
Page({
  /**
   * 页面的初始数据
   */
  data: {
    city,
    selectedVal: "", //用来保存选中的城市
    currentIndex: 0,
    outerIndex: 1, // 用来保存选中项外层循环下标
    innerIndex: 0, // 用来保存内层循环下标
    showSearch: false, //用来保存是否显示搜索框
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},
  // 选择城市
  onSelectCity(e) {
    // 拿到被选城市的名字
    const name = e.mark.name;
    // 拿到被选城市外层循环下标
    const outer = e.mark.outer;
    // 拿到被选城市内层循环下标
    const inner = e.mark.inner;
    this.setData({
      selectedVal: name,
      outerIndex: outer,
      innerIndex: inner,
    });
  },
  //右侧控制左侧
  onFixedTap(e) {
    const index = e.mark.index;
    this.setData({
      currentIndex: index,
      scrollTop: scrollArr[index],
    });
  },
  // 监听文本框的输入内容
  onInput(e) {
    const val = e.detail.value;
    // console.log(val);
    if (val.trim() !== "") {
      // 文本框有输入内容  --->显示搜索界面
      // 展示搜索结果
      this.setData({
        showSearch: true,
        selectedVal: val,
      });
    } else {
      // 文本框没有输入内容  --->隐藏搜索界面
      this.setData({
        showSearch: false,
      });
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    const query = wx.createSelectorQuery();
    query
      .selectAll(".city_cate")
      .fields(
        {
          size: true,
        },
        (res) => {
          let height = 0;
          scrollArr.push(height);
          res.forEach((item) => {
            // 对高度进行取整处理,避免程序中出现小数失去精准度的问题
            height += Math.ceil(item.height);
            scrollArr.push(height);
          });
          // console.log("滚动距离", scrollArr);
          // 设置初始滚动距离
          this.setData({
            scrollTop: scrollArr[1],
          });
        }
      )
      .exec();
  },
  // 监听scroll-view滚动,左侧控制右侧对应项高亮
  onScroll(e) {
    // 获取滚动高度
    const sT = Math.ceil(e.detail.scrollTop);
    // 获取该滚动高度落在滚动数组对应区间的下标
    console.log(sT);
    console.log(scrollArr[scrollArr.length - 2]);
    let index = scrollArr.findIndex((item, i, arr) => {
      return sT >= item && sT < arr[i + 1];
    });
    // console.log(index);
    this.setData({
      currentIndex: index,
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
