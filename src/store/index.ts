import Vue from 'vue'
import Vuex, { Commit, Dispatch } from 'vuex'
import actions from './actions'
import getters from './getters'
import user, { State as UserState } from './modules/user'
import musicList, { State as MusicListState } from './modules/musicList'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    user,
    musicList
  },
})

export interface ActionContextBasic {
  commit: Commit,
  dispatch: Dispatch
}

export interface State {
  user: UserState,
  musicList: MusicListState
}

// export type CheckoutStatus = 'successful' | 'failed' | null

// export interface Product {
//   id: number,
//   title: string,
//   price: number,
//   inventory: number
// }

// export interface CartProduct {
//   title: string,
//   price: number,
//   quantity: number
// }

// export interface AddToCartPayload {
//   id: number
// }
