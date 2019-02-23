import Vue from "vue"
import Router from "vue-router"
import Recommend from "@/views/Recommend.vue"
import Rank from "@/views/Rank.vue"
import Singer from "@/views/Singer.vue"
import Search from "@/views/search.vue"
import User from "@/views/user.vue"
import Player from "@/views/player.vue"

Vue.use(Router)

export default new Router({
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
    },
    {
      path: "/rank",
      name: "rank",
      component: Rank,
    },
    {
      path: "/singer",
      name: "singer",
      component: Singer,
    },
    {
      path: "/player",
      name: "player",
      component: Player,
    },
    {
      path: "/user",
      name: "user",
      component: User,
    },
    {
      path: "/search",
      name: "search",
      component: Search,
    },
  ],
})
