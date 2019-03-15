import Vue from "vue"
import Router from "vue-router"
import cookie from "@/assets/js/cookie.ts";

// Pages
const Recommend = (r:any) => (require as any)['ensure']([], () => r(require('@/views/Recommend.vue')));
const Rank = (r:any) => (require as any)['ensure']([], () => r(require('@/views/Rank.vue')));
const Singer = (r:any) => (require as any)['ensure']([], () => r(require('@/views/Singer.vue')));
const Search = (r:any) => (require as any)['ensure']([], () => r(require('@/views/search.vue')));
const User = (r:any) => (require as any)['ensure']([], () => r(require('@/views/user.vue')));
const Player = (r:any) => (require as any)['ensure']([], () => r(require('@/views/player.vue')));
// 登录模块需要首先加载
import Login from '@/views/login.vue'
import LoginForm from '@/components/login-form/login-form.vue'
import MusicList from '@/components/music-list/music-list.vue'
// const Login = (r:any) => (require as any)['ensure']([], () => r(require('@/views/login.vue')));
// const LoginForm = (r:any) => (require as any)['ensure']([], () => r(require('@/components/login-form/login-form.vue')));
// const MusicList = (r:any) => (require as any)['ensure']([], () => r(require('@/components/music-list/music-list.vue')));

import {
  refreshLoginStatus,
} from '@/api/user'

Vue.use(Router)

const router = new Router({
  routes: [
    // 默认跳转到 recommend
    {
      path: "/",
      redirect: "/recommend",
    },
    {
      path: "/recommend",
      name: "recommend",
      component: Recommend,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          name: 'musicList',
          path: ':id',
          component: MusicList,
          meta: {
            requiresAuth: true,
          }
        }
      ]
    },
    {
      path: "/rank",
      name: "rank",
      component: Rank,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: "/singer",
      name: "singer",
      component: Singer,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: "/player",
      name: "player",
      component: Player,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: "/user",
      name: "user",
      component: User,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: "/search",
      name: "search",
      component: Search,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      children: [
        {
          path: "/login/:by",
          name: "loginBy",
          component: LoginForm,
        }
      ]
    },

  ],
})
//to: 即将进入的目标路由对象，
// from: 当前导航正要离开的路由
// next: 下一步执行的函数钩子
router.beforeEach((to, from, next) => {
  // 如果即将进入登录路由，则直接放行
  if ((to.path.indexOf('/login')) != -1) {
    next()
  } else {// 进入的不是登录路由
    let token = cookie.getCookie('accessToken')
    if (to.meta.requiresAuth && !token) {
      next({
        path: '/login',
      })
    } else { // 如果不需要登录验证，或者已经登录成功，
             // 则直接放行并刷新token
      cookie.setCookie('accessToken', token, 0.2)
      refreshLoginStatus()
      next()
    }
  }
})

export default router