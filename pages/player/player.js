// pages/player/player.js
// 定义变量保存当前页需要播放音乐的下标
let musicIndex = -1;
// 先从缓存获取当前页需要播放的音乐列表数据
const musicList = wx.getStorageSync("musicList");
// 获取背景音乐音频对象
const bgm = wx.getBackgroundAudioManager();
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isPlaying: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //  获取点击音乐的下标
    musicIndex = options.index;
    // 将当前正在播放歌曲的下标保存在全局变量中(app.js)
    app.currentMusicIndex = musicIndex;
    // 根据下标加载音乐数据
    this._loadMusic(musicIndex);
    // 全局监听音乐暂停
    bgm.onPause(() => {
      this.setData({
        isPlaying: false,
      });
    });
    // 全局监听音乐播放器结束,自动播放下一首歌
    bgm.onEnded(() => {
      this.onNext();
    });
  },
  onPlay() {
    //页面有音乐播放
    this.setData({
      isPlaying: true,
    });
  },
  // 封装方法实现加载本页面需要播放的音乐数据
  _loadMusic(index) {
    const music = musicList[musicIndex];
    // console.log(music);
    // 拿到歌曲名字动态设置导航栏标题
    wx.setNavigationBarTitle({
      title: music.name,
    });
    // 需求2:页面数据渲染
    this.setData({
      picUrl: music.picUrl,
    });
    // 需求3:播放当前页面歌曲
    bgm.title = music.name; //歌曲名称
    bgm.src = music.url; //歌曲播放链接
    bgm.coverImgUrl = music.picUrl; //歌曲封面
    bgm.singer = music.singer; //歌手
  },
  // 控制音乐的播放与暂停
  onMusic() {
    if (this.data.isPlaying) {
      bgm.pause();
    } else {
      bgm.play();
    }
    this.setData({
      isPlaying: !this.data.isPlaying,
    });
  },
  // 播放下一首
  onNext() {
    musicIndex++;
    if (musicIndex >= musicList.length) {
      musicIndex = 0;
    }
    this._loadMusic(musicIndex);
    app.currentMusicIndex = musicIndex
  },
  onPrev() {
    musicIndex--;
    // 如果当前是第一首歌,他的上一首为列表的最后一首歌
    if (musicIndex <= -1) {
      musicIndex = musicList.length - 1;
    }
    this._loadMusic(musicIndex);
    app.currentMusicIndex = musicIndex
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
