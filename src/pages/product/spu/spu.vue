<script setup lang="ts" name="spu">
import { ref } from 'vue'
import SkuForm from './skuForm.vue'
import SpuForm from './spuForm.vue'
import { reqDelSPU } from '@/apis/product/spu/index'
import type { SpuRecord } from '@/apis/product/spu/type'
import { reqGetListBySpuId } from '@/apis/product/sku/index'
import type { Sku } from '@/apis/product/sku/type'
import { ElMessage } from 'element-plus'
// 引入分类小仓库
import useCategoryStore from '@/stores/modules/category'

// 创建分类小仓库
const categoryStore = useCategoryStore()

const currentPage = ref(1)
const pageSize = ref(3)
// 2：展示分页的SPU数据
// 3：添加，修改SPU
// 4：添加SKU
const scene = ref(2)
const spuFormCom = ref<InstanceType<typeof SpuForm> | undefined>()
const skuFormCom = ref<InstanceType<typeof SkuForm> | undefined>()
const skuList = ref<Sku[]>([])
const dialogVisible = ref(false)

const getSPUPagedList = async (page = 1) => {
  currentPage.value = page
  await categoryStore.getPagedSPUList(currentPage.value, pageSize.value)
}

const sizeChange = async () => {
  await getSPUPagedList()
}

// 添加SPU按钮回调
const addSpu = async () => {
  scene.value = 3
  await spuFormCom.value?.initAddSPUData(categoryStore.c3Id!)
}

// 修改SPU按钮回调
const editSpu = async (spu: SpuRecord) => {
  scene.value = 3
  await spuFormCom.value?.initSPUData(spu)
}

// 添加Sku按钮回调
const addSku = async (spu: SpuRecord) => {
  scene.value = 4
  await skuFormCom.value?.initAddSkuData(
    categoryStore.c1Id!,
    categoryStore.c2Id!,
    categoryStore.c3Id!,
    spu,
  )
}

// 子组件中修改scene值
const changeScene = (val: number) => {
  scene.value = val
}

// 查看sku列表回调
const getSkuList = async (spuId: number) => {
  skuList.value = await reqGetListBySpuId(spuId)
  dialogVisible.value = true
}

// 删除spu按钮回调
const delSpu = async (spuId: number) => {
  await reqDelSPU(spuId)
  ElMessage({
    type: 'success',
    message: '删除成功',
  })
  let page = currentPage.value
  if (categoryStore.spuPagedList?.records.length == 1 && page > 1) {
    page = currentPage.value - 1
  }
  await getSPUPagedList(page)
}
</script>

<template>
  <div class="spu">
    <!-- 短属性绑定 语法 -->
    <category :scene :currentPage :pageSize></category>

    <el-card style="margin-top: 10px">
      <div v-show="scene == 2">
        <el-button
          type="primary"
          icon="plus"
          :disabled="categoryStore.c3Id == undefined"
          @click="addSpu"
        >
          添加SPU
        </el-button>
        <el-table
          :data="categoryStore.spuPagedList?.records"
          style="width: 100%; margin: 10px 0"
          border
        >
          <el-table-column
            label="序号"
            width="80px"
            type="index"
            align="center"
          ></el-table-column>
          <el-table-column prop="spuName" label="SPU名称"></el-table-column>
          <el-table-column
            prop="description"
            label="SPU描述"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="SPU操作" v-slot="{ row }">
            <el-button
              type="primary"
              size="small"
              icon="Plus"
              title="添加SKU"
              @click="addSku(row)"
            ></el-button>
            <el-button
              type="warning"
              size="small"
              icon="Edit"
              title="修改SPU"
              @click="editSpu(row)"
            ></el-button>
            <el-button
              type="info"
              size="small"
              icon="View"
              title="查看SKU列表"
              @click="getSkuList(row.id)"
            ></el-button>
            <el-popconfirm
              :title="`你确定要删除${row.spuName}吗?`"
              width="auto"
              @confirm="delSpu(row.id)"
            >
              <template #reference>
                <el-button
                  type="danger"
                  size="small"
                  icon="delete"
                  title="删除SPU"
                ></el-button>
              </template>
            </el-popconfirm>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[3, 6, 9, 12]"
          size="default"
          background
          layout="prev, pager, next, jumper, -> , sizes, total"
          :total="categoryStore.spuPagedList?.total ?? 0"
          @size-change="sizeChange"
          @current-change="getSPUPagedList"
        />
      </div>
      <SpuForm
        ref="spuFormCom"
        v-show="scene == 3"
        v-model="scene"
        v-model:current-page="currentPage"
      />
      <SkuForm
        ref="skuFormCom"
        v-show="scene == 4"
        @changeScene="changeScene"
      />
      <el-dialog v-model="dialogVisible" title="SKU列表">
        <el-table :data="skuList" style="width: 100%" border>
          <el-table-column
            prop="skuName"
            label="SKU名称"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="price" label="SKU价格"></el-table-column>
          <el-table-column prop="weight" label="SKU重量"></el-table-column>
          <el-table-column label="SKU图片" v-slot="{ row }">
            <img :src="row.skuDefaultImg" :alt="row.skuDesc" width="100px" />
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<style scoped lang="scss"></style>
