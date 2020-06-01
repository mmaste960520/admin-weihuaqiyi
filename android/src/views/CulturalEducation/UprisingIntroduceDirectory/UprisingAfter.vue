<template>
  <div class="tp">
    <div class="hw_box">
      <div class="hw_bg"></div>
      <!-- 头部 -->
      <header>
        <h3>起义经过</h3>
        <div class="hw_return" @click='prev'>
          <img src="../../../../static/img/ico_return.png" alt="">
        </div>
      </header>
      <!--内容-->
      <div class="hw_content">
        <div class="hw_con" v-for="(item,index) in items" @click="DetailsSubmit(item.id)">
          <div class="hw_con_box">
            <img :src="item.icon" alt="">
            <p>{{item.title}}</p>
          </div>
          <img class="hw_con_ico" src="../../../../static/img/ico_the.png" alt="">
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import { MessageBox } from 'mint-ui';
    export default {
      name: "uprising-after",
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
        DetailsSubmit(val){
          console.log(val)
          this.$router.push({
            path: '/UprisingPrepare',//历史资料详情
            query: {
              id: val,
              menuId: '10006007'
            }
          })
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
    background-position: 50% 50%;
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
    padding-top: 0.76rem;
    z-index: 1;
    position: relative;
  }
  .hw_con{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(217,217,217,.15);
    border-left: 0.07rem solid #d9d9d9;
    margin: 0.26rem 0;
    box-shadow: 0 0 0.2rem rgba(217,217,217,.2);
  }
  .hw_con_box {
    display: flex;
    align-items: center;
  }
  .hw_con_box img{
    width: 0.32rem;
    height: 0.14rem;
    padding: 0 0.15rem;
  }
  .hw_con_box p{
    color: #333333;
    font-size: 0.15rem;
    line-height: 0.41rem;
    width: 2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
  }
  .hw_con_ico{
    width: 0.1rem;
    height: 0.19rem;
    padding-right: 0.2rem;
  }

</style>
