<template>
  <div class="tp">
    <div class="hw_box">
      <!-- 头部 -->
      <header>
        <h3>{{title}}</h3>
        <div class="hw_return" @click='prev'>
          <img src="../../../../static/img/ico_return.png" alt="">
        </div>
      </header>
      <!--顶部封面-->
      <div class="hw_top_pic">
        <img :src="imgPath" alt="">
      </div>
      <!--内容-->
      <div class="hw_content">
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
      name: "picture-file-details",
      data(){
        return{
          title: '',//标题
          content: '',//内容
          createTime: '',//日期
          author: '',//名称
          imgPath: '',//图片
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
                _this.title = _this.items[0].title;
                _this.content = _this.items[0].content;
                document.querySelector("#tp_content").innerHTML = _this.content;
                _this.createTime = _this.items[0].createTime;
                _this.author = _this.items[0].author;
                _this.imgPath = _this.items[0].imgPath;
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
  }
  /*头部*/
  header{
    width: 100%;
    height: 0.47rem;
    /*background: radial-gradient(#d3a150, #c68641);*/
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
  /*顶部封面*/
  .hw_top_pic{
    width: 100%;
    padding-top: 0.47rem;
  }
  .hw_top_pic img{
    width: 100%;
  }
  /*内容*/
  .hw_content{
    width: 100%;
    padding: 0 0.25rem;
    box-sizing: border-box;
  }
  #tp_content{
    color: #000;
    font-size: 0.14rem;
    line-height: 0.26rem;
    padding-top: 0.27rem;
  }
</style>
