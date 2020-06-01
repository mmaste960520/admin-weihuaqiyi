<template>
  <div class="tp">
    <div class="hw_box">
      <!-- 头部 -->
      <header>
        <h3>影音作品</h3>
        <div class="hw_return" @click='prev'>
          <img src="../../../../static/img/ico_return.png" alt="">
        </div>
      </header>
      <!--内容-->
      <div class="hw_content">
        <div class="hw_con" v-for="(item,index) in items" :key='index' @click="VideoWorksDetailsSubmit(item.id)">
          <div class="hw_con_shipin" style="height: 2.67rem;">
            <video loop poster="" ref="videos" :poster="item.imgPath" style="height: 2.67rem;">
              <!--<source :src="item.productUploadPath" type="video/mp4"/>-->
            </video>
            <img class="hw_shipin_pic" src="@/assets/img/ico_play.png" alt="">
          </div>
          <p>{{item.title}} {{item.createTime}} 记录篇</p>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import { MessageBox, Indicator } from 'mint-ui';
    export default {
      name: "video-works",
      data(){
        return{
          items:[]
        }
      },
      mounted(){
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        this.getprev();
      },
      methods: {
        prev(){
          this.$router.go(-1)
        },
        VideoWorksDetailsSubmit(val){
          console.log(val)
          this.$router.push({
            path: '/VideoWorksDetails',//影音作品详情
            query: {
              id: val,
              menuId: '10004008'
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
              "menuId": "10004008",
            },
          }).then((res) => {
            if (res) {
              if (res.data.code === 20000) {
                //成功请求
                _this.items = res.data.data;
                Indicator.close();
                if(localStorage.moduleType !== '13'){
                  this.mokuaifangwen();//模块接口
                }
              } else {
                //请求失败
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
    padding: 0 0.12rem;
    box-sizing: border-box;
    padding-top: 0.6rem;
    z-index: 1;
    position: relative;
  }
  .hw_con{
    width: 100%;
    padding: 0.08rem;
    box-sizing: border-box;
    background: #fff;
    margin-bottom: 0.11rem;
    overflow: hidden;
    box-shadow: 0 0 0.1rem rgba(0,0,0,.15);
  }
  .hw_con_shipin{
    width: 100%;
    overflow: hidden;
    height: 1.67rem;
    position: relative;
  }
  .hw_con_shipin video{
    width: 100%;
    /*height: 1.67rem;*/
  }
  .hw_shipin_pic{
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -0.24rem;
    margin-top: -0.24rem;
    width: 0.48rem;
    height: 0.48rem;
  }
  .hw_con p{
    padding-top: 0.1rem;
    color: #333333;
    font-size: 0.13rem;
    line-height: 0.21rem;
    text-align: center;
    margin: 0 auto;
    width: 3rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
  }

</style>
