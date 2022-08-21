// pages/publish/publish.js
const MAX_LENGTH = 100; //定义文本域输入的最大字数限制
const MAX_NUM = 9; //定义选择图片最大张数
// 从数据库中获取朋友圈集合
const db = wx.cloud.database();
const circle = db.collection("circle"); //获取集合
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgs: [], //用来保存发布的图片
    nickName: "", //用来保存用户昵称
    avatarUrl: "", //用来保存用户头像
    content: "", //用来保存文本域的输入内容
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 拿到用户的昵称和头像
    console.log(options);
    this.data.nickName = options.nickName;
    this.data.avatarUrl = options.avatarUrl;
  },
  //监听文本域的输入事件 ,小程序的数据双向绑定
  onInput(e) {
    // console.log(e);
    const val = e.detail.value;
    this.data.content = val;
    if (val.length >= MAX_LENGTH) {
      wx.showModal({
        title: `请输入不多余${MAX_LENGTH}个字符`,
        showCancel: false,
      });
    }
  },
  //选择图片
  async onChooesImg() {
    // 计算可以选择的剩余张数

    const num = MAX_NUM - this.data.imgs.length;
    console.log(num);
    //拿到选中的图片
    const { tempFiles } = await wx.chooseMedia({
      count: num,
    });
    // console.log(tempFiles);
    // 处理数据:只保留路径
    const imgs = tempFiles.map((item) => {
      return item.tempFilePath;
    });
    // console.log(imgs);
    this.setData({
      // 页面上拼接上显示的图片应该是在之前的基础上再拼接上新选择的
      imgs: this.data.imgs.concat(imgs),
    });
  },
  // 图片的删除
  onDel(e) {
    // console.log(e);
    const index = e.mark.index;
    //从图片数组删除该下标对应的图片
    this.data.imgs.splice(index, 1);
    // 将删除图片后的数组绑定到页面
    this.setData({
      imgs: this.data.imgs,
    });
  },
  // 图片预览
  onPreviewImg(e) {
    const src = e.mark.src;
    wx.previewImage({
      urls: this.data.imgs,
      current: src,
    });
  },
  //内容发布
  async onPublish() {
    // 如果文本域内容部分为空,不允许发布
    if (!this.data.content.trim()) {
      wx.showToast({
        title: "文本域的内容不能为空",
      });
      return;
    }
    // 发布
    wx.showLoading({
      title: "发布中...",
    });
    // 每发布一条朋友圈需要往云数据库添加一条记录(头像 丶文案丶昵称丶配图丶时间)
    //发布之前需要先把配图的本地路径整成云路径
    //将每张图片上传至云存储,生成云路径
    const promiseArr = [];
    this.data.imgs.forEach((item) => {
      //处理每张图片的后缀   xxx.jpg   xxx.png
      //先找文件路径中最后一个点所在的位置

      //第一种方式: 通过字符串的截取获取图片路径后缀
      const reg = /\.\w+$/;
      // 正则方法: test()   exec()
      //获取路径中与正则匹配的子串
      const result = reg.exec(item); //返回匹配数组
      // console.log(result);
      const suffix = result[0];
      //第二种方式:利用正则匹配获取图片路径后缀
      // const index = item.lastIndexOf(".");
      // // 从这个点开始截取路径最后,获取路径后缀
      // const suffix = item.substring(index);
      // // console.log(suffix);
      const p = wx.cloud.uploadFile({
        // cloudPath: `circle/${Date.now()}_${Math.random()}.${src}`, //云路径
        cloudPath: `circle/${Date.now()}_${Math.random()}${suffix}`, //云路径
        filePath: item, //本地路径
      });
      promiseArr.push(p);
    });
    // 当所有图片都上传成功后,往数据库添加记录
    const res = await Promise.all(promiseArr);
    console.log("上传的图片", res);
    // 拿到每张上传图片的fileID
    const imgArr = res.map((item) => {
      return item.fileID;
    });
    console.log("上传图片的云路径", imgArr);
    // 往数据库中写一条朋友圈记录(头像,昵称,文案)
    const record = {
      avatarUrl: this.data.avatarUrl,
      nickName: this.data.nickName,
      content: this.data.content,
      imgArr,
      createTime: db.serverDate(), //后台服务器时间
    };
    //将当前记录添加进circle集合
    await circle.add({
      data: record,
    });
    // 添加记录成功后则发布成功(隐藏加载框,给用户加载成功的提示)
    wx.hideLoading();
    wx.showToast({
      title: "发布成功",
    });
    // 回到展示朋友圈页面(上一页面)
    setTimeout(() => {
      wx.navigateBack();
      // 实现上一页面的同步刷新
      const pages = getCurrentPages();
      // console.log("页面信息", pages);
      // pages:数组的最后一项永远是当前页面length-1,length-2为上一项页面
      //获取当前页面的上一页面
      const circlePage = pages[pages.length - 2];
      // 实现上一页面的下拉刷新
      console.log(circlePage);
      circlePage.onPullDownRefresh();
    }, 500);
  },
  //返回朋友圈上一页
  toBack() {
    wx.navigateBack();
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
