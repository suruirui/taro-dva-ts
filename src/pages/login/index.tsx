import Taro, { Component } from "@tarojs/taro";
import { View, Text, Input, Button } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import action from "../../utils/action";
import validate from "../../utils/validate";
import Utils from "../../utils/utils";

import "./index.scss";

let countTime = 60;

interface LoginProps {
  phone: string;
  code: string;
  receiver: string;
  codeType: number;
  dispatch: Function;
}

interface LoginState {
  countword: string;
  btnDisable: boolean;
}
@connect(({ login }) => ({
  ...login
}))
class Login extends Component<LoginProps, LoginState> {
  constructor() {
    super(...arguments);
    this.state = {
      countword: "获取验证码",
      btnDisable: false
    };
  }

  config = {
    navigationBarTitleText: "登录"
  };

  /**
   * 获取手机号输入
   */
  getPhoneField = event => {
    const value = event.target.value;
    this.props.dispatch(
      action("login/save", { phone: value, receiver: value })
    );
  };

  /**
   * 获取验证码输入
   */
  getCodeField = event => {
    const value = event.target.value;
    this.props.dispatch(action("login/save", { code: value }));
  };

  /**
   * 获取验证码
   */
  getAuthCode = () => {
    const { phone, dispatch } = this.props;
    console.log("phone>>>>>", phone);
    if (validate.mobile(phone) !== true) {
      Utils.showToast("请输入有效的手机号！");
      return false;
    }
    this.timeBack();
    dispatch(action("login/getAuthCode"));
  };

  /**
   * 登录
   */
  loginAction = () => {
    const { phone, code } = this.props;
    if (validate.mobile(phone) !== true || code === "") {
      Utils.showToast("请输入有效的手机号或输入有效验证码！");
      return false;
    }
    this.props.dispatch(action("login/login"));
  };

  /**
   * 倒计时
   */
  timeBack = () => {
    let timmer: any = 0;
    if (countTime === 0) {
      this.setState({
        countword: "获取验证码",
        btnDisable: false
      });
      timmer ? clearTimeout(timmer) : "";
      countTime = 60;
      return false;
    } else {
      this.setState({
        countword: "重新发送(" + countTime + ")",
        btnDisable: true
      });
      countTime--;
    }
    timmer = setTimeout(() => {
      this.timeBack();
    }, 1000);
  };

  render() {
    const { countword, btnDisable } = this.state;
    return (
      <View className="rcut-login">
        <View className="rcut-title">
          <Text>我的项目</Text>
        </View>
        <View className="recut-welc">欢迎登录</View>
        <View className="input-box input-phone-box">
          <Input
            className="input"
            type="number"
            name="phone"
            maxLength={11}
            placeholder="请输入手机"
            value={this.props.phone}
            onInput={this.getPhoneField}
          />
        </View>
        <View className="input-box input-num-box">
          <Input
            className="input"
            type="text"
            name="code"
            maxLength={6}
            placeholder="请输入验证码"
            value={this.props.code}
            onInput={this.getCodeField}
          />
          <Button
            className="get-num"
            onClick={this.getAuthCode}
            disabled={btnDisable}
          >
            {countword}
          </Button>
        </View>
        <Button className="sign-btn" onClick={this.loginAction}>
          登录
        </Button>
      </View>
    );
  }
}

export default Login;
