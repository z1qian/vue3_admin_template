// 定义单个类别的类型
export interface Category {
  id: number // 类别的唯一标识
  name: string // 类别的名称
}

// 二级分类数据类型
export interface Category2 extends Category {
  category1Id: number
}

// 三级分类数据类型
export interface Category3 extends Category {
  category2Id: number
}

// 属性值类型
export interface AttrValue {
  id?: number // 属性值的唯一标识
  valueName: string // 属性值名称
  attrId?: number
  edit?: boolean
}

export interface Attribute {
  id: number // 属性的唯一标识
  attrName: string // 属性名称
  categoryId: number // 所属分类 ID
  categoryLevel: number // 分类层级
  attrValueList: AttrValue[] // 属性值列表
  attrIdAndValueId?: string
}

export type AttrList = Attribute[]

// 添加或修改属性数据类型
export interface AttrFormData {
  attrName: string
  attrValueList: AttrValue[] // 属性值列表，任意长度的数组
  categoryId: number
  categoryLevel: 3
  id?: number
}
