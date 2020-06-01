<template>
  <div class="tp">
    <div class="hw_box">
      <!-- 头部 -->
      <header>
        <h3>题词手迹</h3>
        <div class="hw_return" @click='prev'>
          <img src="../../../../static/img/ico_return.png" alt="">
        </div>
      </header>
      <!--内容-->
      <div class="hw_content">
        <div class="hw_souvenir">
          <div class="hw_souvenir_con" v-for="(item,index) in items">
            <img :src="item.imgPath" alt="">
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
      name: "inscription-handwriting",
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
        //内容接口
        getprev() {
          var _this = this;
          this.$axios({
            method: 'post',
            url: 'syx/xilaojingshen/search',
            data: {
              "menuId": "10006006",
            },
          }).then((res) => {
            if (res) {
              if (res.data.code === 20000) {
                //成功请求
                _this.items = res.data.data;
                if(localStorage.moduleType !== '15'){
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
              "moduleType":"15",
              "deviceType": localStorage.jixing,
              "userId": localStorage.id
            },
          }).then((res) => {
            if (res) {
              if (res.data.code === 20000) {
                //成功请求
                let moduleType = '15';
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
    padding: 0 0.1rem;
    box-sizing: border-box;
    padding-top: 0.63rem;
    z-index: 1;
    position: relative;
  }

  .hw_souvenir{
    width: 100%;
    column-count: 2;
    column-gap:0.16rem;
    column-span: none;
    background: #f8f8f8;
  }
  .hw_souvenir_con{
    width: 1.67rem;
    background: #fff;
    box-shadow: 0 0 0.03rem rgba(0,0,0,.2);
    break-inside: avoid;
    margin-bottom: 0.11rem;
  }
  .hw_souvenir_con img{
    width: 1.53rem;
    margin: 0 auto;
    padding: 0.09rem 0;
  }
  .hw_souvenir_con p{
    color: #585858;
    font-size: 0.13rem;
    line-height: 0.22rem;
    padding: 0.06rem 0.1rem 0.1rem;
  }
</style>
