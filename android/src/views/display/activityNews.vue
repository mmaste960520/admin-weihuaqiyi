<template>
<div class="tp">
  <div class="hw_box">
    <!-- 头部 -->
    <header>
      <h3>活动新闻</h3>
      <div class="hw_return" @click='prev'>
        <img src="../../../static/img/ico_return.png" alt="">
      </div>
    </header>
    <!--内容-->
    <div class="hw_content">
      <div class="hw_con" v-for="(item,index) in items" :key='index' @click="activityNewsDetailsSubmit(item.id)">
        <div class="hw_con_pic">
          <img :src="item.imgPath" alt="" />
        </div>
        <div class="hw_con_right">
          <h4>{{item.title}}</h4>
          <p>{{item.description}}</p>
          <span>{{item.createTime}}</span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import { MessageBox, Indicator } from 'mint-ui';
    export default {
      name: "activity-news",
      data(){
        return{
          items:[
            {
              title:'',//标题
              description:'',//内容
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
        //进入详情
        activityNewsDetailsSubmit(val){
          console.log(val)
          this.$router.push({
            path: '/activityNewsDetails',//新闻-详情
            query: {
              id: val,
              menuId: '10002001',
              Name: '活动新闻'
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
              "menuId":"10002001",
            },
          }).then( (res) =>{
            console.log(res.data.code)
            if(res){
              if(res.data.code === 20000){
                //成功请求
                _this.items = res.data.data;
                _this.title = res.data.data[0].title; //标题
                _this.description = res.data.data[0].description; //内容
                _this.createTime = res.data.data[0].createTime; //时间
                _this.imgPath = res.data.data[0].imgPath; //封面图片
                Indicator.close();
                if(localStorage.moduleType !== '11'){
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
              "moduleType":"11",
              "deviceType": localStorage.jixing,
              "userId": localStorage.id
            },
          }).then((res) => {
            if (res) {
              if (res.data.code === 20000) {
                //成功请求
                let moduleType = '11';
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
    padding: 0 0.09rem;
    box-sizing: border-box;
    padding-top: 0.47rem;
  }
  .hw_con{
    width: 100%;
    display: flex;
    position: relative;
    padding: 0.13rem 0;
    border-bottom: 1px solid #dcdcdc;
  }
  .hw_con_pic{
    width: 1.07rem;
    padding-right: 0.1rem;
  }
  .hw_con_pic img{
    width: 1.07rem;
    height: 0.93rem;
  }
  .hw_con_right h4{
    display: block;
    font-weight: normal;
    color: #323232;
    font-size: 0.15rem;
    width: 2.36rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .hw_con_right p{
    font-size: 0.12rem;
    color: #5d5d5d;
    line-height: 0.18rem;
    height: 0.54rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
  .hw_con_right span{
    color: #929292;
    font-size: 0.11rem;
    position: absolute;
    bottom: 0.13rem;
    right: 0;
  }

</style>
