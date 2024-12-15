// 统一管理项目，角色管理相关的接口
import request from '@/utils/request.ts'
import type {
  UserRoleData,
  SetRoleData,
  PagedRolesResponse,
  Role,
} from './type'

// 统一管理接口
enum API {
  GETUSERROLE_URL = '/admin/acl/user/toAssign',
  ASSIGNUSERROLE_URL = '/admin/acl/user/doAssignRole',
  GETPAGEDROLES_URL = '/admin/acl/role',
  //新增岗位的接口地址
  ADDROLE_URL = '/admin/acl/role/save',
  //更新已有的职位
  UPDATEROLE_URL = '/admin/acl/role/update',
  DELETEROLE_URL = '/admin/acl/role/remove',
}

// 暴露请求函数

// 获取用户的角色和全部角色列表
export const reqGetUserRole = (userId: number): Promise<UserRoleData> =>
  request.customRequest<UserRoleData>({
    method: 'get',
    url: `${API.GETUSERROLE_URL}/${userId}`,
  })

// 给用户分类角色
export const reqAssignUserRole = (data: SetRoleData): Promise<null> =>
  request.customRequest<null>({
    method: 'post',
    url: API.ASSIGNUSERROLE_URL,
    data,
  })

// 获取分页的角色数据列表
export const reqGetPagedRoleList = (
  page: number,
  limit: number,
  roleName: string,
): Promise<PagedRolesResponse> =>
  request.customRequest<PagedRolesResponse>({
    method: 'get',
    url: `${API.GETPAGEDROLES_URL}/${page}/${limit}`,
    params: { roleName },
  })

// 添加或者修改角色
export const reqUpsertRole = (data: Role): Promise<null> => {
  if (data.id) {
    return request.customRequest<null>({
      method: 'put',
      url: API.UPDATEROLE_URL,
      data,
    })
  } else {
    return request.customRequest<null>({
      method: 'post',
      url: API.ADDROLE_URL,
      data,
    })
  }
}

// 删除角色
export const reqDeleteRole = (roleId: number): Promise<null> =>
  request.customRequest<null>({
    method: 'delete',
    url: `${API.DELETEROLE_URL}/${roleId}`,
  })
