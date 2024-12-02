<script setup lang="ts" name="skuForm">
import { ref } from 'vue'
import { reqGetAttrList } from '@/apis/product/attr'
import { reqGetSPUSaleAttrList, reqGetSPUImageList } from '@/apis/product/spu'
import type { Attribute, AttrList } from '@/apis/product/attr/type'
import type { SpuSaleAttr, Image, SpuRecord } from '@/apis/product/spu/type'
import type {
  AddSkuData,
  SkuAttrValue,
  SkuSaleAttrValue,
} from '@/apis/product/sku/type'
import { ElMessage, ElTable } from 'element-plus'
import { reqAddSku } from '@/apis/product/sku/index'

const attrList = ref<AttrList>([])
const spuSaleAttrList = ref<SpuSaleAttr[]>([])
const spuImageList = ref<Image[]>([])
const skuFormDataOriginal: AddSkuData = {
  category3Id: 0,
  spuId: 0,
  tmId: 0,
  skuName: '',
  price: '',
  weight: '',
  skuDesc: '',
  skuAttrValueList: [],
  skuSaleAttrValueList: [],
  skuDefaultImg: '',
}
const skuFromData = ref<AddSkuData>({ ...skuFormDataOriginal })
const imgTable = ref<InstanceType<typeof ElTable> | null>(null)

const getAttrList = async (c1Id: number, c2Id: number, c3Id: number) => {
  attrList.value = await reqGetAttrList(c1Id, c2Id, c3Id)
}

const getSPUSaleAttrList = async (spuId: number) => {
  spuSaleAttrList.value = await reqGetSPUSaleAttrList(spuId)
}

const getSPUImageList = async (spuId: number) => {
  spuImageList.value = await reqGetSPUImageList(spuId)
}

const initAddSkuData = async (
  c1Id: number,
  c2Id: number,
  c3Id: number,
  spu: SpuRecord,
) => {
  let spuId = spu.id!

  skuFromData.value.category3Id = c3Id
  skuFromData.value.spuId = spuId
  skuFromData.value.tmId = spu.tmId!

  await getAttrList(c1Id, c2Id, c3Id)
  await getSPUSaleAttrList(spuId)
  await getSPUImageList(spuId)
}

const setDefaultImg = (img: Image) => {
  skuFromData.value.skuDefaultImg = img.imgUrl!
  imgTable.value!.clearSelection()
  imgTable.value!.toggleRowSelection(img, true)
}

const saveSku = async () => {
  // 组织数据：skuAttrValueList
  skuFromData.value.skuAttrValueList = attrList.value.reduce(
    (prev: SkuAttrValue[], curr: Attribute) => {
      if (curr.attrIdAndValueId) {
        const [attrId, valueId] = curr.attrIdAndValueId.split(':')
        prev.push({
          attrId,
          valueId,
        })
      }

      return prev
    },
    [],
  )

  // 组织数据：skuSaleAttrValueList
  skuFromData.value.skuSaleAttrValueList = spuSaleAttrList.value.reduce(
    (prev: SkuSaleAttrValue[], curr: SpuSaleAttr) => {
      if (curr.attrIdAndValueId) {
        const [saleAttrId, saleAttrValueId] = curr.attrIdAndValueId.split(':')
        prev.push({
          saleAttrId,
          saleAttrValueId,
        })
      }

      return prev
    },
    [],
  )

  try {
    await reqAddSku(skuFromData.value)
  } catch (error) {
    console.error(error)
  } finally {
    // 由于添加sku接口返回201失败，为了模拟添加成功效果
    ElMessage({
      type: 'success',
      message: '保存Sku成功',
    })

    emit('changeScene', 2)
  }
}
defineExpose({ initAddSkuData })
const emit = defineEmits(['changeScene'])
</script>

<template>
  <div class="skuForm">
    <el-form label-width="100px" label-position="left" :model="skuFromData">
      <el-form-item label="SKU名称">
        <el-input placeholder="SKU名称" v-model="skuFromData.skuName" />
      </el-form-item>
      <el-form-item label="价格（元）">
        <el-input
          placeholder="价格（元）"
          type="number"
          v-model="skuFromData.price"
        />
      </el-form-item>
      <el-form-item label="重量（g）">
        <el-input
          placeholder="重量（g）"
          type="number"
          v-model="skuFromData.weight"
        />
      </el-form-item>
      <el-form-item label="SKU描述">
        <el-input
          placeholder="SKU描述"
          type="textarea"
          v-model="skuFromData.skuDesc"
        />
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form inline>
          <el-form-item
            v-for="attr in attrList"
            :key="attr.id"
            :label="attr.attrName"
          >
            <el-select
              :placeholder="`请选择${attr.attrName}`"
              style="width: 150px"
              v-model="attr.attrIdAndValueId"
            >
              <el-option
                v-for="val in attr.attrValueList"
                :key="val.id"
                :label="val.valueName"
                :value="`${attr.id}:${val.id}`"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form inline>
          <el-form-item
            v-for="saleAttr in spuSaleAttrList"
            :key="saleAttr.id"
            :label="saleAttr.saleAttrName"
          >
            <el-select
              :placeholder="`请选择${saleAttr.saleAttrName}`"
              style="width: 150px"
              v-model="saleAttr.attrIdAndValueId"
            >
              <el-option
                v-for="val in saleAttr.spuSaleAttrValueList"
                :key="val.id"
                :label="val.saleAttrValueName"
                :value="`${saleAttr.id}:${val.id}`"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片名称">
        <el-table
          style="width: 100%"
          border
          :data="spuImageList"
          ref="imgTable"
        >
          <el-table-column
            type="selection"
            width="55"
            align="center"
          ></el-table-column>
          <el-table-column label="图片" v-slot="{ row }">
            <img :src="row.imgUrl" alt="" width="100px" />
          </el-table-column>
          <el-table-column prop="imgName" label="名称"></el-table-column>
          <el-table-column label="操作" width="100px" v-slot="{ row }">
            <el-button type="primary" size="small" @click="setDefaultImg(row)">
              设置默认
            </el-button>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveSku">保存</el-button>
        <el-button type="primary" @click="$emit('changeScene', 2)">
          取消
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss"></style>
