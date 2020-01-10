import Taro from "@tarojs/taro";
import { Model } from "dva-core";
import * as loginApi from "../service/login";
import action from "../utils/action";
/**
 * 登录业务模型
 */
const login: Model = {
  namespace: "login",
  state: {
    phone: "",
    code: "",
    receiver: "",
    codeType: 1
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  },
  effects: {
    *login(_, { call, put, select }) {
      const { code, phone } = yield select(state => state.login);
      const res = yield call(loginApi.login, { code, phone });
      if (res.code === "0") {
        //返回成功后存的数据
        Taro.setStorageSync("token", res.data.jwtToken);
        yield put(
          action("entire/save", {
            erroMessage: res.message,
            token: res.data.jwtToken
          })
        );
        yield put(
          action("save", {
            erroMessage: res.message,
            token: res.data.jwtToken
          })
        );

        Taro.showToast({
          title: "登录成功",
          icon: "none"
        });

        setTimeout(() => {
          Taro.redirectTo({ url: "/pages/index/index" });
        }, 1000);
      }
    }
  }
};

export default login;
