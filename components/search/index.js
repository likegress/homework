// components/search/index.js
import { city } from "../../data/city";
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 搜索结果传递下来的时候,根据所搜内容查找对应城市
    // 单独监听某个属性
    /* 
    selectedVal: {
      type: String, //指定当前属性的数据类型
      value: "", //指定当前属性的默认值
       //当该属性数据发生变化,触发该函数 (属性监听器)
      observer(newVal, oldVal) {
        // 每次输入内容有改变时定义空数组重新装搜索内容
        const searchList = [];
        // console.log("新值", newVal, "旧值", oldVal);
       
        city.forEach((item) => {
          item.cities.forEach((subItem) => {
            if (subItem.name.includes(newVal)) {
              searchList.push(subItem.name);
            }
          });
        });
        this.setData({
          searchList,
        });
      },
    },
    */
    selectedVal: String,
  },
  // 整体的属性监听器统一管理 (推荐使用)
  observers: {
    selectedVal(newVal) {
      const searchList = [];
      // console.log("新值", newVal, "旧值", oldVal);

      city.forEach((item) => {
        item.cities.forEach((subItem) => {
          if (subItem.name.includes(newVal)) {
            searchList.push(subItem.name);
          }
        });
      });
      this.setData({
        searchList,
      });
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {},
});
