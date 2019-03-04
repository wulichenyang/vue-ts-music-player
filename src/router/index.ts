import Vue from "vue"
import Router from "vue-router"
import Recommend from "@/views/Recommend.vue"
import Rank from "@/views/Rank.vue"
import Singer from "@/views/Singer.vue"
import Search from "@/views/search.vue"
import User from "@/views/user.vue"
import Player from "@/views/player.vue"
import Login from "@/views/login.vue"
import LoginForm from "@/components/login-form/login-form.vue"
import cookie from "@/assets/js/cookie.ts";

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