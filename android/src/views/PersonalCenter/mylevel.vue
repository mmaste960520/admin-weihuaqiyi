<template>
    <div class="tp">
      <div class="hw_box">
        <div class="hw_top">
          <!-- 头部 -->
          <header>
            <h3>个人中心</h3>
            <div class="hw_return" @click='prev'>
              <img src="../../../static/img/ico_return.png" alt="">
            </div>
          </header>
          <!--内容-->
          <div class="hw_personal">
            <div class="hw_personal_con">
              <!--头像-->
              <img class="hw_photo" :src="touxiang" alt="" />
              <div class="hw_honor">
                <div class="hw_honor_box">
                  <div class="hw_honor_top">
                    <img src="@/assets/img/ico_flag.png" alt="" />
                    <h3>{{todayRedFlag}}</h3>
                  </div>
                  <p>今日获得红旗</p>
                </div>
                <img class="hw_shuxian" src="@/assets/img/ico_shuxian.png" alt="" />
                <div class="hw_honor_box">
                  <div class="hw_honor_top">
                    <img src="@/assets/img/ico_flag.png" alt="" />
                    <h3>{{totalRedFlag}}</h3>
                  </div>
                  <p>累计获得红旗</p>
                </div>
                <img class="hw_shuxian" src="@/assets/img/ico_shuxian.png" alt="" />
                <div class="hw_honor_box">
                  <div class="hw_honor_top">
                    <!--<img src="@/assets/img/ico_flag.png" alt="" />-->
                    <h3>{{level}}星级</h3>
                  </div>
                  <p>等级</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--等级规则-->
        <div class="hw_rules">
          <div class="hw_rules_con">
            <div class="hw_rules_top">
              <div class="hw_rules_title">
                <img src="@/assets/img/ico_abstract.png" alt="" />
                <h3>等级规则</h3>
              </div>
            </div>
            <div class="hw_rules_text">
              <p>系统会根据您平时的学习、答题情况，以累计获得的“小红旗”数量为标准，将您的等级分为一星、二星、三星、四星、五星等不同星级。</p>
              <p>累计获得10面小红旗，新用户成长为一星用户；</p>
              <p>累计获得50面小红旗，晋升为二星用户；</p>
              <p>累计获得100面小红旗，晋升为三星用户；</p>
              <p>累计获得300面小红旗，晋升为四星用户；</p>
              <p>累计获得500面小红旗，晋升为五星用户。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import { MessageBox } from 'mint-ui';
    export default {
      name: "mylevel",
      data(){
        return{
          todayRedFlag:'',//今日获得小红旗
          totalRedFlag:'',//总共获得小红旗
          level:'',//等级
          dayqi:'',
          zongqi:'',
          dengji:'',
          items:[],
          touxiang: localStorage.imgPath,
        }
      },
      mounted(){
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
            url: 'syx/user/userleveldetail/' + localStorage.id,
            data: {},
          }).then((res) => {
            console.log(res.data.code)
            if (res) {
              if (res.data.code === 20000) {
                //成功请求
                _this.items = res.data.data;
                _this.todayRedFlag = res.data.data.todayRedFlag;
                _this.totalRedFlag = res.data.data.totalRedFlag;
                _this.level = res.data.data.level;
                if(_this.level == '0'){
                  _this.level = '无';
                } else if (_this.level == '1'){
                  _this.level = '一';
                } else if (_this.level == '2'){
                  _this.level = '二';
                } else if (_this.level == '3'){
                  _this.level = '三';
                } else if (_this.level == '4'){
                  _this.level = '四';
                } else if (_this.level == '5'){
                  _this.level = '五';
                }
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
    background: #f8f8f8;
  }
  .hw_box{
    width: 100%;
  }
  .hw_top{
    width: 100%;
    height: 2.32rem;
    background: url(../../assets/img/personal_bg.png);
    background-size: 100%;
    background-position: center top;
    position: relative;
  }
  /*头部*/
  header{
    width: 100%;
    height: 0.5rem;
    position: relative;
    z-index: 2;
  }
  .hw_return{
    height: 100%;
    width: 0.5rem;
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
  .hw_personal{
    padding: 0 0.12rem;
    box-sizing: border-box;
    position: absolute;
    bottom:0;
    width: 100%;
  }
  .hw_personal_con{
    width: 100%;
    background: #fff;
    height: 1.4rem;
    border-radius: 0.04rem;
    position: relative;
  }
  /*头像*/
  .hw_photo{
    width: 0.72rem;
    height: 0.72rem;
    position: absolute;
    left: 50%;
    top: -0.39rem;
    margin-left: -0.39rem;
    border: 0.03rem solid rgba(255,255,255,.5);
    border-radius: 50%;
  }
  .hw_honor{
    width: 100%;
    display: flex;
    padding-top: 0.68rem;
  }
  .hw_honor_box{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 33.33%;
  }
  .hw_honor_top{
    display: flex;
  }
  .hw_honor_top img{
    width: 0.15rem;
    height: 0.18rem;
    margin-right: .018rem;
  }
  .hw_honor_top h3{
    color: #ff380d;
    font-size: 0.13rem;
  }
  .hw_honor_box p{
    color: #373737;
    font-size: 0.13rem;
    line-height: 0.33rem;
  }
  .hw_shuxian{
    width: 0.16rem;
    height: 0.52rem;
  }
  /*等级规则*/
  .hw_rules{
    padding: 0 0.12rem;
    box-sizing: border-box;
    width: 100%;
  }
  .hw_rules_con{
    width: 100%;
    background: #fff;
    min-height: 3.93rem;
    border-radius: 0.04rem;
    margin: 0.1rem 0;
  }
  .hw_rules_top{
    width: 100%;
    background: url(../../assets/img/ico_hengxian_bg.png);
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
  }
  .hw_rules_title{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .hw_rules_title img{
    width: 0.18rem;
    height: 0.18rem;
    margin-right: 0.05rem;
  }
  .hw_rules_title h3{
    color: #000;
    font-size: 0.15rem;
    line-height: 0.66rem;
  }
  .hw_rules_text{
    width: 100%;
  }
  .hw_rules_text p{
    font-size: 0.15rem;
    color: #5b5959;
    line-height: 0.3rem;
    padding: 0 0.15rem;
  }
  .hw_rules_text :first-child{
    padding-bottom: 0.1rem;
  }

</style>
