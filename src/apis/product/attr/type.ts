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
