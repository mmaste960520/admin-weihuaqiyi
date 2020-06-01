// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import login from './views/login'
import "../static/style.css" //公共样式

import $ from 'jquery'

//引入mui
import Mui from 'vue-awesome-mui';
Vue.use(Mui);
//引入mint-ui
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(Mint);
// 按需引入
import { Switch, Navbar, TabItem, Radio, Swipe, SwipeItem, Popup, MessageBox, Picker, } from 'mint-ui';
//mint-ui引入 Switch
Vue.component(Switch.name, Switch);
//mint-ui引入Navbar（选项卡）
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
// mint-ui引入单选
Vue.component(Radio.name, Radio);
//mint-ui swiper 轮播图
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
//mint-ui 弹出
Vue.component(Popup.name, Popup);
//mint-ui 选择器
Vue.component(Picker.name, Picker);

import axios from 'axios'
Vue.prototype.$axios = axios;

axios.defaults.baseURL = ''
// axios.defaults.baseURL = 'http://localhost:9014'
let http = axios.defaults.baseURL;
localStorage.setItem('http', http)

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})