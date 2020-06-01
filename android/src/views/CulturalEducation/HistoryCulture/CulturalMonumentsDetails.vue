<template>
  <div class="tp">
    <div class="hw_box">
      <!-- 头部 -->
      <header>
        <h3>文化遗产</h3>
        <div class="hw_return" @click='prev'>
          <img src="../../../../static/img/ico_return.png" alt="">
        </div>
      </header>
      <!--内容-->
      <div class="hw_content">
        <!--轮播图-->
        <div class="hw_swiper_box">
          <div class="hw_swiper hw_swiper_twoui">
            <mt-swipe :auto="4000" :continuous="true">
              <mt-swipe-item><img src="@/assets/img/img_19.png" alt=""></mt-swipe-item>
              <mt-swipe-item><img src="@/assets/img/img_20.png" alt=""></mt-swipe-item>
              <mt-swipe-item><img src="@/assets/img/img_21.png" alt=""></mt-swipe-item>
              <mt-swipe-item><img src="@/assets/img/img_22.png" alt=""></mt-swipe-item>
            </mt-swipe>
          </div>
        </div>
        <div class="hw_con">
          <div class="hw_con_title">
            <h3>{{title}}</h3>
            <div class="hw_con_title_etails">
              <img src="@/assets/img/ico_coordinates2.png" alt="">
              <p><span>地点</span><i>{{address}}</i></p>
            </div>
            <div class="hw_con_title_etails">
              <img src="@/assets/img/ico_peculiarity.png" alt="">
              <p><span>特点</span><i>{{feature}}</i></p>
            </div>
          </div>
          <div class="hw_con_box">
            <div id="tp_content">
              <!--{{content}}-->
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
      name: "cultural-monuments-details",
      data(){
        return{
          title: '',//标题
          content: '',//内容
          createTime: '',//日期
          personName: '',//姓名
          address: '',//
          feature: '',//
        }
      },
      mounted(){
        this.id = this.$route.query.id;
        this.menuId = this.$route.query.menuId;
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
            method: 'post',
            url: 'syx/lishiwenhuajiaoyu/search',
            data: {
              "id": this.$route.query.id,
              "userId": this.menuId,
            },
          }).then((res) => {
            if (res) {
              if (res.data.code === 20000) {
                //成功请求
                _this.items = res.data.data;
                _this.title = _this.items[0].title;//标题
                _this.content = _this.items[0].content;//内容
                document.querySelector("#tp_content").innerHTML = _this.content;
                _this.createTime = _this.items[0].createTime;//时间
                _this.personName = _this.items[0].personName;//姓名
                _this.address = _this.items[0].address;//
                _this.feature = _this.items[0].feature;//
              } else {
                //请求失败
                MessageBox('提示', res.data.message);
              }
            }
          })
        }


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
    /*padding: 0 0.11rem;*/
    /*box-sizing: border-box;*/
    padding-top: 0.47rem;
    z-index: 1;
    position: relative;
    background: #fff;
    height: 100%;
  }
  /*轮播图*/
  .hw_swiper_box{
    width: 100%;
    height: 1.61rem;
  }
  .hw_swiper{
    width: 100%;
    height: 1.61rem;
  }
  .hw_swiper img{
    width: 100%;
    height: 1.61rem;
  }

  .hw_con{
    width: 100%;
    padding: 0 0.19rem;
    box-sizing: border-box;
    position: relative;
  }
  .hw_con_title{
    width: 3.54rem;
    position: absolute;
    padding-bottom: 0.22rem;
    top: -0.14rem;
    left: 50%;
    margin-left: -1.77rem;
    z-index: 5;
    background: #fff;
    box-shadow: 0 0 0.2rem rgba(0,0,0,.1);
    border-radius: 0.04rem;
  }
  .hw_con_title h3{
    color: #333;
    font-size: 0.17rem;
    line-height: 0.47rem;
    text-align: center;
  }
  .hw_con_title_etails{
    width: 100%;
    display: flex;
    align-items: center;
  }
  .hw_con_title_etails img{
    width: 0.15rem;
    height: 0.17rem;
    padding-left: 0.29rem;
  }
  .hw_con_title_etails p{
    display: flex;
  }
  .hw_con_title_etails p span{
    color: #4B4B4B;
    font-size: 0.16rem;
    line-height: 0.26rem;
    padding: 0 0.27rem 0 0.07rem;
  }
  .hw_con_title_etails p i{
    font-style: normal;
    color: #4B4B4B;
    font-size: 0.16rem;
    line-height: 0.26rem;
  }
  .hw_con_box{
    width: 100%;
    padding-top: 1.18rem;
  }
  #tp_content{
    color: #333333;
    font-size: 0.14rem;
    line-height: 0.24rem;
  }

</style>
