<template>
    <div style="background: #f8f8f8;" class="tp">
      <div class="hw_box">
        <div class="hw_top">
          <!-- 头部 -->
          <header>
            <h3>陈列展览</h3>
          </header>
          <!--轮播图-->
          <div class="hw_personal">
            <div class="hw_personal_con" @click="revoltSubmit()"></div>
          </div>
        </div>
        <div class="hw_content">
          <!--景区概况-->
          <div class="hw_con">
            <div class="hw_con_top">
              <div class="hw_con_title">
                <img src="@/assets/img/ico_abstract.png" alt="" />
                <h3>景区概况</h3>
              </div>
            </div>
            <div class="hw_con_bottom">
              <div class="hw_con_bottom_menu" @click="IntroductionSubmit()">
                <img src="@/assets/img/ico_exhibition_a.png" alt="" />
                <p>景区简介</p>
              </div>
              <div class="hw_con_bottom_menu" @click="WeKnowSubmit()">
                <img src="@/assets/img/ico_exhibition_b.png" alt="" />
                <p>景区掠影</p>
              </div>
              <div class="hw_con_bottom_menu" @click="organizationSubmit()">
                <img src="@/assets/img/ico_exhibition_c.png" alt="" />
                <p>组织机构</p>
              </div>
            </div>
          </div>
          <!--景区新闻-->
          <div class="hw_con">
            <div class="hw_con_top">
              <div class="hw_con_title">
                <img src="@/assets/img/ico_abstract.png" alt="" />
                <h3>景区新闻</h3>
              </div>
            </div>
            <div class="hw_con_bottom_news">
              <!--通知公告-->
              <div class="hw_con_bottom_text">
                <div class="hw_con_bottom_text_a" @click="noticeSubmit()">
                  <span>通知公告</span>
                  <div>
                    <p>更多</p>
                    <img src="@/assets/img/ico_the.png" alt="" />
                  </div>
                </div>
                <div class="hw_con_bottom_text_b">
                  <div v-for="(item,index) in items" :key='index' @click="noticeDetailsSubmit(item.id)">
                    <img src="@/assets/img/ico_horn.png" alt="" />
                    <p id="TwoLine">{{item.title}}</p>
                  </div>
                </div>
              </div>
              <!--新闻中心-->
              <div class="hw_con_bottom_text">
                <div class="hw_con_bottom_text_a" @click="ActivityNewsSubmit()">
                  <span>新闻中心</span>
                  <div>
                    <p>更多</p>
                    <img src="@/assets/img/ico_the.png" alt="" />
                  </div>
                </div>
                <div class="hw_con_bottom_text_c">
                  <div class="hw_con_bottom_text_d" v-for="(itemNews,index) in itemsNews" :key='index' @click="NewsDetaildSubmit(itemNews.id)">
                    <div class="hw_news_pic">
                      <img :src="itemNews.imgPath" alt="" />
                    </div>
                    <div>
                      <h3>{{itemNews.title}}</h3>
                      <p id="shenglue">{{itemNews.description}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!--藏品欣赏-->
          <div class="hw_con">
            <div class="hw_con_top">
              <div class="hw_con_title">
                <img src="@/assets/img/ico_abstract.png" alt="" />
                <h3>藏品欣赏</h3>
              </div>
            </div>
            <div class="hw_con_bottom hw_con_bottom_collection">
              <div class="hw_con_bottom_menu_a" @click="enjoySubmit1()">
                <img src="../../assets/img/ico_show.png" alt="" />
                <p>精品展示</p>
              </div>
              <div class="hw_con_bottom_menu_a" @click="enjoySubmit2()">
                <img src="../../assets/img/ico_house.png" alt="" />
                <p>文物故事</p>
              </div>
              <div class="hw_con_bottom_menu_a" @click="enjoySubmit3()">
                <img src="../../assets/img/ico_shooting.png" alt="" />
                <p>亲切留念</p>
              </div>
            </div>
          </div>
          <!--内容最下方三个板块-->
          <div class="hw_con_footer">
            <!--服务指南-->
            <div class="hw_public hw_footer_guide" @click="guideSubmit()">
              <h3>服务指南</h3>
              <span></span>
              <p>门票预订、讲课预订、游客须知、便民查询</p>
              <img src="../../assets/img/ico_access_1.png" alt="" />
            </div>
            <!--参观留言-->
            <div class="hw_public hw_footer_message" @click="messageSubmit()">
              <h3>参观留言</h3>
              <span></span>
              <p>在线签到、参观留言、留言回复</p>
              <img src="../../assets/img/ico_access_2.png" alt="" />
            </div>
            <!--知识问答-->
            <div class="hw_public hw_footer_answer" @click="answerSbumit()">
              <h3>知识问答</h3>
              <span></span>
              <p>在线进行华渭起义互动答题，赢取小红旗</p>
              <img src="../../assets/img/ico_access_3.png" alt="" />
            </div>
          </div>
        </div>

        <!--底部-->
        <div class="hw_bottom">
          <div class="hw_navigation">
            <div class="hw_exhibit"></div>
            <p class="hw_color_hover">陈列展览</p>
          </div>
          <div class="hw_navigation" @click="digitalSubmit()">
            <div class="hw_digital"></div>
            <p>数字展馆</p>
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
  import { Indicator } from 'mint-ui';
  import { MessageBox } from 'mint-ui';
    export default {
      name: "exhibition",
      data(){
        return{
          items:[],
          itemsNews:[],
        }
      },
      mounted(){
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        this.getprev();
        this.getprevNews();
      },
      methods: {
        //渭华课堂
        revoltSubmit(){
          this.$router.push('revolt')
        },
        //景区简介
        IntroductionSubmit(){
          this.$router.push('ScenicSpotIntroduction')
        },
        //景区掠影
        WeKnowSubmit(){
          this.$router.push('WeKnow')
        },
        //组织机构
        organizationSubmit(){
          this.$router.push('organization')
        },
        //通知公告
        noticeSubmit(){
          this.$router.push('notice')
        },
        // 通知公告内容
        noticeDetailsSubmit(val){
          this.$router.push({
            path: '/activityNewsDetails',//公告-详情
            query: {
              id: val,
              menuId: '10002002',
              Name: '通知公告'
            }
          })
        },
        //活动新闻
        ActivityNewsSubmit(){
          this.$router.push('activityNews')
        },
        // 新闻内容
        NewsDetaildSubmit(val){
          this.$router.push({
            path: '/activityNewsDetails',//新闻-详情
            query: {
              id: val,
              menuId: '10002001',
              Name: '活动新闻'
            }
          })
        },
        //藏品欣赏
        enjoySubmit1(){
          localStorage.setItem('selected', 1);
          this.$router.push('CollectionAppreciation')
        },
        enjoySubmit2(){
          localStorage.setItem('selected', 2);
          this.$router.push('CollectionAppreciation')
        },
        enjoySubmit3(){
          localStorage.setItem('selected', 3);
          this.$router.push('CollectionAppreciation')
        },
        //服务指南
        guideSubmit(){
          this.$router.push('serviceGuide')
        },
        //参观留言
        messageSubmit(){
          this.$router.push('VisitMessage')
        },
        //知识问答
        answerSbumit(){
          // this.$router.push('KnowledgeQuiz')
          this.$router.push('ChoiceQuestion')
        },
        //陈列展览
        digitalSubmit() {
          this.$router.push('/pavilion')
        },
        //个人中心
        PersonalCenterSubmit() {
          this.$router.push('/personal')
        },
        //文化教育
        CulturalEducationSubmit() {
          this.$router.push('/CulturalEducation')
        },
        //通知公告
        getprev(){
          var _this = this;
          this.$axios({
            method:'post',
            url:'syx/jingquxinwen/search/1/2',
            data:{
              "menuId":"10002002",
            },
          }).then( (res) =>{
            if(res){
              if(res.data.code === 20000){
                //成功请求
                _this.items = res.data.data.rows;
              } else {
                //请求失败
                MessageBox('提示', res.data.message);
              }
            }
          })
        },
        //新闻接口
        getprevNews(){
          var _this = this;
          this.$axios({
            method:'post',
            url:'syx/jingquxinwen/search/1/2',
            data:{
              "menuId":"10002001",
            },
          }).then( (res) =>{
            if(res){
              if(res.data.code === 20000){
                //成功请求
                _this.itemsNews = res.data.data.rows;
                Indicator.close();
                if(localStorage.moduleType !== '1'){
                  this.mokuaifangwen();//模块接口
                }
              } else {
                //请求失败
                // MessageBox('提示', res.data.message);
              }
            }
          })
        },
        
        mokuaifangwen(){
          this.$axios({
            method: 'post',
            url: 'syx/visitorModule',
            data: {
              "moduleType":"1",
              "deviceType": localStorage.jixing,
              "userId": localStorage.id
            },
          }).then((res) => {
            if (res) {
              if (res.data.code === 20000) {
                //成功请求
                let moduleType = '1';
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
    background: #f8f8f8;
  }
  .hw_box{
    width: 100%;
  }
  .hw_top{
    width: 100%;
    height: 2.32rem;
    background: url('../../assets/img/personal_bg.png');
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
  /*轮播图*/
  .hw_personal{
    padding: 0 0.11rem;
    box-sizing: border-box;
    position: absolute;
    bottom:0;
    width: 100%;
  }
  .hw_personal_con{
    width: 100%;
    background: #fff;
    height: 1.57rem;
    border-radius: 0.04rem;
    position: relative;
    background: url("../../assets/img/banner_1.png");
    background-size: 100%;
  }


  .hw_content{
    padding: 0 0.12rem 0.5rem;
    box-sizing: border-box;
    width: 100%;
  }
  /*景区概况*/
  .hw_con{
    width: 100%;
    background: #fff;
    border-radius: 0.04rem;
    margin-top: 0.1rem;
  }
  .hw_con_top{
    width: 100%;
    background: url('../../assets/img/ico_hengxian_bg.png');
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
  }
  .hw_con_title{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .hw_con_title img{
    width: 0.18rem;
    height: 0.18rem;
    margin-right: 0.05rem;
  }
  .hw_con_title h3{
    color: #000;
    font-size: 0.15rem;
    line-height: 0.66rem;
  }
  .hw_con_bottom{
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .hw_con_bottom_menu{
    width: 33.33%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .hw_con_bottom_menu img{
    width: 0.73rem;
    height: 0.73rem;
  }
  .hw_con_bottom_menu p{
    font-size: 0.14rem;
    color: #5d5d5d;
    padding-bottom: 0.16rem;
  }


  /*景区新闻*/
  .hw_con_bottom_news{
    width: 100%;
    padding: 0 0.18rem;
    box-sizing: border-box;
  }
  .hw_con_bottom_text{
    width: 100%;
  }
  .hw_con_bottom_text_a{
    display: flex;
    justify-content: space-between;
  }
  .hw_con_bottom_text_a span{
    color: #2c2c2c;
    font-size: 0.14rem;
    padding-left: 0.09rem;
    border-left: 0.02rem solid #ec5c45;
  }
  .hw_con_bottom_text_a div{
    display: flex;
    align-items: center;
  }
  .hw_con_bottom_text_a div p{
    color: #666666;
    font-size: 0.11rem;
    padding-right: 0.09rem;
  }
  .hw_con_bottom_text_a div img{
    width: 0.06rem;
    height: 0.11rem;
  }
  .hw_con_bottom_text_b{
    width: 100%;
    padding: 0.12rem 0;
  }
  .hw_con_bottom_text_b div{
    display: flex;
    align-items: center;
  }
  .hw_con_bottom_text_b div img{
    width: 0.16rem;
    height: 0.14rem;
  }
  .hw_con_bottom_text_b div p{
    color: #333333;
    font-size: 0.13rem;
    line-height: 0.22rem;
    padding-left: 0.07rem;
    width: 2.7rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
  }
  /*新闻中心*/
  .hw_con_bottom_text_c{
    width: 100%;
  }
  .hw_con_bottom_text_d{
    width: 100%;
    display: flex;
    padding: 0.12rem 0;
  }
  .hw_news_pic{
    width: 0.58rem;
    padding-right: 0.08rem;
  }
  .hw_news_pic img{
    width: 0.58rem;
    height: 0.58rem;
    border-radius: 0.02rem;
  }
  .hw_con_bottom_text_d div h3{
    color: #333333;
    font-size: 0.15rem;
    font-weight: normal;
    width: 2.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
  }
  .hw_con_bottom_text_d div p{
    color: #666666;
    font-size: 0.13rem;
    line-height: 0.2rem;
    height: 0.4rem;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .hw_con_bottom_text_c .hw_con_bottom_text_d:last-child{
    border-top: 1px solid #f0efef;
    padding-bottom: 0.2rem;
  }
  /*藏品欣赏*/
  .hw_con_bottom_collection{
    padding: 0 0.2rem 0.3rem;
    box-sizing: border-box;
  }
  .hw_con_bottom_menu_a{
    width: 0.8rem;
    height: 0.82rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 0.04rem;
    box-shadow: 0px 0px 0.6rem rgba(0,0,0,.03);
  }
  .hw_con_bottom_menu_a img{
    height: 0.34rem;
  }
  .hw_con_bottom_menu_a p{
    color: #737272;
    font-size: 0.12rem;
    padding-top: 0.1rem;
  }

  /*内容最下方三个板块*/
  .hw_con_footer{
    width: 100%;
    padding-top: 0.11rem;
  }
  .hw_public{
    width: 100%;
    height: 0.97rem;
    background: #fff;
    border-radius: 0.04rem;
    padding: 0 0.26rem;
    box-sizing: border-box;
    position: relative;
    margin-bottom: 0.11rem;
  }
  .hw_public h3{
    font-size: 0.16rem;
    padding-top: 0.17rem;
    letter-spacing: 0.02rem;
  }
  .hw_public span{
    display: block;
    width: 0.43rem;
    height: 0.02rem;
    margin: 0.12rem 0 0.18rem;
  }
  .hw_public p{
    color: #fff;
    font-size: 0.12rem;
  }
  .hw_public img{
    width: 0.25rem;
    height: 0.25rem;
    position: absolute;
    top: 0.32rem;
    right: 0.23rem;
  }
  /*服务指南*/
  .hw_footer_guide{
    background: url('../../assets/img/bg_access_1.png');
    background-size: 100% 100%;
  }
  .hw_footer_guide h3{
    color: #e8ac1a;
  }
  .hw_footer_guide span{
    background: #e8ac1a;
  }
  /*参观留言*/
  .hw_footer_message{
    background: url('../../assets/img/bg_access_2.png');
    background-size: 100% 100%;
  }
  .hw_footer_message h3{
    color: #d17231;
  }
  .hw_footer_message span{
    background: #d17231;
  }
  /*知识问答*/
  .hw_footer_answer{
    background: url('../../assets/img/text.png');
    background-size: 100% 100%;
  }
  .hw_footer_answer h3{
    color: #f4804b;
  }
  .hw_footer_answer span{
    background: #f4804b;
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
    background: url('../../assets/img/ico_exhibit_hover.png');
    background-size: 100% 100%;
  }
  /*数字展馆*/
  .hw_digital{
    background: url('../../assets/img/ico_digital.png');
    background-size: 100% 100%;
  }
  .hw_navigation:hover .hw_digital{
    background: url('../../assets/img/ico_digital_hover.png');
    background-size: 100% 100%;
  }
  /*文化教育*/
  .hw_culture{
    background: url('../../assets/img/ico_culture.png');
    background-size: 100% 100%;
  }
  .hw_navigation:hover .hw_culture{
    background: url('../../assets/img/ico_culture_hover.png');
    background-size: 100% 100%;
  }
  /*个人中心*/
  .hw_personal_center{
    background: url('../../assets/img/ico_personal_center.png');
    background-size: 100% 100%;
  }
  .hw_navigation:hover .hw_personal_center{
    background: url('../../assets/img/ico_personal_center_hover.png');
    background-size: 100% 100%;
  }
  .hw_navigation:hover p{
    color: #ce8944;
  }
  /*哪个页面给那哪个加下面clss*/
  .hw_navigation .hw_color_hover{
    color: #ce8944;
  }

</style>
