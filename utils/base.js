// base.js:基础文件
class Base {
  constructor() {
    this.baseUrl = "http://t.talelin.com/v2/movie/";
  }
  request(url, data = {}, method = "get") {
    return new Promise((resolve, reject) => {
      wx.request({
        url: this.baseUrl + url,
        method,
        data,
        success: (res) => {
          // 如果HTTP状态码以2开头则可以拿到数据
          const code = res.statusCode.toString();
          if (code.startsWith("2")) {
            resolve(res.data);
          } else {
            reject(code);
          }
        },
      });
    });
  }
}
export default Base;
