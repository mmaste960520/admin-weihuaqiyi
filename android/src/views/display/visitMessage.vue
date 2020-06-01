<template>
  <div class="tp">
    <div class="hw_box">
      <!-- 头部 -->
      <header>
        <h3>参观留言</h3>
        <div class="hw_return" @click="prev">
          <img src="../../../static/img/ico_return.png" alt>
        </div>
        <a class="ico_SignIn" href="javascript:;" @click="qiandaoSubmit()">
          <img src="@/assets/img/ico_SignIn.png">
        </a>
      </header>
      <!--内容-->
      <div class="hw_content">
        <div class="hw_con">
          <div class="hw_con_message" v-for="(item,index) in items" :key="index" @click="visitMessageConSbumit(item.id,item.imgPath,item.address)">
            <div class="hw_con_message_top">
              <!--头像名称部分-->
              <div class="hw_information">
                <div class="hw_message_photo" v-if="item.imgPath != '' && item.imgPath != null">
                  <img :src="item.imgPath" alt>
                </div>
                <div class="hw_message_photo" v-if="item.imgPath == '' || item.imgPath == null">
                  <img src="@/assets/user.png" alt>
                </div>
                <div class="hw_information_box">
                  <!--名字-->
                  <div class="hw_message_name">
                    <p>{{item.name}}</p>
                  </div>
                  <!--时间地点-->
                  <div class="hw_message_time">
                    <span style="color: #B4B4B4;">{{item.createTime}}</span>
                    <div>
                      <img src="@/assets/img/ico_coordinates.png" alt>
                      <i style="color: #B4B4B4;">{{item.address}}</i>
                    </div>
                  </div>
                </div>
              </div>
              <!--留言图文-->
              <div class="hw_graphic">
                <p>留言
                  <i>：</i>
                  <span>{{item.content}}</span>
                </p>
                <div class="hw_graphic_pic">
                  <!-- <img :src="s" v-for="(s,idx) in JSON.parse(item.uploadImgPath)" :key="idx"/> -->
                  <img :src="s" v-for="(s,idx) in item.uploadImgPath" :key="idx">
                </div>
              </div>
              <!--平台回复-->
              <div class="hw_graphic" v-if="item.replyMessage">
                <p>平台回复
                  <i>：</i>
                  <span>{{item.replyMessage}}</span>
                </p>
                <p style="float: right;">
                  <span style="color: #B4B4B4;font-size: 0.11rem;">{{item.updateTime}}</span>
                </p>
              </div>
            </div>
            <!--查看详情-->
            <!-- <div class="hw_con_message_bottom" @click="visitMessageConSbumit(item.id,item.imgPath,item.address)">
              <p>查看详情</p>
              <img src="@/assets/img/ico_check.png" alt>
            </div> -->
          </div>
        </div>
      </div>
      <!--底部添加留言-->
      <a href="javascript:;" @click="UserMessageSubmit()">
        <img class="hw_add_message" src="@/assets/img/ico_add_message.png">
      </a>
      <!--遮罩层-->
      <div class="hw_zhezhao" id="hw_zhezhao" @click="zhezhaoSubmit()"></div>
      <!--签到弹出窗口-->
      <div class="hw_message_window_box" id="hw_message_window_box">
        <div class="hw_message_window">
          <h3>签到成功</h3>
          <p>华渭起义纪念馆欢迎您，</p>
          <p>恭喜您今天成为纪念馆
            <span>{{daySignIn}}</span>位游客
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
export default {
  name: "visit-message",
  data() {
    return {
      daySignIn: "",
      items: []
    };
  },
  mounted() {
    this.getprev();
    var hw_zhezhao = document.querySelector("#hw_zhezhao");
    var hw_message_window_box = document.querySelector("#hw_message_window_box");
  },

  methods: {
    prev() {
      this.$router.push("/exhibition"); //首页
    },
    visitMessageConSbumit(val,img,dizhi){
      this.$router.push({
        path: '/visitMessageCon',
        query: {
          id: val,
          imgPath: img,
          address: dizhi,
        }
      })
    },
    //签到
    qiandaoSubmit() {
      var _this = this;
      this.$axios({
        method: "post",
        url: "syx/signInInfo/",
        data: {
          userId: localStorage.id
        }
      }).then(res => {
        if (res) {
          console.log(res);
          if (res.data.code === 20000) {
            hw_zhezhao.style.display = "block";
            hw_message_window_box.style.display = "block";
            //成功请求
            console.log(res.data.message);
            console.log(res.data.data);

            _this.items = res.data.data;
            _this.daySignIn = _this.items.daySignIn;
            console.log(_this.daySignIn);
            this.getprev();
          } else {
            //已签到
            MessageBox("提示", res.data.message);
          }
        }
      });
    },
    //点击遮罩层隐藏
    zhezhaoSubmit() {
      hw_zhezhao.style.display = "none";
      hw_message_window_box.style.display = "none";
    },
    UserMessageSubmit() {
      this.$router.push("UserMessage"); //用户留言
    },

    //内容接口
    getprev() {
      var _this = this;
      this.$axios({
        method: "post",
        url: "syx/liuyanbiao/queryliuyan", //'syx/liuyanbiao/',//
        data: {"status":1}
      }).then(res => {
        if (res) {
          if (res.data.code === 20000) {
            //成功请求
            _this.items = res.data.data;
            for (var i = 0; i < res.data.data.length; i++) {
              res.data.data[i].uploadImgPath = !!res.data.data[
                i
              ].uploadImgPath? res.data.data[
                i
              ].uploadImgPath.split(","):"";
            }
              // console.log(res.data.data);
            if (localStorage.moduleType !== "7") {
              this.mokuaifangwen(); //模块接口
            }
          } else {
            //请求失败
            // MessageBox("提示", res.data.message);
          }
        }
      });
    },
    //模块访问
    mokuaifangwen() {
      this.$axios({
        method: "post",
        url: "syx/visitorModule",
        data: {
          moduleType: "7",
          deviceType: localStorage.jixing,
          userId: localStorage.id
        }
      }).then(res => {
        if (res) {
          if (res.data.code === 20000) {
            //成功请求
            let moduleType = "7";
            localStorage.setItem("moduleType", moduleType);
          } else {
            //请求失败
            // MessageBox('提示', res.data.message);
          }
        }
      });
    }
  }
};
</script>

