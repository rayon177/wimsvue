// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import VueCookies from 'vue-cookies';
// @ 代表src 在配置文件中可以改 webpack.base.conf.js
import UserType from '@/components/UserType'  
Vue.prototype.UserType = UserType;
Vue.prototype.$http=axios; //修改内部的$http为axios 
Vue.use(ElementUI)
Vue.use(UserType)
Vue.config.productionTip = false


// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
  config => {
     let token = localStorage.getItem('token');
    if (token) {
      console.log(token);
      config.headers['token'] =token;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  });
// 添加响应拦截器，处理后端验证用户登录信息结果
  axios.interceptors.response.use(
    response => {
      
     if (response.data.code !=null&&response.data.code == "401") {
       console.log(router);
       router.push("/login")
     }
     return response
    },
    error => {
     return Promise.reject(error)
    }
   )

     //  使用  钩子函数 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
     router.beforeEach((to, from, next) => {
      console.log("进入路由守卫");
      // console.log(to);
      // console.log("_____________________________________")
       console.log(to.path);
      if (to.path === '/Login' || to.path === '/') {
        next();
      } 
      else {
        let token = localStorage.getItem('token');
        // console.log(token);
        if (token === null || token === '') {
          next('/Login');
        } else {
          next();
        }
      }
    });




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
