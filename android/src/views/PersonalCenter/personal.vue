<template>
    <div class="tp">
      <div class="hw_box">
        <div class="hw_top">
          <!-- 头部 -->
          <header>
            <h3>个人中心</h3>
            <!-- <div class="hw_return">
              <img src="../../../static/img/ico_return.png" alt="">
            </div> -->
          </header>
          <!--个人信息-->
          <div class="hw_personal">
            <div class="hw_personal_con">
              <!--头像-->
              <img @click="informationSubmit()" class="hw_photo" :src="imgPath" alt="" />
              <div class="hw_level">
                <h3>{{userName}}</h3>
                <div class="hw_star">
                  <img src="@/assets/img/Playmates_toys.png" v-for="a in level" :key="a"/>
                  <img src="@/assets/img/greystar.png"  v-for="a in levels" :key="a"/>
                </div>
              </div>
              <!--消息通知-我的留言-->
              <div class="hw_notice">
                <div class="hw_message hw_notice_message" @click="alertsSubmit()">
                  <img src="@/assets/img/ico_notice.png" alt="" />
                  <p>消息通知</p>
                  <span>({{XiaoXiLength}})</span>
                </div>
                <img class="hw_shuxian" src="@/assets/img/ico_shuxian.png" alt="" />
                <div class="hw_message hw_mymessage" @click="liuyanSubmit()">
                  <img src="@/assets/img/ico_message.png" alt="" />
                  <p>我的留言</p>
                  <!-- 这里我的留言后边数字为回复条数，点击进去为我的所有留言 -->
                  <span>({{liuyan}})</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!--中间内容-->
        <div class="hw_content">
          <div class="hw_con">
            <div class="hw_menu_box" @click="mylevelSubmit()">
              <div class="hw_menu_left">
                <div class="hw_icobg">
                  <img src="@/assets/img/ico_level.png" alt="" />
                </div>
                <span>我的等级</span>
              </div>
              <div class="hw_menu_right">
                <span>{{jibie}}级</span>
                <img src="../../../static/img/ico_the.png" alt="" />
              </div>
            </div>
          </div>

          <div class="hw_con">
            <!--个人信息-->
            <div class="hw_menu_box" @click="informationSubmit()">
              <div class="hw_menu_left">
                <div class="hw_icobg">
                  <img src="@/assets/img/ico_call.png" alt="" />
                </div>
                <span>个人信息</span>
              </div>
              <div class="hw_menu_right">
                <span></span>
                <img src="../../../static/img/ico_the.png" alt="" />
              </div>
            </div>
            <!--修改密码-->
            <div class="hw_menu_box" @click="passwordSubmit(phone)">
              <div class="hw_menu_left">
                <div class="hw_icobg">
                  <img src="@/assets/img/ico_the_password.png" alt="" />
                </div>
                <span>修改密码</span>
              </div>
              <div class="hw_menu_right">
                <span></span>
                <img src="../../../static/img/ico_the.png" alt="" />
              </div>
            </div>
          </div>

          <div class="hw_con">
            <!--系统升级-->
            <div class="hw_menu_box" @click="upgradeSbumit()">
              <div class="hw_menu_left">
                <div class="hw_icobg">
                  <img src="@/assets/img/ico_upgrade.png" alt="" />
                </div>
                <span>系统升级</span>
              </div>
              <div class="hw_menu_right">
                <span></span>
                <img src="../../../static/img/ico_the.png" alt="" />
              </div>
            </div>
            <!--系统设置-->
            <div class="hw_menu_box" @click="setSubmit()">
              <div class="hw_menu_left">
                <div class="hw_icobg">
                  <img src="@/assets/img/ico_system_settings.png" alt="" />
                </div>
                <span>系统设置</span>
              </div>
              <div class="hw_menu_right">
                <span></span>
                <img src="../../../static/img/ico_the.png" alt="" />
              </div>
            </div>
          </div>

          <div class="hw_con">
            <!--退出登录-->
            <div class="hw_menu_box" @click="exitSbumit()">
              <div class="hw_menu_left">
                <div class="hw_icobg">
                  <img src="@/assets/img/ico_exit.png" alt="" />
                </div>
                <span>退出登录</span>
              </div>
              <div class="hw_menu_right">
                <span></span>
                <!--<img src="../../../static/img/ico_the.png" alt="" />-->
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
          <div class="hw_navigation" @click="CulturalEducationSubmit()">
            <div class="hw_culture"></div>
            <p>文化教育</p>
          </div>
          <div class="hw_navigation">
            <div class="hw_personal_center"></div>
            <p class="hw_color_hover">个人中心</p>
          </div>
        </div>
        <!--系统升级-->
        <div id="hw_up_window">
          <div class="hw_up_content">
            <img src="@/assets/img/ico_up_window.png" alt="" />
            <p>版本更新啦！优化使用体验更人性化！<br/>立即更新</p>
            <div class="hw_up_btn">
              <a href="javascript:;" @click='cancelSubmit()'>暂时忽略</a>
              <a :href="upurl" @click='upgradeSubmit()'>立即升级</a>
            </div>
          </div>
        </div>
        <!--遮罩层-->
        <div id="hw_zhezhao" @click='zhezhaoSubmit()'></div>

      </div>
    </div>
