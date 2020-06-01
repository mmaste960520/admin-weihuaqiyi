<template>
  <div class="tp">
    <div class="hw_box">
      <!-- 头部 -->
      <header>
        <h3>文化遗产</h3>
        <div class="hw_return" @click='prev'>
          <img src="../../../../static/img/ico_return.png" alt="">
        </div>
      </header>
      <!--内容-->
      <div class="hw_content">
        <div class="hw_con" v-for="(item,index) in items" :key='index' @click="CulturalHeritageDetailsSubmit(item.id)">
          <!--头像-->
          <div class="hw_con_img">
            <img :src="item.imgPath" alt="">
          </div>
          <!--标题与内容-->
          <div class="hw_con_text">
            <div>
              <h3>{{item.title}}</h3>
              <img src="@/assets/img/ico_access.png" alt="">
            </div>
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
      name: "cultural-heritage",
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

        CulturalHeritageDetailsSubmit(val){
          console.log(val)
          this.$router.push({
            path: '/CulturalHeritageDetails',//文化遗产-详情
            query: {
              id: val,
              menuId: '10009001'
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
              "menuId": "10009001",
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
    padding-top: 0.6rem;
    z-index: 1;
    position: relative;
  }
  .hw_con{
    width: 100%;
    display: flex;
    align-items: center;
    /*justify-content: space-between;*/
    background: #fff;
    margin-bottom: 0.1rem;
    border-radius: 0.04rem;
    overflow: hidden;
  }
  /*头像*/
  .hw_con_img{
    width: 1.49rem;
    height: 1.15rem;
  }
  .hw_con_img img{
    width: 1.49rem;
    height: 1.15rem;
  }
  /*标题与内容*/
  .hw_con_text{
    padding: 0 0.26rem 0 0.24rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }
  .hw_con_text div{
    display: flex;
    justify-content: space-between;
    align-items: center;
    /*padding-top: 0.11rem;*/
  }
  .hw_con_text h3{
    color: #525252;
    font-size: 0.17rem;
    line-height: 0.33rem;
    font-weight: normal;
    width: 1.3rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
  }
  .hw_con_text div img{
    width: 0.15rem;
    height: 0.15rem;
  }
  .hw_con_text p{
    padding-top: 0.05rem;
    color: #666;
    font-size: 0.13rem;
    line-height: 0.19rem;
    height: 0.57rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
</style>
