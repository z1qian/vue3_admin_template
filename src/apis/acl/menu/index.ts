// 统一管理项目，菜单管理相关的接口
import request from '@/utils/request.ts'
import type { MenuData, MenuFormData } from './type'

// 统一管理接口
enum API {
  GETUSERPERMISSIONLIST_URL = '/admin/acl/permission/toAssign',
  // 给角色分配权限的url
  SETROLEPERMISSION_URL = '/admin/acl/permission/doAssign',
  GETMENULIST_URL = '/admin/acl/permission',
  ADDMENU_URL = '/admin/acl/permission/save',
  EDITMENU_URL = '/admin/acl/permission/update',
  DELMENU_URL = '/admin/acl/permission/remove',
}

// 暴露请求函数

// 获取角色的菜单和按钮权限列表
export const reqGetUserPermissionList = (roleId: number): Promise<MenuData> =>
  request.customRequest<MenuData>({
    method: 'get',
    url: `${API.GETUSERPERMISSIONLIST_URL}/${roleId}`,
  })

// 给角色分配权限
export const reqSetRolePermission = (
  roleId: number,
  permissionId: number[],
): Promise<null> => {
  return request.customRequest<null>({
    method: 'post',
    url: `${API.SETROLEPERMISSION_URL}?roleId=${roleId}&permissionId=${permissionId}`,
  })
}

// 获取菜单列表
export const reqGetMenuList = (): Promise<MenuData> =>
  request.customRequest<MenuData>({
    method: 'get',
    url: API.GETMENULIST_URL,
  })

// 添加或者修改菜单
export const reqUpsertMenu = (data: MenuFormData): Promise<null> => {
  if (data.id) {
    return request.customRequest<null>({
      method: 'put',
      url: API.EDITMENU_URL,
      data,
    })
  } else {
    return request.customRequest<null>({
      method: 'post',
      url: API.ADDMENU_URL,
      data,
    })
  }
}

// 删除菜单
export const reqDelMenu = (menuId: number): Promise<null> =>
  request.customRequest<null>({
    method: 'delete',
    url: API.DELMENU_URL + '/' + menuId,
  })
