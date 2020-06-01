<template>
  <div class="tp">
    <div class="hw_box">
      <!-- 头部 -->
      <header>
        <h3>{{Name}}</h3>
        <div class="hw_return" @click='prev'>
          <img src="../../../../static/img/ico_return.png" alt="">
        </div>
      </header>
      <!--内容-->
      <div class="hw_content">
        <div class="hw_con_top">
          <div class="hw_top_title">
            <img src="@/assets/img/ico_party.png" alt="">
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
</template>

<script>
  import { MessageBox } from 'mint-ui';
    export default {
      name: "party-constitution-details",
      data(){
        return{
          title: '',//标题
          content: '',//内容
          createTime: '',//日期
          personName: '',//姓名
          Name:''
        }
      },
      mounted(){
        this.id = this.$route.query.id;
        this.menuId = this.$route.query.menuId;
        this.Name = this.$route.query.Name;
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
            url: 'syx/dangxingjiaoyu/search',
            data: {
              "id": this.$route.query.id,
              "userId": this.menuId,
            },
          }).then((res) => {
            console.log(res.data.code)
            if (res) {
              if (res.data.code === 20000) {
                //成功请求
                _this.items = res.data.data;
                _this.title = _this.items[0].title;//标题
                _this.content = _this.items[0].content;//内容
                document.querySelector("#tp_content").innerHTML = _this.content;
                _this.createTime = _this.items[0].createTime;//时间
                _this.personName = _this.items[0].personName;//姓名
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
  .tp{
    background: #fff;
  }
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
    padding: 0 0.1rem;
    box-sizing: border-box;
    padding-top: 0.47rem;
    z-index: 1;
    position: relative;
  }
  .hw_con_top{
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0.1rem 0.07rem;
    box-sizing: border-box;
    border-bottom: 1px dashed #f3f3f3;
    margin-bottom: 0.15rem;
  }
  .hw_top_title{
    width: 100%;
    display: flex;
    align-items: center;
  }
  .hw_top_title img{
    width: 0.2rem;
    height: 0.2rem;
  }
  .hw_top_title h3{
    color: #993333;
    font-size: 0.18rem;
    line-height: 0.31rem;
    padding-left: 0.1rem;
  }
  .hw_con_top span{
    color: #666666;
    font-size: 0.12rem;
    line-height: 0.22rem;
  }
  .hw_con_bottom{
    width: 100%;
  }
  #tp_content{
    color: #494949;
    line-height: 0.24rem;
    font-size: 0.13rem;
    padding: 0 0.07rem 0.23rem;
    box-sizing: border-box;
  }
</style>
