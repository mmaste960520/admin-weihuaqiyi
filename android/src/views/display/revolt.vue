<template>
    <div class="tp">
      <div class="hw_box">
        <!-- 头部 -->
        <header>
          <h3>渭华课堂</h3>
          <div class="hw_return" @click='prev'>
            <img src="../../../static/img/ico_return.png" alt="">
          </div>
        </header>
        <!--内容-->
        <div class="hw_content">
          <div class="hw_con" @click="RevoltDetailsSbumit(item.id)" :key='index' v-for="(item,index) in items" :id=item.id>
            <div class="hw_con_cover">
              <div class="hw_con_pic">
                <video loop ref="videos" :poster="item.imgPath">
                  <source :src="item.uploadPath" type="video/mp4"/>
                </video>
              </div>
              <div class="hw_zhezhao"></div>
              <img class="hw_ico_play" src="@/assets/img/ico_play.png" alt="" />
            </div>
            <div class="hw_con_right">
              <h4>{{item.title}}</h4>
              <span>{{item.createTime}}</span>
              <p>{{item.description}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import { Indicator } from 'mint-ui';
  import { MessageBox } from 'mint-ui';
    export default {
      name: "revolt",
      data(){
        return{
          items:[
            {
              title:'',//标题
              createTime:'',//时间
              description:'',//内容
              id:'',//id
              imgPath:'',//封面
            }
          ]
        }
      },
      mounted(){
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        this.getprev();
      },

      methods:{
        prev(){
          this.$router.go(-1)
        },
        RevoltDetailsSbumit(val){
          this.$router.push({
            path: '/RevoltDetails',
            query: {
              id: val
            }
          })
        },
        //内容接口
        getprev(){
          var _this = this;
          this.$axios({
            method:'post',
            url:'syx/weihuajiangtang/search/',
            data:{
              "userId": "9425",
            },
          }).then( (res) =>{
            if(res){
              if(res.data.code === 20000){
                //成功请求
                _this.items = res.data.data;
                this.$refs.videos.src = _this.items;
                Indicator.close();
                if(localStorage.moduleType !== '2'){
                  this.mokuaifangwen();//模块接口
                }
              } else {
                //请求失败
                // MessageBox('提示', res.data.message);
              }
            }
          })
        },
        //模块访问
        mokuaifangwen(){
          this.$axios({
            method: 'post',
            url: 'syx/visitorModule',
            data: {
              "moduleType":"2",
              "deviceType": localStorage.jixing,
              "userId": localStorage.id
            },
          }).then((res) => {
            if (res) {
              if (res.data.code === 20000) {
                //成功请求
                let moduleType = '2';
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
    padding: 0 0.09rem;
    box-sizing: border-box;
    padding-top: 0.47rem;
  }
  .hw_content :last-child{
    border: none;
  }
  .hw_con{
    width: 100%;
    display: flex;
    position: relative;
    padding: 0.13rem 0;
    border-bottom: 1px solid #dcdcdc;
  }
  .hw_con_cover{
    width: 1.39rem;
    height: 0.93rem;
    margin-right: 0.1rem;
    position: relative;
  }
  .hw_con_pic{
    width: 1.39rem;
    height: 0.93rem;
    border-radius: 0.04rem;
  }
  .hw_con_pic{
    width: 1.39rem;
    height: 0.93rem;
    overflow: hidden;
    position: relative;
  }
  .hw_con_pic video{
    width: 100%;
    /*height: 1.67rem;*/
  }
  .hw_zhezhao{
    width: 1.39rem;
    height: 0.93rem;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.3);
    border-radius: 0.04rem;
  }
  .hw_ico_play{
    width: 0.28rem;
    height: 0.28rem;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -0.14rem;
    margin-top: -0.14rem;
  }
  .hw_con_right{
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .hw_con_right h4{
    display: block;
    font-weight: normal;
    color: #323232;
    font-size: 0.15rem;
    width: 1.95rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 0.2rem;
  }
  .hw_con_right span{
    color: #929292;
    font-size: 0.11rem;
    line-height: 0.25rem;
  }
  .hw_con_right p{
    font-size: 0.12rem;
    color: #5d5d5d;
    line-height: 0.16rem;
    height: 0.32rem;
    padding-top: 0.07rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

</style>
