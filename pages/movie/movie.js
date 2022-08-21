import Base from "../../utils/base";
const base = new Base();
Page({
  data: {
    showSearch: false, //控制搜索框是否显示
  },

  onLoad: async function (options) {
    // 加载正在热映的数据
    const { subjects: inTheaters } = await base.request("in_theaters", {
      start: 1,
      count: 3,
    });
    console.log("正在热映", inTheaters);
    // 加载即将上映的数据
    const { subjects: comingSoon } = await base.request("coming_soon", {
      start: 1,
      count: 3,
    });
    console.log("即将上映", comingSoon);
    // 加载TOP250的数据
    const { subjects: top250 } = await base.request("top250", {
      start: 6,
      count: 3,
    });
    console.log("Top250", top250);

    // 整合数据
    const movieData = [];
    movieData.push({
      title: "正在热映",
      list: inTheaters,
    });
    movieData.push({
      title: "即将上映",
      list: comingSoon,
    });
    movieData.push({
      title: "Top250",
      list: top250,
    });
    this.setData({
      movieData,
    });
  },
  // 显示搜索框
  onTap() {
    this.setData({
      showSearch: true,
    });
  },
  onClear() {
    this.setData({
      showSearch: false,
      searchList: [],
    });
  },
  // input确认事件
  async onConfirm(e) {
    //拿到文本框的输入内容
    const val = e.detail.value;
    //根据输入内容发起网络请求
    const res = await base.request("search", { q: val });

    this.setData({
      searchList: res.subjects,
    });
    console.log(res.subjects);
  },
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
