import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// 引入svg需要用到的插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // 获取各种环境下对应的环境变量
  let env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
      }),
      vue(),
      viteMockServe({
        // 保证开发阶段，可以使用mock接口
        enable: command === 'serve',
      }),
      // 使用 <script setup lang='ts' name='xxx'> 为组件设置名称
      VueSetupExtend(),
    ],
    resolve: {
      alias: {
        '@': path.resolve('./src'), // 相对路径别名配置，使用 @ 代替 src
      },
    },
    // scss 全局变量配置
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@use "./src/styles/variable.scss" as *;',
        },
      },
    },
    server: {
      // 代理跨域
      // 这个代理配置只在开发环境（vite serve 或 vite 启动的开发服务器）中有效，生产环境的跨域问题需要通过服务器端配置来解决
      proxy: {
        // 你希望代理的路径前缀，比如说'/api'
        // env.VITE_APP_BASE_API放在[]中，表示是一个变量，会解析
        [env.VITE_APP_BASE_API + '/admin/acl']: {
          target: env.VITE_ACL_SERVER, // 目标 API 地址
          changeOrigin: true, // 是否修改请求头中的 origin 字段，以避免跨域问题
          rewrite: (path) => path.replace(/^\/api/, ''), // 可选，重写请求路径
        },
        // [env.VITE_APP_BASE_API + '/admin/product']: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_PRODUCT_SERVER, // 目标 API 地址
          changeOrigin: true, // 是否修改请求头中的 origin 字段，以避免跨域问题
          rewrite: (path) => path.replace(/^\/api/, ''), // 可选，重写请求路径
        },
      },
      // 使开发服务器监听所有网络接口
      host: '0.0.0.0',
    },
  }
})
