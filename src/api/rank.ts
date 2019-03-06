import {
  get,
} from "./http"

export const getRankList = async (): Promise<any> => {
  return get('/toplist/detail')
}

