import Vue from 'vue'
import Vuex, { Commit, Dispatch } from 'vuex'
import actions from './actions'
import getters from './getters'
import user, { State as UserState } from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    user
  },
})

export interface ActionContextBasic {
  commit: Commit,
  dispatch: Dispatch
}

export interface State {
  user: UserState,
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
