<template>
  <div class="tp">
    <div class="hw_box">
      <!-- 头部 -->
      <header>
        <h3>古今名人</h3>
        <div class="hw_return" @click='prev'>
          <img src="../../../../static/img/ico_return.png" alt="">
        </div>
      </header>
      <!--内容-->
      <div class="hw_content">
        <div class="hw_con" v-for="(item,index) in items" :key='index' @click="AncientModernCelebrityDetailsSubmit(item.id)">
          <!--头像-->
          <div class="hw_con_img">
            <img :src="item.imgPath" alt="">
          </div>
          <!--标题与内容-->
          <div class="hw_con_text">
            <h3>{{item.author}}</h3>
            <p>{{item.description}}</p>
          </div>
          <!--进入图标-->
          <div class="hw_con_Enter">
            <img src="../../../../static/img/ico_the.png" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { MessageBox } from 'mint-ui';
    export default {
      name: "ancient-modern-celebrity",
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

        AncientModernCelebrityDetailsSubmit(val){
          this.$router.push({
            path: '/AncientModernCelebrityDetails',//名人详情信息
            query: {
              id: val,
              menuId: '10009003'
            }
          })
        },

        //内容接口
        getprev() {
          var _this = this;
          this.$axios({
            method: 'post',
            url: 'syx/lishiwenhuajiaoyu/search',
            data: {
              "menuId": "10009003",
            },
          }).then((res) => {
            if (res) {
              if (res.data.code === 20000) {
                //成功请求
                _this.items = res.data.data;
                if(localStorage.moduleType !== '16'){
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
              "moduleType":"16",
              "deviceType": localStorage.jixing,
              "userId": localStorage.id
            },
          }).then((res) => {
            if (res) {
              if (res.data.code === 20000) {
                //成功请求
                let moduleType = '16';
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
    padding: 0 0.09rem;
    box-sizing: border-box;
    padding-top: 0.63rem;
    z-index: 1;
    position: relative;
  }
  .hw_con{
    width: 100%;
    padding: 0.15rem 0.12rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    margin-bottom: 0.1rem;
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
    padding: 0 0.14rem;
  }
  .hw_con_text h3{
    color: #333333;
    font-size: 0.17rem;
    line-height: 0.21rem;
    font-weight: normal;
    padding-bottom: 0.08rem;
  }
  .hw_con_text p{
    color: #999999;
    font-size: 0.13rem;
    line-height: 0.2rem;
    height: 0.4rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  /*进入图标*/
  .hw_con_Enter{
    width: 0.07rem;
    height: 0.11rem;
  }
  .hw_con_Enter img{
    width: 100%;
    height: 100%;
  }

</style>
