<template>
  <div class="tp">
    <div class="hw_box">
      <!-- 头部 -->
      <header>
        <h3>历史瞬间</h3>
        <div class="hw_return" @click='prev'>
          <img src="../../../../static/img/ico_return.png" alt="">
        </div>
      </header>
      <!--内容-->
      <div class="hw_content">
        <div class="hw_con" v-for="(item,index) in items">
          <div class="hw_con_box">
            <div class="hw_con_pic_box">
              <img class="hw_con_pic" :src="item.imgPath" alt="">
              <img class="hw_con_lishi" src="@/assets/img/lishishunjian.png" alt="">
            </div>
            <div class="hw_con_text">
              <i>简介：</i>
              <span>{{item.description}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { MessageBox } from 'mint-ui';
    export default {
      name: "historical-moments",
      data(){
        return{
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
              "menuId": "10006003",
            },
          }).then((res) => {
            if (res) {
              if (res.data.code === 20000) {
                //成功请求
                _this.items = res.data.data;
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
    background: #fff;
  }
  .hw_box{
    width: 100%;
    background: #f7fbfa;
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
    padding: 0 0.11rem;
    box-sizing: border-box;
    padding-top: 0.47rem;
  }
  .hw_con{
    width: 100%;
    padding-top: 0.1rem;
  }
  .hw_con_box{
    width: 100%;
    box-shadow: 0 0 0.02rem rgba(0,0,0,.2);
    background: #fff;
  }
  .hw_con_pic_box{
    width: 100%;
    /*height: 1.6rem;*/
    background: #fff;
    position: relative;
  }
  .hw_con_pic{
    width: 100%;
    height: 1.6rem;
    padding-bottom: 0.09rem;
  }
  .hw_con_lishi{
    position: absolute;
    top: 0.25rem;
    left: 0.1rem;
    width: 0.4rem;
    /*height: 1.1rem;*/
  }
  .hw_con_text{
    width: 100%;
    /*height: 0.47rem;*/
    display: flex;
    flex-direction: column;
    padding: 0 0.1rem 0.16rem;
    box-sizing: border-box;
  }
  .hw_con_text i{
    color: #9e682f;
    font-size: 0.14rem;
    font-style: normal;
    line-height: 0.23rem;
  }
  .hw_con_text span{
    color: #676767;
    font-size: 0.11rem;
    line-height: 0.22rem;
    display: block;
    width: 100%;
    background: url(../../../assets/img/ico_hengxian_bg.png);
    background-size: 100% 100%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
</style>
