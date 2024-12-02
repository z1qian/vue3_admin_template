<script setup lang="ts" name="attr">
import { reactive, ref, nextTick, onBeforeUnmount } from 'vue'
// 引入分类小仓库
import useCategoryStore from '@/stores/modules/category'
import type {
  AttrFormData,
  AttrValue,
  Attribute,
} from '@/apis/product/attr/type'
import { reqUpsertAttr, reqDeleteAttr } from '@/apis/product/attr/index'
import { ElMessage } from 'element-plus'

// 创建分类小仓库
const categoryStore = useCategoryStore()

// 创建场景值
const scene = ref<number>(0)

// 添加或者修改属性数据的收集变量
const attrFormData = reactive<AttrFormData>({
  attrName: '',
  attrValueList: [],
  categoryId: 0,
  categoryLevel: 3,
})

// 用于存储每行的 input 元素引用
// Record 是 TypeScript 提供的一个工具类型，用于定义对象的键值类型
const inputRefs = ref<Record<number, HTMLInputElement | null>>({})

// 返回一个函数，Vue 会调用这个函数，将当前渲染的 DOM 元素传入
// 当绑定的元素被卸载时，函数也会被调用一次，此时的 el 参数会是 null
const setInputRef = (index: number) => (el: HTMLInputElement | null) => {
  inputRefs.value[index] = el
}

// 添加平台属性按钮回调
const addAttr = () => {
  scene.value = 1
  Object.assign(attrFormData, {
    attrName: '',
    attrValueList: [],
    categoryId: 0,
    categoryLevel: 3,
    id: undefined,
  })
}

// 添加属性值按钮回调
const addAttrValue = async () => {
  attrFormData.attrValueList.push({
    valueName: '',
    // 是否是编辑模式
    edit: true,
  })

  await nextTick()
  inputRefs.value[attrFormData.attrValueList.length - 1]?.focus()
}

const saveAttr = async () => {
  attrFormData.categoryId = categoryStore.c3Id as number
  await reqUpsertAttr(attrFormData)
  ElMessage({
    type: 'success',
    message: `${attrFormData.id ? '修改' : '添加'}成功`,
  })
  scene.value = 0
  await categoryStore.getAttrList()
}

// 转换为查看模式
const toViewMode = (attrValue: AttrValue, index: number) => {
  // 属性值名称不能为空
  if (!attrValue.valueName) {
    ElMessage({
      type: 'error',
      message: `请输入属性值名称`,
    })
    attrFormData.attrValueList.splice(index, 1)
    return
  }

  // 属性值名称不能重复
  let count = attrFormData.attrValueList.reduce(
    (count, currentValue) =>
      count + (currentValue.valueName == attrValue.valueName ? 1 : 0),
    0,
  )
  // 存在重复的
  if (count > 1) {
    ElMessage({
      type: 'error',
      message: `不能输入重复的属性值名称`,
    })
    attrFormData.attrValueList.splice(index, 1)
    return
  }

  attrValue.edit = false
}

// 转换为编辑模式
const toEditMode = async (attrValue: AttrValue, index: number) => {
  attrValue.edit = true
  // 确保在 input 输入框挂载显示后，调用 focus方法
  await nextTick()
  inputRefs.value[index]?.focus()
}

// 修改属性与属性值
const editAttr = (attr: Attribute) => {
  scene.value = 1
  Object.assign(attrFormData, JSON.parse(JSON.stringify(attr)))
}

// 删除属性
const deleteAttr = async (attrId: number) => {
  await reqDeleteAttr(attrId)
  ElMessage({
    type: 'success',
    message: '删除属性成功',
  })
  await categoryStore.getAttrList()
}

// 在路由组件实例被卸载之前调用
onBeforeUnmount(() => {
  categoryStore.$reset()
})
</script>

<template>
  <div class="attr">
    <!-- 分类选择框 -->
    <Category :scene="scene"></Category>
    <el-card style="margin: 10px 0">
      <!-- 属性值列表展示界面 -->
      <div v-show="scene == 0">
        <el-button
          type="primary"
          icon="plus"
          :disabled="!categoryStore.c3Id"
          @click="addAttr"
        >
          添加平台属性
        </el-button>
        <!-- 属性展示表格 -->
        <el-table
          :data="categoryStore.attrList"
          style="width: 100%; margin: 10px 0"
          border
        >
          <el-table-column
            label="序号"
            width="80px"
            type="index"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="attrName"
            label="属性名称"
            width="100px"
          ></el-table-column>
          <el-table-column prop="attrValueList" label="属性值名称">
            <template #default="{ row }">
              <el-tag
                type="primary"
                v-for="item in row.attrValueList"
                :key="item.id"
                style="margin: 0 5px"
              >
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120px" v-slot="{ row }">
            <el-button
              type="primary"
              icon="edit"
              size="small"
              @click="editAttr(row)"
            ></el-button>
            <el-popconfirm
              :title="`确定要删除属性【${row.attrName}】吗？`"
              width="auto"
              icon="delete"
              @confirm="deleteAttr(row.id)"
            >
              <template #reference>
                <el-button type="danger" icon="delete" size="small"></el-button>
              </template>
            </el-popconfirm>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加平台属性界面 -->
      <div v-show="scene == 1">
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input
              placeholder="请输入属性名称"
              clearable
              v-model.trim="attrFormData.attrName"
            />
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="plus"
          :disabled="!attrFormData.attrName"
          @click="addAttrValue"
        >
          添加属性值
        </el-button>
        <el-button type="primary">取消</el-button>
        <el-table
          :data="attrFormData.attrValueList"
          style="width: 100%; margin: 10px 0"
          border
        >
          <el-table-column
            label="序号"
            width="80px"
            type="index"
            align="center"
          ></el-table-column>
          <el-table-column label="属性值名称" v-slot="{ row, $index }">
            <el-input
              v-if="row.edit"
              v-model.trim="row.valueName"
              placeholder="请输入属性值"
              @blur="toViewMode(row, $index)"
              :ref="setInputRef($index)"
            ></el-input>
            <div v-else @click="toEditMode(row, $index)">
              {{ row.valueName }}
            </div>
          </el-table-column>
          <el-table-column label="属性值操作" v-slot="{ $index }">
            <el-button
              type="danger"
              icon="delete"
              size="small"
              @click="attrFormData.attrValueList.splice($index, 1)"
            ></el-button>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          @click="saveAttr"
          :disabled="attrFormData.attrValueList.length == 0"
        >
          保存
        </el-button>
        <el-button type="primary" @click="scene = 0">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss"></style>
