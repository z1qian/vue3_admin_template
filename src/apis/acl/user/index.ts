// 统一管理项目，权限管理用户相关的接口
import request from '@/utils/request.ts'
import type { PagedUserResponse, UserRecord } from './type'

// 统一管理接口
enum API {
  GETPAGEDUSER_URL = '/admin/acl/user',
  ADDUSER_URL = '/admin/acl/user/save',
  UPDATEUSER_URL = '/admin/acl/user/update',
  DELETEUSER_URL = '/admin/acl/user/remove',
  DELETERANGEUSER_URL = '/admin/acl/user/batchRemove',
}

// 暴露请求函数

// 分页获取用户信息
export const reqGetPagedUser = (
  page: number,
  limit: number,
  username: string,
): Promise<PagedUserResponse> =>
  request.customRequest<PagedUserResponse>({
    method: 'get',
    url: `${API.GETPAGEDUSER_URL}/${page}/${limit}`,
    params: { username },
  })

// 添加或者修改管理员用户
export const reqUpsertUser = (data: UserRecord): Promise<null> => {
  if (data.id) {
    return request.customRequest<null>({
      method: 'put',
      url: API.UPDATEUSER_URL,
      data,
    })
  } else {
    return request.customRequest<null>({
      method: 'post',
      url: API.ADDUSER_URL,
      data,
    })
  }
}

// 根据Id删除用户
export const reqDeleteUserById = (userId: number): Promise<null> =>
  request.customRequest<null>({
    method: 'delete',
    url: `${API.DELETEUSER_URL}/${userId}`,
  })

// 批量删除用户
export const reqDeleteRangeUser = (userIdList: number[]): Promise<null> =>
  request.customRequest<null>({
    method: 'delete',
    url: API.DELETERANGEUSER_URL,
    data: userIdList,
  })
