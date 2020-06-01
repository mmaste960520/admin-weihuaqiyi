<template>
  <div class="tp">
    <div class="hw_box">
      <!-- 头部 -->
      <header>
        <h3>领导关怀</h3>
        <div class="hw_return" @click='prev'>
          <img src="../../../../static/img/ico_return.png" alt="">
        </div>
      </header>
      <!--内容-->
      <div class="hw_content">
        <!--轮播图-->
        <div class="hw_swiper_box">
          <div class="hw_swiper hw_swiper_oneui">
            <mt-swipe :auto="4000" :continuous="true">
              <mt-swipe-item><img src="@/assets/img/banner_2.png" alt=""></mt-swipe-item>
              <mt-swipe-item><img src="@/assets/img/banner_3.png" alt=""></mt-swipe-item>
              <mt-swipe-item><img src="@/assets/img/banner_4.png" alt=""></mt-swipe-item>
            </mt-swipe>
          </div>
        </div>
      </div>
      <div class="hw_bottom">
        <div class="hw_con" v-for="(item,index) in items" :key='index' @click="RedEducationDetails(item.id)">
          <!--头像-->
          <div class="hw_con_img">
            <img :src="item.imgPath" alt="">
          </div>
          <!--标题与内容-->
          <div class="hw_con_text">
            <h3>{{item.title}}</h3>
            <span>{{item.createTime}}</span>
            <p>{{item.description}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
  import { MessageBox } from 'mint-ui';
    export default {
      name: "leadership-care",
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
        RedEducationDetails(val){
          this.$router.push({
            path: '/RedEducationDetails',
            query: {
              id: val,
              menuId: '10007003'
            }
          })
        },
        //内容接口
        getprev() {
          var _this = this;
          this.$axios({
            method: 'post',
            url: 'syx/hongsejiaoyu/search',
            data: {
              "menuId": "10007003",
            },
          }).then((res) => {
            console.log(res.data.code)
            if (res) {
              if (res.data.code === 20000) {
                //成功请求
                _this.items = res.data.data;
                if(localStorage.moduleType !== '5'){
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
              "moduleType":"5",
              "deviceType": localStorage.jixing,
              "userId": localStorage.id
            },
          }).then((res) => {
            if (res) {
              if (res.data.code === 20000) {
                //成功请求
                let moduleType = '5';
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
    background: #f7fbfa;
  }
  /*头部*/
  header{
    width: 100%;
    height: 0.47rem;
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
    z-index: 1;
    position: relative;
    background: #fff;
  }
  /*轮播图*/
  .hw_swiper_box{
    width: 100%;
    height: 1.93rem;
  }
  .hw_swiper{
    width: 100%;
    height: 1.66rem;
    padding-top: 0.12rem;
  }
  .hw_swiper img{
    width: 100%;
    height: 1.66rem;
    border-radius: 0.05rem;
  }



  .hw_bottom{
    width: 100%;
    margin-top: 0.1rem;
  }
  .hw_con{
    width: 100%;
    padding: 0.14rem 0.12rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    /*justify-content: space-between;*/
    background: #fff;
    border-bottom: 1px solid #dcdcdc;
  }
  /*头像*/
  .hw_con_img{
    width: 0.93rem;
    /*height: 0.7rem;*/
  }
  .hw_con_img img{
    width: 0.93rem;
    /*height: 100%;*/
    border-radius: 0.04rem;
  }
  /*标题与内容*/
  .hw_con_text{
    padding-left: 0.14rem;
    display: flex;
    flex-direction: column;
  }
  .hw_con_text h3{
    color: #333333;
    font-size: 0.17rem;
    line-height: 0.25rem;
    font-weight: normal;
    width: 2.3rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
  }
  .hw_con_text span{
    color: #999999;
    line-height: 0.16rem;
    font-size: 0.11rem;
  }
  .hw_con_text p{
    padding-top: 0.05rem;
    color: #999999;
    font-size: 0.13rem;
    line-height: 0.16rem;
    width: 2.3rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
  }

</style>
