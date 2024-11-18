// 创建用户相关的小仓库
import { defineStore } from 'pinia'
import { ref } from 'vue'
// 引入用户登录接口
import { reqLogin, reqGetUserInfo, reqLogout } from '@/apis/user/index'
// 引入类型
import type { loginFormData, userResponseData } from '@/apis/user/type'
// 引入操作本地存储的工具方法
import { setToken, getToken, removeToken } from '@/utils/token'
import type { RouteRecordRaw } from 'vue-router'
// 引入路由（常量路由）
import { constantRoute } from '@/router/routers'

// 创建用户小仓库，并对外暴露
export default defineStore('User', () => {
  // 用户标识token
  const token = ref<string>(getToken())
  // 仓库存储生成菜单需要的数组（路由）
  const menuRouters = ref<RouteRecordRaw[]>(constantRoute)
  // 保存用户信息
  const userInfo = ref<userResponseData | undefined>()

  // 用户登录的方法
  const userLogin = async (loginData: loginFormData) => {
    let res = await reqLogin(loginData)
    token.value = res
    // 由于pinia|vuex存储数据其实利用的是js对象，不是持久化的
    setToken(res)
  }

  // 获取用户信息的方法
  const setUserInfo = async () => {
    let res = await reqGetUserInfo()
    userInfo.value = res
  }

  // 用户登出
  const logout = async () => {
    await reqLogout()
    token.value = ''
    removeToken()
    userInfo.value = undefined
  }

  return { userLogin, token, menuRouters, setUserInfo, userInfo, logout }
})
