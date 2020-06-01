<template>
  <div class="tp">
    <div class="hw_box">
      <!-- 头部 -->
      <header>
        <h3>关于APP</h3>
        <div class="hw_return" @click='prev'>
          <img src="../../../static/img/ico_return.png" alt="">
        </div>
      </header>
      <!--内容-->
      <div class="hw_content" id="tp_content">

      </div>
    </div>
  </div>

</template>

<script>
  import { MessageBox } from 'mint-ui';
    export default {
      name: "about-app",
      data(){
        return{
          androidFunction:'',
          iosFunction:'',
        }
      },


      mounted(){
        this.id = this.$route.query.id;
        this.chushihua();
      },

      methods: {
        prev(){
          this.$router.go(-1)
        },
        chushihua() {
          var _this = this;
            this.$axios({
              method: 'get',
              url: 'syx/site',
              data: {},
              headers: {}
            }).then((res) => {
              if (res) {
                if (res.data.code === 20000) {
                  //成功请求
                  _this.androidFunction = res.data.data[0].androidFunction;//内容
                  _this.iosFunction = res.data.data[0].iosFunction;//内容
                  // 判断安卓苹果机
                    var u = navigator.userAgent;
                    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
                    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                    if(isiOS){
                      document.querySelector("#tp_content").innerHTML = _this.iosFunction;
                    }else if(isAndroid){
                      document.querySelector("#tp_content").innerHTML = _this.androidFunction;
                    }
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
    background: #f8f8f8;
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
    position: relative;
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
    padding: 0.47rem 0.1rem 0;
    box-sizing: border-box;
  }

</style>
