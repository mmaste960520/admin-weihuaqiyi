<template>
<div class="tp">
  <div class="hw_box">
    <!-- 头部 -->
    <header>
      <h3>景区掠影</h3>
      <div class="hw_return" @click='prev'>
        <img src="../../../static/img/ico_return.png" alt="">
      </div>
    </header>
    <!--内容-->
    <div class="hw_content">
      <div class="hw_con">
        <div class="hw_con_box" v-for="(item,index) in items" :key='index'>
          <div class="hw_con_pic">
            <img :src="item.imgPath" alt="">
          </div>
          <div class="hw_con_text">
            <i>{{item.title}}</i>
            <span>{{item.createTime}}</span>
          </div>
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
      name: "we-know",
      data(){
        return{
          items:[
            {
              content:'',//内容
              createTime:'',//时间
              imgPath:'',//封面图片
            }
          ]
        }
      },

      mounted(){
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
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
            url:'syx/jingqugaikuang/search',
            data:{
              "menuId":"10001002",
            },
          }).then( (res) =>{
            if(res){
              if(res.data.code === 20000){
                //成功请求
                _this.items = res.data.data;
                _this.content = res.data.data[0].content; //内容
                _this.createTime = res.data.data[0].createTime; //时间
                _this.imgPath = res.data.data[0].imgPath; //封面图片
                Indicator.close();
                if(localStorage.moduleType !== '10'){
                  this.mokuaifangwen();//模块接口
                }
              } else {
                //请求失败
                // MessageBox('提示', res.data.message);
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
              "moduleType":"10",
              "deviceType": localStorage.jixing,
              "userId": localStorage.id
            },
          }).then((res) => {
            if (res) {
              if (res.data.code === 20000) {
                //成功请求
                let moduleType = '10';
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

  /*内容*/
  .hw_content{
    width: 100%;
    padding: 0 0.07rem;
    box-sizing: border-box;
    padding-top: 0.47rem;
  }
  .hw_con{
    width: 100%;
  }
  .hw_con_box{
    width: 1.7rem;
    box-shadow: 0 0 0.02rem rgba(0,0,0,.2);
    background: #f8f8f8;
    margin: 0 0.05rem;
    margin-top: 0.15rem;
    float: left;
  }
  .hw_con_pic{
    width: 100%;
    background: #fff;
  }
  .hw_con_pic img{
    width: 1.56rem;
    height: 1.2rem;
    margin: 0 auto;
    padding: 0.09rem;
  }
  .hw_con_text{
    width: 100%;
    height: 0.47rem;
    display: flex;
    align-items: center;
  }
  .hw_con_text i{
    color: #9e682f;
    font-size: 0.13rem;
    padding-right: 0.12rem;
    padding-left: 0.1rem;
    border-right: 1px solid #bdbdbd;
    font-style: normal;
  }
  .hw_con_text span{
    color: #676767;
    font-size: 0.13rem;
    padding-left: 0.08rem;
  }
</style>


