<template>
  <div class="login">
    <img
      class="login_bg"
      src="@/assets/img/login/login_bg.png"
      alt
    >
    <img
      class="login_font"
      src="@/assets/img/login/login_font.png"
      alt
    >
    <el-form
      ref="AccountFrom"
      :model="account"
      :rules="rules"
      label-position="right"
      label-width="70px"
      status-icon
      class="demo-ruleForm login-container"
    >
      <h3 class="title">登录</h3>
      <el-form-item
        prop="userName"
        label=""
        label-width="0"
      >
        <el-input
          type="text"
          v-model="account.userName"
          auto-complete="off"
          placeholder="手机"
        >
          <template slot="prepend"><img
              src="@/assets/img/login/account.png"
              alt=""
            ></template>
        </el-input>
      </el-form-item>
      <el-form-item
        prop="passWord"
        label=""
        label-width="0"
      >
        <el-input
          type="password"
          v-model="account.passWord"
          auto-complete="off"
          placeholder="密码"
        >
          <template slot="prepend"><img
              src="@/assets/img/login/password_icon.png"
              alt=""
            ></template>
        </el-input>
      </el-form-item>
      <el-form-item
        prop="vrifyCode"
        label=""
        label-width="0"
        id="captcha_item"
      >
        <el-input
          type="text"
          id="captcha_input"
          v-model="account.vrifyCode"
          auto-complete="off"
          placeholder="验证码"
          @keyup.enter.native="handleLogin"
        ></el-input>
        <el-button
          class="captcha-button"
          @click="editCaptcha"
        >{{captcha}}</el-button>
      </el-form-item>
      <el-form-item
        style="width:100%;"
        label-width="0"
      >
        <el-button
          class="login_btn"
          type="primary"
          style="width:100%;"
          :disabled="buttonDisabledStatus"
          @click.native.prevent="handleLogin"
          :loading="loading"
        >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import API from "@/api/api_user.js";
import { getCookie, setCookie } from "@/plugins/util"; //引用刚才我们创建的util.js文件，并使用getCookie方法
import NProgress from "nprogress";

export default {
  name: "Login",
  data() {
    var validateVrifyCode = (rule, value, callback) => {
      var code = this.captcha.toLowerCase();
      var input = value.toLowerCase();
      if (input !== code) {
        this.buttonDisabledStatus = true;
        callback(new Error("验证码不正确"));
      } else {
        this.buttonDisabledStatus = false;
        callback();
      }
    };
    return {
      buttonDisabledStatus: true,
      loading: false,
      account: {
        // userName: "admin",
        // passWord: "123456",
        userName: "",
        passWord: "",
        vrifyCode: ""
      },
      captcha: "",
      rules: {
        userName: [
          { required: true, message: "请输入手机号", trigger: "blur" }
        ],
        passWord: [{ required: true, message: "请输入密码", trigger: "blur" }],
        vrifyCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 5, message: "请输入5位验证码", trigger: "change" },
          { max: 5, message: "请输入5位验证码", trigger: "change" },
          { validator: validateVrifyCode, trigger: "change" },
          { validator: validateVrifyCode, trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.editCaptcha();
  },
  methods: {
    editCaptcha() {
      API.getRandomCode()
        .then(res => {
          this.captcha = !!res ? res : "加载失败";
          // this.account.vrifyCode =  !!res ? res : "加载失败";
        })
        .catch(res => {});
    },
    handleLogin(ev) {
      window.sessionStorage.responseType = "json";
      this.$refs.AccountFrom.validate(valid => {
        if (valid) {
          this.logining = true;
          NProgress.start();
          var loginParams = {
            phone: this.account.userName,
            passwd: this.account.passWord
          };
          this.buttonDisabledStatus = true;
          let that = this;
          setTimeout(function() {
            that.buttonDisabledStatus = false;
          }, 3000);
          this.$store
            .dispatch("LoginByUsername", loginParams)
            .then(res => {
              this.loading = false;
              this.$notify({
                title: "提示",
                message: res.message,
                type: !!res && res.code === 20000 ? "success" : "warning"
              });
              if (!!res && res.code !== 20000) {
                return;
              } else {
                this.$store.dispatch("GetUserInfo");
                this.$router.push({ path: "/" });
              }
            })
            .catch(err => {
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style>
body {
  background: #fff;
}
.el-input-group__append,
.el-input-group__prepend {
  background-color: #fff;
}
</style>
<style lang="scss" scoped>
.login {
  .login_bg {
    width: 100%;
    min-height: 200px;
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: 0;
  }
  .login_font {
    width: 50%;
    height: auto;
    z-index: 2;
    position: absolute;
    left: 0px;
    top: 10%;
    right: 0px;
    margin: auto;
  }
  #captcha_item .el-input {
    width: 55%;
    float: left;
  }
  .captcha-button {
    background: #f7f8ee;
    border: 1px solid #f7f8ee;
    color: #e8343a;
    font-size: 21px;
    padding: 7px 20px;
    float: right;
  }
  #captcha_img {
    width: 35%;
    height: 39px;
    float: right;
  }

  #captcha_input {
    width: 106%;
    float: left;
    margin-left: -13px;
  }
  .login-container {
    position: absolute;
    top: 28%;
    left: 0px;
    right: 0px;
    z-index: 2;
    margin: auto;
    vertical-align: middle;
    text-align: center;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 10px auto;
    width: 24%;
    min-width: 310px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #fafdfd;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .login_btn {
      background: #e8343a;
      padding: 11px 10px;
      border: none;
      font-size: 16px;
    }
  }
}
</style>