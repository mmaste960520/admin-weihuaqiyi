<template>
  <div class="tp">
    <div class="hw_box">
      <!-- 头部 -->
      <header>
        <h3>文化教育</h3>
      </header>
      <!--内容-->
      <div class="hw_content">
        <!--渭华起义介绍-->
        <div class="hw_con">
          <div class="hw_rules_top">
            <div class="hw_rules_title">
              <img src="@/assets/img/ico_Education.png" alt="" />
              <h3>渭华起义介绍</h3>
            </div>
          </div>
          <div class="hw_con_bottom">
            <div class="hw_con_bottom_menu" @click="UprisingIntroduceSbumit()">
              <img src="@/assets/img/ico_23.png" alt="">
              <p>起义简介</p>
            </div>
            <div class="hw_con_bottom_menu" @click="UprisingAfterSbumit()">
              <img src="@/assets/img/ico_20.png" alt="">
              <p>起义经过</p>
            </div>
            <div class="hw_con_bottom_menu" @click="PictureFileSbumit()">
              <img src="@/assets/img/ico_5.png" alt="">
              <p>图片档案</p>
            </div>
            <div class="hw_con_bottom_menu" @click="MemoriesMemorialSubmit()">
              <img src="@/assets/img/ico_15.png" alt="">
              <p>回忆纪念</p>
            </div>
            <div class="hw_con_bottom_menu" @click="VideoWorksSubmit()">
              <img src="@/assets/img/ico_11.png" alt="">
              <p>摄影作品</p>
            </div>
            <div class="hw_con_bottom_menu" @click="HistoricalDataSubmit()">
              <img src="@/assets/img/ico_10.png" alt="">
              <p>历史资料</p>
            </div>
            <div class="hw_con_bottom_menu" @click="ResearchWorksSbumit()">
              <img src="@/assets/img/ico_31.png" alt="">
              <p>研究著作</p>
            </div>
          </div>
        </div>
        <!--先烈事迹-->
        <div class="hw_con">
          <div class="hw_rules_top">
            <div class="hw_rules_title">
              <img src="@/assets/img/ico_Education.png" alt="" />
              <h3>先烈事迹</h3>
            </div>
          </div>
          <div class="hw_con_bottom">
            <div class="hw_con_bottom_menu" @click="WhHeroesSubmit()">
              <img src="@/assets/img/ico_25.png" alt="">
              <p>渭华英烈</p>
            </div>
            <div class="hw_con_bottom_menu" @click="GreatDeedsSubmit()">
              <img src="@/assets/img/ico_26.png" alt="">
              <p>重大事纪</p>
            </div>
          </div>
        </div>
        <!--红色教育-->
        <div class="hw_con" v-if="false">
          <div class="hw_rules_top">
            <div class="hw_rules_title">
              <img src="@/assets/img/ico_Education.png" alt="" />
              <h3>红色教育</h3>
            </div>
          </div>
          <div class="hw_con_bottom">
            <div class="hw_con_bottom_menu" @click="RedPropagandaSubmit()">
              <img src="@/assets/img/ico_19.png" alt="">
              <p>红色宣传</p>
            </div>
            <div class="hw_con_bottom_menu" @click="IndustryPropagandaSubmit()">
              <img src="@/assets/img/ico_3.png" alt="">
              <p>行业快讯</p>
            </div>
            <div class="hw_con_bottom_menu" @click="LeadershipCareSubmit()">
              <img src="@/assets/img/ico_6.png" alt="">
              <p>领导关怀</p>
            </div>
          </div>
        </div>
        <!--党性教育-->
        <div class="hw_con" v-if="false">
          <div class="hw_rules_top">
            <div class="hw_rules_title">
              <img src="@/assets/img/ico_Education.png" alt="" />
              <h3>党性教育</h3>
            </div>
          </div>
          <div class="hw_con_bottom">
            <div class="hw_con_bottom_menu" @click="SpiritOfTheUprisingSubmit()">
              <img src="@/assets/img/ico_18.png" alt="">
              <p>渭华起义精神</p>
            </div>
            <div class="hw_con_bottom_menu" @click="NineteenSpiritsSubmit()">
              <img src="@/assets/img/ico_12.png" alt="">
              <p>十九大精神</p>
            </div>
            <div class="hw_con_bottom_menu" @click="PartyConstitutionSubmit()">
              <img src="@/assets/img/ico_28.png" alt="">
              <p>党章常规</p>
            </div>
            <div class="hw_con_bottom_menu" @click="ClassicSubmit()">
              <img src="@/assets/img/ico_7.png" alt="">
              <p>经典著作</p>
            </div>
          </div>
        </div>
        <!--历史文化教育-->
        <div class="hw_con" v-if="false">
          <div class="hw_rules_top">
            <div class="hw_rules_title">
              <img src="@/assets/img/ico_Education.png" alt="" />
              <h3>历史文化教育</h3>
            </div>
          </div>
          <div class="hw_con_bottom">
            <div class="hw_con_bottom_menu" @click="CulturalHeritageSubmit()">
              <img src="@/assets/img/ico_9.png" alt="">
              <p>文化遗产</p>
            </div>
            <div class="hw_con_bottom_menu" @click="CulturalMonumentsSubmit()">
              <img src="@/assets/img/ico_8.png" alt="">
              <p>文化古迹</p>
            </div>
            <div class="hw_con_bottom_menu" @click="AncientModernCelebritySubmit()">
              <img src="@/assets/img/ico_24.png" alt="">
              <p>古今名人</p>
            </div>
          </div>
        </div>
        <!--不忘初心 牢记使命-->
        <div class="hw_con" v-if="false">
          <div class="hw_rules_top">
            <div class="hw_rules_title">
              <img src="@/assets/img/ico_Education.png" alt="" />
              <h3>不忘初心 牢记使命</h3>
            </div>
          </div>
          <div class="hw_con_bottom">
            <div class="hw_con_bottom_menu" @click="storyWindowSubmit()">
              <img src="@/assets/img/ico_21.png" alt="">
              <p>故事之窗</p>
            </div>
            <div class="hw_con_bottom_menu" @click="AdvancedTypicalSubmit()">
              <img src="@/assets/img/ico_1.png" alt="">
              <p>先进典型</p>
            </div>
          </div>
        </div>
        <!--红色旅游-->
        <div class="hw_con">
          <div class="hw_rules_top">
            <div class="hw_rules_title">
              <img src="@/assets/img/ico_Education.png" alt="" />
              <h3>红色旅行</h3>
            </div>
          </div>
          <div class="hw_con_bottom">
            <div class="hw_con_bottom_menu" @click="ClassicLineSubmit()">
              <img src="@/assets/img/ico_2.png" alt="">
              <p>经典路线</p>
            </div>
            <div class="hw_con_bottom_menu" @click="FolkCustomSubmit()">
              <img src="@/assets/img/ico_13.png" alt="">
              <p>风土民俗</p>
            </div>
            <div class="hw_con_bottom_menu" @click="ConvenientQuerySubmit()">
              <img src="@/assets/img/ico_27.png" alt="">
              <p>便民查询</p>
            </div>
          </div>
        </div>
        <!--历史文化教育-->
        <div class="hw_con">
          <div class="hw_rules_top">
            <div class="hw_rules_title">
              <img src="@/assets/img/ico_Education.png" alt="" />
              <h3>文化教育</h3>
            </div>
          </div>
          <div class="hw_con_bottom">
            <div class="hw_con_bottom_menu" @click="PatrioticSubmit()">
              <img src="@/assets/img/ico_9.png" alt="">
              <p>爱国主义教育</p>
            </div>
            <div class="hw_con_bottom_menu" @click="PartySubmit()">
              <img src="@/assets/img/ico_8.png" alt="">
              <p>党性示范教育</p>
            </div>
            <div class="hw_con_bottom_menu" @click="IntegritySubmit()">
              <img src="@/assets/img/ico_24.png" alt="">
              <p>廉政教育</p>
            </div>
            <div class="hw_con_bottom_menu" @click="StudentsSubmit()">
              <img src="@/assets/img/ico_24.png" alt="">
              <p>中小学生研究教育</p>
            </div>
            <div class="hw_con_bottom_menu" @click="DefenceSubmit()">
              <img src="@/assets/img/ico_24.png" alt="">
              <p>国防教育</p>
            </div>
          </div>
        </div>
      </div>
      <!--底部-->
      <div class="hw_bottom">
        <div class="hw_navigation" @click="exhibitSubmit()">
          <div class="hw_exhibit"></div>
          <p>陈列展览</p>
        </div>
        <div class="hw_navigation" @click="digitalSubmit()">
          <div class="hw_digital"></div>
          <p>数字展馆</p>
        </div>
        <div class="hw_navigation">
          <div class="hw_culture"></div>
          <p class="hw_color_hover">文化教育</p>
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
      name: "cultural-education",
      methods: {
        exhibitSubmit() {
          this.$router.push('/exhibition')//陈列展览
        },
        digitalSubmit() {
          this.$router.push('/pavilion')//数字展馆
        },
        PersonalCenterSubmit() {
          this.$router.push('/personal')//个人中心
        },
        UprisingIntroduceSbumit() {
          this.$router.push('/UprisingIntroduce')//起义简介
        },
        UprisingAfterSbumit() {
          this.$router.push('/UprisingAfter')//起义经过
        },
        PictureFileSbumit() {
          this.$router.push('/PictureFile')//图片档案
        },
        MemoriesMemorialSubmit() {
          this.$router.push('/MemoriesMemorial')//回忆记录
        },
        VideoWorksSubmit() {
          this.$router.push('/VideoWorks')//影视作品
        },
        HistoricalDataSubmit() {
          this.$router.push('/HistoricalData')//历史资料
        },
        ResearchWorksSbumit() {
          this.$router.push('/ResearchWorks')//研究著作
        },
        WhHeroesSubmit() {
          this.$router.push('/WhHeroes')//渭华英烈
        },
        GreatDeedsSubmit() {
          this.$router.push('/GreatDeedsChronological')//重大事迹-编年体
        },
        biographySubmit() {
          this.$router.push('/biography')//生平简介
        },
        TheFeatsSubmit() {
          this.$router.push('/TheFeats')//丰功伟绩
        },
        HistoricalMomentsSubmit() {
          this.$router.push('/HistoricalMoments')//历史瞬间
        },
        WritingArticlesSubmit() {
          this.$router.push('/WritingArticles')//著作文章
        },
        MaximExtractSubmit() {
          this.$router.push('/MaximExtract')//格言选粹
        },
        InscriptionHandwritingSubmit() {
          this.$router.push('/InscriptionHandwriting')//题词手迹
        },
        AfterWordToRememberSubmit() {
          this.$router.push('/AfterWordToRemember')//追词缅怀
        },
        RedPropagandaSubmit() {
          this.$router.push('/RedPropaganda')//红色宣传
        },
        IndustryPropagandaSubmit() {
          this.$router.push('/IndustryPropaganda')//行业宣传
        },
        LeadershipCareSubmit() {
          this.$router.push('/LeadershipCare')//领导关怀
        },
        SpiritOfTheUprisingSubmit() {
          this.$router.push('/SpiritOfTheUprising')//渭华起义精神
        },
        NineteenSpiritsSubmit() {
          this.$router.push('/NineteenSpirits')//十九大精神
        },
        PartyConstitutionSubmit() {
          this.$router.push('/PartyConstitution')//党章党规
        },
        ClassicSubmit() {
          this.$router.push('/Classic')//经典著作
        },
        CulturalHeritageSubmit() {
          this.$router.push('/CulturalHeritage')//文化遗产
        },
        CulturalMonumentsSubmit() {
          this.$router.push('/CulturalMonuments')//文化古迹
        },
        AncientModernCelebritySubmit() {
          this.$router.push('/AncientModernCelebrity')//古今名人
        },
        storyWindowSubmit() {
          this.$router.push('/storyWindow')//故事之窗
        },
        AdvancedTypicalSubmit() {
          this.$router.push('/AdvancedTypical')//先进典型
        },
        ClassicLineSubmit() {
          this.$router.push('/ClassicLine')//先进典型
        },
        FolkCustomSubmit() {
          this.$router.push('/FolkCustom')//风土民俗
        },
        ConvenientQuerySubmit() {
          this.$router.push('/ConvenientQuery')//便民查询
        },
        PatrioticSubmit(){
          localStorage.setItem("EduId", '10006003');
          this.$router.push('/Patriotic')//爱国注意教育
        },
        PartySubmit(){
          localStorage.setItem("EduId", '10006004');
          this.$router.push('/Patriotic')//党性示范教育
        },
        IntegritySubmit(){
          localStorage.setItem("EduId", '10006005');
          this.$router.push('/Patriotic')//廉政教育
        },
        StudentsSubmit(){
          localStorage.setItem("EduId", '10006006');
          this.$router.push('/Patriotic')//中小学生研究教育
        },
        DefenceSubmit(){
          localStorage.setItem("EduId", '10006007');
          this.$router.push('/Patriotic')//国防教育
        }
      }
    }
