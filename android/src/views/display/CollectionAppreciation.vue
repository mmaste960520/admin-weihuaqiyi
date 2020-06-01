<template>
<div class="tp">
  <div class="hw_box">
    <!-- 头部 -->
    <header>
      <h3>藏品欣赏</h3>
      <div class="hw_return" @click='prev'>
        <img src="../../../static/img/ico_return.png" alt="">
      </div>
    </header>
    <!--内容-->
    <div class="hw_content">



      <mt-navbar class="page-part" v-model="selected">
        <mt-tab-item id="1">精品展示</mt-tab-item>
        <mt-tab-item id="2">文物故事</mt-tab-item>
        <mt-tab-item id="3">亲切留念</mt-tab-item>
      </mt-navbar>

<!-- CollectionAppreciationDetails -->
      <!-- tabcontainer -->
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <!--精品展示-->
          <div class="hw_display">
            <div class="hw_display_con" v-for="(item,index) in items" @click="CollectionAppreciationSubmit(item.id)">
              <img class="hw_display_con_pic" :src="item.imgPath" alt="">
              <p>{{item.title}}</p>
              <img class="hw_jingpianzhanshi" src="@/assets/img/jingpianzhanshi.png" alt="">
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <!--文物故事-->
          <div class="hw_story">
            <div class="hw_story_con" v-for="(item,index) in items" @click="CollectionAppreciationSubmit(item.id)">
              <div class="image">
                <img :src="item.imgPath" alt="">
              </div>
              <div class="hw_story_right">
                <h3>{{item.title}}</h3>
                <p>{{item.description}}</p>
              </div>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <!--亲切留念-->
          <div class="hw_souvenir">
            <div class="hw_souvenir_con" v-for="(item,index) in items" @click="CollectionAppreciationSubmit(item.id)">
              <img :src="item.imgPath" alt="" style="height: 1.34rem;">
              <p style="height: 35px; overflow: hidden; text-overflow: ellipsis; -webkit-line-clamp: 1; padding: 0.06rem 0.1rem 0.1rem;">{{item.title}}</p>
            </div>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</div>
</template>

<script>
  import { MessageBox } from 'mint-ui';
    export default {
      name: "collection-appreciation",
      data() {
        return {
          selected: localStorage.selected,
          menuId:'00000',
          items:[
            {
              title:'',//标题
              imgPath:'',//封面
              content:'',//内容
            }
          ],
          Name:'精品展示'
        }
      },

      mounted(){
        this.hahhhh();
      },
      computed:{
        data(val){
          return this.selected
        }
      },
      watch:{
        data(val){
          if(val === "1"){
            this.menuId="10003001"
            this.getprev1(this.menuId);
            this.Name = '精品展示'
            localStorage.setItem('selected', 1);
          } else if (val === "2"){
            this.menuId= "10003002";
            this.getprev1(this.menuId);
            this.Name = '文物故事'
            localStorage.setItem('selected', 2);
          }else if (val === "3"){
            this.menuId= "10003003";
            this.getprev1(this.menuId);
            this.Name = '亲切留念'
            localStorage.setItem('selected', 3);
          }
        }
      },
      methods:{
        prev(){
          this.$router.go(-1) //返回上一页
        },
        //精品展示详情
        CollectionAppreciationSubmit(val){
          this.$router.push({
            path: '/CollectionAppreciationDetails',
            query: {
              id: val,
              Name: this.Name,//标题
              menuId: this.menuId
            }
          })
        },
        hahhhh(){
          if(this.selected === "1"){
            this.menuId="10003001"
            this.getprev1(this.menuId);
          } else if(this.selected === "2"){
            this.menuId="10003002"
            this.getprev1(this.menuId);
          } else if(this.selected === "3"){
            this.menuId="10003003"
            this.getprev1(this.menuId);
          }
        },
        //内容接口-精品展示
        getprev1(menuId){
          var _this = this;
          this.$axios({
            method:'post',
            url:'syx/cangpinxinshang/search',
            data:{
              "menuId":menuId,
            },
          }).then( (res) =>{
            if(res){
              if(res.data.code === 20000){
                //成功请求
                _this.items = res.data.data;
                //_this.title = res.data.data[0].title; //标题
                //_this.imgPath = res.data.data[0].imgPath; //封面
                //_this.content = res.data.data[0].content; //内容
              } else {
                //请求失败
                MessageBox('提示', res.data.message);
              }
            }
          })
        },

      },
    }
