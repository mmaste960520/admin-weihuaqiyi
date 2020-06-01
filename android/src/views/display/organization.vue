<template>
  <div class="tp">
    <div class="hw_box">
      <div class="hw_bg"></div>
      <!-- 头部 -->
      <header>
        <h3>组织机构</h3>
        <div class="hw_return" @click='prev'>
          <img src="../../../static/img/ico_return.png" alt="">
        </div>
      </header>
      <!--内容-->
      <div class="hw_content">
        <div id="tp_content" style="padding-top: 0.13rem;">
          <!--{{content}}-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Indicator } from 'mint-ui';
  import { MessageBox } from 'mint-ui';
    export default {
      name: "organization",
      data(){
        return{
          content:''
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
              "menuId":"10001003",
            },
          }).then( (res) =>{
            if(res){
              if(res.data.code === 20000){
                //成功请求
                _this.content = res.data.data[0].content;
                document.querySelector("#tp_content").innerHTML = _this.content;
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
    width: 100%;
  }
  .hw_bg{
    background: url(../../assets/img/organization_bg.png);
    position: fixed;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: 50% 50%;
    z-index: -1;
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
    padding: 0 0.1rem;
    box-sizing: border-box;
    padding-top: 0.47rem;
  }
  .hw_content_a{
    width: 100%;
    padding-top: 0.17rem;
    padding-bottom: 0.1rem;
    border-bottom: 1px solid #fbfbfb;
  }
  .hw_content_a p{
    color: #333333;
    font-size: 0.14rem;
    line-height: 0.24rem;
    text-indent: 0.3rem;
  }
  /*部门设置*/
  .hw_sector_setup{
    width: 1.07rem;
    height: 0.29rem;
    margin: 0.11rem auto;
    background: url(../../assets/img/sector_setup_bg.png);
    background-size: 100%;
    border-radius: 0.01rem;
  }
  .hw_sector_setup p{
    color: #905223;
    font-size: 0.15rem;
    line-height: 0.29rem;
    text-align: center;
  }
  .hw_sector_setup_text_title{
    color: #bd7335;
    font-size: 0.14rem;
    line-height: 0.47rem;
    border-bottom: 1px solid #f9eee5;
  }
  .hw_sector_setup_text_con{
    color: #333333;
    font-size: 0.14rem;
    line-height: 0.24rem;
    padding-top: 0.12rem;
  }
  .hw_sector_setup_text :last-child{
    color: #333333;
    font-size: 0.14rem;
    line-height: 0.7rem;
  }

</style>
