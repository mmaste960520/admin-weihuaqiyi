<template>
  <div class="tp">
    <div class="hw_box">
      <div class="hw_bg"></div>
      <!-- 头部 -->
      <header>
        <h3>起义简介</h3>
        <div class="hw_return" @click='prev'>
          <img src="../../../../static/img/ico_return.png" alt="">
        </div>
      </header>
      <!--内容-->
      <div class="hw_content">
        <div id="tp_content">
          <!--{{content}}-->
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import { MessageBox } from 'mint-ui';
    export default {
      name: "uprising-introduce",
      data(){
        return{
          content:'',//内容
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
            url: 'syx/weihuaqiyijieshao/search',
            data: {
              "menuId": "10004001",
            },
          }).then((res) => {
            if (res) {
              if (res.data.code === 20000) {
                //成功请求
                _this.items = res.data.data;
                _this.content = _this.items[0].content;//内容
                document.querySelector("#tp_content").innerHTML = _this.content;
                if(localStorage.moduleType !== '13'){
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
              "moduleType":"13",
              "deviceType": localStorage.jixing,
              "userId": localStorage.id
            },
          }).then((res) => {
            if (res) {
              if (res.data.code === 20000) {
                //成功请求
                let moduleType = '13';
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
  .hw_bg{
    background: url(../../../assets/img/UprisingIntroduce_bg.png);
    position: fixed;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: 70% 50%;
    z-index: 0;
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
    padding: 0 0.35rem;
    box-sizing: border-box;
    padding-top: 0.47rem;
    z-index: 1;
    position: relative;
    padding-bottom: 0.25rem;
  }
  #tp_content{
    color: #000;
    font-size: 0.14rem;
    line-height: 0.26rem;
    padding-top: 0.27rem;
  }

</style>
