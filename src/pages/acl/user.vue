<script setup lang="ts" name="User">
import { ref, onMounted, nextTick, computed } from 'vue'
import {
  reqGetPagedUser,
  reqUpsertUser,
  reqDeleteUserById,
  reqDeleteRangeUser,
} from '@/apis/acl/user'
import type { PagedUserResponse, UserRecord } from '@/apis/acl/user/type'
import { ElMessage, type FormInstance } from 'element-plus'
import { reqGetUserRole, reqAssignUserRole } from '@/apis/acl/role'
import type { UserRoleData } from '@/apis/acl/role/type'
import useLayoutSettingStore from '@/stores/modules/layoutSetting'

const layoutSettingStore = useLayoutSettingStore()
const currentPage = ref(1)
const pageSize = ref(6)
const pagedUserData = ref<PagedUserResponse>()
const drawerUser = ref(false)
const drawerRole = ref(false)
const userFormDataOriginal = {
  id: 0,
  username: '',
  password: '',
  name: '',
}
const userFormData = ref<UserRecord>({ ...userFormDataOriginal })
const userForm = ref<FormInstance>()
const checkAll = ref(false)
const isIndeterminate = computed(() => {
  const checkedCount = userRoleObj.value.assignRoles.length

  return (
    checkedCount > 0 && checkedCount < userRoleObj.value.allRolesList.length
  )
})
const userRoleObj = ref<UserRoleData>({
  assignRoles: [],
  allRolesList: [],
})
const selectedUserList = ref<UserRecord[]>([])
const keyWord = ref('')

const handleCheckAllChange = (val: boolean) => {
  userRoleObj.value.assignRoles = val ? userRoleObj.value.allRolesList : []
}
const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === userRoleObj.value.allRolesList.length
}

// 自定义验证用户名
// const validateUserName = (_: any, value: string, callback: any) => {
//   // 手机号验证的正则表达式
//   const phoneRegex = /^1[3-9]\d{9}$/

//   if (value === 'admin' || phoneRegex.test(value)) {
//     callback()
//   } else {
//     callback(new Error('请输入你的手机号'))
//   }
// }

// 验证 password 的规则
// const validatePassword = (_: any, value: string, callback: any) => {
//   // 密码验证的正则表达式，要求包含大小写字母和数字，且长度至少为8位
//   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/

//   if (passwordRegex.test(value)) {
//     callback()
//   } else {
//     callback(new Error('密码必须包含大小写字母和数字，且长度至少为8位'))
//   }
// }
// 表单验证规则
// const rules = reactive<FormRules<UserRecord>>({
//   username: [
//     {
//       required: true,
//       min: 5,
//       max: 20,
//       message: '请输入5-20位用户名',
//       trigger: 'blur',
//     },
//     {
//       validator: validateUserName,
//       trigger: 'blur',
//     },
//   ],
//   name: [
//     {
//       required: true,
//       min: 5,
//       max: 20,
//       message: '请输入5-20位昵称',
//       trigger: 'blur',
//     },
//   ],
//   password: [
//     {
//       required: true,
//       min: 8,
//       max: 20,
//       message: '请输入8-20位密码',
//       trigger: 'blur',
//     },
//     {
//       validator: validatePassword,
//       trigger: 'blur',
//     },
//   ],
// })

onMounted(() => {
  getPagedUserData()
})

const getPagedUserData = async (page: number = 1) => {
  currentPage.value = page
  pagedUserData.value = await reqGetPagedUser(
    currentPage.value,
    pageSize.value,
    keyWord.value,
  )
}

const addUser = async () => {
  drawerUser.value = true
  await nextTick()
  // userForm.value!.resetFields();
  Object.assign(userFormData.value, userFormDataOriginal)
}

const editUser = async (user: UserRecord) => {
  drawerUser.value = true
  const { id, name, username } = user
  Object.assign(userFormData.value, { id, name, username })
}

// 添加或者修改用户
const upsertUser = async () => {
  await userForm.value!.validate()
  let op = userFormData.value.id ? '修改' : '添加'
  await reqUpsertUser(userFormData.value)
  drawerUser.value = false
  ElMessage({
    type: 'success',
    message: `${op}成功`,
  })
  if (op == '添加') {
    await getPagedUserData()
  } else {
    // await getPagedUserData(currentPage.value);
    window.location.reload()
  }
}

const drawerClose = () => {
  userForm.value!.clearValidate()
}

// 分配角色按钮回调
const assignRole = async (user: UserRecord) => {
  drawerRole.value = true
  const { id, name, username, roleName } = user
  Object.assign(userFormData.value, { id, name, username, roleName })

  // 获取用户所拥有的角色和全部角色列表
  userRoleObj.value = await reqGetUserRole(id)
  const allRolesCount = userRoleObj.value.allRolesList.length
  const hasRolesCount = userRoleObj.value.assignRoles.length
  checkAll.value =
    allRolesCount > 0 && hasRolesCount > 0 && allRolesCount === hasRolesCount
}

