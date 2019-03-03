// 轮播图
export enum TargetType {
  SONG = 1,
  ALBUM = 10,
  LINK = 3000,
}
export interface BannerType {
  // 图片链接
  imageUrl: string,
  // 跳转id
  targetId: number,
  // 跳转种类
  targetType: TargetType,
  // 标题颜色
  titleColor: string,
  // 种类标题
  typeTitle: string,
  // 直接跳转绝对路径
  url: any,
  adLocation: any,
  adSource: any,
  adid: any,
  encodeId: string,
  event: any,
  exclusive: false,
  extMonitor: any,
  extMonitorInfo: any,
  monitorBlackList: any,
  monitorClick: any,
  monitorClickList: any,
  monitorImpress: any,
  monitorImpressList: any,
  monitorType: any,
  program: any,
  song: any,
  video: any,
}

export interface SongType {
  a: null
  al: {
    id: number,
    name: string,
    pic: number,
    picUrl: string,
    pic_str: string,
    tns: Array<any>
  }
  alia: Array<string>
  ar: any
  h: any
  id: number
  name: string
  pop: number | string
}

export interface ArtistType {
  albumSize: number,
  alias: Array<string>,
  briefDesc: string,
  id: number,
  img1v1Id: number,
  img1v1Id_str: string,
  img1v1Url: string,
  musicSize: number,
  name: string
  picId: number,
  picId_str: string,
  picUrl: string,
  topicPerson: number,
  trans: string,
}

export interface AlbumType {
  alias: Array<string>
  artist: ArtistType
  artists: Array<ArtistType>
  blurPicUrl: string
  briefDesc: string
  commentThreadId: string
  company: string
  companyId: number
  copyrightId: number
  description: string
  id: number
  info: any
  name: string
  onSale: false
  paid: false
  pic: number
  picId: number
  picId_str: string
  picUrl: string
  publishTime: number
  size: number
  songs: Array<SongType>
  status: number
  subType: string
  tags: string
  type: string
}
