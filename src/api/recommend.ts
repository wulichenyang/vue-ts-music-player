import {
  get,
} from "./http"

export const getBanner = async (url: string): Promise<any> => {
  return get(url)
}
