// SPU管理模块接口
import request from '@/utils/request.ts'
import type {
  PagedSpuResponse,
  Image,
  BaseSaleAttrList,
  SpuSaleAttr,
  SpuRecord,
} from './type'
import type { Brand } from '@/apis/product/brand/type'

// 统一管理接口
enum API {
  // 获取分页SPU列表
  PAGEDSPU_URL = '/admin/product',
  BRAND_URL = '/admin/product/baseTrademark/getTrademarkList',
  IMAGELIST_URL = '/admin/product/spuImageList',
  BASESALEATTRLIST_URL = '/admin/product/baseSaleAttrList',
  SPUSALEATTRLIST_URL = '/admin/product/spuSaleAttrList',
  ADDSPU_URL = '/admin/product/saveSpuInfo',
  EDITSPU_URL = '/admin/product/updateSpuInfo',
  DELSPU_URL = '/admin/product/deleteSpu',
}

// 暴露请求函数

// 分页获取SPU数据接口方法
export const reqGetSPUPagedList = (
  page: number,
  limit: number,
  category3Id: number | undefined,
): Promise<PagedSpuResponse> =>
  request.customRequest<PagedSpuResponse>({
    method: 'get',
    url: `${API.PAGEDSPU_URL}/${page}/${limit}`,
    params: { category3Id },
  })

// 获取SPU品牌数据接口的方法
export const reqGetSPUBrandList = (): Promise<Brand[]> =>
  request.customRequest<Brand[]>({
    method: 'get',
    url: API.BRAND_URL,
  })

// 获取SPU照片墙接口的方法
export const reqGetSPUImageList = (spuId: number): Promise<Image[]> =>
  request.customRequest<Image[]>({
    method: 'get',
    url: API.IMAGELIST_URL + '/' + spuId,
  })

// 获取基础销售属性接口的方法
export const reqGetBaseSaleAttrList = (): Promise<BaseSaleAttrList> =>
  request.customRequest<BaseSaleAttrList>({
    method: 'get',
    url: API.BASESALEATTRLIST_URL,
  })

// 获取SPU销售属性接口的方法
export const reqGetSPUSaleAttrList = (spuId: number): Promise<SpuSaleAttr[]> =>
  request.customRequest<SpuSaleAttr[]>({
    method: 'get',
    url: API.SPUSALEATTRLIST_URL + '/' + spuId,
  })

// 添加或修改SPU接口的方法
export const reqUpsertSPU = (data: SpuRecord): Promise<null> => {
  return request.customRequest<null>({
    method: 'post',
    url: data.id ? API.EDITSPU_URL : API.ADDSPU_URL,
    data,
  })
}

// 删除spu接口的方法
export const reqDelSPU = (spuId: number): Promise<null> =>
  request.customRequest<null>({
    method: 'delete',
    url: API.DELSPU_URL + '/' + spuId,
  })
