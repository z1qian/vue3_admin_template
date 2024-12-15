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
import { constantRoutes, asyncRoutes, anyRoute } from '@/router/routers'
import router from '@/router'
// @ts-ignore
import cloneDeep from 'lodash/cloneDeep'

// 创建用户小仓库，并对外暴露
export default defineStore('User', () => {
  // 用户标识token
  const token = ref<string>(getToken())
  // 仓库存储生成菜单需要的数组（路由）
  const menuRouters = ref<RouteRecordRaw[]>([...constantRoutes, anyRoute])
  // 保存用户信息
  const userInfo = ref<userResponseData | undefined>()
  // 用户拥有权限的路由
  const permissionMenu = ref<RouteRecordRaw[]>([])

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
    const asyncRoutesCopy: RouteRecordRaw[] = cloneDeep(asyncRoutes)
    registerUserPermissionMenus(
      constantRoutes,
      asyncRoutesCopy,
      anyRoute,
      userInfo.value.routes,
    )
    console.log(router.getRoutes())
  }

  // 用户登出
  const logout = async () => {
    await reqLogout()
    token.value = ''
    removeToken()
    userInfo.value = undefined
    resetRouter()
  }

  // 清除注册的路由
  const resetRouter = () => {
    permissionMenu.value.forEach((route) => {
      // 移除当前用户的路由
      router.removeRoute(route.name as string)
    })
    console.log(router.getRoutes())
  }

  // 动态注册用户拥有权限的菜单
  const registerUserPermissionMenus = (
    constantRoutes: RouteRecordRaw[],
    asyncRoutes: RouteRecordRaw[],
    anyRoutes: RouteRecordRaw,
    userPermission: string[],
  ) => {
    let resRoutes = filterAsyncRoutes(asyncRoutes, userPermission)
    permissionMenu.value = resRoutes
    let registerRoutes = [...resRoutes, anyRoutes]
    menuRouters.value = [...constantRoutes, ...registerRoutes]
    //目前路由器管理的只有常量路由:用户计算完毕异步路由、任意路由动态追加
    registerRoutes.forEach((route: RouteRecordRaw) => {
      router.addRoute(route)
    })
  }

  const filterAsyncRoutes = (
    asyncRoutes: RouteRecordRaw[],
    userPermission: string[],
  ) => {
    return asyncRoutes.filter((route) => {
      if (userPermission.includes(route.name as string)) {
        if (route.children && route.children.length > 0) {
          route.children = filterAsyncRoutes(route.children, userPermission)
        }

        return true
      }

      return false
    })
  }
  return { userLogin, token, menuRouters, setUserInfo, userInfo, logout }
})
