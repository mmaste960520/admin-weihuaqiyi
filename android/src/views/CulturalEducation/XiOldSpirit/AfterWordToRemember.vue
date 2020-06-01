<template>
  <div class="tp">
    <div class="hw_box">
      <!-- 头部 -->
      <header>
        <h3>追词缅怀</h3>
        <div class="hw_return" @click='prev'>
          <img src="../../../../static/img/ico_return.png" alt="">
        </div>
      </header>
      <!--内容-->
      <div class="hw_content">
        <div class="hw_con" v-for="(item,index) in items" @click="AfterWordToRememberDetailsSubmit(item.id)">
          <div class="hw_con_title">
            <img src="@/assets/img/ico_PartyFlag.png" alt="">
            <p>{{item.title}}</p>
          </div>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
  import { MessageBox } from 'mint-ui';
    export default {
      name: "after-word-to-remember",
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
        AfterWordToRememberDetailsSubmit(val){
          console.log(val)
          this.$router.push({
            path: '/AfterWordToRememberDetails',//历史资料详情
            query: {
              id: val,
              menuId: '10006007'
            }
          })
        },
        //内容接口
        getprev() {
          var _this = this;
          this.$axios({
            method: 'post',
            url: 'syx/xilaojingshen/search',
            data: {
              "menuId": "10006007",
            },
          }).then((res) => {
            console.log(res.data.code)
            if (res) {
              if (res.data.code === 20000) {
                //成功请求
                console.log(res.data.message);
                console.log(res.data.data);
                _this.items = res.data.data;
                if(localStorage.moduleType !== '15'){
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
    height: 0.49rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f6ede3;
    padding: 0 0.07rem;
    box-sizing: border-box;
  }
  .hw_con_title{
    display: flex;
    align-items: center;
  }
  .hw_con_title img{
    width: 0.18rem;
    /*height: 0.15rem;*/
    padding-right: 0.11rem;
  }
  .hw_con_title p{
    font-size: 0.15rem;
    color: #62574c;
    width: 2.9rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
  }
</style>
