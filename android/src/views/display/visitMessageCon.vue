<template>
  <div class="tp">
    <div class="hw_box">
      <!-- 头部 -->
      <header>
        <h3>参观留言</h3>
        <div class="hw_return" @click="prev">
          <img src="../../../static/img/ico_return.png" alt>
        </div>
      </header>
      <div class="hw_bg"></div>
      <!--内容-->
      <div class="hw_content">
        <div class="hw_con">
          <div class="hw_con_message">
            <div class="hw_con_message_top">
              <!--头像名称部分-->
              <div class="hw_information">
                <!--<div class="hw_message_photo">
                  <img :src="imgPath" alt>
                </div>-->
                <div class="hw_message_photo" v-if="imgPath != '' && imgPath != null">
                  <img :src="imgPath" alt>
                </div>
                <div class="hw_message_photo" v-if="imgPath == '' || imgPath == null">
                  <img src="@/assets/user.png" alt>
                </div>
                <div class="hw_information_box">
                  <!--名字-->
                  <div class="hw_message_name">
                    <p>{{name}}</p>
                  </div>
                  <!--时间地点-->
                  <div class="hw_message_time">
                    <span>{{createTime}}</span>
                    <div>
                      <img src="@/assets/img/ico_coordinates.png" alt>
                      <i>{{address}}</i>
                    </div>
                  </div>
                </div>
              </div>
              <!--留言图文-->
              <div class="hw_graphic">
                <p>留言
                  <i>：</i>
                  <span>{{content}}</span>
                </p>
                <div class="hw_graphic_pic">
                  <!-- <img :src="s" v-for="(s,idx) in JSON.parse(item.uploadImgPath)" :key="idx"/> -->
                  <img :src="s" v-for="(s,idx) in uploadImgPath" :key="idx">
                </div>
              </div>
              <!--平台回复-->
              <p></p>
              <div class="hw_graphic" v-if="replyMessage">
                <p>平台回复
                  <i>：</i>
                  <span>{{replyMessage}}</span>
                </p>
                <p style="float: right;">
                  <span style="color: #B4B4B4;font-size: 0.11rem;">{{updateTime}}</span>
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      name: '',
      createTime: '',
      address: '',
      content: '',
      uploadImgPath: '',
      imgPath:'',
      address:'',
      replyMessage:'',
      updateTime:''
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    this.imgPath = this.$route.query.imgPath;
    this.address = this.$route.query.address;
    this.getprev();
  },

  methods: {
    prev() {
      this.$router.go(-1)
    },

    //内容接口
    getprev() {
      var _this = this;
      this.$axios({
        method: "get",
        url: "syx/liuyanbiao/"+ _this.id,
        data: {
            // 'id': this.id
        }
      }).then(res => {
        if (res) {
          if (res.data.code === 20000) {
            //成功请求
            _this.items = res.data.data;
            _this.name = _this.items.name;
            _this.createTime = _this.items.createTime;
            _this.content = _this.items.content;
            _this.replyMessage = _this.items.replyMessage;
            _this.updateTime = _this.items.updateTime;

            _this.uploadImgPath = _this.items.uploadImgPath.split(",");

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
.hw_bg{
    background: url(../../assets/img/bg_canguanliuyan.png);
    position: fixed;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: 50% 50%;
    z-index: 0;
}

/*中间内容*/
.hw_content {
  width: 100%;
  padding-top: 0.47rem;
}
.hw_con {
  padding: 0 0.11rem;
  box-sizing: border-box;
}
.hw_con_message {
  /* background: url(../../assets/img/bg_visit_message2.png); */
  background-size: 100%;
  width: 100%;
  /* height: 2.68rem; */
  padding: 0 0.1rem;
  box-sizing: border-box;
  /* overflow: hidden; */
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
  /* height: 0.48rem; */
  /* display: -webkit-box; */
  /* -webkit-box-orient: vertical; */
  /* -webkit-line-clamp: 2; */
  /* overflow: hidden; */
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
  /* overflow: hidden; 设置了固定高超出部分隐藏,不确定让显示几行照片 */
}
.hw_graphic_pic img {
  width: 0.7rem;
  height: 0.7rem;
  float: left;
  padding: 0.14rem 0.13rem 0.14rem 0;
}
</style>
