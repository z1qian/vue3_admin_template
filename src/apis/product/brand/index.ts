// 品牌管理模块接口
import request from '@/utils/request.ts'
import type { brandPageListResponseData, brand } from './type'
import { AxiosRequestConfig } from 'axios'

// 统一管理接口
enum API {
  // 获取品牌
  BRAND_URL = '/admin/product/baseTrademark',
  ADD_URL = '/admin/product/baseTrademark/save',
  UPDATE_URL = '/admin/product/baseTrademark/update',
  DEL_URL = '/admin/product/baseTrademark/remove',
}

// 暴露请求函数

// 获取品牌接口方法
export const reqGetBrandPageList = (
  page: number,
  limit: number,
): Promise<brandPageListResponseData> =>
  request.customRequest<brandPageListResponseData>({
    method: 'get',
    url: `${API.BRAND_URL}/${page}/${limit}`,
  })

// 添加或修改品牌接口的方法
export const reqUpsertBrand = (brand: brand): Promise<null> => {
  let config: AxiosRequestConfig<brand> = { data: brand }
  if (brand.id) {
    // 修改
    config.method = 'put'
    config.url = API.UPDATE_URL
  } else {
    config.method = 'post'
    config.url = API.ADD_URL
  }

  return request.customRequest<null>(config)
}

// 删除品牌接口的方法
export const reqDelBrand = (id: number): Promise<null> =>
  request.customRequest<null>({
    method: 'delete',
    url: `${API.DEL_URL}/${id}`,
  })
