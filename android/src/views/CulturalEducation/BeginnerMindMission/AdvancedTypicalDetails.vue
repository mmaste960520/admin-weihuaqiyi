<template>
  <div class="tp">
    <div class="hw_box">
      <!-- 头部 -->
      <header>
        <h3>先进典型-详情</h3>
        <div class="hw_return" @click='prev'>
          <img src="../../../../static/img/ico_return.png" alt="">
        </div>
      </header>
      <!--内容-->
      <div class="hw_content">
        <div class="hw_con">
          <div class="hw_con_top">
            <div class="hw_con_img">
              <img :src="imgPath" alt="">
            </div>
            <div class="hw_con_text">
              <h3>{{title}}</h3>
              <div class="hw_con_time">
                <img src="@/assets/img/ico_time.png" alt="">
                <p>{{createTime}}</p>
              </div>
            </div>
          </div>
          <div class="hw_con_bottom">
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
      name: "advanced-typical-details",
      data(){
        return{
          createTime: '',//时间
          content: '',//内容
          title: '',//标题
          imgPath: '',//头像
        }
      },

      mounted(){
        this.id = this.$route.query.id;
        this.menuId = this.$route.query.menuId;
        console.log('id', this.id);
        console.log('menuId', this.menuId);
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
            url: 'syx/buwangchuxinlaojishiming/search',
            data: {
              "id": this.$route.query.id,
              "userId": this.menuId,
            },
          }).then((res) => {
            console.log(res.data.code)
            if (res) {
              if (res.data.code === 20000) {
                //成功请求
                _this.items = res.data.data;
                _this.createTime = _this.items[0].createTime.substring(0, 10);//时间
                _this.content = _this.items[0].content;//内容
                document.querySelector("#tp_content").innerHTML = _this.content;
                _this.title = _this.items[0].title;//标题
                _this.imgPath = _this.items[0].imgPath;//头像
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
    padding: 0 0.14rem;
    box-sizing: border-box;
    padding-top: 0.63rem;
    z-index: 1;
    position: relative;
  }
  .hw_con{
    width: 100%;
    background: #fff;
  }
  .hw_con_top{
    width: 100%;
    display: flex;
    padding-bottom: 0.19rem;
    padding-top: 0.15rem;
  }
  .hw_con_img{
    width: 0.7rem;
    height: 0.7rem;
    padding-left: 0.12rem;
  }
  .hw_con_img img{
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 50%;
  }
  .hw_con_text{
    width: 100%;
    padding-left: 0.12rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .hw_con_text h3{
    color: #333333;
    font-size: 0.2rem;
    line-height: 0.36rem;
    padding-right: 0.1rem;
    font-weight: normal;
  }
  .hw_con_time{
    display: flex;
    align-items: center;
  }
  .hw_con_time img{
    width: 0.12rem;
    height: 0.12rem;
  }
  .hw_con_time p{
    color: #999999;
    font-size: 0.15rem;
    padding-left: 0.06rem;
    padding-right: 0.13rem;
  }
  .hw_con_bottom{
    padding: 0 0.2rem;
    box-sizing: border-box;
  }
  #tp_content{
    color: #000;
    font-size: 0.14rem;
    line-height: 0.26rem;
  }
</style>
