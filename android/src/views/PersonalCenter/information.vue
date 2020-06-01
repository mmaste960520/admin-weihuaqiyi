<template>
    <div class="tp">
      <div class="hw_box">
        <!-- 头部 -->
        <header>
          <h3>个人信息</h3>
          <div class="hw_return" @click='prev'>
            <img src="../../../static/img/ico_return.png" alt="">
          </div>
        </header>
        <!--内容-->
        <div class="hw_content">
          <div class="hw_con">
            <div class="hw_menu hw_menu_touxiang">
              <p>个人头像</p>
              <!-- <div class="hw_touxiang">
                <img :src="imgtouxiang" alt="" id="portrait">
                <input type="file" id="saveImage" style="display: none"/>
              </div> -->
              <!-- <div class="hw_touxiang" id="userImg" @click="imageSubmit()">
                <img :src="imgtouxiang" class="userImg" id="userTx">
                <input type="file" id="saveImage" style="display: none"/>
              </div> -->
              <!-- <div class="hw_touxiang" id="userImg" @click="touxiangSc()"> -->
                <!-- <a class="mui-navigate-right" id="userImg"  href="#">头像</a> -->
                <!-- <img class="userImg" src="../../assets/img/personal_photo.png"/> -->
              <!-- </div> -->
              <div class="hw_touxiang" id="userImg">
              	<img :src="imgPath" alt class="userImg" v-if="imgPath != '' && imgPath != null">
              	<img src="@/assets/user.png" alt class="userImg" v-if="imgPath == '' || imgPath == null">
                <!--<img :src="imgPath" class="userImg">-->
                <!-- <input type="file" id="file" value="" accept="image/*" multiple @change="imgChange('z_photo','z_file');" name="file" style="position: absolute;top: 0;width: 0.6rem;height: 0.58rem;opacity: 0; z-index:5;"/> -->
                <!--    照片添加    -->
                <div class="z_photo">
                  <div class="z_file">
                    <input type="file" name="file" id="file" value="" accept="image/*" multiple @change="imgChange('z_photo','z_file');"  style="position: absolute;top: 0;width: 0.6rem;height: 0.58rem;opacity: 0; z-index:5;"/>
                  </div>
                </div>

                <!--遮罩层-->
                <div class="z_mask" style="display: none;">
                  <!--弹出框-->
                  <div class="z_alert">
                    <p>确定要删除这张图片吗？</p>
                    <p>
                      <span class="z_cancel">取消</span>
                      <span class="z_sure">确定</span>
                    </p>
                  </div>
                </div>
              </div>



            </div>
          </div>
          <div class="hw_con">
            <div class="hw_menu" @click="NameSubmit(userName)">
              <p>用户名</p>
              <span v-if="userName">{{userName}}</span>
              <span v-else style="color: #b5b4b4;">请输入用户名</span>
            </div>
            <div class="hw_menu" @click="TheSex()">
              <p>性别</p>
              <span>{{sex}}</span>
            </div>
            <div class="hw_menu" @click="PhoneSubmit(phone)">
              <p>手机号</p>
              <span>{{phone}}</span>
            </div>
          </div>
          <div class="hw_con">
            <div class="hw_menu" @click="MailSubmit(email)">
              <p>邮箱号码</p>
              <span v-if="email">{{email}}</span>
              <span v-else style="color: #b5b4b4;">请输入邮箱</span>
            </div>
            <div class="hw_menu" @click="AddressSubmit(address)">
              <p>所在地区</p>
              <span v-if="address">{{address}}</span>
              <span v-else style="color: #b5b4b4;">请选择地区</span>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import { MessageBox } from 'mint-ui';
    export default {
      name: "information",
      data(){
        return{
          "sex": "",
          "userName": "",
          "phone": "",
          "email": "",
          "address": '',
          "imgPath": '',
          imgData:[],
          imgUrl:[],
          imageurl:'',
        }
      },
      mounted(){
        this.getprev();
      },

      methods:{
        prev(){
          this.$router.go(-1) //返回上一页
        },

        touxiangSc(){
              mui.plusReady(function(){
              document.getElementById('userImg').addEventListener('tap',function(){
                  if(mui.os.plus){
                      var a=[{
                          title:'拍照'
                      },{
                          title:'从手机相册选择'
                      }];
                      plus.nativeUI.actionSheet({
                          title:'修改头像',
                          cancel:'取消',
                          buttons:a
                      },function(b){
                          switch(b.index){
                              case 0:
                                  break;
                              case 1:
                                  //拍照
                                  getImages();
                                  break;
                              case 2:
                                  //打开相册
                                  galleryImages();
                                  break;
                              default:
                                  break;
                          }
                      },false);
                  }
              });

              //拍照
              function getImages(){
                  var mobileCamera=plus.camera.getCamera();
                  mobileCamera.captureImage(function(e){
                      plus.io.resolveLocalFileSystemURL(e,function(entry){
                          var path=entry.toLocalURL()+'?version='+new Date().getTime();
                          uploadHeadImg(path);
                      },function(err){
                          console.log("读取拍照文件错误");
                      });
                  },function(e){
                      console.log("er",err);
                  },function(){
                      filename:'_doc/head.png';
                  });
              }

              //从本地相册选择
              function galleryImages(){
                  console.log("你选择了从相册选择");
                  plus.gallery.pick(function(a){
                      plus.io.resolveLocalFileSystemURL(a,function(entry){
                          plus.io.resolveLocalFileSystemURL('_doc/',function(root){
                              root.getFile('head.png',{},function(file){
                                  //文件已经存在
                                  file.remove(function(){
                                      console.log("文件移除成功");
                                      entry.copyTo(root,'head.png',function(e){
                                          var path=e.fullPath+'?version='+new Date().getTime();
                                          uploadHeadImg(path);
                                      },function(err){
                                          console.log("copy image fail: ",err);
                                      });
                                  },function(err){
                                      console.log("删除图片失败：（"+JSON.stringify(err)+")");
                                  });
                              },function(err){
                                  //打开文件失败
                                  entry.copyTo(root,'head.png',function(e){
                                      var path=e.fullPath+'?version='+new Date().getTime();
                                      uploadHeadImg(path);
                                  },function(err){

                                      console.log("上传图片失败：（"+JSON.stringify(err)+")");
                                  });
                              });
                          },function(e){
                              console.log("读取文件夹失败：（"+JSON.stringify(err)+")");
                          });
                      });
                  },function(err){
                      console.log("读取拍照文件失败: ",err);
                  },{
                      filter:'image'
                  });
              };

              //上传图片
              function uploadHeadImg(imgPath){
                  var _this = this;
                  //选中图片之后，头像当前的照片变为选择的照片
                  var mainImg=document.getElementById('userImg');
                  mainImg.src=imgPath;


                  // var images=new Image();
                  // images.src=imgPath;
                  mui.alert('imgPath'+ imgPath);
                  // mui.alert('images.src'+ images.src);
                  // mui.alert('getBase64Image(images)'+ getBase64Image(images));

                  mui.alert(_this);
                  mui.alert(_this.imgData);
                  _this.imgData = imgPath;
                  mui.alert(_this.imgData);
                  _this.postImg();






                  // mui.ajax('syx/file/multipleUpload/',{

                  //   parmas: {
                  //     'file': imgData,
                  //     'menu': ''
                  //   },
                  //     dataType:'json',//服务器返回json格式数据
                  //     type:'post',//HTTP请求类型
                  //     timeout:10000,//超时时间设置为10秒；
                  //     success:function(data){
                  //         if(data.status=='1'){
                  //             mui.alert('上传成功！');
                  //         }
                  //     },
                  //     error:function(xhr,type,errorThrown){
                  //         if(type=='timeout'){
                  //             mui.alert('服务器连接超时，请稍后再试');
                  //         }
                  //     }
                  // });
              }


              //压缩图片转成base64
              function getBase64Image(img){
                  var canvas=document.createElement("canvas");
                  var width=img.width;
                  var height=img.height;
                  if(width>height){
                      if(width>100){
                          height=Math.round(height*=100/width);
                          width=100;
                      }
                  }else{
                      if(height>100){
                          width=Math.round(width*=100/height);
                      }
                      height=100;
                  }

                  canvas.width=width;
                  canvas.height=height;
                  var ctx=canvas.getContext('2d');
                  ctx.drawImage(img,0,0,width,height);

                  var dataUrl=canvas.toDataURL('image/png',0.8);
                  return dataUrl.replace('data:image/png:base64,','');
              }
          })
        },
        imgChange(obj1, obj2){
          //获取点击的文本框
          var file = document.getElementById("file");
          //存放图片的父级元素
          var imgContainer = document.getElementsByClassName(obj1)[0];
          //获取的图片文件
          var fileList = file.files;
          //文本框的父级元素
          var input = document.getElementsByClassName(obj2)[0];
          var imgArr = [];
          //遍历获取到得图片文件
          for (var i = 0; i < fileList.length; i++) {
            var imgUrl = window.URL.createObjectURL(file.files[i]);
            imgArr.push(imgUrl);
            var img = document.createElement("img");
            img.style.width = 1 + "rem";
            img.style.height = 1 + "rem";
            img.setAttribute("src", imgArr[i]);
            var imgAdd = document.createElement("div");
            imgAdd.setAttribute("class", "z_addImg");
            imgAdd.appendChild(img);
            imgContainer.appendChild(imgAdd);
            var data = new FormData();
            data.append('file', fileList[0]);
            data.append('menu',localStorage.id)
            $.ajax({
              url: localStorage.http + '/syx/file/multipleUpload/',
              type: 'POST',
              data: data,
              cache: false,
              processData: false,
              contentType: false
            }).done( (response)=> {
              this.imgPath = response.data.toString();
              this.xiugaitouxiang();
            });
          }
        },
        xiugaitouxiang() {
            this.$axios({
              method: 'put',
              url: 'syx/user/updatepersoninfo/' + localStorage.id,
              data: {
                'imgPath': this.imgPath,
              },
              headers: {
                'token': localStorage.token,
              }
            }).then((res) => {
              console.log(res.data.code)
              if (res) {
                if (res.data.code === 20000) {
                  //成功请求
                  //this.$router.go(-1) //返回上一页
                } else {
                  //请求失败
                  //this.$router.go(-1) //返回上一页
                  // MessageBox('提示', res.data.message);
                }
              }
            })
        },





        postImg () {
          mui.alert('走了')
          var _this = this;
          var formData= new formData();
          formData.append('file',_this.imgData);
          formData.append('menu',"dd");
          this.$axios({
            method: 'post',
            url: 'syx/file/multipleUpload/',
            parmas:formData,
            //dataType:'json',//服务器返回json格式数据
            //timeout:10000,//超时时间设置为10秒
            headers:{
              'token': localStorage.token,
              'Content-Type':"multipart/form-data"
            }
          }).then((res) => {
            // console.log(res.data.code)
            if (res) {
              if (res.data.code === 20000) {
                console.log(res.data.data[0])
                mui.alert(res.data.data[0])
              } else {
                mui.alert('服务器连接超时，请稍后再试');
              }
            }
          })
        },













      NameSubmit(val){
          this.$router.push({
            path: '/theinformation',//修改用户名
            query: {
              userName: val,
            }
          })
        },
        TheSex(){
          this.$router.push({
            path: '/TheSex',//修改性别
          })
        },
        PhoneSubmit(aa){
          console.log(aa)
          this.$router.push({
            path: '/ThePhone',//修改手机号
            query: {
              phone: aa,
            }
          })
        },
        MailSubmit(bb){
          console.log(bb)
          this.$router.push({
            path: '/TheMail',//修改邮箱
            query: {
              email: bb,
            }
          })
        },
        AddressSubmit(cc){
          console.log(cc)
          this.$router.push({
            path: '/TheAddress',//修改地区
            query: {
              address: cc,
            }
          })
        },

        //内容接口
        getprev() {
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
                console.log(res.data.message);
                console.log(res.data.data);
                _this.items = res.data.data;
                _this.phone = _this.items.phone;//手机
                _this.userName = _this.items.userName;//姓名
                _this.email = _this.items.email;//邮箱
                _this.address = _this.items.address;//地区
                _this.imgPath = _this.items.imgPath;//头像
                if(_this.items.sex == 2 ){
                  _this.sex = '男'
                }else{
                  _this.sex = '女'
                }
              } else {
                //请求失败
                // MessageBox('提示', res.data.message);
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
    background: #f8f8f8;
    width: 100%;
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
    padding-top: 0.47rem;
  }
  .hw_con{
    width: 100%;
    margin-bottom: 0.1rem;
  }
  .hw_menu{
    width: 100%;
    height: 0.56rem;
    padding: 0 0.2rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    border-bottom: 1px solid #f9f9f9;
    position: relative;
  }
  .hw_menu_touxiang{
    height: 0.85rem;
  }
  .hw_touxiang{
    width: 0.58rem;
    height: 0.58rem;
  }
  .hw_touxiang img{
    width: 0.58rem !important;
    height: 0.58rem !important;
    border-radius: 50% !important;
  }
  .hw_menu p{
    color: #000;
    font-size: 0.15rem;
  }
  .hw_menu span{
    color: #5c5b5b;
    font-size: 0.13rem;
  }
  /*.hw_menu img{*/
    /*width: 0.08rem;*/
    /*height: 0.14rem;*/
  /*}*/





</style>
