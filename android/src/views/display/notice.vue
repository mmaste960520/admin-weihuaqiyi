<template>
  <div class="tp">
    <div class="hw_box">
      <!-- 头部 -->
      <header>
        <h3>通知公告</h3>
        <div class="hw_return" @click='prev'>
          <img src="../../../static/img/ico_return.png" alt="">
        </div>
      </header>
      <!--内容-->
      <div class="hw_content">
        <div class="hw_con" v-for="(item,index) in items" :key='index' @click="noticeDetailsSubmit(item.id)">
          <div class="hw_con_title">
            <img src="@/assets/img/ico_news.png" alt="">
            <p>{{item.title}}</p>
          </div>
          <span>{{item.createTime}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { MessageBox, Indicator } from 'mint-ui';
    export default {
      name: "notice",
      data(){
        return{
          items:[
            {
              title:'',//标题
              createTime:'',//时间
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
        //进入详情
        noticeDetailsSubmit(val){
          this.$router.push({
            path: '/activityNewsDetails',//公告-详情
            query: {
              id: val,
              menuId: '10002002',
              Name: '通知公告'
            }
          })
        },
        //内容接口
        getprev(){
          var _this = this;
          this.$axios({
            method:'post',
            url:'syx/jingquxinwen/search',
            data:{
              "menuId":"10002002",
            },
          }).then( (res) =>{
            if(res){
              if(res.data.code === 20000){
                //成功请求
                _this.items = res.data.data;
                _this.title = res.data.data[0].title; //标题
                _this.content = res.data.data[0].content; //内容
                _this.createTime = res.data.data[0].createTime; //时间
                _this.imgPath = res.data.data[0].imgPath; //封面图片
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
    z-index: 1;
    position: relative;
  }
  .hw_con{
    width: 100%;
    height: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px dashed #f6ede3;
    padding: 0 0.07rem;
    box-sizing: border-box;
  }
  .hw_con_title{
    display: flex;
    align-items: center;
  }
  .hw_con_title img{
    width: 0.15rem;
    height: 0.15rem;
    padding-right: 0.12rem;
  }
  .hw_con_title p{
    font-size: 0.14rem;
    color: #62574c;
    width: 2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
  }
  .hw_con span{
    color: #867563;
    font-size: 0.11rem;
  }

</style>
