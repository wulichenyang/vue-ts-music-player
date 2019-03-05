import { Commit } from "vuex"
// import shop from '../../api'
import * as types from "../mutation-types"
// import { CartProduct, CheckoutStatus, AddToCartPayload } from "../index"
import { loginByPhone, loginByEmail } from './../../api/user';
import cookie from "@/assets/js/cookie.ts";
import { Toast } from "vant";

export interface UserTokenType {
  account: {
    anonimousUser: boolean
    // ban: 0
    // baoyueVersion: 0
    createTime: number
    // donateVersion: 0
    id: number
    // salt: ""
    status: number
    tokenVersion: number
    type: number
    userName: string
    vipType: number
    viptypeVersion: number
    whitelistAuthority: number
  }
  bindings: [{
    expired: boolean
    expiresIn: number
    id: number
    refreshTime: number
    tokenJsonStr: string
    type: number
    url: string
    userId: number
  }
  ]
  loginType: number
  profile: {
    avatarUrl: string,
    backgroundUrl: string,
    birthday: number,
    city: number,
    defaultAvatar: true
    description: string
    detailDescription: string
    expertTags: null | Array<any>
    experts: any
    followed: boolean
    followeds: number
    follows: number
    gender: number
    mutual: boolean
    nickname: string
    playlistBeSubscribedCount: number
    playlistCount: number
    province: number
    signature: string
    userId: number
    userType: number
    vipType: number
  }
}

export interface PhoneAccountPayload {
  phone: string,
  password: string
}

export interface EmailAccountPayload {
  email: string,
  password: string
}

export interface State {
  userToken: UserTokenType | null
}

const initState: State = {
  userToken: null
}

// getters
const getters = {
  userToken: (state: State) => state.userToken,
}

// actions
const actions = {
  async loginByPhone(context: { commit: Commit; state: State }, payload: PhoneAccountPayload) {
    try {
      let res: Ajax.AxiosResponse = await loginByPhone(payload.phone, payload.password)
      if (res.status === 200 && res.data.code === 200) {
        // 登录成功 保存token
        context.commit(types.ADD_USER_TOKEN, (res.data as UserTokenType))
        return res.data
      } else if (res.status !== 200) {
        // 登录失败 清除token
        context.commit(types.CLEAR_USER_TOKEN)
        return false
      }
    } catch (error) {
      context.commit(types.CLEAR_USER_TOKEN)
      return false
    }
  },
  async loginByEmail(context: { commit: Commit; state: State }, payload: EmailAccountPayload) {
    try {
      let res: Ajax.AxiosResponse = await loginByEmail(payload.email, payload.password)
      if (res.status === 200 && res.data.code === 200) {
        // 登录成功 保存token
        context.commit(types.ADD_USER_TOKEN, (res.data as UserTokenType))
        return res.data
      } else if (res.status !== 200) {
        // 登录失败 清除token
        context.commit(types.CLEAR_USER_TOKEN)
        return false
      }
    } catch (error) {
      context.commit(types.CLEAR_USER_TOKEN)
      return false
    }
  },
}

// mutations
const mutations = {
  [types.ADD_USER_TOKEN](state: State, payload: UserTokenType) {
    state.userToken = payload
  },
  [types.CLEAR_USER_TOKEN](state: State) {
    // rollback to the cart saved before sending the request
    state.userToken = null
  },
}

export default {
  state: initState,
  getters,
  actions,
  mutations,
}
