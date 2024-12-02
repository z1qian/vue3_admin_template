// 添加Sku数据类型
export interface AddSkuData {
    category3Id: number; // 类别ID3
    spuId: number; // spuId
    tmId: number; // 品牌ID
    skuName: string; // SKU名称
    price: string; // 价格
    weight: string; // 重量
    skuDesc: string; // SKU描述
    skuAttrValueList: SkuAttrValue[]; // SKU属性值列表
    skuSaleAttrValueList: SkuSaleAttrValue[]; // SKU销售属性值列表
    skuDefaultImg: string; // SKU默认图片URL
}

export interface SkuAttrValue {
    id?: number;
    attrId: string; // 属性ID
    valueId: string; // 属性值ID
    valueName?: string;
}

export interface SkuSaleAttrValue {
    saleAttrId: string; // 销售属性ID
    saleAttrValueId: string; // 销售属性值ID
    id?: number;
    saleAttrValueName?: string
}

export interface SkuImage {
    id: number;
    skuId: number;
    imgName: string;
    imgUrl: string;
    spuImgId: number;
    isDefault: string;
}

export interface Sku {
    category3Id: number; // 类别ID3
    createTime: string; // 创建时间
    id: number; // SKU ID
    isSale: number; // 是否在售
    price: number; // 价格
    skuAttrValueList: SkuAttrValue[] | null; // SKU属性值列表
    skuDefaultImg: string; // SKU默认图片URL
    skuDesc: string; // SKU描述
    skuImageList: SkuImage[] | null; // SKU图片列
    skuName: string; // SKU名称
    skuSaleAttrValueList: SkuSaleAttrValue[] | null; // SKU销售属性值列表
    spuId: number; // SPU ID
    tmId: number; // 品牌ID
    weight: string; // 重量
}

export interface PagedSkuResponse {
    records: Sku[]; // 记录列表
    total: number; // 记录总数
    size: number; // 每页记录数
    current: number; // 当前页码
    searchCount: boolean; // 是否统计搜索结果总数
    pages: number; // 总页数
}