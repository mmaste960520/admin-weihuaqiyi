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
        <div>
          <pdf :src="downloadPath" :page="i" id="src"></pdf>
        </div>
        <div class="hw_btn">
          <button @click="btnone()">上一页</button>
          <button @click="btntwo()">下一页</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import pdf from 'vue-pdf';
  import { MessageBox } from 'mint-ui';
    export default {
      name: "classic-yue-du",
      data(){
        return{
          downloadPath:'',
          numPages:'',
          i: 1
        }
      },
      components: {
        pdf
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
            changeOrigin:true,
            method: 'post',
            url: 'syx/dangxingjiaoyu/search',
            data: {
              "menuId": _this.menuId,
              "id": _this.id,
            },
        }).then((res) => {
            if (res) {
              if (res.data.code === 20000) {
                //成功请求
                _this.items = res.data.data;
                _this.downloadPath = _this.items[0].downloadPath;
              } else {
                //请求失败
                MessageBox('提示', res.data.message);
              }
            }
          })
        },
        btnone(){
          if(this.i <= 1){
            MessageBox('提示', '已是第一页');
          } else {
            this.i--
          }
        },
        btntwo(){
          this.i++
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
  .hw_btn{
    width: 100%;
    height: 0.5rem;
    display: flex;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    left: 0;
  }
  .hw_btn button{
    width: 50%;
    height: 0.5rem;
    font-size: 0.15rem;
    border: none;
    border-right: 0.12rem;
    background: #e8ac1a;
    font-weight: normal;
    color: #fff;
  }

</style>
