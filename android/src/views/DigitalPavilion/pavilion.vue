<template>
    <div class="tp">
      <div class="hw_boxa">
        <div class="hw_bg"></div>
        <!-- 头部 -->
        <header>
          <h3>数字展馆</h3>
          <div class="hw_return">
            <img src="../../../static/img/ico_return.png" alt="">
          </div>
        </header>

        <!--中间内容-->
        <div class="hw_content">
          <img class="pavilion_logo" src="@/assets/img/pavilion_logo.png" alt="" />
          <button>点击进入</button>
          <img class="hw_hands" src="@/assets/img/ico_hands.png" alt="" />
        </div>
        <!--底部-->
        <div class="hw_bottom">
          <div class="hw_navigation" @click="exhibitSubmit()">
            <div class="hw_exhibit"></div>
            <p>陈列展览</p>
          </div>
          <div class="hw_navigation">
            <div class="hw_digital"></div>
            <p class="hw_color_hover">数字展馆</p>
          </div>
          <div class="hw_navigation" @click="CulturalEducationSubmit()">
            <div class="hw_culture"></div>
            <p>文化教育</p>
          </div>
          <div class="hw_navigation" @click="PersonalCenterSubmit()">
            <div class="hw_personal_center"></div>
            <p>个人中心</p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "pavilion",
      methods: {
        exhibitSubmit() {
          this.$router.push('/exhibition')//个人中心
        },
        PersonalCenterSubmit() {
          this.$router.push('/personal')//个人中心
        },
        CulturalEducationSubmit() {
          this.$router.push('/CulturalEducation')//文化教育
        },
      }
    }
</script>

<style scoped>
  body{
    background: #f8f8f8;
  }
  .hw_bg{
    background: url(../../assets/img/pavilion_bg.png);
    position: fixed;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: 50% 50%;
    z-index: 0;
  }
  .hw_boxa{
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
  /*内容*/
  .hw_content{
    width: 100%;
    height: 100%;
    margin-bottom: 0.5rem;
    /*background: url(../../../static/img/pavilion_bg.png);*/
    /*background-size: 100% 100%;*/
    /*background-position: center;*/
    padding-top: 0.47rem;
    position: relative;
    z-index: 1;
  }
  .pavilion_logo{
    width: 2.29rem;
    height: 1.03rem;
    margin: 0 auto;
    padding-top: 0.2rem;
    padding-bottom: 3.05rem;
  }
  .hw_content button{
    width: 2.8rem;
    color: #fff;
    background: rgba(199,136,67,.85);
    text-align: center;
    line-height: 0.45rem;
    border: none;
    margin: 0 auto;
    border-radius: 0.22rem;
    display: block;
    font-size: 0.16rem;
  }
  .hw_hands{
    width: 0.3rem;
    height: 0.45rem;
    margin: 0 auto;
    padding-top: 0.13rem;
    padding-bottom: 0.3rem;
  }


  /*底部*/
  .hw_bottom{
    width: 100%;
    height: 0.49rem;
    background: #fff;
    display: flex;
    position: fixed;
    bottom: 1px;
    left: 0;
    box-shadow: 0 0.01rem 0.04rem #d7d7d7;
  }
  .hw_navigation{
    width: 25%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .hw_navigation p{
    color: #dcdcdc;
    font-size: 0.1rem;
    text-align: center;
    line-height: 0.16rem;
  }
  .hw_exhibit, .hw_digital, .hw_culture, .hw_personal_center{
    width: 0.2rem;
    height: 0.2rem;
  }
  /*陈列展馆*/
  .hw_exhibit{
    background: url(../../assets/img/ico_exhibit.png);
    background-size: 100% 100%;
  }
  .hw_navigation:hover .hw_exhibit{
    background: url(../../assets/img/ico_exhibit_hover.png);
    background-size: 100% 100%;
  }
  /*数字展馆*/
  .hw_digital{
    background: url(../../assets/img/ico_digital_hover.png);
    background-size: 100% 100%;
  }
  /*文化教育*/
  .hw_culture{
    background: url(../../assets/img/ico_culture.png);
    background-size: 100% 100%;
  }
  .hw_navigation:hover .hw_culture{
    background: url(../../assets/img/ico_culture_hover.png);
    background-size: 100% 100%;
  }
  /*个人中心*/
  .hw_personal_center{
    background: url(../../assets/img/ico_personal_center.png);
    background-size: 100% 100%;
  }
  .hw_navigation:hover .hw_personal_center{
    background: url(../../assets/img/ico_personal_center_hover.png);
    background-size: 100% 100%;
  }
  .hw_navigation:hover p{
    color: #ce8944;
  }
  .hw_navigation .hw_color_hover{
    color: #ce8944;
  }

</style>
