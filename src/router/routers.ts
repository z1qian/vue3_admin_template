// 对外暴露配置的路由
export const constantRoutes = [
  // 登录
  {
    path: '/login',
    component: () => import('@/pages/login/index.vue'), // 路由懒加载
    name: 'login', // 命名路由
    children: [],
    meta: {
      title: '登录',
      show: false,
    },
  },
  // 首页
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout',
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/pages/home/index.vue'),
        meta: {
          title: '首页',
          show: true,
          icon: 'HomeFilled', // 菜单文字左边的图标，支持element-plus全部图标
        },
      },
    ],
    meta: {
      title: '',
      show: true,
    },
  },
  // 404
  {
    path: '/404',
    component: () => import('@/pages/404/index.vue'),
    name: '404',
    meta: {
      title: '404',
      show: false,
    },
  },
  // 数据大屏
  {
    path: '/screen',
    component: () => import('@/pages/screen/screen.vue'),
    name: 'Screen',
    meta: {
      title: '数据大屏',
      show: true,
      icon: 'DataAnalysis',
    },
  },
]

export const asyncRoutes = [
  // 权限管理
  {
    path: '/acl',
    redirect: '/acl/user',
    component: () => import('@/layout/index.vue'),
    name: 'Acl',
    meta: {
      title: '权限管理',
      show: true,
      icon: 'Lock',
    },
    children: [
      {
        path: '/acl/user',
        component: () => import('@/pages/acl/user.vue'),
        name: 'User',
        meta: {
          title: '用户管理',
          show: true,
          icon: 'UserFilled',
        },
      },
      {
        path: '/acl/role',
        component: () => import('@/pages/acl/role.vue'),
        name: 'Role',
        meta: {
          title: '角色管理',
          show: true,
          icon: 'Avatar',
        },
      },
      {
        path: '/acl/permission',
        component: () => import('@/pages/acl/permission.vue'),
        name: 'Permission',
        meta: {
          title: '菜单管理',
          show: true,
          icon: 'Menu',
        },
      },
    ],
  },
  // 商品管理
  {
    path: '/product',
    redirect: '/product/brand',
    component: () => import('@/layout/index.vue'),
    name: 'Product',
    meta: {
      title: '商品管理',
      show: true,
      icon: 'GoodsFilled',
    },
    children: [
      {
        path: '/product/brand',
        component: () => import('@/pages/product/brand.vue'),
        name: 'Trademark',
        meta: {
          title: '品牌管理',
          show: true,
          icon: 'Shop',
        },
      },
      {
        path: '/product/attr',
        component: () => import('@/pages/product/attr.vue'),
        name: 'Attr',
        meta: {
          title: '属性管理',
          show: true,
          icon: 'InfoFilled',
        },
      },
      {
        path: '/product/spu',
        component: () => import('@/pages/product/spu/spu.vue'),
        name: 'Spu',
        meta: {
          title: 'SPU管理',
          show: true,
          icon: 'Present',
        },
      },
      {
        path: '/product/sku',
        component: () => import('@/pages/product/sku/sku.vue'),
        name: 'Sku',
        meta: {
          title: 'SKU管理',
          show: true,
          icon: 'Tickets',
        },
      },
    ],
  },
]

// 任意路由
export const anyRoute = {
  path: '/:pathMatch(.*)*',
  redirect: '/404',
  name: 'any',
  meta: {
    title: '任意路由',
    show: false,
  },
}
