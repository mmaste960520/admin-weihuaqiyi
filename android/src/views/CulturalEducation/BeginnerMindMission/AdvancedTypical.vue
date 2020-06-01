<template>
  <div class="tp">
    <div class="hw_box">
      <!-- 头部 -->
      <header>
        <h3>先进典型</h3>
        <div class="hw_return" @click='prev'>
          <img src="../../../../static/img/ico_return.png" alt="">
        </div>
      </header>
      <!--内容-->
      <div class="hw_content">
        <!--轮播图-->
        <div class="hw_swiper_box">
          <div class="hw_swiper">
            <img src="@/assets/img/banner_8.png" alt="">
          </div>
        </div>
      </div>
      <div class="hw_bottom">
        <div class="hw_con" v-for="(item,index) in items" :key='index' @click="AdvancedTypicalDetailsSubmit(item.id)">
          <!--头像-->
          <div class="hw_con_img">
            <img :src="item.imgPath" alt="">
          </div>
          <!--标题与内容-->
          <div class="hw_con_text">
            <h3>{{item.title}}</h3>
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
      name: "advanced-typical",
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
        AdvancedTypicalDetailsSubmit(val){
          this.$router.push({
            path: '/AdvancedTypicalDetails',//先进典型详情
            query: {
              id: val,
              menuId: '10010002'
            }
          })
        },

        //内容接口
        getprev(){
          var _this = this;
          this.$axios({
            method:'post',
            url:'syx/buwangchuxinlaojishiming/search',
            data:{
              "menuId":"10010002",
            },
          }).then( (res) =>{
            console.log(res.data.code)
            if(res){
              if(res.data.code === 20000){
                //成功请求
                _this.items = res.data.data;
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
    margin-bottom: 0.04rem;
  }
  /*头像*/
  .hw_con_img{
    width: 0.7rem;
    height: 0.7rem;
  }
  .hw_con_img img{
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 50%;
  }
  /*标题与内容*/
  .hw_con_text{
    padding-left: 0.14rem;
    display: flex;
    flex-direction: column;
  }
  .hw_con_text h3{
    color: #484848;
    font-size: 0.16rem;
    line-height: 0.27rem;
    font-weight: normal;
    width: 2.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
  }
  .hw_con_text p{
    padding-top: 0.03rem;
    color: #747474;
    font-size: 0.13rem;
    line-height: 0.19rem;
    height: 0.38rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

</style>
