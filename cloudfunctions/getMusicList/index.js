// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init();
// 获取云数据库
const db = cloud.database();
// 获取云数据库中歌曲集合
const songs = db.collection("songs3");
// 云函数入口函数
exports.main = async (event, context) => {
  // 查询集合中的所有歌曲
  try {
    return await songs.get();
  } catch (error) {
    return error;
  }
};
