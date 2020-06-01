<template>
  <div class="tp">
    <div class="hw_box">
      <!-- 头部 -->
      <header>
        <h3>便民查询</h3>
        <div class="hw_return" @click='prev'>
          <img src="../../../../static/img/ico_return.png" alt="">
        </div>
      </header>
      <!--内容-->
      <div class="hw_content">
        <div class="hw_swiper">
          <img :src="imgPath" alt="">
        </div>
        <div class="hw_con">
          <h3 class="hw_con_title">{{scenicSpotName}}</h3>
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
      name: "convenient-query-details",
      data(){
        return{
          scenicSpotName: '',//标题
          imgPath: '',//头像
          content: '',//内容
          createTime: '',//时间
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
            url: 'syx/hongselvyou/search',
            data: {
              "id": this.$route.query.id,
              "userId": this.menuId,
            },
          }).then((res) => {
            if (res) {
              if (res.data.code === 20000) {
                //成功请求
                _this.items = res.data.data.rows;
                _this.scenicSpotName = _this.items[0].scenicSpotName;//标题
                _this.imgPath = _this.items[0].imgPath;//头像
                _this.content = _this.items[0].content;//内容
                document.querySelector("#tp_content").innerHTML = _this.content;
                _this.createTime = _this.items[0].createTime;//时间
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
    background: #fff;
  }
  .hw_box{
    width: 100%;
    background: #fff;
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
    padding: 0 0.1rem;
    box-sizing: border-box;
    padding-top: 0.47rem;
  }
  .hw_swiper{
    width: 100%;
    padding: 0.1rem 0;
    box-sizing: border-box;
  }
  .hw_swiper img{
    width: 100%;
    height: 1.78rem;
    border-radius: 0.06rem;
  }
  .hw_con{
    width: 100%;
  }
  .hw_con_title{
    font-size: 0.16rem;
    line-height: 0.16rem;
    color: #333333;
    padding-left: 0.08rem;
    border-left: 0.02rem solid #e0990b;
    margin: 0.19rem 0;
  }
  .hw_con_box{
    width: 100%;
    padding: 0 0.15rem;
    box-sizing: border-box;
  }
  #tp_content{
    color: #333333;
    line-height: 0.24rem;
    font-size: 0.14rem;
  }
</style>