<style scoped>
body {
  background: url(../../assets/img/bg_visit_message.png);
}
.hw_box {
  width: 100%;
}
/*头部*/
header {
  width: 100%;
  height: 0.47rem;
  /*background: radial-gradient(#d3a150, #c68641);*/
  background: url(../../../static/img/header_bg.png);
  background-size: 100%;
  background-position: 0 0;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  z-index: 2;
}
.hw_return {
  height: 100%;
  width: 0.47rem;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 20;
}
header h3 {
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
.hw_return img {
  width: 0.1rem;
  height: 0.18rem;
  margin-left: 0.18rem;
}
.ico_SignIn {
  height: 100%;
  width: 0.71rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 5;
}
.ico_SignIn img {
  width: 0.23rem;
  height: 0.23rem;
}

/*中间内容*/
.hw_content {
  width: 100%;
  padding-top: 0.47rem;
  background-color: #F0EDF1;
}
.hw_con {
  padding: 0 0.11rem;
  box-sizing: border-box;
}
.hw_con_message {
  background: url(../../assets/img/bg_visit_message2.png);
  background-size: 100%;
  width: 100%;
  height: 3.08rem;
  padding: 0 0.1rem;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  margin-top: 0.15rem;
}
.hw_con_message_top {
  width: 100%;
}
/*头像名称部分*/
.hw_information {
  width: 100%;
  padding-top: 0.13rem;
  display: flex;
}
/*头像*/
.hw_message_photo {
  width: 0.58rem;
  height: 0.58rem;
}
.hw_message_photo img {
  width: 0.58rem;
  height: 0.58rem;
  border-radius: 50%;
}
.hw_information_box {
  padding-left: 0.14rem;
}
/*名字*/
.hw_message_name p {
  font-size: 0.17rem;
  color: #000;
  line-height: 0.37rem;
}
/*时间地点*/
.hw_message_time {
  display: flex;
}
.hw_message_time span {
  color: #000;
  font-size: 0.11rem;
}
.hw_message_time div {
  display: flex;
}
.hw_message_time div img {
  width: 0.11rem;
  height: 0.15rem;
  padding: 0 0.04rem 0 0.18rem;
}
.hw_message_time div i {
  font-size: 0.11rem;
  color: #000;
  font-style: normal;
}
/*留言图文*/
.hw_graphic {
  padding-top: 0.11rem;
}
.hw_graphic p {
  font-size: 0.15rem;
  color: #c00000;
  line-height: 0.24rem;
  height: 0.48rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.hw_graphic i {
  font-size: 0.15rem;
  color: #000;
  font-style: normal;
}
.hw_graphic span {
  font-size: 0.13rem;
  color: #000;
}
/*图*/
.hw_graphic_pic {
  width: 100%;
  height: 0.9rem;
  overflow: hidden; /*设置了固定高超出部分隐藏,不确定让显示几行照片*/
}
.hw_graphic_pic img {
  width: 0.7rem;
  height: 0.7rem;
  float: left;
  padding: 0.14rem 0.13rem 0.14rem 0;
}
/*查看详情*/
.hw_con_message_bottom {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  position: absolute;
  bottom: 0;
  left: 0;
}
.hw_con_message_bottom p {
  font-size: 0.14rem;
  color: #de221b;
  line-height: 0.38rem;
}
.hw_con_message_bottom img {
  width: 0.14rem;
  height: 0.14rem;
  padding-left: 0.1rem;
}
/*添加留言按钮*/
.hw_add_message {
  position: fixed;
  bottom: 0.12rem;
  right: 0.33rem;
  width: 0.53rem;
  height: 0.53rem;
  z-index: 1;
}
/*遮罩层*/
.hw_zhezhao {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 80;
  display: none;
}
/*留言弹出窗*/
.hw_message_window_box {
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.3rem;
  position: fixed;
  top: 1.2rem;
  z-index: 90;
  display: none;
}
.hw_message_window {
  width: 100%;
  background: url(../../assets/img/message_window_bg.png) no-repeat;
  background-size: 100%;
  border-radius: 0.05rem;
}
.hw_message_window h3 {
  color: #000;
  font-size: 0.22rem;
  text-align: center;
  padding-top: 1.35rem;
  padding-bottom: 0.2rem;
}
.hw_message_window p {
  color: #454444;
  font-size: 0.15rem;
  text-indent: 0.26rem;
  line-height: 0.28rem;
}
.hw_message_window p span {
  font-size: 0.15rem;
  color: #ff7623;
}
.hw_message_window :last-child {
  padding-bottom: 0.35rem;
}
</style>