const setRole = async () => {
  await reqAssignUserRole({
    userId: userFormData.value.id,
    roleIdList: userRoleObj.value.assignRoles.map((role) => role.id!),
  })
  ElMessage({
    type: 'success',
    message: '分配角色成功',
  })
  await getPagedUserData(currentPage.value)
  drawerRole.value = false
}

const deleteUser = async (userId: number) => {
  await reqDeleteUserById(userId)
  ElMessage({
    type: 'success',
    message: '删除成功',
  })

  let page = currentPage.value
  await getPagedUserData(
    pagedUserData.value!.records.length <= 1 && page > 1 ? page - 1 : page,
  )
}

// 批量删除用户
const deleteRangeUser = async () => {
  let idList = selectedUserList.value.map((user) => user.id)
  await reqDeleteRangeUser(idList)
  ElMessage({
    type: 'success',
    message: '删除成功',
  })
  let page = currentPage.value
  await getPagedUserData(
    pagedUserData.value!.records.length <= idList.length && page > 1
      ? page - 1
      : page,
  )
}

const reset = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh
}
</script>

<template>
  <div class="user">
    <el-card>
      <el-form
        label-width="60px"
        inline
        label-position="left"
        class="searchForm"
      >
        <el-form-item label="用户名">
          <el-input
            placeholder="请输入欲搜索的用户名"
            style="width: 240px"
            v-model="keyWord"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :disabled="!keyWord"
            @click="getPagedUserData()"
          >
            搜索
          </el-button>
          <el-button type="success" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top: 10px">
      <el-button type="primary" @click="addUser">添加用户</el-button>
      <el-button
        type="danger"
        :disabled="!selectedUserList.length"
        @click="deleteRangeUser"
      >
        批量删除
      </el-button>
      <el-table
        border
        style="margin: 10px 0"
        :data="pagedUserData?.records"
        @selection-change="selectedUserList = $event"
      >
        <el-table-column
          type="selection"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column
          type="index"
          label="#"
          align="center"
        ></el-table-column>
        <el-table-column prop="id" label="ID" align="center"></el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="用户名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="roleName"
          label="用户角色"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新时间"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="prop"
          label="操作"
          align="center"
          width="270"
          v-slot="{ row }"
        >
          <el-button
            type="primary"
            icon="user"
            size="small"
            @click="assignRole(row)"
          >
            分配角色
          </el-button>
          <el-button
            type="warning"
            icon="edit"
            size="small"
            @click="editUser(row)"
          >
            编辑
          </el-button>
          <el-popconfirm
            :title="`你要删除${row.username}吗?`"
            width="auto"
            @confirm="deleteUser(row.id)"
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
        :total="pagedUserData?.total ?? 0"
        @current-change="getPagedUserData"
        @size-change="getPagedUserData()"
      />
    </el-card>
    <!-- 添加或者修改用户 -->
    <el-drawer
      v-model="drawerUser"
      :title="`${userFormData.id ? '修改' : '添加'}用户`"
      size="40%"
      @close="drawerClose"
    >
      <el-form ref="userForm" :model="userFormData" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="userFormData.username"
            placeholder="请输入用户名"
            size="default"
          />
        </el-form-item>
        <el-form-item label="用户昵称" prop="name">
          <el-input
            v-model="userFormData.name"
            placeholder="请输入用户昵称"
            size="default"
          />
        </el-form-item>
        <el-form-item label="用户密码" prop="password" v-if="!userFormData.id">
          <el-input
            v-model="userFormData.password"
            placeholder="请输入用户密码"
            size="default"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="drawerUser = false">取消</el-button>
          <el-button type="primary" @click="upsertUser">确定</el-button>
        </div>
      </template>
    </el-drawer>
    <!-- 分配角色 -->
    <el-drawer v-model="drawerRole" title="分配角色(职位)" size="40%">
      <el-form label-width="80px">
        <el-form-item label="用户名">
          <el-input disabled v-model="userFormData.username"></el-input>
        </el-form-item>
        <el-form-item label="职位列表">
          <!-- 全选 -->
          <el-checkbox
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            @change="handleCheckAllChange"
          >
            全选
          </el-checkbox>
          <!-- 职位列表 -->
          <el-checkbox-group
            v-model="userRoleObj.assignRoles"
            @change="handleCheckedCitiesChange"
          >
            <el-checkbox
              v-for="role in userRoleObj.allRolesList"
              :key="role.id"
              :label="role.roleName"
              :value="role"
            >
              {{ role.roleName }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="drawerRole = false">取消</el-button>
          <el-button type="primary" @click="setRole">确定</el-button>
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
