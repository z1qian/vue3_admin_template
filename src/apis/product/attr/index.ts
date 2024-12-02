// 属性管理模块接口
import request from '@/utils/request.ts'
import type {
  Category,
  Category2,
  Category3,
  AttrList,
  AttrFormData,
} from './type'

// 统一管理接口
enum API {
  C1_URL = '/admin/product/getCategory1',
  C2_URL = '/admin/product/getCategory2',
  C3_URL = '/admin/product/getCategory3',
  ATTR_URL = '/admin/product/attrInfoList',
  UPSERT_URL = '/admin/product/saveAttrInfo',
  DELETE_URL = '/admin/product/deleteAttr',
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

// 获取属性列表接口方法
export const reqGetAttrList = (
  category1Id: number | undefined,
  category2Id: number | undefined,
  category3Id: number | undefined,
): Promise<AttrList> =>
  request.customRequest<AttrList>({
    method: 'get',
    url: `${API.ATTR_URL}/${category1Id}/${category2Id}/${category3Id}`,
  })

// 添加或者修改属性接口方法
export const reqUpsertAttr = (data: AttrFormData): Promise<null> =>
  request.customRequest<null>({
    method: 'post',
    url: API.UPSERT_URL,
    data,
  })

// 删除属性接口的方法
export const reqDeleteAttr = (attrId: number): Promise<null> =>
  request.customRequest<null>({
    method: 'delete',
    url: API.DELETE_URL + '/' + attrId,
  })
