<script setup lang="ts" name="Permission">
import { ref, onMounted } from 'vue'
import { reqGetMenuList, reqUpsertMenu, reqDelMenu } from '@/apis/acl/menu'
import {
  type MenuData,
  MenuFormData,
  type MenuItem,
} from '@/apis/acl/menu/type'
import { ElMessage } from 'element-plus'

const menuList = ref<MenuData>([])
const dialogVisible = ref(false)
const menuFormData = ref<MenuFormData>(new MenuFormData())

onMounted(() => {
  getMenuList()
})
const getMenuList = async () => {
  menuList.value = await reqGetMenuList()
}

const delMenu = async (menuId: number) => {
  await reqDelMenu(menuId)
  ElMessage({
    type: 'success',
    message: '删除成功',
  })
  await getMenuList()
}

const addMenuHandler = ({ id, level }: MenuItem) => {
  menuFormData.value = new MenuFormData()
  dialogVisible.value = true

  menuFormData.value.pid = id
  menuFormData.value.level = level + 1
}

const editMenuHandler = (menu: MenuItem) => {
  dialogVisible.value = true
  const { code, id, level, name, pid } = menu
  Object.assign(
    menuFormData.value,
    new MenuFormData(id, code, level, name, pid),
  )
}

const upsertMenu = async () => {
  await reqUpsertMenu(menuFormData.value)
  let op = menuFormData.value.id ? '修改' : '添加'
  ElMessage({
    type: 'success',
    message: op + '成功',
  })
  await getMenuList()
  dialogVisible.value = false
}
</script>

<template>
  <div class="permission">
    <el-table
      :data="menuList"
      style="width: 100%"
      row-key="id"
      border
      default-expand-all
    >
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="code" label="权限值" />
      <el-table-column prop="updateTime" label="修改时间" />
      <el-table-column label="操作" width="220px" v-slot="{ row }">
        <el-button
          type="primary"
          size="small"
          :disabled="row.level == 4"
          @click="addMenuHandler(row)"
        >
          {{ row.level == 3 ? '添加功能' : '添加菜单' }}
        </el-button>
        <el-button
          type="warning"
          size="small"
          :disabled="row.level == 1"
          @click="editMenuHandler(row)"
        >
          编辑
        </el-button>
        <el-popconfirm
          :title="`你确定要删除【${row.name}】吗？`"
          width="auto"
          @confirm="delMenu(row.id)"
        >
          <template #reference>
            <el-button type="danger" size="small" :disabled="row.level == 1">
              删除
            </el-button>
          </template>
        </el-popconfirm>
      </el-table-column>
    </el-table>
    <el-dialog
      v-model="dialogVisible"
      :title="menuFormData.id ? '修改菜单' : '添加菜单'"
      width="500"
    >
      <el-form>
        <el-form-item label="名称">
          <el-input
            placeholder="请你输入菜单名称"
            v-model="menuFormData.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <el-input
            placeholder="请你输入权限数值"
            v-model="menuFormData.code"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="upsertMenu">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss"></style>
