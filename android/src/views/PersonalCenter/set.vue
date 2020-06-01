<template>
    <div class="tp">
      <div class="hw_box">
        <!-- 头部 -->
        <header>
          <h3>系统设置</h3>
          <div class="hw_return" @click='prev'>
            <img src="../../../static/img/ico_return.png" alt="">
          </div>
        </header>
        <!--内容-->
        <div class="hw_content">
          <div class="hw_con">
            <div class="hw_menu">
              <p>切换语言</p>
              <img src="../../../static/img/ico_the.png" alt="" />
            </div>
          </div>
          <div class="hw_con">
            <div class="hw_menu">
              <p>接受消息通知</p>
              <!--<img src="../../../static/img/ico_the.png" alt="" />-->
              <mt-switch v-model="value" @change="turn"></mt-switch>
            </div>
            <div class="hw_menu">
              <p>声音提醒</p>
              <!--<img src="../../../static/img/ico_the.png" alt="" />-->
              <mt-switch v-model="value1" @change="turn1"></mt-switch>
            </div>
          </div>
          <div class="hw_con">
            <div class="hw_menu">
              <p>清除缓存</p>
              <img src="../../../static/img/ico_the.png" alt="" />
            </div>
            <div class="hw_menu" @click="AboutApp()">
              <p>关于APP</p>
              <img src="../../../static/img/ico_the.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "set",
      data () {
        return {
          value: false,
          value1: false,
        }
      },
      methods:{
        turn: function() {
          console.log(this.value) //mintui 打印状态 true false
        },
        turn1: function() {
          console.log(this.value1) //mintui 打印状态 true false
        },
        prev(){
          this.$router.go(-1) //返回上一页
        },
        AboutApp(){
          this.$router.push({
            path: '/AboutApp',//关于APP
          })
        }
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
    padding-top: 0.47rem;
  }
  .hw_con{
    width: 100%;
    margin-bottom: 0.1rem;
  }
  .hw_menu{
    width: 100%;
    height: 0.56rem;
    padding: 0 0.2rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    border-bottom: 1px solid #f9f9f9;
  }
  .hw_menu p{
    color: #000;
    font-size: 0.15rem;
  }
  .hw_menu img{
    width: 0.08rem;
    height: 0.14rem;
  }

</style>
