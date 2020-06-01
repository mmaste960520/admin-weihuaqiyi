<template>
  <div class="tp">
    <div class="hw_box hw_the_feats">
      <!-- 头部 -->
      <header>
        <h3>丰功伟绩</h3>
        <div class="hw_return" @click='prev'>
          <img src="../../../../static/img/ico_return.png" alt="">
        </div>
      </header>
      <!--内容-->
      <div class="hw_content hw_TheFeats">
        <mt-navbar class="page-part" v-model="selected">
          <mt-tab-item id="1">民主革命时期</mt-tab-item>
          <mt-tab-item id="2">社会主义建设时期</mt-tab-item>
        </mt-navbar>

        <!-- tabcontainer -->
        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="1">
            <!--内容-->
              <div class="hw_con">
                <div class="hw_left"></div>
                <div class="hw_right">
                  <div class="hw_shijian" v-for="(item,index) in items">
                    <div class="hw_dian"></div>
                    <div class="hw_sanjiao"></div>
                    <h3>{{item.title}}</h3>
                    <p>{{item.description}}</p>
                  </div>
                </div>
              </div>
          </mt-tab-container-item>

          <mt-tab-container-item id="2">
            <!--内容-->
            <div class="hw_con">
              <div class="hw_left"></div>
              <div class="hw_right">
                <div class="hw_shijian" v-for="(item,index) in items">
                  <div class="hw_dian"></div>
                  <div class="hw_sanjiao"></div>
                  <h3>{{item.title}}</h3>
                  <p>{{item.description}}</p>
                </div>
              </div>
            </div>
          </mt-tab-container-item>
        </mt-tab-container>

      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "the-feats",
      data() {
        return {
          selected: '1',
          items:[]
        }
      },

      mounted(){
        this.hahhhh();
      },
      computed:{
        data(val){
          return this.selected
        }
      },
      watch:{
        data(val){
          if(val === "1"){
            this.menuId="10006002"
            this.getprev1(this.menuId);
          } else if (val === "2"){
            this.menuId= "10006004";
            this.getprev1(this.menuId);
          }else if (val === "3"){
            this.menuId= "10006004";
            this.getprev1(this.menuId);
          }
        }
      },
      methods:{
        prev(){
          this.$router.go(-1)
        },
        hahhhh(){
          if(this.selected === "1"){
            this.menuId="10006002"
            this.getprev1(this.menuId);
              if(localStorage.moduleType !== '15'){
                this.mokuaifangwen();//模块接口
              }
          }
        },
        //内容接口-精品展示
        getprev1(menuId){
          var _this = this;
          this.$axios({
            method:'post',
            url:'syx/xilaojingshen/search',
            data:{
              "menuId":menuId,
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
        //模块访问
        mokuaifangwen(){
          this.$axios({
            method: 'post',
            url: 'syx/visitorModule',
            data: {
              "moduleType":"15",
              "deviceType": localStorage.jixing,
              "userId": localStorage.id
            },
          }).then((res) => {
            if (res) {
              if (res.data.code === 20000) {
                //成功请求
                let moduleType = '15';
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
  .tp{
    background: #f0edf1;
  }
  body{
    width: 100%;
  }
  .hw_box{
    width: 100%;
    background: #f0edf1;
    height: auto;
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
    padding: 0 0.12rem;
    box-sizing: border-box;
    padding-top: 0.47rem;
    z-index: 1;
    position: relative;
  }


  .hw_con{
    width: 100%;
    height: 100%;
  }
  .hw_left{
    margin-top: 0.1rem;
    width: 0.1rem;
    /*height: 100%;*/
    /*border-right: 1px solid #b88080;*/
    float: left;
    overflow: hidden;
  }
  .hw_right{
    /*height: 100%;*/
    float: left;
    padding-left: 0.23rem;
    border-left: 1px solid #b88080;
  }
  .hw_shijian{
    background: #fff;
    width: 3.1rem;
    padding: 0.14rem 0.11rem;
    box-sizing: border-box;
    position: relative;
    margin: 0.11rem 0;
  }
  .hw_dian{
    width: 0.08rem;
    height: 0.08rem;
    background: #d08240;
    border: 0.05rem solid #f7fbfa;
    border-radius: 50%;
    position: absolute;
    left: -11%;
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
  .hw_shijian h3{
    color: #733200;
    font-size: 0.18rem;
    line-height: 0.4rem;
  }
  .hw_shijian p{
    color: #666666;
    font-size: 0.14rem;
    line-height: 0.22rem;
  }
</style>
