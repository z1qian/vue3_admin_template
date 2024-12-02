// 进行axios二次封装：使用请求与响应拦截器
import axios, { AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
import { getToken } from './token'

// 第一步：利用axios对象的create方法，创建axios实例（配置其他的配置：基础路径，超时时间）
const request = axios.create({
  // 基础路径
  baseURL: import.meta.env.VITE_APP_BASE_API, // 基础路径会携带/api
  timeout: 5000, //超时时间的设置
})

// 第二步：request实例添加请求与响应拦截器

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
    config.data = config.data || {}
    // config配置对象，headers属性请求头，经常给服务器端携带公共参数
    let token = getToken()
    if (token) {
      // 请求头中，携带token
      config.headers.token = token
    }

    // 返回配置对象
    return config
  },
  (error) => {
    console.log('请求拦截器发生异常')
    return Promise.reject(error)
  },
)

// 第三步：响应拦截器
request.interceptors.response.use(
  (response) => {
    // 成功的回调
    const data = response.data
    if (data.code !== 200) {
      // 提示的错误信息
      ElMessage({
        type: 'error',
        message: data.data ?? data.message,
      })
      return Promise.reject(data)
    }
    // 简化数据
    return data.data === undefined ? {} : data.data
  },
  (error) => {
    // 失败的回调：处理http网络错误
    let message = ''
    // http状态码
    let status = error.response.status

    switch (status) {
      case 401:
        message = '请登录'
        break
      case 403:
        message = '无权访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器出现问题'
        break
      default:
        message = '请求出现错误'
        break
    }

    // 提示的错误信息
    ElMessage({
      type: 'error',
      message,
    })

    return Promise.reject(error)
  },
)

// 定义customRequest方法
request.customRequest = async <T>(config: AxiosRequestConfig): Promise<T> => {
  const response = await request(config)
  return response as T
}

// 对外暴露
export default request
