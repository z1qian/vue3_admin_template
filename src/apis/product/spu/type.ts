// 获取分页后的SPU数据的类型
export interface PagedSpuResponse {
    records: SpuRecord[]
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
}

export interface SpuRecord {
    id?: number
    spuName: string
    description: string
    category3Id: number
    tmId: number | undefined
    spuSaleAttrList: SpuSaleAttr[] | null
    spuImageList: Image[] | null
}

export interface Image {
    id?: number;
    spuId?: number;
    imgName?: string;
    imgUrl?: string;
    name?: string;
    url?: string;
}

export type BaseSaleAttrList = { id: number; name: string }[]

export interface SpuSaleAttr {
    id?: number
    spuId?: number
    baseSaleAttrId: number
    saleAttrName: string
    spuSaleAttrValueList: SpuSaleAttrValue[],
    edit?: boolean,
    inputCom?: HTMLInputElement | null,
    spuSaleAttrValue?: string,
    attrIdAndValueId?: string
}

export interface SpuSaleAttrValue {
    id?: number
    spuId?: number
    baseSaleAttrId: number
    saleAttrValueName: string
    saleAttrName?: string
}
