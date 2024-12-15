<script setup lang="ts" name="role">
import { ref, onMounted, reactive } from 'vue'
import {
  reqGetPagedRoleList,
  reqUpsertRole,
  reqDeleteRole,
} from '@/apis/acl/role'
import { PagedRolesResponse, type Role } from '@/apis/acl/role/type'
import {
  ElMessageBox,
  type FormRules,
  type FormInstance,
  ElMessage,
  type TreeInstance,
} from 'element-plus'
import { reqGetUserPermissionList, reqSetRolePermission } from '@/apis/acl/menu'
import type { MenuData } from '@/apis/acl/menu/type'

const currentPage = ref(1)
const pageSize = ref(6)
const keyWord = ref('')
const pagedRolesObj = ref<PagedRolesResponse>(new PagedRolesResponse())
const dialogVisible = ref(false)
const roleForm = ref<FormInstance>()
const roleFormDataOriginal: Role = {
  id: 0,
  roleName: '',
}
const roleFormData = ref<Role>({ ...roleFormDataOriginal })
const rules = reactive<FormRules<Role>>({
  roleName: [
    {
      required: true,
      min: 2,
      max: 20,
      message: '请输入2-20位职位名称',
      trigger: 'blur',
    },
  ],
})
const drawerRole = ref(false)
const menuData = ref<MenuData>([])
// 树形框所需数据
const defaultProps = {
  children: 'children',
  label: 'name',
}
const selectBtnPermissionIdList = ref<number[]>([])
const permissionTree = ref<TreeInstance>()

onMounted(() => {
  getPagedRoleList()
})

const getPagedRoleList = async (page = 1) => {
  currentPage.value = page
  pagedRolesObj.value = await reqGetPagedRoleList(
    currentPage.value,
    pageSize.value,
    keyWord.value,
  )
}

const reset = async () => {
  keyWord.value = ''
  await getPagedRoleList()
}

const handleClose = (done?: () => void) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      roleForm.value!.clearValidate()
      // 确定
      if (done) done()
      else dialogVisible.value = false
    })
    .catch(() => {
      // 取消
      // catch error
    })
}

const addRoleHandler = () => {
  dialogVisible.value = true
  roleFormData.value = { ...roleFormDataOriginal }
}

const editRoleHandler = ({ id, roleName }: Role) => {
  dialogVisible.value = true

  roleFormData.value = { id, roleName }
}
const addRole = async () => {
  await roleForm.value!.validate()
  await reqUpsertRole(roleFormData.value)
  let op = roleFormData.value.id ? '修改' : '添加'
  ElMessage({
    type: 'success',
    message: op + '成功',
  })
  await getPagedRoleList(op == '修改' ? currentPage.value : 1)
  dialogVisible.value = false
}

// 分配权限按钮回调
const assignPermissionHandler = async ({ id }: Role) => {
  drawerRole.value = true
  roleFormData.value.id = id

  menuData.value = await reqGetUserPermissionList(id!)
  selectBtnPermissionIdList.value = []
  getSelectBtnPermission(menuData.value)
}

const getSelectBtnPermission = (data: MenuData) => {
  data.forEach((menuItem) => {
    if (menuItem.select && menuItem.level == 4) {
      selectBtnPermissionIdList.value.push(menuItem.id)
    }
    if (menuItem.children && menuItem.children.length > 0) {
      getSelectBtnPermission(menuItem.children)
    }
  })
}

const setRolePermission = async () => {
  let checkedKeys = permissionTree.value!.getCheckedKeys()
  let halfCheckedKeys = permissionTree.value!.getHalfCheckedKeys()
  let permissionIdList = checkedKeys.concat(halfCheckedKeys)

  await reqSetRolePermission(
    roleFormData.value.id!,
    permissionIdList as number[],
  )
  ElMessage({
    type: 'success',
    message: '分配权限成功',
  })
  window.location.reload()
}

const deleteRole = async (roleId: number) => {
  await reqDeleteRole(roleId)
  ElMessage({
    type: 'success',
    message: '删除成功',
  })
  await getPagedRoleList(
    pagedRolesObj.value.records.length <= 1 && currentPage.value > 1
      ? currentPage.value - 1
      : currentPage.value,
  )
}
</script>

<template>
  <div class="role">
    <el-card>
      <el-form label-width="80px" inline class="searchForm">
        <el-form-item label="职位搜索">
          <el-input placeholder="职位搜索" v-model="keyWord"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :disabled="!keyWord"
            @click="getPagedRoleList()"
          >
            搜索
          </el-button>
          <el-button type="success" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top: 10px">
      <el-button type="primary" icon="plus" @click="addRoleHandler">
        添加职位
      </el-button>
      <el-table
        style="width: 100%; margin: 10px 0"
        border
        :data="pagedRolesObj.records"
      >
        <el-table-column
          label="#"
          width="80"
          type="index"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="id"
          label="ID"
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column prop="roleName" label="职位名称"></el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新时间"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作" v-slot="{ row }" width="270px">
          <el-button
            type="primary"
            icon="user"
            size="small"
            @click="assignPermissionHandler(row)"
          >
            分配权限
          </el-button>
          <el-button
            type="warning"
            icon="edit"
            size="small"
            @click="editRoleHandler(row)"
          >
            编辑
          </el-button>
          <el-popconfirm
            :title="`你要删除${row.roleName}吗?`"
            width="auto"
            @confirm="deleteRole(row.id)"
          >
            <template #reference>
              <el-button type="danger" icon="delete" size="small">
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[3, 6, 9, 12]"
        size="default"
        background
        layout="prev, pager, next, jumper, -> , sizes, total"
        :total="pagedRolesObj.total"
        @current-change="getPagedRoleList"
        @size-change="getPagedRoleList()"
      />
    </el-card>
    <el-dialog
      v-model="dialogVisible"
      :title="(roleFormData.id ? '修改' : '添加') + '职位'"
      :before-close="handleClose"
    >
      <el-form
        label-width="80px"
        ref="roleForm"
        :model="roleFormData"
        :rules="rules"
      >
        <el-form-item label="职位名称" prop="roleName">
          <el-input
            placeholder="请输入职位名称"
            v-model="roleFormData.roleName"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div>
          <el-button @click="handleClose()">取消</el-button>
          <el-button type="primary" @click="addRole">确定</el-button>
        </div>
      </template>
    </el-dialog>
    <!-- 分配菜单与按钮的权限 -->
    <el-drawer v-model="drawerRole" title="分配菜单与按钮的权限" size="40%">
      <el-tree
        style="max-width: 600px"
        :data="menuData"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="selectBtnPermissionIdList"
        :props="defaultProps"
        ref="permissionTree"
      />
      <template #footer>
        <div style="flex: auto">
          <el-button @click="drawerRole = false">取消</el-button>
          <el-button type="primary" @click="setRolePermission">确定</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<style scoped lang="scss">
.searchForm {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .el-form-item {
    margin: 0;
  }
}
</style>
