<template>
  <div class="tp">
    <div class="hw_box">
      <div class="hw_box_top">
        <img
          class="hw_logo"
          src="@/assets/img/logo.png"
          alt=""
        >
        <p class="hw_title">文化/历史/革命/记忆</p>
      </div>
      <div class="hw_content" style="margin-top: 0.4rem;">
        <!-- 手机号 -->
        <div class="hw_form hw_phone">
          <img
            src="@/assets/img/ico_phone.png"
            alt=""
          >
          <input
            type="text"
            id="phone"
            placeholder="请输入账号"
            v-model="phone"
          >
        </div>
        <!-- 密码 -->
        <div class="hw_form hw_password">
          <img
            src="@/assets/img/ico_password.png"
            alt=""
          >
          <input
            type="password"
            id="password"
            placeholder="请输入密码"
            v-model="passwd"
          >
        </div>
        <button
          id="btn"
          @click="personalSubmit()"
        >登 录</button>
        <p class="hw_reg">
          <a
            @click="registeredSubmit()"
            href="javascript:;"
          >账号注册</a>
          |
          <a
            @click="SetSubmit()"
            href="javascript:;"
          >忘记密码</a>
        </p>
      </div>
      <!-- 底部背景图 -->
      <img
        class="login_bg"
        src="@/assets/img/login_bg.png"
        alt=""
      >
    </div>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import { mapMutations } from "vuex";
export default {
  name: "login",
  data() {
    return {
      logining: false,
      phone: localStorage.username, //手机号
      passwd: localStorage.password, //密码
      Verification: "", //验证码
      show: true,
      count: "",
      timer: null,
      cooo: ""
    };
  },
  mounted() {},

  methods: {
    //获取验证码
    ObtainSubmit() {
      var _this = this;
      if (
        !/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(
          _this.Phone
        )
      ) {
        MessageBox("提示", "请输入正确手机号");
      } else {
        this.ObtainCode();
      }
    },
    // 登录
    personalSubmit() {
      var _this = this;
      if (
        !/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(
          _this.phone
        )
      ) {
        MessageBox("提示", "请输入正确手机号");
      } else if (!_this.passwd) {
        MessageBox("提示", "请输入密码");
      } else {
        this.yanzhengdenglu();
      }
    },
    // 登录验证
    yanzhengdenglu() {
      //接口
      var _this = this;
      this.$axios({
        method: "post",
        url: "syx/user/userLoginHome/" + _this.phone + "/" + _this.passwd,
        data: {
          phone: _this.phone,
          passwd: _this.passwd
        }
      }).then(res => {
        if (res) {
          if (res.data.code === 20000) {
            let token = res.data.data.token;
            localStorage.setItem("token", token);
            let id = res.data.data.user.id;
            localStorage.setItem("id", id);
            let username = _this.phone;
            localStorage.setItem("username", username);
            let password = _this.passwd;
            localStorage.setItem("password", password);

            //成功请求
            _this.$router.push("/exhibition");
            MessageBox("提示", "登录成功");
            this.appDown();
          } else {
            MessageBox("提示", res.data.message);
          }
        }
      });
    },
    //注册
    registeredSubmit() {
      this.$router.push("/registered");
    },
    //忘记密码
    SetSubmit() {
      this.$router.push("/SetPassword");
    },
    // 获取安卓/苹果登录
    appDown() {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isiOS) {
        let jixing = 2;
        localStorage.setItem("jixing", jixing);
        this.fangwen(); //访问
      } else if (isAndroid) {
        let jixing = 3;
        localStorage.setItem("jixing", jixing);
        this.fangwen(); //访问
      }
    },
    // 访问接口
    fangwen() {
      this.$axios({
        method: "post",
        url: "syx/visitorDevice",
        data: {
          deviceType: localStorage.jixing,
          userId: localStorage.id
        }
      }).then(res => {
        console.log(res.data.code);
        if (res) {
          if (res.data.code === 20000) {
            //成功请求
          } else {
            //请求失败
          }
        }
      });
    },
    //发送验证码
    ObtainCode() {
      this.$axios({
        method: "post",
        url: "syx/user/sendMsg/" + this.Phone + "/1",
        data: {
          Phone: this.Phone
        }
      }).then(res => {
        console.log(res.data.code);
        if (res) {
          if (res.data.code === 20000) {
            //成功请求
            this.getCode();
          } else {
            //请求失败
          }
        }
      });
    },
    //验证验证码
    verifyCode() {
      this.$axios({
        method: "post",
        url: "syx/user/checkedCode/" + this.Phone + "/1/" + this.Verification,
        data: {
          Phone: this.Phone,
          Verification: this.Verification
        }
      }).then(res => {
        console.log(res.data.code);
        if (res) {
          if (res.data.code === 20000) {
            //成功请求
            this.$router.push("/personal");
            MessageBox("提示", "登录成功");
          } else {
            //请求失败
            MessageBox("提示", res.data.message);
          }
        }
      });
    },
    //验证码60s倒计时
    getCode() {
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    }
  }
};
</script>

<style scoped>
body {
  background: #fff;
}
.hw_box {
  width: 100%;
  height: 100%;
  /*min-height: 6.1rem;*/
  display: flex;
  flex-direction: column;
}
.hw_box_top {
  width: 100%;
}
/*logo*/
.hw_logo {
  width: 100%;
  padding: 0 0.23rem;
  box-sizing: border-box;
  margin-top: 0.4rem;
}
.hw_title {
  text-align: center;
  color: #951a1a;
  font-size: 0.14rem;
  margin-top: 0.1rem;
  margin-bottom: 0.65rem;
}
.hw_content {
  width: 100%;
  padding: 0 0.2rem;
  box-sizing: border-box;
  position: relative;
  z-index: 3;
  flex: 1;
}
/*手机号-密码*/
.hw_form {
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dcdcdc;
}
.hw_form img {
  width: 0.12rem;
  /*height: 0.17rem;*/
  vertical-align: middle;
  margin-left: 0.03rem;
}
.hw_form input {
  width: 100%;
  border: none;
  vertical-align: middle;
  line-height: 0.5rem;
  text-indent: 0.14rem;
  font-size: 0.15rem;
  color: #ababab;
}
input:focus {
  outline: none;
}
.hw_form span {
  height: 0.29rem;
  line-height: 0.29rem;
  color: #d29e62;
  font-size: 0.15rem;
  padding-left: 0.13rem;
  padding-right: 0.05rem;
  border-left: 1px dashed #dcdcdc;
  white-space: nowrap;
}

/*登录*/
#btn {
  width: 100%;
  height: 0.44rem;
  text-align: center;
  color: #fff;
  line-height: 0.44rem;
  background: #d29e62;
  border-radius: 0.2rem;
  border: none;
  margin-top: 0.33rem;
  box-shadow: 0px 3px 3px #d29e62;
  display: block;
  font-size: 0.18rem;
}
/*账号注册-忘记密码*/
.hw_reg {
  width: 100%;
  text-align: center;
  color: #9f7b7b;
  font-size: 0.13rem;
  margin-top: 0.21rem;
}
.hw_reg a {
  color: #9f7b7b;
  font-size: 0.13rem;
}

/*底部背景图*/
.login_bg {
  width: 100%;
  /*position: fixed;*/
  /*bottom: 0;*/
  /*left: 0;*/
}
</style>
