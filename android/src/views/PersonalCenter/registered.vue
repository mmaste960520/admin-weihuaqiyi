<template>
  <div class="tp">
    <div class="hw_box">
      <!-- 头部 -->
      <header>
        <h3>用户注册</h3>
        <a href="javascript:;" class="hw_return" @click='prev'>
          <img src=".././../../static/img/ico_return.png" alt="">
        </a>
      </header>
      <!-- 输入密码 -->
      <div class="hw_content">
          <!-- 原密码 -->
          <div class="hw_form hw_phone">
            <img src="@/assets/img/ico_phone.png" alt="">
            <input type="text" id="phone" placeholder="请输入手机号" v-model="phone">
          </div>
          <!-- 密码 -->
          <div class="hw_form hw_password">
            <img src="@/assets/img/ico_password.png" alt="">
            <input type="text" id="password" placeholder="请输入密码" v-model="passwd">
            <!--<span>获取验证码</span>-->
          </div>
          <!-- 确认按钮 -->
          <a href="javascript:;" id="btn" @click="SetPasswordSubmit()">完成</a>
      </div>

    </div>
  </div>
</template>

<script>
  import { MessageBox } from 'mint-ui';
    export default {
      name: "registered",
      data() {
        return {
          phone:'',//手机号
          passwd:'',//密码
        }
      },
      methods:{
        prev(){
          this.$router.go(-1)
        },
        SetPasswordSubmit(){ //设置密码
          var _this = this;
          if (!/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(_this.phone)) {
            MessageBox('提示', '请输入正确手机号');
          } else if (_this.passwd.length < 5) {
            MessageBox('提示', '密码必须大于6位字符');
          } else{
            this.querenzhuce();
          }
        },
        querenzhuce(){
          //注册接口
          var _this = this;
          this.$axios({
            method: 'post',
            url: 'syx/user',
            data: {
              "passwd":_this.passwd,
              "phone":_this.phone
            },
          }).then((res) => {
            if (res) {
              if (res.data.code === 20000) {
                //成功请求
                _this.items = res.data.data;
                MessageBox('提示', '注册成功');
                this.$router.go(-1) //返回上一页
              } else {
                //请求失败
                MessageBox('提示', res.data.message);
              }
            }
          })
        },


      }
    }
</script>

<style scoped>
body{
  background: #fff;
}
.hw_box{
  width: 100%;
}
/*头部*/
header{
  width: 100%;
  height: 0.47rem;
  /*background: radial-gradient(#d3a150, #c68641);*/
  background: url(../../../static/img/header_bg.png);
  background-size: 100%;
  background-position: 0 0;
  position: fixed;
  top: 0;
  left: 0;
}
.hw_return{
  height: 100%;
  width: 0.47rem;
  display: flex;
  align-items: center;
  z-index: 6;
  position: relative;
}
header h3{
  color: #fff;
  font-size: 0.17rem;
  line-height: 0.47rem;
  text-align: center;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
header img{
  width: 0.1rem;
  height: 0.18rem;
  margin-left: 0.18rem;
}

/*输入密码*/
.hw_content{
  width: 100%;
  padding: 0 0.2rem;
  box-sizing: border-box;
  margin-top: 0.1rem;
  padding-top: 0.47rem;
}
.hw_form{
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dcdcdc;
}
.hw_form img{
  width: 0.12rem;
  /*height: 0.17rem;*/
  vertical-align: middle;
  margin-left: 0.03rem;
}
.hw_form input{
  width: 100%;
  border: none;
  vertical-align: middle;
  line-height: 0.5rem;
  text-indent: 0.14rem;
  font-size: 0.15rem;
  color: #ababab;
}
input:focus{
  outline:none;
}
.hw_form span{
  height: 0.29rem;
  line-height: 0.29rem;
  color: #d29e62;
  font-size: 0.15rem;
  padding-left: 0.13rem;
  padding-right: 0.05rem;
  border-left: 1px dashed #dcdcdc;
  white-space: nowrap;
}
/*确认按钮*/
#btn{
  width: 100%;
  height: 0.44rem;
  text-align: center;
  color: #fff;
  line-height: 0.44rem;
  background: #d9ac79;
  border-radius: 0.2rem;
  border: none;
  margin-top: 1.33rem;
  box-shadow: 0px 3px 3px #d29e62;
  display: block;
  font-weight: bold;
  font-size: 0.15rem;
}
</style>
