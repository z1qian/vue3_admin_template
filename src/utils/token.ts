const key = 'TOKEN'

// 封装本地存储，存储数据与读取数据的方法
export const setToken = (token: string) => {
  localStorage.setItem(key, token)
}

export const getToken = () => {
  return localStorage.getItem(key) || ''
}

export const removeToken = () => {
  localStorage.removeItem(key)
}
