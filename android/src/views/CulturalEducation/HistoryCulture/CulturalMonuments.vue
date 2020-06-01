<template>
  <div class="tp">
    <div class="hw_box">
      <!-- 头部 -->
      <header>
        <h3>文化古迹</h3>
        <div class="hw_return" @click='prev'>
          <img src="../../../../static/img/ico_return.png" alt="">
        </div>
      </header>
      <!--内容-->
      <div class="hw_content">
        <div class="hw_con" v-for="(item,index) in items" @click="CulturalMonumentsDetailsSubmit(item.id)">
          <img :src="item.imgPath" alt="">
          <div class="hw_con_title">
            <h3 style="font-size: 0.2rem;">{{item.title}}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import { MessageBox } from 'mint-ui';
    export default {
      name: "cultural-monuments",
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

        CulturalMonumentsDetailsSubmit(val){
          this.$router.push({
            path: '/CulturalMonumentsDetails',//文化古迹-详情
            query: {
              id: val,
              menuId: '10009002'
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
              "menuId": "10009002",
              // "status": 1
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
    padding: 0 0.1rem;
    box-sizing: border-box;
    padding-top: 0.62rem;
    z-index: 1;
    position: relative;
    background: #fff;
  }
  .hw_con{
    width: 100%;
    height: 1.38rem;
    border-radius: 0.04rem;
    position: relative;
    margin-bottom: 0.13rem;
  }
  .hw_con img{
    width: 100%;
    height: 1.38rem;
  }
  .hw_con_title{
    width: 100%;
    height: 0.37rem;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -50%;
    margin-top: -0.18rem;
    background: url("../../../assets/img/line_bg.png");
    background-size: 100%;
  }
  .hw_con_title h3{
    font-size: 0.08rem;
    color: #fff;
    text-align: center;
    line-height: 0.37rem;
  }

</style>
