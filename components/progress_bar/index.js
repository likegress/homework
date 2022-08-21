// components/progress_bar/index.js
// 获取背景音频管理对象
const bgm = wx.getBackgroundAudioManager();
// 定义全局变量来记录上一次取出来的秒数
let prevSec = -1;
let duration;
// 定义全局变量保存容器宽度
let areaWidth = 0;
//定义全局变量保存滑块的宽度
let moveWidth = 0;
// 定义全局变量保存滑块最大的移动距离
let disX = 0;
// 定义全局保存进度条被拖拽的距离
let progressX = 0;
Component({
  /**
   * 组件的属性列表
   */
  properties: {},
  lifetimes: {
    ready() {
      // 获取滑块的可移动范围
      this._getMoveDis();
      this._bindEvent(); //音乐事件处理
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    moving: false, //定义开关变量来记录是否在拖拽进度条
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _bindEvent() {
      // 监听音乐的播放过程
      bgm.onPlay(()=>{
        this.data.moving = false;
        //通知页面当前有音乐在播放(子传父:自定义事件)
        this.triggerEvent("play")
      })
      // 监听音乐是否可以播放
      bgm.onCanplay(() => {
        // 获取音频的总时长
        duration = bgm.duration;
        if (typeof duration == "undefined") {
          setTimeout(() => {
            duration = bgm.duration;
            console.log("音频总时长", duration);
            // 把总时间设置到页面上
            this._setDurationTime(duration);
          }, 1000);
        } else {
          _setDurationTime(duration);
        }
      });
      // 监听音乐的播放过程
      bgm.onTimeUpdate(() => {
        // 如果进度条正在被拖拽时,先不更改滑块位置
        if (this.data.moving) return;
        // 设置音乐当前播放时间
        const currentTime = bgm.currentTime;
        // 根据当前时长和音频总时长求歌曲播放进度
        const precent = currentTime / bgm.duration;
        // console.log(precent * 100);
        // 求滑块的移动距离
        let x = (areaWidth - moveWidth) * precent;
        this.setData({
          precent: precent * 100,
          x,
        });
        // 获取本次秒数
        let sec = Math.floor(currentTime);
        // 如果本次和上次的秒数发生了变化,重新跟新内容,为了不使用多次this.setData
        if (sec != prevSec) {
          // console.log(sec);
          // 将当前时间格式绑定到页面上
          this.setData({
            currentTime: this._formatime(currentTime),
          });
          // 跟新上次时间
          prevSec = sec;
        }

        // console.log(duration, bgm.currentTime);
      });
    },
    // 将总时长设置到页面上
    _setDurationTime(duration) {
      this.setData({
        // 将时间格式化绑定到页面上
        duration: this._formatime(duration),
      });
    },
    // 封装函数格式化时间(秒->00:00)
    _formatime(sec) {
      let m = Math.floor(sec / 60); //求分钟(两位数,不足前补零)
      m = m.toString().padStart(2, "0");
      let s = Math.floor(sec % 60); //求剩余秒数
      s = s.toString().padStart(2, "0");
      return `${m}:${s}`;
    },
    //封装方法实现获取滑块的移动
    _getMoveDis() {
      const query = this.createSelectorQuery();
      // 获取容器的宽度
      query
        .select(".area")
        .fields({ size: true }, async (res) => {
          areaWidth = res.width;
          console.log(areaWidth);
        })
        .exec();
      //获取滑块宽度
      query
        .select(".move")
        .fields({ size: true }, (res) => {
          moveWidth = res.width;
          console.log(moveWidth);
        })
        .exec();
      console.log(areaWidth - moveWidth);
    },
    // 滑块的状态改变事件
    onChange(e) {
      //当拖动时拿到滑块的运动距离
      // console.log(e);
      if (e.detail.source == "touch") {
        this.data.moving = true; //表示正在拖动进度条
        progressX = e.detail.x; //求进度条被拖动的距离
        // console.log("拖动距离", this.data.moving);
      }
    },
    // 拖动结束事件
    onTouchEnd() {
      console.log("拖拽结束");
      this.data.moving = false;
      // 让音乐跳到松开的地方进行播放,进度条走到松开的地方
      const precent = progressX / (areaWidth - moveWidth);
      // 求音乐需要跳转的位置
      const currentTime = bgm.duration * precent;
      bgm.seek(currentTime);
      this.setData({
        precent: precent * 100,
      });
    },
  },
});
