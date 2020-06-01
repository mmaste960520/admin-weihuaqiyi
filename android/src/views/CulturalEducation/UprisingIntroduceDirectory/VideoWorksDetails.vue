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
      <!--视频-->
      <div class="hw_shipin">
        <video controls loop poster="" ref="videos">
          <source :src="productUploadPath" type="video/mp4"/>
        </video>
      </div>
      <!--内容-->
      <div class="hw_content">
        <div class="hw_con_title">
          <p>{{title}}</p>
          <span>{{duration}}次播放</span>
        </div>
        <div class="hw_con_text">
          <span class="tp_jianjie">简介:</span>
          <div id="tp_content">
            <!--{{content}}-->
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import { MessageBox, Indicator } from 'mint-ui';
    export default {
      name: "video-works-details",
      data(){
        return{
          title: '',//标题
          content: '',//内容
          createTime: '',//日期
          productUploadPath:'',//视频地址
          duration:'',//播放次数
        }
      },

      mounted(){
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        this.id = this.$route.query.id;
        this.menuId = this.$route.query.menuId;
        console.log('id', this.id);
        console.log('menuId', this.menuId);
        this.getprev();
      },
      methods: {
        prev(){
          this.$router.go(-1)
        },
        //内容接口
        getprev(){
          var _this = this;
          this.$axios({
            method:'post',
            url:'syx/weihuaqiyijieshao/search',
            data:{
              "id":this.$route.query.id,
              "userId": this.menuId,
            },
          }).then( (res) =>{
            if(res){
              if(res.data.code === 20000){
                //成功请求
                _this.items = res.data.data;
                _this.title = _this.items[0].title;//标题
                _this.content = _this.items[0].content;//内容
                document.querySelector("#tp_content").innerHTML = _this.content;
                _this.createTime = _this.items[0].createTime;//时间
                _this.imgPath = _this.items[0].imgPath;//图片
                _this.duration = _this.items[0].duration;//播放次数
                _this.productUploadPath = res.data.data[0].productUploadPath;//视频地址
                console.log(_this.productUploadPath);
                this.$refs.videos.src = _this.productUploadPath;
                Indicator.close();
              } else {
                //请求失败
                // MessageBox('提示', res.data.message);
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
  /*视频*/
  .hw_shipin{
    padding-top: 0.47rem;
    width: 100%;
    /*height: 1.78rem;*/
    position: relative;
    z-index: 1;
  }
  .hw_shipin video{
    width: 100%;
    /*height: 1.78rem;*/
  }
  /*内容*/
  .hw_content{
    width: 100%;
    padding: 0 0.12rem;
    box-sizing: border-box;
    z-index: 1;
    position: relative;
    background: #fff;
  }
  .hw_con_title{
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .hw_con_title p{
    color: #000000;
    font-size: 0.15rem;
    line-height: 0.44rem;
  }
  .hw_con_title span{
    color: #666666;
    font-size: 0.11rem;
    line-height: 0.44rem;
  }
  .hw_con_text{
    width: 100%;
    display: flex;
  }
  .tp_jianjie{
    font-size: 0.14rem;
    color: #666666;
    white-space:nowrap;
    padding-right: 0.1rem;
  }
  #tp_content{
    color: #333333;
    font-size: 0.13rem;
    line-height: 0.24rem;
  }

</style>
