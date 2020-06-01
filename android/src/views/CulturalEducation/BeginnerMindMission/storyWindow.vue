<template>
  <div class="tp">
    <div class="hw_box">
      <!-- 头部 -->
      <header>
        <h3>故事之窗</h3>
        <div class="hw_return" @click='prev'>
          <img src="../../../../static/img/ico_return.png" alt="">
        </div>
      </header>
      <!--内容-->
      <div class="hw_content">
        <!--顶部图片-->
        <div class="hw_top_pic">
          <img src="@/assets/img/banner_7.png" alt="">
        </div>
        <div class="hw_bottom_box">
          <div class="hw_bottom" v-for="(item,index) in items" :key='index' @click="storyWindowDetailsSubmit()">
            <div class="hw_bottom_title">
              <img src="@/assets/img/ico_PartyFlag.png" alt="">
              <h3>{{item.title}}</h3>
            </div>
            <div class="hw_botton_con">
              <p>{{item.description}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import { MessageBox } from 'mint-ui';
    export default {
      name: "story-window",
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
        storyWindowDetailsSubmit(val){
          this.$router.push({
            path: '/storyWindowDetails',//故事之窗详情
            query: {
              id: val,
              menuId: '10010001'
            }
          })
        },

        //内容接口
        getprev(){
          var _this = this;
          this.$axios({
            method:'post',
            url:'syx/buwangchuxinlaojishiming/search',
            data:{
              "menuId":"10010001",
            },
          }).then( (res) =>{
            console.log(res.data.code)
            if(res){
              if(res.data.code === 20000){
                //成功请求
                _this.items = res.data.data;
              } else {
                //请求失败
                MessageBox('提示', res.data.message);
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
  /*内容*/
  .hw_content{
    width: 100%;
    padding-top: 0.47rem;
    z-index: 1;
    position: relative;
  }
  /*顶部图片*/
  .hw_top_pic{
    width: 100%;
    margin-bottom: 0.1rem;
    padding: 0 0.1rem;
    box-sizing: border-box;
    background: #fff;
  }
  .hw_top_pic img{
    width: 100%;
    padding: 0.1rem 0;
  }
  hw_bottom_box{
    width: 100%;
  }
  .hw_bottom{
    width: 100%;
    padding: 0 0.1rem;
    box-sizing: border-box;
    background: #fff;
    border-bottom: 0.02rem solid #f7fbfa;
  }
  .hw_bottom_title{
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: 1px dashed #f3f3f3;
  }
  .hw_bottom_title img{
    width: 0.18rem;
    height: 0.19rem;
  }
  .hw_bottom_title h3{
    color: #484848;
    font-size: 0.16rem;
    line-height: 0.44rem;
    padding-left: 0.07rem;
    width: 3rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
  }
  .hw_botton_con{
    width: 100%;
    padding-top: 0.06rem;
    padding-bottom: 0.11rem;
  }
  .hw_botton_con p{
    color: #666666;
    font-size: 0.13rem;
    line-height: 0.23rem;
    text-indent: 0.27rem;
    max-height: 0.46rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

</style>
