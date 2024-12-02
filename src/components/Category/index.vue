<script setup lang="ts" name="category">
// 引入分类小仓库
import useCategoryStore from '@/stores/modules/category'

// 创建分类小仓库
const categoryStore = useCategoryStore()

// 一级分类选中值发生变化时触发
const c1Change = async (c1Id: number) => {
  // 获取二级分类数据
  await categoryStore.getCategory2List(c1Id)
  categoryStore.clearC2Id()
  categoryStore.attrList = []
}

// 二级分类选中值发生变化时触发
const c2Change = async (c2Id: number) => {
  // 获取三级分类数据
  await categoryStore.getCategory3List(c2Id)
  categoryStore.clearC3Id()
  categoryStore.attrList = []
}

// 三级分类选中值发生变化时触发
const c3Change = async () => {
  if (props.scene == 0) {
    // 此时，以保证categoryStore中分类1id，分类2id，分类3id，都已经存在
    await categoryStore.getAttrList()
  } else if (props.scene == 2) {
    await categoryStore.getPagedSPUList(props.currentPage, props.pageSize)
  }
}

/* 
  场景值定义：
    0：属性值列表展示界面
    1：添加平台属性界面
    2：SPU分页数据展示界面
*/
const props = withDefaults(
  defineProps<{
    scene: number
    currentPage?: number
    pageSize?: number
  }>(),
  {
    currentPage: 1,
    pageSize: 3,
  },
)
</script>

<template>
  <div class="category">
    <el-card>
      <el-form inline>
        <el-form-item label="一级分类">
          <el-select
            placeholder="请选择"
            style="width: 150px"
            v-model="categoryStore.c1Id"
            @change="c1Change"
            :disabled="scene == 1"
          >
            <el-option
              v-for="item in categoryStore.category1List"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select
            placeholder="请选择"
            style="width: 150px"
            v-model="categoryStore.c2Id"
            @change="c2Change"
            :disabled="scene == 1"
          >
            <el-option
              v-for="item in categoryStore.category2List"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
          <el-select
            placeholder="请选择"
            style="width: 150px"
            v-model="categoryStore.c3Id"
            @change="c3Change"
            :disabled="scene == 1"
          >
            <el-option
              v-for="item in categoryStore.category3List"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped lang="scss"></style>