</script>

<style scoped>
  body{
    background: #f8f8f8;
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
    padding: 0.47rem 0.12rem 0;
    box-sizing: border-box;
  }
  .hw_con_top{
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0.12rem 0;
  }
  .hw_con_top p{
    font-size: 0.16rem;
    color: #905223;
    text-align: center;
    line-height: 0.39rem;
    width: 1.13rem;
    height: 0.39rem;
    background: #e7d7bd;
  }
  .hw_con_bottom{
    width: 100%;
  }
  /*精品展示*/
  .hw_display{
    width: 100%;
  }
  .hw_display_con{
    width: 100%;
    background: #f8f8f8;
    margin-bottom: 0.18rem;
    box-shadow: 0 0 0.1rem rgba(0,0,0,.2);
    position: relative;
  }
  .hw_display_con .hw_display_con_pic{
    width: 3.34rem;
    height: 1.45rem;
    margin: 0 auto;
    padding: 0.08rem 0;
  }
  .hw_display_con p{
    font-size: 0.14rem;
    color: #585858;
    text-align: center;
    line-height: 0.26rem;
    padding-bottom: 0.08rem;
    margin: 0 auto;
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .hw_jingpianzhanshi{
    position: absolute;
    top: 0.25rem;
    left: 0.25rem;
    width: 0.26rem;
    height: 1.1rem;
  }
  /*文物故事*/
  .hw_story{
    width: 100%;
  }
  .hw_story_con{
    width: 100%;
    display: flex;
    background: #f8f8f8;
    padding: 0.17rem 0;
    margin-bottom: 0.1rem;
  }
  .hw_story_con .image{
    width: 0.72rem;
    height: 0.75rem;
    padding: 0 0.17rem 0 0.06rem;
  }
  .hw_story_con .image img{
    width: 0.72rem;
    height: 0.75rem;
  }
  .hw_story_right{
  }
  .hw_story_right h3{
    color: #333333;
    font-size: 0.16rem;
    line-height: 0.25rem;
    font-weight: normal;
    padding-bottom: 0.04rem;
    width: 2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
  }
  .hw_story_right p{
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
  /*亲切留念*/
  .hw_souvenir{
    width: 100%;
    column-count: 2;
    column-gap:0.16rem;
    column-span: none;
  }
  .hw_souvenir_con{
    width: 1.67rem;
    background: #f8f8f8;
    box-shadow: 0 0 0.03rem rgba(0,0,0,.2);
    break-inside: avoid;
    margin-bottom: 0.1rem;
  }
  .hw_souvenir_con img{
    width: 1.53rem;
    margin: 0 auto;
    padding: 0.09rem 0;
  }
  .hw_souvenir_con p{
    color: #585858;
    font-size: 0.13rem;
    line-height: 0.22rem;
    padding: 0.06rem 0 0.1rem;
    text-align: center;
  }


  /*修改mint-ui默认样式*/
  .mint-navbar{
    padding: 0.12rem 0;
  }
  .mint-navbar .mint-tab-item.is-selected{
    border: none;
  }
  .mint-tab-item{
    background: #e7d7bd;
  }
  .mint-navbar .mint-tab-item{
    font-size: 0.16rem;
    color: #905223;
    text-align: center;
    line-height: 0.39rem;
    width: 1.13rem;
    height: 0.39rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
  }
  .mint-navbar .mint-tab-item.is-selected{
    color: #e7d7bd;
    background: #905223;
  }
  .mint-tab-item .mint-tab-item-label{
    font-size: 0.16rem;
    color: #905223;
    text-align: center;
    line-height: 0.39rem;
  }
  .mint-tab-item{
    flex: none;
  }
  .mint-navbar{
    justify-content: space-between;
  }
</style>
