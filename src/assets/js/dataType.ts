// 轮播图
import { MusicList } from '@/components/music-list/music-list.vue';
import { PlayListType } from './dataType';
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
  a: any | null
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
  h: MusicQualityType
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

export interface UserInfoType {
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
  profile: UserInfoType
}

export interface RecommendListItemType {
  alg: string
  copywriter: string
  createTime: number
  creator: UserInfoType
  id: number
  name: string
  picUrl: string
  playcount: number
  trackCount: number
  type: number
  userId: number
}
export interface MusicInfoType {
  bitrate: number
  dfsId: number
  extension: string
  id: number
  name: string
  playTime: number
  size: number
  sr: number
  volumeDelta: number
}

export interface PrivilegeType {
  cp: number
  cs: boolean
  dl: number
  fee: number
  fl: number
  flag: number
  id: number
  maxbr: number
  payed: number
  pl: number
  preSell: boolean
  sp: number
  st: number
  subp: number
  toast: boolean
}

export interface RecommendMusicType {
  album: AlbumType
  alg: string
  alias: Array<any>
  artists: Array<ArtistType>
  audition: any | null
  bMusic: MusicInfoType
  commentThreadId: string
  copyFrom: string
  copyright: number
  copyrightId: number
  crbt: any | null
  dayPlays: number
  disc: string
  duration: number
  fee: number
  ftype: number
  hMusic: MusicInfoType
  hearTime: number
  id: number
  lMusic: MusicInfoType
  mMusic: MusicInfoType
  mp3Url: string | null
  mvid: number
  name: string
  no: number
  playedNum: number
  popularity: number
  position: number
  privilege: PrivilegeType
  reason: string
  ringtone: any
  rtUrl: string | null
  rtUrls: Array<any>
  rtype: number
  rurl: string | null
  score: number
  sign: any | null
  starred: boolean
  starredNum: number
  status: number
  transName: string | null
}

export interface RankListItemType {
  ToplistType: string
  adType: number
  anonimous: boolean
  artists: Array<ArtistType> | null
  cloudTrackCount: number
  commentThreadId: string
  coverImgId: number
  coverImgId_str: string
  coverImgUrl: string
  createTime: number
  creator: any | null
  description: string
  highQuality: boolean
  id: number
  name: string
  newImported: boolean
  ordered: boolean
  playCount: number
  privacy: number
  specialType: number
  status: number
  subscribed: boolean | null
  subscribedCount: number
  subscribers: Array<any>
  tags: Array<any>
  totalDuration: number
  trackCount: number
  trackNumberUpdateTime: number
  trackUpdateTime: number
  tracks: Array<TrackType> | null
  updateFrequency: string
  updateTime: number
  userId: number
}

export class Singer {
  id: number;
  name: string;
  avatar: string;
  aliaName: string;
  constructor(id: number, name: string, avatar: string, aliaName: string) {
    this.id = id
    this.name = name
    this.avatar = avatar
    this.aliaName = aliaName
  }
}

export interface SingerListItemType {
  title: string,
  items: Array<Singer>
}

export interface TrackIdType {
  id: number,
  v: number
}
export interface MusicQualityType {
  br: number
  fid: number
  size: number
  vd: number
}
export interface TrackType {
  a: any | null
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
  cd: string
  cf: string
  copyright: number
  cp: number
  crbt: any | null
  djId: number
  dt: number
  fee: number
  ftype: number
  h: MusicQualityType
  id: number
  l: MusicQualityType
  m: MusicQualityType
  mst: number
  mv: number
  name: string
  no: number
  pop: number
  pst: number
  publishTime: number
  rt: string
  rtUrl: any | null
  rtUrls: Array<any>
  rtype: number
  rurl: any | null
  s_id: number
  st: number
  t: number
  v: number
}

export interface PlayListType {
  adType: number
  cloudTrackCount: number
  commentCount: number
  commentThreadId: string
  coverImgId: number
  coverImgId_str: string
  coverImgUrl: string
  createTime: number
  creator: UserInfoType
  description: string
  highQuality: boolean
  id: number
  name: string
  newImported: boolean
  ordered: boolean
  playCount: number
  privacy: number
  shareCount: number
  specialType: number
  status: number
  subscribed: boolean
  subscribedCount: number
  subscribers: Array<UserInfoType>
  tags: Array<string> | null
  trackCount: number
  trackIds: Array<TrackIdType>
  trackNumberUpdateTime: number
  trackUpdateTime: number
  tracks: Array<TrackType>
  updateTime: number
  userId: number
}

export interface PlayListDetailType {
  playlist: PlayListType,
  privileges: Array<PrivilegeType>
}

export interface MusicListItemType {

}

