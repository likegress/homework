// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init();
const db = cloud.database();
const circle = db.collection("circle");

// 云函数入口函数
exports.main = async (event, context) => {
  //查询集合circle的内容返回客户端
  const res = await circle
    .skip(event.start)
    .limit(event.count)
    .orderBy("createTime", "desc")
    .get();
  return res;
};
