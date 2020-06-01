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
        <h3 class="tp_title">{{title}}</h3>
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
      name: "cultural-heritage-details",
      data(){
        return{
          title: '',//标题
          content: '',//内容
          createTime: '',//日期
          personName: '',//姓名
        }
      },
      mounted(){
        this.id = this.$route.query.id;
        this.menuId = this.$route.query.menuId;
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
    background: #fff;
    padding: 0.1rem;
    box-sizing: border-box;
    margin-top: 0.1rem;
  }
  .tp_title{
    color: #333333;
    font-size: 0.17rem;
    line-height: 0.39rem;
    padding-top: 0.11rem;
  }
  #tp_content{
    color: #666666;
    font-size: 0.13rem;
    line-height: 0.23rem;
  }



</style>
