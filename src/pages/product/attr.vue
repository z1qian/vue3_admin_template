<script setup lang="ts" name="attr">
// 引入分类小仓库
import useCategoryStore from '@/stores/modules/category'

// 创建分类小仓库
const categoryStore = useCategoryStore()
</script>

<template>
  <div class="attr">
    <!-- 分类选择框 -->
    <Category></Category>
    <el-card style="margin: 10px 0">
      <el-button type="primary" icon="plus" :disabled="!categoryStore.c3Id">
        添加平台属性
      </el-button>
      <el-table style="width: 100%; margin: 10px 0" border>
        <el-table-column
          prop="prop"
          label="序号"
          width="80px"
          type="index"
        ></el-table-column>
        <el-table-column
          prop="prop"
          label="属性名称"
          width="100px"
        ></el-table-column>
        <el-table-column prop="prop" label="属性值名称"></el-table-column>
        <el-table-column prop="prop" label="操作" width="100px">
          <el-button type="primary" icon="edit" size="small"></el-button>
          <el-popconfirm title="你好" width="auto" icon="delete">
            <template #reference>
              <el-button type="danger" icon="delete" size="small"></el-button>
            </template>
          </el-popconfirm>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style scoped lang="scss"></style>
