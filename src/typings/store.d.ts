declare namespace StoreState {

  interface User {
    name: string,
    age: number
  }

  // 商户
  export interface Shop {
    // 商户跳转链接
    url: string,
    // 商户图片链接
    imgUrl: string,
    // 商户名称
    shopName: string,
    // 距离
    distance: string,
    // 简介
    desc: string,
    // 当前价格
    price_current: number,
    // 原价
    price_old: number,
    // 已售
    sale_count: string
  }
}