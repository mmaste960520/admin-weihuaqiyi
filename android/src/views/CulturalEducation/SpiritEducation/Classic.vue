<template>
  <div class="tp">
    <div class="hw_box">
      <!-- 头部 -->
      <header>
        <h3>经典著作</h3>
        <div class="hw_return" @click='prev'>
          <img src="../../../../static/img/ico_return.png" alt="">
        </div>
      </header>
      <!--内容-->
      <div class="hw_content">
        <div class="hw_con" v-for="(item,index) in items" :key='index'>
          <!--头像-->
          <div class="hw_con_img" @click="DetailsSubmit(item.id)">
            <img src="@/assets/img/img_17.png" alt="">
          </div>
          <!--标题与内容-->
          <div class="hw_con_text" @click="DetailsSubmit(item.id)">
            <h3>{{item.title}}</h3>
            <span>时间：{{item.createTime}}</span>
            <p>{{item.description}}</p>
          </div>
          <!--下载按钮-->
          <img class="hw_download" src="@/assets/img/download.png"  @click="xiazaiSubmit(item.downloadPath)">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { MessageBox } from 'mint-ui';
    export default {
      name: "classic",
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
        // 下载
        xiazaiSubmit(downloadPath){
          window.open(downloadPath);
        },

        DetailsSubmit(val){
          console.log(val)
          this.$router.push({
            // path: '/PartyConstitutionDetails',
            path: '/ClassicDetails',
            query: {
              id: val,
              menuId: '10008004',
              // Name:'经典著作'
            }
          })
        },

        //内容接口
        getprev() {
          var _this = this;
          this.$axios({
            method: 'post',
            url: 'syx/dangxingjiaoyu/search',
            data: {
              "menuId": "10008004",
            },
          }).then((res) => {
            console.log(res.data.code)
            if (res) {
              if (res.data.code === 20000) {
                //成功请求
                _this.items = res.data.data;
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
    width: 100%;
  }
  .hw_box{
    width: 100%;
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
    /*padding: 0 0.09rem;*/
    /*box-sizing: border-box;*/
    padding-top: 0.47rem;
    z-index: 1;
    position: relative;
  }
  .hw_con{
    width: 100%;
    padding: 0.14rem 0.12rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    /*justify-content: space-between;*/
    background: #fff;
    border-bottom: 1px solid #dcdcdc;
    position: relative;
  }
  /*头像*/
  .hw_con_img{
    width: 0.93rem;
    /*height: 0.89rem;*/
  }
  .hw_con_img img{
    width: 0.93rem;
    /*height: 0.89rem;*/
    border-radius: 0.04rem;
  }
  /*标题与内容*/
  .hw_con_text{
    padding-left: 0.14rem;
    display: flex;
    flex-direction: column;
  }
  .hw_con_text h3{
    color: #525252;
    font-size: 0.15rem;
    line-height: 0.24rem;
    font-weight: normal;
    width: 2.3rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
  }
  .hw_con_text span{
    color: #999999;
    line-height: 0.16rem;
    font-size: 0.11rem;
  }
  .hw_con_text p{
    padding-top: 0.05rem;
    color: #9C9C9C;
    font-size: 0.13rem;
    line-height: 0.16rem;
    height: 0.32rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .hw_download{
    width: 0.19rem;
    height: 0.17rem;
    position: absolute;
    bottom: 0.1rem;
    right: 0.15rem;
  }
</style>
