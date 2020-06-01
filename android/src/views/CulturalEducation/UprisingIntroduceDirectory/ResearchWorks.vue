<template>
  <div class="tp">
    <div class="hw_box">
      <!-- 头部 -->
      <header>
        <h3>研究著作</h3>
        <div class="hw_return" @click='prev'>
          <img src="../../../../static/img/ico_return.png" alt="">
        </div>
      </header>
      <!--内容-->
      <div class="hw_content">
        <div class="hw_con" v-for="(item,index) in items" :key='index'>
          <!--头像-->
          <div class="hw_con_img">
            <img :src="item.imgPath" alt="">
          </div>
          <!--标题与内容-->
          <div class="hw_con_text">
            <h3>{{item.title}}</h3>
            <p>作者：{{item.name}}</p>
            <p>出版时间：{{item.publishTime}}</p>
          </div>
          <div class="hw_download" @click="xiazaiSubmit(item.productUploadPath)">
            <span>下载</span>
            <img src="@/assets/img/download.png" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { MessageBox } from 'mint-ui';
    export default {
      name: "research-works",
      data(){
        return{
          items:[]
        }
      },
      mounted(){
        this.getprev();
      },

      methods: {
        prev(){
          this.$router.go(-1)
        },
        //内容接口
        getprev() {
          var _this = this;
          this.$axios({
            method: 'post',
            url: 'syx/weihuaqiyijieshao/search',
            data: {
              "menuId": "10004007",
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
        // 下载
        xiazaiSubmit(productUploadPath){
          // 拿到下载路径
          var file = productUploadPath;
          // 截取路径-文件名称
          var fileExtension = file.substring(file.lastIndexOf('/') + 1);
          window.open(productUploadPath);

          // this.$axios({
          //   method: 'post',
          //   url: 'syx/file/multipledownLoad',
          //   params: {
          //     "realPath": productUploadPath,
          //     "fileName": fileExtension
          //   },
          // }).then((res) => {
          //   if (res) {
          //     console.log(fileExtension);
          //     console.log(productUploadPath)
          //   }
          // })
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
    padding: 0 0.09rem;
    box-sizing: border-box;
    padding-top: 0.63rem;
    z-index: 1;
    position: relative;
  }
  .hw_con{
    width: 100%;
    padding: 0 0.12rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    /*justify-content: space-between;*/
    background: #fff;
    margin-bottom: 0.1rem;
    position: relative;
  }
  /*头像*/
  .hw_con_img{
    width: 0.81rem;
    /*height: 0.7rem;*/
    padding: 0.14rem 0;
  }
  .hw_con_img img{
    width: 0.81rem;
    /*height: 100%;*/
    border-radius: 0.03rem;
  }
  /*标题与内容*/
  .hw_con_text{
    padding-left: 0.14rem;
  }
  .hw_con_text h3{
    color: #333333;
    font-size: 0.18rem;
    line-height: 0.21rem;
    font-weight: normal;
    padding-bottom: 0.08rem;
  }
  .hw_con_text p{
    color: #999999;
    font-size: 0.15rem;
    line-height: 0.2rem;
  }
  .hw_download{
    position: absolute;
    bottom: 0.12rem;
    right: 0.22rem;
    display: flex;
    align-items: center;
  }
  .hw_download span{
    color: #ee8f2c;
    font-size: 0.15rem;
    padding-right: 0.08rem;
  }
  .hw_download img{
    width: 0.14rem;
    height: 0.14rem;
  }
</style>