</template>

<script>
  import { Indicator } from 'mint-ui';
  import { MessageBox } from 'mint-ui';
    export default {
      name: "personal",
      data(){
        return{
          imgPath:'',
          userName:'',//姓名
          phone:'',//手机号
          upurl:'',
          liuyan:'',//留言数量
          XiaoXiLength:'',//消息数量
          level:'',//等级
          levels:'',//灰色星星
          jibie:'',//级别
          items:[],
        }
      },

      mounted(){
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        var hw_zhezhao = document.querySelector("#hw_zhezhao");
        var hw_up_window = document.querySelector("#hw_up_window");
        this.chushihua();
        this.gerenxinxi();//获取个人信息
        this.huoqudengji();//获取等级
      },


      methods: {
        // 初始化页面
        chushihua(){
          var _this = this;
          this.$axios({
            method:'post',
            url:'syx/user/personalcenter/' + localStorage.id,
            data:{},
          }).then( (res) =>{
            console.log(res.data.code)
            if(res){
              if(res.data.code === 20000){
                //成功请求
                _this.items = res.data.data;
                
                _this.liuyan = _this.items.liuyan.length; //留言数量
                _this.XiaoXiLength = _this.items.xiaoxi.length;//消息数量
                Indicator.close();
              } else {
                //请求失败
                // MessageBox('提示', res.data.message);
              }
            }
          })
        },
        huoqudengji(){
          var _this = this;
          this.$axios({
            method: 'post',
            url: 'syx/user/userleveldetail/'+ localStorage.id,
            data: {
            },
            headers:{
              'token': localStorage.token,
            }
          }).then((res) => {
            console.log(res.data.code)
            if (res) {
              if (res.data.code === 20000) {
                //成功请求
                _this.items = res.data.data;
                _this.level = Number(_this.items.level);//等级
                _this.levels = 5-_this.level;
                console.log( _this.level)
                if(_this.items.level == 1){
                  _this.jibie = '一'
                } else if(_this.items.level == 2){
                  _this.jibie = '二'
                } else if(_this.items.level == 3){
                  _this.jibie = '三'
                } else if(_this.items.level == 4){
                  _this.jibie = '四'
                } else if(_this.items.level == 5){
                  _this.jibie = '五'
                } else {
                  _this.jibie = '无'
                }
              } else {
                //请求失败
                // MessageBox('提示', res.data.message);
              }
            }
          })
        },
        //获取个人信息
        gerenxinxi(){
          var _this = this;
          this.$axios({
            method: 'get',
            url: 'syx/user/'+ localStorage.id,
            data: {
            },
            headers:{
              'token': localStorage.token,
            }
          }).then((res) => {
            console.log(res.data.code)
            if (res) {
              if (res.data.code === 20000) {
                //成功请求
                _this.items = res.data.data;
                _this.userName = _this.items.userName;//姓名
                _this.phone = _this.items.phone;//手机号
                _this.imgPath = !!_this.items.imgPath?_this.items.imgPath:require('@/assets/user.png');//头像
                localStorage.setItem('imgPath',_this.items.imgPath) // 存储头像
              } else {
                //请求失败
                // MessageBox('提示', res.data.message);
              }
            }
          })
        },

        //消息通知
        alertsSubmit(){
          this.$router.push('/alerts')
        },
        //我的留言
        liuyanSubmit(){
          this.$router.push('/MyLiuYan')
        },
        //我的等级
        mylevelSubmit(){
          this.$router.push('/mylevel')
        },
        //个人信息
        informationSubmit(){
          this.$router.push('/information')
        },
        //修改密码
        passwordSubmit(val){
          this.$router.push({
            path: '/password',//修改密码
            query: {
              phone: val,
            }
          })
        },
        //系统升级
        upgradeSbumit(){
          console.log('token' + localStorage.getItem('token'));
          this.getprev()
        },
        //点击遮罩层隐藏
        zhezhaoSubmit(){
          hw_zhezhao.style.display = 'none';
          hw_up_window.style.display = 'none';
        },
        //忽略升级
        cancelSubmit(){
          hw_zhezhao.style.display = 'none';
          hw_up_window.style.display = 'none';
        },
        //升级按钮
        // upgradeSubmit(){
        //   this.appDown();
        // },

        //升级接口
        getprev() {
          var _this = this;
          this.$axios({
            method: 'get',
            url: 'syx/site',
            headers:{
              'token': localStorage.token,
            }
          }).then((res) => {
            console.log(res.data.code)
            if (res) {
              if (res.data.code === 20000) {
                  //成功请求
                  _this.items = res.data.data;
                  if(_this.items[0].iosVersion === '1.0.0'){
                    MessageBox('提示', '已是最新版本');
                  } else {
                    hw_zhezhao.style.display = 'block';
                    hw_up_window.style.display = 'block';
                    //判断ios还是安卓
                    var u = navigator.userAgent;
                    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
                    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                    if(isiOS){
                      _this.upurl = this.items[0].isoDownloadPath;
                      // MessageBox('提示', '我是苹果');
                    }else if(isAndroid){
                      _this.upurl = this.items[0].androidDownloadPath;
                      // MessageBox('提示', '我是安卓');
                    }
                  }
              } else {
                //请求失败
                // MessageBox('提示', res.data.message);
              }
            }
          })
        },

        //系统设置
        setSubmit(){
          this.$router.push('/set')
        },
        //陈列展览
        exhibitSubmit() {
          this.$router.push('/exhibition')
        },
        //数字展馆
        digitalSubmit() {
          this.$router.push('/pavilion')
        },
        //退出登录-登录页
        exitSbumit(){
          // localStorage.clear();
          localStorage.removeItem('password');
          localStorage.removeItem('username');
          localStorage.removeItem('id');
          localStorage.removeItem('token');
          localStorage.removeItem('jixing');
          localStorage.removeItem('moduleType');
          this.$router.push('/')
        },
        //文化教育
        CulturalEducationSubmit() {
          this.$router.push('/CulturalEducation')
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
    background: #f8f8f8;
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
  /*个人信息*/
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
    border-radius: 50%;
    border: 0.03rem solid rgba(255,255,255,.5);
  }
  .hw_level{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 0.58rem;
  }
  .hw_level h3{
    color: #000;
    font-size: 0.17rem;
    float: left;
  }
  .hw_star{
    display: flex;
    margin-left: 0.06rem;
    position: relative;
  }
  .hw_star img{
    width: 0.14rem;
    height: 0.14rem;
    margin: 0 0.02rem;
  }
  /*消息通知-我的留言*/
  .hw_notice{
    display: flex;
    justify-content: center;
    width: 100%;
    height: 0.52rem;
  }
  .hw_message{
    display: flex;
    align-items: center;
  }
  .hw_message img{
    width: 0.15rem;
    height: 0.18rem;
    margin-left: 0.16rem;
  }
  .hw_mymessage img{
    width: 0.16rem;
    height: 0.16rem;
  }
  .hw_message p{
    color: #535353;
    font-size: 0.15rem;
    padding-left: 0.08rem;
    padding-right: 0.18rem;
  }
  .hw_message span{
    color: #ff380d;
    font-size: 0.15rem;
    padding-right: 0.06rem;
  }
  .hw_shuxian{
    width: 0.16rem;
    height: 0.52rem;
  }
  /*中间内容*/
  .hw_content{
    width: 100%;
    margin-bottom: 0.5rem;
  }
  .hw_con{
    width: 100%;
    margin-top: 0.11rem;
  }
  .hw_menu_box{
    width: 100%;
    padding: 0 0.17rem;
    box-sizing: border-box;
    background: #fff;
    display: flex;
    justify-content: space-between;
    line-height: 0.55rem;
    border-top: 1px solid #f8f8f8;
  }
  .hw_menu_left{
    display: flex;
    align-items: center;
  }
  .hw_menu_left span{
    font-size: 0.16rem;
    color: #000;
    padding-left: 0.14rem;
  }
  .hw_icobg{
    width: 0.22rem;
    height: 0.22rem;
    border-radius: 50%;
    /*background: #e1b465;*/
    background: linear-gradient(-135deg, #dfae5e, #f4dea0);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .hw_icobg img{
    width: 0.15rem;
    max-height: 0.15rem;
  }
  .hw_menu_right{
    display: flex;
    align-items: center;
  }
  .hw_menu_right span{
    color: #424241;
    font-size: 0.14rem;
  }
  .hw_menu_right img{
    width: 0.08rem;
    height: 0.14rem;
    margin-left: 0.11rem;
    margin-right: 0.08rem;
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
    background: url(../../assets/img/ico_digital.png);
    background-size: 100% 100%;
  }
  .hw_navigation:hover .hw_digital{
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
    background: url(../../assets/img/ico_personal_center_hover.png);
    background-size: 100% 100%;
  }
  .hw_navigation:hover p{
    color: #ce8944;
  }
  .hw_navigation .hw_color_hover{
    color: #ce8944;
  }


  /*系统升级*/
  #hw_up_window{
    width: 3.25rem;
    position: fixed;
    top: 35%;
    left: 50%;
    margin-left: -1.62rem;
    z-index: 600;
    display: none;
  }
  .hw_up_content{
    width: 100%;
    background: #fff;
    position: relative;
    border-radius: 0.05rem;
  }
  .hw_up_content img{
    width: 1.72rem;
    height: 1.52rem;
    position: absolute;
    left: 0;
    top: -0.72rem;
    right: 0;
    margin: auto;
  }
  .hw_up_content p{
    font-size: 0.15rem;
    text-align: center;
    width: 100%;
    line-height: 0.23rem;
    padding-top: 0.9rem;
    color: #9494a0;
    border-bottom: 0.01rem solid #d1d1da;
  }
  .hw_up_btn{
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-top: 0.05rem;
    padding-bottom: 0.1rem
  }
  .hw_up_btn a{
    display: block;
    color: #9494a0;
    width: 50%;
    line-height: 0.45rem;
    font-size: 0.16rem;
    text-align: center;
    border-left: 1px solid #d1d1da;
  }
  .hw_up_btn :last-child{
    color: #fcb048;
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

</style>
