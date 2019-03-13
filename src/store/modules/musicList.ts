import { Commit } from "vuex"
// import shop from '../../api'
import * as types from "../mutation-types"
// import { CartProduct, CheckoutStatus, AddToCartPayload } from "../index"
import {
  MusicListItemType, RecommendListItemType, PlayListDetailType
} from '@/assets/js/dataType'
import {
  fetchMusicList
} from '@/api/recommend'

export interface fetchMusicListPayload {
  id: number
}

export interface MusicListInfoNowPayload {
  musicListInfoNow: RecommendListItemType
}

export interface MusicListPayload {
  id: number,
  playListDetail: PlayListDetailType
}

export interface State {
  musicListInfoNow: RecommendListItemType | null
  musicList: {
    [id: number]: PlayListDetailType;
  } | null
}

const initState: State = {
  musicListInfoNow: null,
  musicList: null
}

// getters
const getters = {
  musicListInfoNow: (state: State) => state.musicListInfoNow,
  musicList: (state: State) => (id: number): PlayListDetailType | null => {
    if(id && state.musicList && state.musicList[id]) {
      return state.musicList![id]
    } else {
      return null
    }
  }
}

// actions
const actions = {
  setMusicListInfoNow(context: { commit: Commit; state: State }, payload: MusicListInfoNowPayload) {
    context.commit(types.ADD_MUSIC_LIST_INFO_NOW, payload.musicListInfoNow)
  },
  async getMusicList(context: { commit: Commit; state: State }, payload: fetchMusicListPayload) {
    try {
      let res: Ajax.AxiosResponse = await fetchMusicList(payload.id)
      if (res.status === 200 && res.data.code === 200) {
        // 获取 musicList 成功，保存到 store
        context.commit(types.ADD_MUSIC_LIST, {
          id: payload.id,
          playListDetail: (res.data as PlayListDetailType )
        })
        return true
      } else if (res.status !== 200) {
        return false
      }
    } catch (error) {
      return false
    }
  }
}
// mutations
const mutations = {
    [types.ADD_MUSIC_LIST_INFO_NOW](state: State, payload: MusicListInfoNowPayload) {
      state.musicListInfoNow = payload.musicListInfoNow
    },
    [types.ADD_MUSIC_LIST](state: State, payload: MusicListPayload) {
      if(!state.musicList) {
        // 首次初始化null为对象
        state.musicList = {}
      }
      // 直接赋值不能更新，应该解构赋值？
      // state.musicList![payload.id] = payload.playListDetail
      state.musicList = {
        ...state.musicList,
        [`${payload.id}`]: payload.playListDetail
      }
    },
  }

export default {
    state: initState,
    getters,
    actions,
    mutations,
  }
