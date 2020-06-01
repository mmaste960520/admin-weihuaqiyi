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
        <div class="hw_top">
          <div class="hw_fengmian">
            <img :src="imgPath" alt="">
          </div>
          <h3>{{title}}</h3>
        </div>
        <div class="hw_con_menu">
          <div>
            <p class="hw_xiangqing">详情</p>
          </div>
          <div>
            <p @click="yueduSubmit()">阅读</p>
          </div>
        </div>
        <div class="hw_con">
          <!--内容简介-->
          <div class="hw_neirong">
            <h3 class="hw_neirongjianjie">内容简介:</h3>
            <div class="hw_contnet_box">
              <p class="hw_con_box">{{description}}</p>
            </div>
          </div>
          <!--图书版权-->
          <div class="hw_neirong">
            <h3 class="hw_neirongjianjie">图书版权:</h3>
            <div class="hw_contnet_box">
              <div class="hw_aa"><span>作者</span><i>{{author}}</i></div>
              <div class="hw_aa"><span>出版时间</span><i>{{createTime}}</i></div>
              <div class="hw_aa"><span>出版社</span><i>毛泽东</i></div>
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
      name: "classic-details",
      data(){
        return{
          title: '',//标题
          description: '',//内容
          createTime: '',//日期
          author: '',//名称
          imgPath: '',//封面
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
        yueduSubmit(){
          this.$router.push({
          path: '/ClassicYueDu',
          query: {
            id: this.id,
            menuId: this.menuId,
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
              "menuId": _this.menuId,
              "id": _this.id,
            },
          }).then((res) => {
            console.log(res.data.code)
            if (res) {
              if (res.data.code === 20000) {
                //成功请求
                _this.items = res.data.data;
                _this.title = _this.items[0].title;
                _this.description = _this.items[0].description;
                _this.author = _this.items[0].author;
                _this.createTime = _this.items[0].createTime;
                _this.imgPath = _this.items[0].imgPath;
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
  .hw_top{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .hw_fengmian{
    height: 1.15rem;
    padding-top: 0.22rem;
  }
  .hw_fengmian img{
    height: 1.15rem;
  }
  .hw_top h3{
    color: #333333;
    font-size: 0.16rem;
    line-height: 0.65rem;
  }
  .hw_con_menu{
    width: 100%;
    height: 0.44rem;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    display: flex;
    justify-content: space-between;
  }
  .hw_con_menu div{
    width: 50%;
    text-align: center;
    display: flex;
    justify-content: center;
  }
  .hw_con_menu p{
    color: #a7a6a6;
    font-size: 0.16rem;
    line-height: 0.44rem;
  }
  .hw_con_menu .hw_xiangqing{
    border-bottom: 0.02rem solid #e09241;
    color: #333333;
  }
  .hw_con{
    width: 100%;
    padding: 0 0.1rem;
    box-sizing: border-box;
  }
  .hw_neirong{
    width: 100%;
  }
  .hw_neirongjianjie{
    color: #333333;
    font-size: 0.15rem;
    line-height: 0.15rem;
    padding-left: 0.09rem;
    margin: 0.2rem 0;
    border-left: 0.02rem solid #e09241;
  }
  .hw_contnet_box{
    width: 100%;
  }
  .hw_con_box{
    color: #666666;
    font-size: 0.13rem;
    line-height: 0.24rem;
  }
  .hw_contnet_box .hw_aa{
    width: 100%;
    display: flex;
  }
  .hw_aa span{
    color: #666666;
    font-size: 0.13rem;
    line-height: 0.3rem;
    display: block;
    min-width: 0.55rem;
    padding-right: 0.24rem;
    padding-left: 0.1rem;
  }
  .hw_aa i{
    font-style: normal;
    font-size: 0.13rem;
    color: #333333;
    line-height: 0.3rem;
  }
</style>
