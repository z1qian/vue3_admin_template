<script setup lang="ts" name="index">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
// 引入用户小仓库
import useUserStore from '@/stores/modules/user'
import { useRouter, useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
import { getTimePeriod } from '@/utils/time'
import type { FormInstance, FormRules } from 'element-plus'
import type { loginFormData } from '@/apis/user/type'

// 收集账号与密码的数据
let formData = reactive<loginFormData>({
  username: 'jklasdas',
  password: '1234567890Zxc',
})

// 控制按钮的loading状态
const loading = ref(false)
// 登录表单
const loginForm = ref<FormInstance>()

// 自定义验证用户名
const validateUserName = (_: any, value: string, callback: any) => {
  // 手机号验证的正则表达式
  const phoneRegex = /^1[3-9]\d{9}$/

  if (value === 'admin' || phoneRegex.test(value) || value === 'jklasdas') {
    callback()
  } else {
    callback(new Error('请输入你的手机号'))
  }
}

// 验证 password 的规则
const validatePassword = (_: any, value: string, callback: any) => {
  // 密码验证的正则表达式，要求包含大小写字母和数字，且长度至少为8位
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/

  if (passwordRegex.test(value)) {
    callback()
  } else {
    callback(new Error('密码必须包含大小写字母和数字，且长度至少为8位'))
  }
}
// 表单验证规则
const rules = reactive<FormRules<loginFormData>>({
  username: [
    {
      required: true,
      min: 5,
      max: 20,
      message: '请输入5-20位用户名',
      trigger: 'blur',
    },
    {
      validator: validateUserName,
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      min: 8,
      max: 20,
      message: '请输入8-20位密码',
      trigger: 'blur',
    },
    {
      validator: validatePassword,
      trigger: 'blur',
    },
  ],
})

let userStore = useUserStore()

// 获取路由器
const router = useRouter()
// 获取路由对象
const route = useRoute()
// 登录按钮回调
const login = async (formEl: FormInstance | undefined) => {
  if (!formEl) return

  try {
    // 表单验证
    await formEl.validate(async (valid, fields) => {
      if (!valid) {
        // 验证失败
        console.error('error submit!', fields)
        return
      }
      // 验证成功
      loading.value = true
      await userStore.userLogin(formData)
      // 跳转到指定路由
      const redirect = route.query.redirect as string | undefined
      router.push(redirect || '/')
      // 登录成功的提示信息
      ElNotification({
        type: 'success',
        message: '欢迎回来',
        title: `Hi，${getTimePeriod()}好`,
      })
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="{ span: 22, offset: 2 }">
        <!-- 登录的表单 -->
        <el-form
          class="login_form"
          ref="loginForm"
          :model="formData"
          status-icon
          :rules="rules"
          inline-message
        >
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model.trim="formData.username"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model.trim="formData.password"
              show-password
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              type="primary"
              class="login_btn"
              @click="login(loginForm)"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.login_container {
  width: 100vw;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;

  .login_form {
    position: relative;
    width: 65%;
    top: 30vh;
    background: url('@/assets/images/login_form.png');
    background-size: cover;
    padding: 40px;

    h1 {
      color: white;
      font-size: 40px;
    }

    h2 {
      color: white;
      font-size: 20px;
      margin: 20px 0;
    }

    .login_btn {
      width: 100%;
    }
  }
}
</style>
