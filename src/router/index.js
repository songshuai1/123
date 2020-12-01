import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// 引入路由模块化的文件
import centerRouter from './routes/center'
import cinemaRouter from './routes/cinema'
import filmRouter from './routes/film'
import detail from './routes/Detail'
import city from './routes/city'
import Vuex from './routes/Vuex'
import login from './routes/login'
import cinemas from './routes/cinemas'
import cineplex from './routes/cineplex'
const routes = [
  {
    path: '/',
    // 路由重定向 访问首页 重定向到film路由
    redirect: '/film'
  },
  centerRouter,
  cinemaRouter,
  filmRouter,
  detail,
  city,
  Vuex,
  login,
  cinemas,
  cineplex
]

const router = new VueRouter({
  mode: 'history',
  // 前缀
  // base: process.env.BASE_URL,
  routes
})
// 路由守卫
// router.beforeEach((to, from, next) => {
//   let arr = [
// 存需要登录的页面地址
//     '/cinema'
// ...
//   ]
//   if (arr.includes(to.path)) {
// 返回真择在
//     if (localStorage.getItem('_token')) {
// 登录
//       next()
//     } else {
// 没登录
// console.log('你没登录');
// 往登录页面跳转
//       next({ path: '/login', query: { 'refer': to.fullPath } })
//     }
//   } else {
// 不在(不需要登录的判断)
//     next()
//   }
// console.log(to.path);
// })


const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
export default router
