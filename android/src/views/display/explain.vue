<template>
    <div class="tp">
      <div class="hw_box">
        <!--背景-->
        <div class="hw_bg"></div>
        <!-- 头部 -->
        <header>
          <h3>讲解预订</h3>
          <div class="hw_return" @click='prev'>
            <img src="../../../static/img/ico_return.png" alt="">
          </div>
        </header>
        <!--内容-->
        <div class="hw_content">
          <p>免费讲解服务</p>
          <p>为了更好地满足广大观众的文化需求，我院即日起于西区文史展览实施免费讲解服务。</p>
          <p>免费讲解时间如下：</p>
          <p>开放日的9:30、10:30、13:00、14:00、15:00（每场讲解时间约为70分钟）</p>
          <p>请需要听免费讲解的观众到时在展览入口处集中。</p>
          <p>我院还将不定期推出院内专家的免费讲解服务，具体安排另行通告。</p>
          <p>（最终解释权归渭华起义纪念馆所有）</p>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "explain",
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
    line-height: 0.24rem;
    padding: 0.24rem 0;
  }

</style>
