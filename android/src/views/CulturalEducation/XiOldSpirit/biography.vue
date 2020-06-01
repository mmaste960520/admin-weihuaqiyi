<template>
  <div class="tp">
    <div class="hw_box">
      <!-- 头部 -->
      <header>
        <h3>生平简介</h3>
        <div class="hw_return" @click='prev'>
          <img src="../../../../static/img/ico_return.png" alt="">
        </div>
      </header>
      <!--内容-->
      <div class="hw_content">
        <!--顶部图片-->
        <div class="hw_top_pic">
          <img src="@/assets/img/img_12.png" alt="">
        </div>
        <!--标题-->
        <h3 class="hw_con_title">{{personName}}同志生平简介</h3>
        <div class="hw_con">
          <div id="tp_content">
            <!--{{content}}-->
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import { MessageBox } from 'mint-ui';
    export default {
      name: "biography",
      data(){
        return{
          content:'',//内容
          personName:'',//姓名
          items:[]
        }
      },
      mounted(){
        this.getprev();
      },
      methods:{
        prev(){
          this.$router.go(-1)
        },

        //内容接口
        getprev() {
          var _this = this;
          this.$axios({
            method: 'post',
            url: 'syx/xilaojingshen/search',
            data: {
              "menuId": "10006001",
              // "status": 1
            },
          }).then((res) => {
            if (res) {
              if (res.data.code === 20000) {
                //成功请求
                _this.items = res.data.data;
                _this.content = res.data.data[0].content;
                document.querySelector("#tp_content").innerHTML = _this.content;
                _this.personName = res.data.data[0].personName;
                if(localStorage.moduleType !== '15'){
                  this.mokuaifangwen();//模块接口
                }
              } else {
                //请求失败
                MessageBox('提示', res.data.message);
              }
            }
          })
        },
        //模块访问
        mokuaifangwen(){
          this.$axios({
            method: 'post',
            url: 'syx/visitorModule',
            data: {
              "moduleType":"15",
              "deviceType": localStorage.jixing,
              "userId": localStorage.id
            },
          }).then((res) => {
            if (res) {
              if (res.data.code === 20000) {
                //成功请求
                let moduleType = '15';
                localStorage.setItem('moduleType', moduleType)
              } else {
                //请求失败
                // MessageBox('提示', res.data.message);
              }
            }
          })
        },


      }
    }
</script>

<style scoped>
  body{
    width: 100%;
  }
  .hw_box{
    width: 100%;
  }
  /*头部*/
  header{
    width: 100%;
    height: 0.47rem;
    /*background: radial-gradient(#d3a150, #c68641);*/
    background: url(../../../../static/img/header_bg.png);
    background-size: 100%;
    background-position: 0 0;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
  }
  .hw_return{
    height: 100%;
    width: 0.47rem;
    display: flex;
    align-items: center;
    position: relative;
    z-index: 20;
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
  /*内容*/
  .hw_content{
    width: 100%;
    padding: 0 0.1rem;
    box-sizing: border-box;
    padding-top: 0.57rem;
    z-index: 1;
    position: relative;
  }
  /*顶部图片*/
  .hw_top_pic{
    width: 100%;
  }
  .hw_top_pic img{
    width: 100%;
  }
  /*标题*/
  .hw_con_title{
    color: #333333;
    font-size: 0.16rem;
    padding-left: 0.14rem;
    margin-top: 0.23rem;
    margin-bottom: 0.14rem;
    border-left: 0.02rem solid #e0990b;
  }
  .hw_con{
    width: 100%;
  }
  #tp_content{
    color: #333;
    font-size: 0.15rem;
    line-height: 0.24rem;
    text-indent: 0.3rem;
  }
</style>
