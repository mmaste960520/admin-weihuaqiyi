<template>
  <div class="tp">
    <div class="hw_box">
      <!-- 头部 -->
      <header>
        <h3>知识问答</h3>
        <div class="hw_return" @click='prev'>
          <img src="../../../static/img/ico_return.png" alt="">
        </div>
      </header>
      <div class="hw_content_pic">
        <img src="@/assets/img/KnowledgeQuiz_pic.png" alt="">
      </div>
      <!--内容-->
      <div class="hw_content">
        <div class="hw_con">
          <mt-radio :title="title" v-model="value" :options="option" @change="check"></mt-radio>
          <!-- <button class="hw_btn_queding">确定</button> -->
        </div>
      </div>
      <!--遮罩层-->
      <div id="hw_zhezhao" @click='zhezhaoSubmit()'></div>
      <!--结束答题-->
      <div id="hw_jieshudati">
        <p class="hw_hongqi"><i>{{rightNum}}</i>&nbsp;&nbsp;支</p>
        <p class="hw_zhengquelv">答题正确率{{baifenlv}}%</p>
        <div class="hw_btn">
          <button class="hw_jixu" @click="jixuSubmit()">继续答题</button>
          <button class="hw_tuichu" @click="tuichuSubmit()">退出答题</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { MessageBox } from 'mint-ui';
    export default {
      name: "knowledge-quiz",
      data () {
        return {
          value: "",
          // radio的选项
          options : [],
          items: [],
          option: [],
          param: [],
          title: '',
          i: 0,
          dataLength: '',//题库数量长度
          rightNum:'',//所得小红旗个数
          baifenlv:'',//正确百分率
        }
      },
      mounted(){
        var hw_zhezhao = document.querySelector("#hw_zhezhao");
        var hw_jieshudati = document.querySelector("#hw_jieshudati");
        this.id = this.$route.query.id;
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
            url: 'syx/test/random/',
            data: {
              "libraryid":  _this.id,
              "userid": localStorage.id
            },
          }).then((res) => {
            if (res) {
              if (res.data.code === 20000) {
                //成功请求
                _this.dataLength = res.data.data.length;
                _this.items = res.data.data[_this.i];
                _this.title = _this.items.title;
                _this.ti = _this.items.options;
                _this.option = _this.ti.split("&&");
              } else {
                //请求失败
                MessageBox('提示', '暂无题库');
                this.$router.go(-1)
              }
            }
          })
        },
        //每次选择一个答案进入下道题
        check: function(){
          var _this = this
          setTimeout(function(){
            _this.i++
            if(_this.value === _this.option[0]){
              _this.value = 'A'
            } else if(_this.value === _this.option[1]){
              _this.value = 'B'
            } else if(_this.value === _this.option[2]){
              _this.value = 'C'
            } else if(_this.value === _this.option[3]){
              _this.value = 'D'
            }
            _this.param.push({"testid":String(_this.items.id),"answer":_this.value});

            if(_this.dataLength <= _this.i){
              //本次题库已答完
              _this.tijiao()
              hw_zhezhao.style.display = 'block';
              hw_jieshudati.style.display = 'block';
            } else {
                _this.getprev()
            }
          },1);
        },
        //提交答题
        tijiao() {
          var _this = this;
          this.$axios({
            method: 'post',
            url: 'syx/test/subTest',
            data: {
              "userid": localStorage.id,
              "libraryid": _this.id,
              'answers': JSON.stringify(_this.param)
            },
          }).then((res) => {
            if (res) {
              if (res.data.code === 20000) {
                //成功请求
                _this.rightNum = res.data.data.rightNum;//小红旗个数
                _this.baifenlv = _this.rightNum/_this.dataLength;//正确百分率
              } else {
                //请求失败
                MessageBox('提示', res.data.message);
              }
            }
          })
        },
        // 继续答题
        jixuSubmit(){
          hw_zhezhao.style.display = 'none';
          hw_jieshudati.style.display = 'none';
          this.$router.push('/ChoiceQuestion')
        },
        // 退出答题
        tuichuSubmit(){
          hw_zhezhao.style.display = 'none';
          hw_jieshudati.style.display = 'none';
          this.$router.push('/exhibition')
        },

      }
    }
</script>

<style scoped>
  body{
    width: 100%;
  }
  .hw_bg{
    background: url(../../assets/img/bg_visit_message.png);
    position: fixed;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: 50% 50%;
    z-index: 0;
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
  .hw_content_pic{
    width: 100%;
    padding-top: 0.47rem;
  }
  .hw_content_pic img{
    width: 100%;
  }
  /*内容*/
  .hw_content{
    width: 100%;
    padding: 0 0.1rem;
    box-sizing: border-box;
    z-index: 1;
    position: relative;
  }
  .hw_con{
    width: 100%;
  }

  /*确定按钮*/
  .hw_btn_queding{
    display: block;
    width: 3.35rem;
    height: 0.44rem;
    background: #d29e62;
    color: #fff;
    font-size: 0.16rem;
    line-height: 0.44rem;
    text-align: center;
    margin: 0.75rem auto 0.3rem;
    border-radius: 0.22rem;
    border: none;
    box-shadow: 0 0 0.02rem rgba(210,258,98,.2);
  }
  /*修改mint-ui默认样式*/
  .mint-radiolist .mint-radiolist-title{
    color: #000;
  }
  .mint-radio-label{
    font-size: 0.13rem;
  }
  .mint-cell-wrapper{
    background-image: none;
  }
  /*遮罩层*/
  #hw_zhezhao{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.4);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 500;
    display: none;
  }
  #hw_jieshudati{
    width: 100%;
    height: 2.85rem;
    background: url("../../assets/img/deifen.png");
    background-size: 100% 100%;
    position: fixed;
    left: 50%;
    top: 50%;
    /*负值+宽的一半+单位*/
    margin-left: -50%;
    /*负值+高的一半+单位*/
    margin-top: -1.42rem;
    z-index: 501;
    display: none;
  }
  .hw_hongqi{
    text-align: center;
    font-size: 0.14rem;
    color: #fff;
    position: absolute;
    top: 0.8rem;
    left: 0;
    right: 0;
    margin: auto;
    line-height: 0.45rem;
    display: flex;
    justify-content: center;
  }
  .hw_hongqi i{
    font-weight: bold;
    font-size: 0.45rem;
  }
  .hw_zhengquelv{
    color: #e10314;
    font-size: 0.13rem;
    position: absolute;
    top: 1.52rem;
    left: 1.69rem;
    transform: rotate(-12deg);
  }
  .hw_btn{
    width: 2.47rem;
    margin: 0 auto;
    margin-top: 2.21rem;
    display: flex;
  }
  .hw_btn button{
    width: 1.11rem;
    height: 0.36rem;
    margin: 0 0.06rem;
    font-size: 0.13rem;
    line-height: 0.36rem;
    border: none;
    border-radius: 0.18rem;
  }
  .hw_btn .hw_jixu{
    background: #fff641;
    color: #b56408;
    box-shadow: 0px 4px 0px #fb9d1c;
  }
  .hw_btn .hw_tuichu{
    background: #dfdfdf;
    color: #fff;
    box-shadow: 0px 4px 0px #c2b9a8;
  }
</style>
