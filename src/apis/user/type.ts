// 登录接口需要携带的参数ts类型
export interface loginFormData {
  username: string
  password: string
}

// 定义服务器返回用于信息相关的数据类型
export interface userResponseData {
  routes: string[] // routes 是一个字符串数组
  buttons: string[] // buttons 是一个字符串数组
  roles: string[] // roles 是一个字符串数组
  name: string // name 是一个字符串
  avatar: string // avatar 是一个字符串（URL 地址）
}
