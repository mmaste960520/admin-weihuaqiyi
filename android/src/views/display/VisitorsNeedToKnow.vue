<template>
  <div class="tp">
    <div class="hw_box">
      <!--背景-->
      <div class="hw_bg"></div>
      <!-- 头部 -->
      <header>
        <h3>游客需知</h3>
        <div class="hw_return" @click='prev'>
          <img src="../../../static/img/ico_return.png" alt="">
        </div>
      </header>
      <!--内容-->
      <div class="hw_content">
        <p>
          1.纪念馆所有展览免费向公众开放。<br/>
          2.开放时间：9：00—17：00（16:00停止入馆）。<br/>
          3.团队及个人均需持有效证件登记参观（身份证、驾驶证、军人证等）。<br/>
          4.酗酒者、衣冠不整者及无行为能力或限制行为能力者无监护人陪伴的，谢绝入馆。<br/>
          5.严禁将易燃易爆、管制械具等危险品带入馆内。<br/>
          6.参观前请将随身包裹寄存，贵重物品自行保管。<br/>
          7.讲解：分为免费讲解及收费讲解（详情请咨询讲解接待处）。<br/>
          8.展厅内请勿摄像，拍照时请勿使用闪光灯以及三角架。<br/>
          9.爱护并正确使用公共设施，请勿触摸文物及展品。<br/>
          10.自觉维护环境卫生，请勿丢弃杂物，请勿在馆内吸烟。<br/>
          11.自觉遵守参观秩序，请勿大声喧哗、追跑打闹。<br/>
          12.如遇各类突发事件，请服从工作人员指挥。<br/>
          咨询电话：0731-83770210<br/>
          投诉电话：0731-83768005
        </p>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "visitors-need-to-know",
      methods:{
        prev(){
          this.$router.go(-1)
        }
      }
    }
</script>

<style scoped>
  body{
    width: 100%;
  }
  .hw_bg{
    background: url(../../assets/img/explain_bg.png);
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

  /*内容*/
  .hw_content{
    width: 100%;
    padding: 0 0.1rem;
    box-sizing: border-box;
    padding-top: 0.47rem;
    z-index: 1;
    position: relative;
  }
  .hw_content p{
    color: #333333;
    font-size: 0.14rem;
    line-height: 0.3rem;
    padding: 0.24rem 0;
  }


</style>
