import Request from "../utils/request";
import API from "../utils/api";

// 用户登录
export const login = data =>
  Request({
    url: API.auth.login, //临时地址
    method: "POST",
    data
  });

// 获取手机验证码
export const getAuthCode = data => {
  return Request({
    url: API.auth.authCode,
    method: "POST",
    data
  });
};

// 获取防刷验证码
export const getRefreshCode = data =>
  Request({
    url: API.auth.refreshCode,
    method: "POST",
    data
  });
