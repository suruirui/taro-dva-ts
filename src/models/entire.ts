import Taro from "@tarojs/taro";
/**
 * 全局数据
 */
export default {
  namespace: "entire",
  state: {
    token: Taro.getStorageSync("token"),
    erroMessage: "" //错误消息
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  },
  effects: {
    // *error({ payload: e }, { all, call, put }) {
    *error({ payload: e }) {
      // debugger;
      console.error("error:", e);
    }
  }
};
