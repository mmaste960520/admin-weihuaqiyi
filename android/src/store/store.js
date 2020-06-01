// import Vue from 'vue'
// import Vuex from 'vuex'
// Vue.use(Vuex)
//
// const store = new Vuex.Store({
//
//   state: {
//     // 存储token
//     Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
//   },
//
//   mutations: {
//     // 修改token，并将token存入localStorage
//     changeLogin (state, user) {
//       state.Authorization = user.Authorization;
//       localStorage.setItem('Authorization', user.Authorization);
//     }
//   }
// });
//
// export default store;

// 添加请求拦截器，在请求头中加token
// axios.interceptors.request.use(
//   config => {
//     if (localStorage.getItem('Authorization')) {
//       config.headers.Authorization = localStorage.getItem('Authorization');
//     }
//
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   });



