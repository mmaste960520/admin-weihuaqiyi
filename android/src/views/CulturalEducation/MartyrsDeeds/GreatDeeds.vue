<template>
  <div class="tp">
    <div class="hw_box">
      <!-- 头部 -->
      <header>
        <h3>重大事迹</h3>
        <div class="hw_return" @click='prev'>
          <img src="../../../../static/img/ico_return.png" alt="">
        </div>
      </header>
      <!--内容-->
      <div class="hw_content">
        <div class="hw_con">
          <div class="hw_left"></div>
          <div class="hw_right">
            <div class="hw_yeaar">
              <p>{{time}}年</p>
            </div>
            <div class="hw_shijian" v-for="(item,index) in items">
              <span id="hw_yuefen">{{item.time}}</span>
              <div class="hw_dian"></div>
              <div class="hw_sanjiao"></div>
              <p>{{item.description}}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
    export default {
      name: "great-deeds",
      data(){
        return{
          time:'',
          items:[],
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
        getprev(){
          var _this = this;
          this.$axios({
            method:'post',
            url:'syx/xianlieshijiZhongdashijian/search',
            data:{
              "id": _this.id,
              "menuId":"10005002",
            },
          }).then( (res) =>{
            if(res){
              if(res.data.code === 20000){
                //成功请求
                _this.items = res.data.data;
                _this.year = res.data.data[0].time;
                _this.time = _this.year.substring(0, 4);
                if(localStorage.moduleType !== '14'){
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
              "moduleType":"14",
              "deviceType": localStorage.jixing,
              "userId": localStorage.id
            },
          }).then((res) => {
            if (res) {
              if (res.data.code === 20000) {
                //成功请求
                let moduleType = '14';
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
    height: 100%;
    padding: 0 0.11rem;
    box-sizing: border-box;
    padding-top: 0.67rem;
    z-index: 1;
    position: relative;
  }
  .hw_con{
    width: 100%;
    height: 100%;
  }
  .hw_left{
    margin-top: 0.1rem;
    width: 0.39rem;
    /*height: 100%;*/
    /*border-right: 1px solid #b88080;*/
    float: left;
    overflow: hidden;
  }
  .hw_right{
    /*height: 100%;*/
    float: left;
    padding-left: 0.17rem;
    border-left: 1px solid #b88080;
  }
  .hw_yeaar{
    width: 1.13rem;
    height: 0.31rem;
    background: url("../../../assets/img/ico_32.png");
    background-size: 100% 100%;
    position: relative;
  }
  .hw_yeaar p{
    color: #fff;
    font-size: 0.15rem;
    line-height: 0.31rem;
    text-align: center;
  }
  .hw_yeaar::after{
    content: "";
    display: block;
    width: 0.08rem;
    height: 0.08rem;
    background: #d08240;
    border: 0.05rem solid #f7fbfa;
    border-radius: 50%;
    position: absolute;
    left: -23%;
    top: 20%;
  }
  .hw_shijian{
    background: #fff;
    width: 2.93rem;
    padding: 0.14rem 0.11rem;
    box-sizing: border-box;
    position: relative;
    margin: 0.11rem 0;
  }
  .hw_shijian span{
    color: #903232;
    font-size: 0.11rem;
    position: absolute;
    top: 39%;
    left: -20%;
    display: block;
    width: 0.3rem;
    height: 0.13rem;
    overflow: hidden;
  }
  .hw_dian{
    width: 0.08rem;
    height: 0.08rem;
    background: #d08240;
    border: 0.05rem solid #f7fbfa;
    border-radius: 50%;
    position: absolute;
    left: -9%;
    top: 39%;
  }
  .hw_sanjiao{
    content: "";
    display: block;
    width: 0;
    height: 0;
    border: 0.1rem solid transparent;
    border-right: 0.1rem solid #fff;
    position: absolute;
    left: -0.2rem;
    top: 39%;
  }
  .hw_shijian p{
    color: #666666;
    font-size: 0.14rem;
    line-height: 0.22rem;
  }


</style>
