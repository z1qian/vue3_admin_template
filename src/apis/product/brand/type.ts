// 分页的品牌数据类型
export interface brandPageListResponseData {
  records: brand[]
  total: number
  size: number
  current: number
  searchCount: boolean
  pages: number
}

export interface brand {
  id?: number
  tmName: string
  logoUrl: string
}
