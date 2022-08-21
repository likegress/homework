// app.js
App({
  // 定义全局变量记录当前小程序是否有歌在播放
  isGlobalPlaying: false,
  // 定义全局变量记录当前小程序播放歌曲的文章
  currentMusicId: -1,
  // 定义小程序全局变量记录当前播放歌曲的下标
  currentMusicIndex: -1,
  onLaunch() {
    // 初始化云能力
    wx.cloud.init();
  },
});
