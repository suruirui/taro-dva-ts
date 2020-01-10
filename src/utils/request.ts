import Taro from "@tarojs/taro";
// import config from "../utils/config";

export default options => {
  const baseUrl = "";
  const { data = {}, method = "GET", headers, url } = options;

  // 公共请求数据
  let request_data = null;
  let realUrl = baseUrl + url;
  const isFileApi = url.indexOf("storage") > -1;
  // 登录/文件上传模块特殊处理
  if (url.indexOf("login") > -1 || isFileApi) {
    request_data = {
      //   source: 1100110101
    };
  }
  let params = {};
  // 数组和文件类型数据特殊处理
  if (Array.isArray(data) || isFileApi) {
    params = data;
  } else {
    params = {
      ...request_data,
      ...data
    };
  }
  // 默认header
  const header = {
    token: Taro.getStorageSync("token") || "",
    platformId: process.env.TARO_ENV === "weapp" ? 1 : 2
  };
  if (!isFileApi) {
    header["Content-Type"] = "application/json";
  }
  return Taro.request({
    url: realUrl,
    data: params,
    header: {
      ...header,
      ...headers
    },
    method: method.toUpperCase()
  }).then(res => {
    const { statusCode, data: dataTemp } = res;
    if (statusCode === 200) {
      console.log(`------API------=${options.url} ---接口响应：---`, dataTemp);
      if (dataTemp.code !== "0") {
        Taro.showToast({
          title: `${res.dataTemp.message}` || res.dataTemp.code,
          icon: "none",
          mask: true
        });
      }
      // 登录失效状态未判断 TODO
      return dataTemp;
    } else {
      let title = "网络异常，请稍后重试";
      switch (statusCode) {
        case 404:
          title = "请求的资源不存在";
          break;
        case 500:
          title = "服务异常，请稍后重试";
          break;
        case 503:
          title = "服务器正在维护，请稍后重试";
          break;
        default:
      }

      Taro.showToast({
        title,
        icon: "none",
        mask: true
      });
      return false;
    }
  });
};