</script>

<style scoped>
  body{
    width: 100%;
  }
  .hw_box{
    width: 100%;
    /*overflow: hidden;*/
    background: #e7edf0;
  }
  /*头部*/
  header{
    width: 100%;
    height: 0.47rem;
    background: url(../../../static/img/header_bg.png);
    background-size: 100%;
    background-position: 0 0;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
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
    /*padding: 0 0.07rem;*/
    /*box-sizing: border-box;*/
    /*z-index: 1;*/
    /*position: relative;*/
    padding-top: 0.47rem;
    padding-bottom: 0.49rem;
    /*background: #fff;*/
    /*margin-bottom: 0.1rem;*/
    /*box-shadow: 0 0 0.1rem rgba(0,0,0,.15);*/
  }
  .hw_con{
    width: 100%;
    overflow: hidden;
    padding: 0 0.07rem;
    box-sizing: border-box;
    z-index: 1;
    position: relative;
    background: #fff;
    margin-bottom: 0.1rem;
    box-shadow: 0 0 0.1rem rgba(0,0,0,.15);
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
    width: 0.12rem;
    height: 0.14rem;
    margin-right: 0.05rem;
  }
  .hw_rules_title h3{
    color: #000;
    font-size: 0.15rem;
    line-height: 0.66rem;
  }
  .hw_con_bottom{
    width: 100%;
  }
  .hw_con_bottom_menu{
    float: left;
    width: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-bottom: 0.11rem;
  }
  .hw_con_bottom_menu img{
    width: 0.74rem;
    height: 0.74rem;
    padding-top: 0.13rem;
  }
  .hw_con_bottom_menu p{
    color: #727272;
    font-size: 0.13rem;
    line-height: 0.3rem;
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
    z-index: 5;
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
    background: url(../../assets/img/ico_digital.png);
    background-size: 100% 100%;
  }
  .hw_navigation:hover .hw_digital{
    background: url(../../assets/img/ico_digital_hover.png);
    background-size: 100% 100%;
  }
  /*文化教育*/
  .hw_culture{
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
