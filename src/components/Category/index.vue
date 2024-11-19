<script setup lang='ts' name='category'>
// 引入分类小仓库
import useCategoryStore from '@/stores/modules/category'

// 创建分类小仓库
const categoryStore = useCategoryStore();

// 一级分类选中值发生变化时触发
const c1Change = async (c1Id: number) => {
    // 获取二级分类数据
    await categoryStore.getCategory2List(c1Id)
    categoryStore.clearC2Id();
}

// 二级分类选中值发生变化时触发
const c2Change = async (c2Id: number) => {
    // 获取三级分类数据
    await categoryStore.getCategory3List(c2Id)
    categoryStore.clearC3Id();
}
</script>

<template>
    <div class="category">
        <el-card>
            <el-form inline>
                <el-form-item label="一级分类">
                    <el-select placeholder="请选择" style="width: 150px" v-model="categoryStore.c1Id" @change="c1Change">
                        <el-option v-for="item in categoryStore.category1List" :key="item.id" :label="item.name"
                            :value="item.id" />
                    </el-select>
                </el-form-item>
                <el-form-item label="二级分类">
                    <el-select placeholder="请选择" style="width: 150px" v-model="categoryStore.c2Id" @change="c2Change">
                        <el-option v-for="item in categoryStore.category2List" :key="item.id" :label="item.name"
                            :value="item.id" />
                    </el-select>
                </el-form-item>
                <el-form-item label="三级分类">
                    <el-select placeholder="请选择" style="width: 150px" v-model="categoryStore.c3Id">
                        <el-option v-for="item in categoryStore.category3List" :key="item.id" :label="item.name"
                            :value="item.id" />
                    </el-select>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<style scoped lang="scss"></style>