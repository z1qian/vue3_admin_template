export interface responseMockData<T = any> {
  code: number
  message: string
  data: T
  ok: boolean
}

export interface paginatedResponse<T> {
  records: T[] // 当前页的数据列表
  total: number // 数据总数
  size: number // 每页记录数
  current: number // 当前页码
  pages: number // 总页数
  searchCount: boolean
}
