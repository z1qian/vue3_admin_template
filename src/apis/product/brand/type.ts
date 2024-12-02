// 分页的品牌数据类型
export interface BrandPageListResponseData {
  records: Brand[]
  total: number
  size: number
  current: number
  searchCount: boolean
  pages: number
}

export interface Brand {
  id?: number
  tmName: string
  logoUrl: string
}
