<template>
  <div class="tp">
    <div class="hw_box">
      <!-- 头部 -->
      <header>
        <h3>渭华起义精神讲课</h3>
        <div class="hw_return" @click='prev'>
          <img src="../../../static/img/ico_return.png" alt="">
        </div>
      </header>
      <!--视频-->
      <div class="hw_shipin">
        <h4 id='mytime' style="display: none;">{{str}}</h4>
        <video id="video" controls loop poster="" ref="videos" autoplay @play="start" @pause="stop">
          <source :src="uploadPath" type="video/mp4"/>
          <source :src="uploadPath" type="video/webm">
          <source :src="uploadPath" type="video/ogg">
        </video>
      </div>
      <!--内容-->
      <div class="hw_content">
        <div class="hw_con_title">
          <p>{{title}}</p>
          <span>{{createTime}}</span>
        </div>
        <div class="hw_con_text">
          <!--<span class="tp_jianjie">简介:</span>-->
          <div id="tp_content">
            <!--{{content}}-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Indicator } from 'mint-ui';
  import { MessageBox } from 'mint-ui';
    export default {
      name: "revolt-details",
      data(){
        return{
          uploadPath: '',//视频地址
          title: '',//标题
          createTime: '',//时间
          content: '',//内容
          items:[],
          h:0,//定义时，分，秒，毫秒并初始化为0；
          m:0,
          s:0,
          ms:0,
          time:0, //定时器
          str:'00:00:00',
          times:'' //统计共多少秒时间
        }
      },
      mounted(){
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        this.id = this.$route.query.id;
        console.log('id', this.id);
        this.getprev();
      },

      methods: {
        prev(){
          var _this = this;
          this.$axios({
            method:'post',
            url:'syx/weihuajiangtang/xiaoHongQi',
            data:{
              "watchTime": String(_this.times),
              "userid": localStorage.id,
              "jiangTangId": this.$route.query.id
            },
          }).then( (res) =>{
            if(res){
              if(res.data.code === 20000){
              }
            }
          })
          this.$router.go(-1)
        },
        start(){  //开始
          this.time=setInterval(this.timer,50);
        },
  
        stop(){  //暂停
          clearInterval(this.time);
        },
        timer(){                //定义计时函数
          this.ms=this.ms+50;        //毫秒
          if(this.ms>=1000){
            this.ms=0;
            this.s=this.s+1;        //秒
          }
          if(this.s>=60){
            this.s=0;
            this.m=this.m+1;       //分钟
          }
          if(this.m>=60){
            this.m=0;
            this.h=this.h+1;        //小时
          }
          this.str =this.toDub(this.h)+":"+this.toDub(this.m)+":"+this.toDub(this.s);
          //统计共看了多少秒
          this.times=this.s + this.m*60 + this.h*3600 ;
        },
        toDub(n){  //补0操作
          if(n<10){
            return "0"+n;
          }
          else {
            return ""+n;
          }
        },

        //内容接口
        getprev(){
          var _this = this;
          this.$axios({
            method:'post',
            url:'syx/weihuajiangtang/search/',
            data:{
              "id":this.$route.query.id,
            },
          }).then( (res) =>{
            if(res){
              if(res.data.code === 20000){
                //成功请求
                _this.items = res.data.data;
                _this.uploadPath = res.data.data[0].uploadPath;
                this.$refs.videos.src = _this.uploadPath;//视频
                _this.title = _this.items[0].title;//标题
                _this.content = _this.items[0].content;//内容
                document.querySelector("#tp_content").innerHTML = "<p>简介："+_this.content;
                _this.createTime = _this.items[0].createTime;//时间
                _this.title = _this.items[0].title;//标题
                Indicator.close();
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
    background: #fff;
  }
  /*头部*/
  header{
    width: 100%;
    height: 0.47rem;
    background: url(../../../static/img/header_bg.png);
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
  .hw_con_text .tp_jianjie{
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
