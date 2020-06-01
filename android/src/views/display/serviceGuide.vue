<template>
    <div class="tp">
      <div class="hw_box">
        <!-- 头部 -->
        <header>
          <h3>服务指南</h3>
          <div class="hw_return" @click='prev'>
            <img src="../../../static/img/ico_return.png" alt="">
          </div>
        </header>
        <!--内容-->
        <div class="hw_content">
          <!--轮播图-->
          <div class="hw_banner">

          </div>
          <!--下方详情内容-->
          <div class="hw_con">
            <div class="hw_con_details" v-for="(item,index) in items" @click="DetailsSubmit(item.menuId)">
              <div class="hw_con_pic">
                <img :src="item.imgPath"/>
              </div>
              <div class="hw_con_right">
                <div class="hw_con_right_top">
                  <img class="hw_ticket" :src="item.icon" alt="" />
                  <h3>{{item.title}}</h3>
                  <div class="hw_details_bg">详情</div>
                </div>
                <p>免费开放参观</p>
                <p>预订电话：{{item.phone}}</p>
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
      name: "service-guide",
      data(){
        return{
          items:[]
        }
      },
      mounted(){
        this.getprev();
      },


      methods:{
        prev(){//返回上一级
          this.$router.go(-1)
        },

        DetailsSubmit(val){
          console.log(val)
          this.$router.push({
            path: '/TicketReservation',//详情
            query: {
              menuId: val,
            }
          })
        },
        //内容接口
        getprev() {
          var _this = this;
          this.$axios({
            method: 'post',
            url: 'syx/fuwuzhinan/search',
            data: {
              // "status": "1"
            },
          }).then((res) => {
            if (res) {
              if (res.data.code === 20000) {
                //成功请求
                _this.items = res.data.data;
                if(localStorage.moduleType !== '6'){
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
              "moduleType":"6",
              "deviceType": localStorage.jixing,
              "userId": localStorage.id
            },
          }).then((res) => {
            if (res) {
              if (res.data.code === 20000) {
                //成功请求
                let moduleType = '6';
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
    background: url(../../assets/img/service_guide.png);
    background-size: 100%;
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
    padding: 0 0.13rem;
    box-sizing: border-box;
    padding-top: 0.47rem;
  }
  /*轮播图*/
  .hw_banner{
    width: 100%;
    height: 1.77rem;
    background: #fff;
    margin-top: 0.13rem;
    background: url(../../assets/img/img_6.png);
    background-size: 100%;
  }
  /*下方详情内容*/
  .hw_con{
    width: 100%;
  }
  .hw_con_details{
    width: 100%;
    display: flex;
    justify-content: space-between;
    background: #fff;
    margin-top: 0.15rem;
  }
  .hw_con_pic{
    width: 1.75rem;
    height: 1.1rem;
    padding-right: 0.15rem;
  }
  .hw_con_pic img{
    width: 1.75rem;
    height: 1.1rem;
  }
  .hw_con_right{
    width: 100%;
  }
  .hw_con_right_top{
    display: flex;
    align-items: center;
    border-bottom: 1px solid #edcead;
    padding: 0.15rem 0;
    margin-bottom: 0.1rem;
  }
  .hw_ticket{
    width: 0.21rem;
    height: 0.15rem;
  }
  .hw_con_right_top h3{
    font-size: 0.15rem;
    color: #a03435;
    padding: 0 0.1rem 0 0.07rem;
  }
  .hw_details_bg{
    width: 0.46rem;
    height: 0.18rem;
    font-size: 0.12rem;
    text-indent: 0.13rem;
    color: #fff;
    background: url(../../assets/img/ico_box.png) no-repeat;
    background-size: 100%;
  }
  .hw_con_right p{
    font-size: 0.13rem;
    color: #333333;
    line-height: 0.22rem;
  }
  .hw_con_right :last-child{
    font-size: 0.11rem;
  }

</style>
