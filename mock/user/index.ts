import type { userResponseMockData } from './type'
import { MockMethod } from 'vite-plugin-mock'
import type { loginFormData } from '../../src/apis/user/type'
import type { responseMockData } from '../type'

// 用户信息数据
function createUserList(): userResponseMockData[] {
  return [
    {
      avatar:
        'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      name: '大哥别动我',
      password: '1234567890Zxc',
      roles: ['超级管理员'],
      buttons: [
        'cuser.detail',
        'cuser.update',
        'cuser.delete',
        'btn.User.add',
        'btn.User.remove',
        'btn.User.update',
        'btn.User.assgin',
        'btn.Role.assgin',
        'btn.Role.add',
        'btn.Role.update',
        'btn.Role.remove',
        'btn.Permission.add',
        'btn.Permission.update',
        'btn.Permission.remove',
        'btn.Activity.add',
        'btn.Activity.update',
        'btn.Activity.rule',
        'btn.Coupon.add',
        'btn.Coupon.update',
        'btn.Coupon.rule',
        'btn.OrderList.detail',
        'btn.OrderList.Refund',
        'btn.UserList.lock',
        'btn.Category.add',
        'btn.Category.update',
        'btn.Category.remove',
        'btn.Trademark.add',
        'btn.Trademark.update',
        'btn.Trademark.remove',
        'btn.Attr.add',
        'btn.Attr.update',
        'btn.Attr.remove',
        'btn.Spu.add',
        'btn.Spu.addsku',
        'btn.Spu.update',
        'btn.Spu.skus',
        'btn.Spu.delete',
        'btn.Sku.updown',
        'btn.Sku.update',
        'btn.Sku.detail',
        'btn.Sku.remove',
        'btn.all',
        'btn.test.2',
        'aaabbb',
        '',
        '22223333444',
        'btn.Trademark.search',
      ],
      routes: [
        'aaa',
        'test-2',
        'User',
        'Category',
        'Discount',
        'ActivityEdit',
        'CouponRule',
        'bh',
        'Product',
        'Activity',
        'CouponAdd',
        'Trademark',
        'test1',
        'Attr',
        'ActivityAdd',
        'ASD ',
        'CouponEdit',
        'OrderShow',
        '111',
        'Permission',
        'Spu',
        'UserList',
        'ClientUser',
        'Order',
        '33',
        "t't",
        'Coupon',
        'permision',
        '6123',
        'Acl',
        'ActivityRule',
        'Role',
        'RoleAuth',
        '222',
        'Refund',
        '1223',
        'x',
        'OrderList',
        'Sku',
      ],
      token: 'ziqianttttttttttttttttttttttttoken',
    },
  ]
}

// 对外暴露一个数组：数组里面包含接口
const mock: MockMethod[] = [
  // 用户登录接口
  {
    url: '/admin/acl/index/login', //请求地址
    method: 'post', //请求方式
    response: ({ body }): responseMockData<string> => {
      //获取请求体携带过来的用户名与密码
      const { username, password } = body as loginFormData
      //调用获取用户信息函数,用于判断是否有此用户
      const checkUser = createUserList().find(
        (item) => item.name === username && item.password === password,
      )
      //没有用户返回失败信息
      if (!checkUser) {
        return {
          code: 201,
          message: '失败',
          data: '密码错误',
          ok: false,
        }
      }
      //如果有返回成功信息
      const { token } = checkUser
      return {
        code: 200,
        message: '成功',
        data: token,
        ok: true,
      }
    },
  },
  // 获取用户信息
  {
    url: '/admin/acl/index/info',
    method: 'get',
    response: (request): responseMockData<userResponseMockData | null> => {
      //获取请求头携带token
      const token = request.headers.token
      //查看用户信息是否包含有次token用户
      const checkUser = createUserList().find((item) => item.token === token)
      //没有返回失败的信息
      if (!checkUser) {
        return {
          code: 203,
          message: '服务异常',
          data: null,
          ok: false,
        }
      }
      //如果有返回成功信息
      return { code: 200, message: '成功', data: checkUser, ok: true }
    },
  },
  // 登出
  {
    url: '/admin/acl/index/logout', // 接口地址
    method: 'post', // 请求方式
    response: (): responseMockData<null> => {
      return {
        code: 200,
        message: '成功',
        data: null,
        ok: true,
      }
    },
  },
]

export default mock
