import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '@/views/MainPage'

import HomePage from '@/views/MainPage/Home'
import Category from '@/views/MainPage/Category'
import Cart from '@/views/MainPage/Cart'
import AboutMe from '@/views/MainPage/AboutMe'

import store from '@/store/index'

const LogIn = () => import('@/views/LogIn')
const MyOrder = () => import('@/views/MyOrder')
const MyMoney = () => import('@/views/Pay')
const ChooseAddress = () => import('@/views/Pay/chooseAddress')
const EditAddress = () => import('@/views/Pay/editAddress')
const ProDetail = () => import('@/views/ProDetail')
const Search = () => import('@/views/Search')
const searchList = () => import('@/views/Search/searchList')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: MainPage,
      redirect: '/home',
      children: [{ path: '/home', component: HomePage },
        { path: '/category', component: Category },
        { path: '/cart', component: Cart },
        { path: '/me', component: AboutMe }
      ]
    },
    { path: '/login', component: LogIn },
    { path: '/order', component: MyOrder },
    { path: '/pay', component: MyMoney },
    { path: '/choose_address', component: ChooseAddress },
    { path: '/edit_address', component: EditAddress },
    { path: '/detail/:id', component: ProDetail },
    { path: '/search', component: Search },
    { path: '/searchlist', component: searchList }
  ]
})

// ----------------------------全局前置守卫-------------------------------------------
// to：即将要进入的目标路由对象
// from：当前导航正要离开的路径
// next：next() 表示所有导航均放行，next('/') 表示强制跳转到'/'
const confirmUrl = ['/pay']
router.beforeEach((to, from, next) => {
  if (!confirmUrl.includes(to.path)) { // 访问不需要登录的页面，直接通过
    next()
  } else {
    if (store.getters.userToken) { // 访问需要登录的页面，检查是否有token
      next()
    } else {
      next('/login')
    }
  }
})

export default router
