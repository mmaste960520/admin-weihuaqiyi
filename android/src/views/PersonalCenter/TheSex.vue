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
        <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
      </div>
    </div>
  </div>
</template>

<script>
  import { MessageBox } from 'mint-ui';
    export default {
      name: "the-sex",
      data () {
        return {
          sex:'',
          slots:[
            {
              values: ['男', '女']
            }
          ]
        }
      },

      methods: {
        onValuesChange(values) {
          console.log(values.values[0])
          if(values.values[0] === '男'){
            this.sex = 2;
          } else if(values.values[0] === '女'){
            this.sex = 1;
          }
        },
        wanchengClick() {
          this.$axios({
            method: 'put',
            url: 'syx/user/updatepersoninfo/' + localStorage.id,
            data: {
              'sex': this.sex,
            },
            headers:{
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
        },
      },
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
    padding-top: 0.47rem;
  }
</style>
