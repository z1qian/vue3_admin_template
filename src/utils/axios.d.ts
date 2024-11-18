import { AxiosRequestConfig, AxiosInstance } from 'axios'

// 扩展AxiosInstance接口，添加customRequest方法
declare module 'axios' {
  export interface AxiosInstance {
    customRequest<T>(config: AxiosRequestConfig): Promise<T>
  }
}
