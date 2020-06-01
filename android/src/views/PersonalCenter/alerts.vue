<template>
    <div class="tp">
      <div class="hw_box">
        <!-- 头部 -->
        <header>
          <h3>消息通知</h3>
          <div class="hw_return" @click='prev'>
            <img src="../../../static/img/ico_return.png" alt="">
          </div>
        </header>
        <!--内容-->
        <div class="hw_content">
          <div class="hw_con">
            <div class="hw_menu_box"  v-for="(item,index) in items" @click="DetailsSubmit(item.content,item.id)" :key='index'>
              <div class="hw_menu_left">
                <div class="hw_icobg">
                  <img src="@/assets/img/ico_alerts.png" alt="" />
                </div>
                <span>通知:{{item.description}}</span>
              </div>
              <div class="hw_menu_right">
                <img src="../../../static/img/ico_the.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import { MessageBox, Indicator } from 'mint-ui';
  export default {
    name: "alerts",
    data(){
      return{
        items:[],
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
        this.$router.go(-1) //返回上一页
      },
      //进入详情
      DetailsSubmit(val,Val){
        this.$router.push({
          path: '/alertDetails',//公告-详情
          query: {
            content: val,
            id: Val,
          }
        })
      },
      //内容接口
      getprev() {
        var _this = this;
        this.$axios({
          method: 'post',
          url: 'syx/user/personalcenter/' + localStorage.id,
          data: {},
          headers:{}
        }).then((res) => {
          if (res) {
            if (res.data.code === 20000) {
              //成功请求
              _this.items = res.data.data.xiaoxi;
              Indicator.close();
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
    background: #f8f8f8;
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
  /*中间内容*/
  .hw_content{
    width: 100%;
    margin-bottom: 0.5rem;
    padding-top: 0.47rem;
  }
  .hw_con{
    width: 100%;
  }
  .hw_menu_box{
    width: 100%;
    padding: 0 0.17rem;
    box-sizing: border-box;
    background: #fff;
    display: flex;
    justify-content: space-between;
    line-height: 0.55rem;
    border-top: 1px solid #f8f8f8;
  }
  .hw_menu_left{
    display: flex;
    align-items: center;
  }
  .hw_menu_left span{
    font-size: 0.16rem;
    color: #000;
    padding-left: 0.14rem;
    width: 2.7rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
  }
  .hw_icobg{
    width: 0.22rem;
    height: 0.22rem;
    border-radius: 50%;
    /*background: #e1b465;*/
    /*background: linear-gradient(-135deg, #dfae5e, #f4dea0);*/
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .hw_icobg img{
    width: 0.16rem;
    max-height: 0.18rem;
  }
  .hw_menu_right{
    display: flex;
    align-items: center;
  }
  .hw_menu_right span{
    color: #424241;
    font-size: 0.14rem;
  }
  .hw_menu_right img{
    width: 0.08rem;
    height: 0.14rem;
    margin-left: 0.11rem;
    margin-right: 0.08rem;
  }

</style>
