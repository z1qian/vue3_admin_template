// SPU管理模块接口
import request from '@/utils/request.ts'
import type { AddSkuData, Sku, PagedSkuResponse } from './type'

// 统一管理接口
enum API {
  // 添加SKU
  ADDSKU_URL = '/admin/product/saveSkuInfo',
  GETLISTBYSPUID_URL = '/admin/product/findBySpuId',
  GETSKUPAGEDLIST_URL = '/admin/product/list',
  CANCELSALE_URL = '/admin/product/cancelSale',
  ONSALE_URL = '/admin/product/onSale',
  GETSKUBYID_URL = '/admin/product/getSkuById',
  DELETE_URL = '/admin/product/deleteSku',
}

// 暴露请求函数

// 添加SKU接口的方法
export const reqAddSku = (data: AddSkuData): Promise<null> =>
  request.customRequest<null>({
    method: 'post',
    url: API.ADDSKU_URL,
    data,
  })

// 根据spuId获取sku列表接口的方法
export const reqGetListBySpuId = (spuId: number): Promise<Sku[]> =>
  request.customRequest<Sku[]>({
    method: 'get',
    url: `${API.GETLISTBYSPUID_URL}/${spuId}`,
  })

// 获取sku分页列表接口的方法
export const reqGetPagedList = (
  page: number,
  limit: number,
): Promise<PagedSkuResponse> =>
  request.customRequest<PagedSkuResponse>({
    method: 'get',
    url: `${API.GETSKUPAGEDLIST_URL}/${page}/${limit}`,
  })

// sku上架
export const reqOnSale = (skuId: number): Promise<null> =>
  request.customRequest<null>({
    method: 'get',
    url: `${API.ONSALE_URL}/${skuId}`,
  })

// sku下架
export const reqCancelSale = (skuId: number): Promise<null> =>
  request.customRequest<null>({
    method: 'get',
    url: `${API.CANCELSALE_URL}/${skuId}`,
  })

// 根据id获取sku
export const reqGetSkuById = (skuId: number): Promise<Sku> =>
  request.customRequest<Sku>({
    method: 'get',
    url: `${API.GETSKUBYID_URL}/${skuId}`,
  })

// 删除sku
export const reqDeleteSku = (skuId: number): Promise<null> =>
  request.customRequest<null>({
    method: 'delete',
    url: `${API.DELETE_URL}/${skuId}`,
  })
