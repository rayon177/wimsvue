import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import UserManage from  '../components/UserManage'
import WeatherPush from  '../components/WeatherPush'
import WeatherSearch from  '../components/WeatherSearch'
import Login from '../components/Login'
import Top from '../components/Top'

Vue.use(Router)

export  default  new Router({
  routes: [
    {path: '/', redirect:'/Login'},
    {path: '/Login', name: 'Login', component: Login},
    {path: '/Top', name: 'Top', component: Top,
       children:[
            {path: '/', redirect:'Home'},
            {path: 'Home', name: 'Home', component: Home} ,
            {path: 'WeatherPush', name: 'WeatherPush', component: WeatherPush},
            {path: 'WeatherSearch', name: 'WeatherSearch', component: WeatherSearch},
            {path: 'UserManage', name: 'UserManage', component: UserManage}
       ] 
    },
  ]
})


