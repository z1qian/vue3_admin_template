import type { userResponseData } from '../../src/apis/user/type'

//定义登录接口返回假数据类型
export interface userResponseMockData extends userResponseData {
  token: string
  password: string
}
