const AUTH_URL = "/api/usercenter/login";

const api = {
  // 核心业务模块
  core: {},
  auth: {
    //鉴权
    login: AUTH_URL, //登录
    authCode: AUTH_URL + "/send_code", //发送验证码
    refreshCode: AUTH_URL + "/refresh_code" //获取防刷验证码
  },
  //个人中心
  me: {},
  // 公共服务
  common: {
    region: "", //区域列表 省市区
    upload: "" // 文件上传
  }
};

export default api;
