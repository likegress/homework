// index.js
// 引入数据
import { localData } from "../../data/data.js";

Page({
  data: {
    localData,
    tapIndex: 0, //用来记录点击按钮的下标
    keyArr: ["youthLiterature", "literaryWorks", "successInspiring"],
    bookList: localData["youthLiterature"]

  },
  onTab(e) {
    const index = e.mark.index;
    // 找该下标对应的分类(locaolData数据中的key)
    const cateKey = this.data.keyArr[index];

    //根据key找书籍数据
    const bookList = localData[cateKey];
    this.setData({
      tapIndex: index,
      bookList,
    });
  },
});
