// pages/canvas/canvas.js
Page({
  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const arr = [620, 733, 723, 670];
    // 获取canvas节点并设置画布尺寸为画板尺寸
    const query = wx.createSelectorQuery();
    // 用来画折线图的
    query
      .select(".myCanvas")
      .fields(
        {
          size: true,
          node: true,
        },
        (res) => {
          const canvas = res.node;
          canvas.height = res.height;
          canvas.width = res.width;
          // 获取绘制环境
          const ctx = canvas.getContext("2d");
          //作图
          arr.forEach((item, index, self) => {
            ctx.beginPath();
            ctx.strokeStyle = "orange";
            ctx.lineWidth = 2;
            // 第一个横坐标每次加一个间距  ,第一个纵坐标- (每一个季度额 - 第一个季度额)
            ctx.arc(70 + 80 * index, 200 - (item - arr[0]), 4, 0, 2 * Math.PI);
            // 画线
            //起点  横坐标在原来的基础上 + 半径 ,纵坐标不变
            ctx.moveTo(70 + 80 * index + 4, 200 - (item - arr[0]));
            // 终点  下一条条线横坐标 在原来的基础上 - 半径,纵坐标不变
            ctx.lineTo(
              70 + 80 * (index + 1) - 4,
              200 - (self[index + 1] - arr[0])
            );
            // 写文字
            ctx.fillStyle = "orange";
            ctx.font = "16px 微软雅黑";
            ctx.textAlign = "center";
            //文字 横坐标不变,纵坐标在原来的基础上 - 20
            ctx.fillText(item, 70 + 80 * index, 200 - (item - arr[0]) - 20);
            ctx.stroke();
            ctx.closePath();
          });
        }
      )
      .exec();
    // 用来画饼图
    // 对市场
    const sum = arr.reduce((s, item) => {
      return s + item;
    }, 0);
    console.log(sum);
    // 各月份销售额在饼图中所占的角度
    const angleArr = arr.map((item) => {
      return (item / sum) * 360;
    });
    console.log("角度数组", angleArr);
    // 将角度转换为弧度    弧度= (角度 * Math.PI / 180)
    //获取弧度数组
    const radArr = angleArr.map((item) => (item * Math.PI) / 180);
    console.log("弧度数组", radArr);
    query
      .select(".myCanvas1")
      .fields(
        {
          node: true,
          size: true,
        },
        (res) => {
          const canvas = res.node;
          canvas.width = res.width;
          canvas.height = res.height;
          // 获取绘制环境
          const ctx = canvas.getContext("2d");
          // 将坐标原点移动到画布中心
          ctx.translate(187, 150);
          ctx.save();
          ctx.rotate((-90 * Math.PI) / 180);
          // 将0度坐标轴旋转
          // 每块扇形起始弧度 = 上一块扇形的结束弧度
          //每块扇形结束弧度 = 他的起始弧度 + 本身弧度
          let start = 0; //保存起始弧度
          let end = 0; //保存结束弧度
          const colorArr = ["purple", "deepskyblue", "#0f0", "orange"];
          // 画扇形
          radArr.forEach((item, i, arr) => {
            end = start + item;
            ctx.beginPath();
            ctx.fillStyle = colorArr[i];
            ctx.moveTo(0, 0);
            ctx.arc(0, 0, 120, start, end);
            ctx.fill();
            ctx.closePath();
            start = end; //下一个起始弧度为当前的结束弧度
          });
          ctx.restore();
          // 写文字
          // 求百分比文字数组
          const textArr = arr.map((item) => {
            return Math.round((item / sum) * 100) + "%";
          });
          console.log(textArr);

          ctx.save();
          ctx.fillStyle = "#fff";
          ctx.font = "20px bold impact";
          textArr.forEach((item, i) => {
            ctx.fillText(item, 30, -50);
            ctx.rotate((Math.PI * 90) / 180);
          });
          ctx.restore();
        }
      )
      .exec();
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
