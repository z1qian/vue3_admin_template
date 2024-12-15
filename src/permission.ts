// 全局守卫：项目中任意路由切换都会触发的钩子
import router from './router'
import nprogress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'
// 引入用户小仓库
import useUserStore from '@/stores/modules/user'
import pinia from './stores'
import setting from './setting'

// 创建用户小仓库
// 解决报错:"getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
const userStore = useUserStore(pinia)

console.log('路由全局守卫进行中...')
// 取消进度条进行时,右边的加载圈圈图标
nprogress.configure({ showSpinner: false })
// 路由鉴权：项目当中路由能不能被访问的权限设置

// 设置全局前置守卫 beforeEach
// 每次路由跳转前触发
router.beforeEach(async (to, _, next) => {
  console.log('beforeEach')
  // to:你将要访问的路由对象
  // from:你从哪个路由对象而来
  // next:路由的放行函数
  nprogress.start()
  // 如果需要进行权限验证等操作，可以在这里进行

  // 登录了
  if (userStore.token) {
    if (to.path == '/login') {
      next({ path: '/' })
      return
    }

    // 判断是否有用户信息
    if (!userStore.userInfo) {
      try {
        await userStore.setUserInfo()
        next(to)
        return
      } catch (error) {
        // token过期
        // token被修改

        // 退出登录->清除用户相关信息
        await userStore.logout()
        next({ path: '/login', query: { redirect: to.path } })
        return
      }
    }
  }
  // 没有登录
  else {
    if (to.path != '/login') {
      next({ path: '/login', query: { redirect: to.path } })
      return
    }
  }
  // 如果可以继续导航，调用 next()
  next()
})

// 设置全局后置守卫 afterEach
// 在路由跳转后触发
router.afterEach((to, _) => {
  // 一般用于统计页面访问量、分析等
  console.log('afterEach')

  document.title = `${setting.title}-${to.meta.title}`
  nprogress.done()
})
