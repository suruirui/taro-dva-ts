/**
 * validate
 */

const validate = {
  //判空
  isNull: function(value) {
    if (typeof value == "function") {
      return false;
    }

    return (
      typeof value == "undefined" ||
      value == "" ||
      value == null ||
      value == undefined ||
      value == "null" ||
      (value instanceof Object && Object.keys(value).length == 0)
    );
  },

  // 邮箱
  email: function(v) {
    if (!v) {
      return "请输入邮箱。";
    }
    if (
      !/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(
        v
      )
    ) {
      return "请输入正确的邮箱。";
    }
    return true;
  },

  // 获取Url参数
  getUrlParam: function(paraName) {
    var url = document.location.toString();
    var arrObj = url.split("?");

    if (arrObj.length > 1) {
      var arrPara = arrObj[1].split("&");
      var arr;

      for (var i = 0; i < arrPara.length; i++) {
        arr = arrPara[i].split("=");

        if (arr != null && arr[0] == paraName) {
          return arr[1];
        }
      }
      return "";
    } else {
      return "";
    }
  },
  /**
   * 手机号
   * @param {} v
   */
  mobile: function(v) {
    if (!v) {
      return "请输入手机号码。";
    }
    if (!/^1\d{10}$/.test(v)) {
      return "请输入正确的手机号码。";
    }
    return true;
  },

  // pwd
  pwd: function(v) {
    return /^(?=.*?[a-zA-Z])(?=.*?[0-9])[a-zA-Z0-9]{8,15}$/.test(v);
  },

  /**
   * 验证中文姓名
   * 字符类型：中文、半角大小写字母、特殊符号“•”；
   * 字符长度：4-20位字符（1个汉字=2个字符）；
   * @param {*} v
   */
  name: function(v, type = "增员姓名") {
    console.log("输入姓名为", v);
    if (!v) {
      return `请输入${type}。`;
    }

    // 判断输入是否符合
    if (!/^[\u4e00-\u9fa5a-zA-Z•]+$/.test(v)) {
      return `请输入正确的${type}。`;
    }
    // 判断长度
    let length = 0;
    //获取中文长度
    const cn = v.match(/([\u4e00-\u9fa5]+)/g);
    if (cn) {
      length = cn.reduce((i, item) => i + item.length, 0) * 2;
    }
    // 获取英文长度
    const en = v.match(/([a-zA-Z]+)/g);
    if (en) {
      length += en.reduce((i, item) => i + item.length, 0);
    }
    // 获取特殊字符长度
    const special = v.match(/([•]+)/g);
    if (special) {
      length += special.reduce((i, item) => i + item.length, 0);
    }
    if (length < 4) {
      return `请输入正确的${type}。`;
    }
    if (length > 20) {
      return `请输入正确的${type}。`;
    }
    return true;
  },

  /**
   * 身份证验证
   * @param {*} v
   */
  IDCard: function(v) {
    // 判断输入是否符合
    ///^\d{17}[\da-zA-Z]{1}$/
    ///^\d{17}[\dXx]{1}$/
    const idNoReg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    if (!idNoReg.test(v)) {
      // return "请输入正确的身份证号码";
      return false;
    }
    return true;
  },
  /**
   * 证件号信息读取返回性别和年龄
   */
  analyzeIDCard: function(IDCard) {
    var sexAndAge = {};
    //获取用户身份证号码
    var userCard = IDCard;
    //如果身份证号码为undefind则返回空
    if (!userCard) {
      return sexAndAge;
    }
    //获取性别
    if (parseInt(userCard.substr(16, 1)) % 2 == 1) {
      sexAndAge.sex = 0; //0男
    } else {
      sexAndAge.sex = 1; //1女
    }
    //获取出生年月日
    var yearBirth = userCard.substring(6, 10);
    var monthBirth = userCard.substring(10, 12);
    var dayBirth = userCard.substring(12, 14);
    //获取当前年月日并计算年龄
    var myDate = new Date();
    var monthNow = myDate.getMonth() + 1;
    var dayNow = myDate.getDay();
    var age = myDate.getFullYear() - yearBirth;
    if (
      monthNow < monthBirth ||
      (monthNow == monthBirth && dayNow < dayBirth)
    ) {
      age--;
    }
    //得到年龄
    sexAndAge.age = age;
    //返回性别和年龄
    return sexAndAge;
  }
};

export default validate;
