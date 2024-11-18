// 统一管理项目，用户相关的接口
import request from '@/utils/request.ts'
import type { loginFormData, userResponseData } from './type'

// 统一管理接口
enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}

// 暴露请求函数

// 登录接口方法
export const reqLogin = (data: loginFormData): Promise<string> =>
  request.customRequest<string>({
    method: 'post',
    url: API.LOGIN_URL,
    data,
  })

// 获取用户信息接口方法
export const reqGetUserInfo = (): Promise<userResponseData> =>
  request.customRequest<userResponseData>({
    method: 'get',
    url: API.USERINFO_URL,
  })

// 登出方法
export const reqLogout = (): Promise<null> =>
  request.customRequest<null>({
    method: 'post',
    url: API.LOGOUT_URL,
  })
