// 属性管理模块接口
import request from '@/utils/request.ts'
import type { Category, Category2, Category3 } from './type'

// 统一管理接口
enum API {
  C1_URL = '/admin/product/getCategory1',
  C2_URL = '/admin/product/getCategory2',
  C3_URL = '/admin/product/getCategory3',
}

// 暴露请求函数

// 获取一级分类接口方法
export const reqGetCategory1 = (): Promise<Category[]> =>
  request.customRequest<Category[]>({
    method: 'get',
    url: API.C1_URL,
  })

// 获取二级分类接口方法
export const reqGetCategory2 = (category1Id: number): Promise<Category2[]> =>
  request.customRequest<Category2[]>({
    method: 'get',
    url: API.C2_URL + '/' + category1Id,
  })

// 获取三级分类接口方法
export const reqGetCategory3 = (category2Id: number): Promise<Category3[]> =>
  request.customRequest<Category3[]>({
    method: 'get',
    url: API.C3_URL + '/' + category2Id,
  })
