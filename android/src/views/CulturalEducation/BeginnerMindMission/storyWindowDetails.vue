<template>
  <div class="tp">
    <div class="hw_box">
      <!-- 头部 -->
      <header>
        <h3>故事之窗-详情</h3>
        <div class="hw_return" @click='prev'>
          <img src="../../../../static/img/ico_return.png" alt="">
        </div>
      </header>
      <!--内容-->
      <div class="hw_content">
        <div class="hw_con">
          <div class="hw_con_top">
            <div class="hw_con_title">
              <img src="@/assets/img/ico_PartyFlag.png" alt="">
              <h3>{{title}}</h3>
            </div>
            <span>{{createTime}}</span>
          </div>
          <div class="hw_con_bottom">
            <div id="tp_content">
              <!--{{content}}-->
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
      name: "story-window-details",
      data(){
        return{
          createTime: '',//时间
          content: '',//内容
          title: '',//标题
        }
      },

      mounted(){
        this.id = this.$route.query.id;
        this.menuId = this.$route.query.menuId;
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
            url: 'syx/buwangchuxinlaojishiming/search',
            data: {
              "id": this.$route.query.id,
              "userId": this.menuId,
            },
          }).then((res) => {
            if (res) {
              if (res.data.code === 20000) {
                //成功请求
                _this.items = res.data.data;
                _this.createTime = _this.items[0].createTime;//时间
                _this.content = _this.items[0].content;//内容
                document.querySelector("#tp_content").innerHTML = _this.content;
                _this.title = _this.items[0].title;//标题
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
    background: #fff;
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
    padding-top: 0.47rem;
    z-index: 1;
    position: relative;
  }
  .hw_con{
    width: 100%;
  }
  .hw_con_top{
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .hw_con_title{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .hw_con_title h3{
    color: #333;
    font-size: 0.15rem;
    line-height: 0.31rem;
    text-align: center;
    padding-top: 0.13rem;
    padding-left: 0.06rem;
  }
  .hw_con_title img{
    width: 0.18rem;
    height: 0.2rem;
    padding-top: 0.13rem;
  }
  .hw_con_top span{
    color: #666;
    font-size: 0.15rem;
    line-height: 0.31rem;
    text-align: center;
    padding-bottom: 0.11rem;
    border-bottom: 1px dashed #f3f3f3;
  }
  .hw_con_bottom{
    width: 100%;
    padding-top: 0.2rem;
  }
  #tp_content{
    color: #333333;
    font-size: 0.13rem;
    line-height: 0.24rem;
  }
</style>
