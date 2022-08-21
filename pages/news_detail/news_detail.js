// pages/news_detail/news_detail.js
// 获取所有数据
const newsData = require("../../data/2");

//新建收藏夹 (先查看之前是否存过收藏夹)
const collection = wx.getStorageSync("col") || {};

// 获取背景音乐管理对象
const bgm = wx.getBackgroundAudioManager();

// 拿到全局变量播放歌曲的状态
const app = getApp();
Page({
  data: {
    // 收藏图片路径
    collImg: "/imgs/icon/collection.png",
    // 未收藏图片路径
    noColImg: "/imgs/icon/collection-anti.png",
    isCollected: false, //判断是否收藏
    playImg: "/imgs/music/music-stop.png",
    pauseImg: "/imgs/music/music-start.png",
    isPlaying: false, //判断是否有歌曲在播放
  },
  onLoad(options) {
    // 获取路径传递过来的id
    const { id } = options; //const id = options.id
    // 在新闻列表数组newsData找postId为id的那一条新闻数据
    const news = newsData.find((item) => item.postId == id);
    // console.log("新闻详情数据",news);
    this.setData({
      ...news,
    });
    // 初始化当前文章的收藏状态 (针对方式一)
    // const status = wx.getStorageSync("collection" + id) ?? false;
    // this.setData({
    //   isCollected: status,
    // });

    // 初始化当前文章的收藏状态 (针对方式二)
    // 从缓存收藏夹获取当前文章的收藏状态
    const status = Reflect.get(collection, id);
    this.setData({
      isCollected: status,
    });

    // 全局音乐播放状态
    this.listenMusic();
    // 初始化音乐播放状态

    //利用全局变量初始化音乐播放状态
    this.setData({
      // 当前小程序有歌曲播放并且当前的文章的歌曲在播放状态为true,否则均为false
      isPlaying:app.isGlobalPlaying && app.currentMusicId == id,
    })
  },
  onCol() {
    // this.setColStatus1()
    this.setColStatus2();
  },
  // 收藏逻辑 (一条一条存缓存)
  async setColStatus1() {
    // 获取当前收藏状态
    const status = this.data.isCollected;
    const res = await wx.showModal({
      title: status ? "取消收藏吗" : "确定收藏吗",
    });
    if (res.confirm) {
      // 点击确定按钮在原状态基础上取反
      this.setData({
        isCollected: !status,
      });
      // 把当前文章的状态存入缓存
      wx.setStorageSync("collection" + this.data.postId, this.data.isCollected);
    }
  },

  // 收藏逻辑 (新建收藏夹整体管理文章的收藏)
  async setColStatus2() {
    // 先获取当前文章的收藏状态
    const status = this.data.isCollected;
    this.setData({
      isCollected: !status,
    });
    wx.showToast({
      title: this.data.isCollected ? "收藏成功" : "取消收藏",
    });
    // 在收藏夹中记录当前文章的收藏状态 (往收藏夹对象中设置属性和属性值)
    Reflect.set(collection, this.data.postId, this.data.isCollected);
    // 将收藏夹放入缓存保存起来
    wx.setStorageSync("col", collection);
  },
  // 音乐切换
  onMusic() {

    if (this.data.isPlaying) {
      bgm.pause();
      app.isGlobalPlaying = false
    } else {
      bgm.title = this.data.music.title;
      bgm.scr = this.data.music.url;
      app.isGlobalPlaying = true;
      // 将当前播放歌曲的文章id保存在全局变量中
      app.currentMusicId = this.data.postId;
    }
    this.setData({
      isPlaying: !this.data.isPlaying,
    });
  },
  // 总控开关监听音乐的播放状态
  listenMusic() {
    bgm.onPlay(() => {
      this.setData({
        isPlaying: true,
      });
    });
    bgm.onPause(() => {
      this.setData({
        isPlaying: false,
      });
    });
    bgm.onEnded(() => {
      this.setData({
        isPlaying: false,
      });
    });
    bgm.onStop(() => {
      this.setData({
        isPlaying: false,
      });
    });
  },
});
