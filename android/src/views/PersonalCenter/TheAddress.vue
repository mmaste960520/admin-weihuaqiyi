<template>
  <div class="tp">
    <div class="hw_box">
      <!-- 头部 -->
      <header>
        <h3>修改</h3>
        <p class="hw_wancheng" @click='wanchengClick()'>完成</p>
      </header>
      <!--内容-->
      <div class="hw_content">
        <input type="text" placeholder="输入地区：陕西省渭南市" v-model="address">
      </div>
    </div>
  </div>
</template>

<script>
    import { MessageBox } from 'mint-ui';
    export default {
      name: "the-address",
      data(){
        return{
          address: this.address,
        }
      },

      mounted(){
        this.address = this.$route.query.address;
      },

      methods: {
        wanchengClick() {
          if(this.address.length <= 0){
            MessageBox('提示', '请输入正确信息');
          } else {
            this.$axios({
              method: 'put',
              url: 'syx/user/updatepersoninfo/' + localStorage.id,
              data: {
                'address': this.address,
              },
              headers: {
                'token': localStorage.token,
              }
            }).then((res) => {
              console.log(res.data.code)
              if (res) {
                if (res.data.code === 20000) {
                  //成功请求
                  this.$router.go(-1) //返回上一页
                } else {
                  //请求失败
                  this.$router.go(-1) //返回上一页
                  MessageBox('提示', res.data.message);
                }
              }
            })
          }
        },

      }
    }
</script>

<style scoped>
  .tp{
    background: #fff;
  }
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
  .hw_wancheng{
    height: 100%;
    width: 0.47rem;
    display: flex;
    align-items: center;
    position: relative;
    z-index: 20;
    color: #fff;
    font-size: 0.17rem;
    line-height: 0.47rem;
    text-align: center;
    float: right;
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

  /*内容*/
  .hw_content{
    width: 100%;
    padding: 0 0.11rem;
    box-sizing: border-box;
    padding-top: 0.57rem;
  }
  input{
    width: 100%;
    height: 0.4rem;
    border: 1px solid #ccc;
    text-indent: 0.1rem;
    font-size: 0.16rem;
    color: #000;
    line-height: 0.4rem;
    display: block;
  }
</style>
