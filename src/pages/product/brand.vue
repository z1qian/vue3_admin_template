<script setup lang="ts" name="brand">
import { ref, onMounted, reactive, computed, nextTick } from 'vue'
import {
  reqGetBrandPageList,
  reqUpsertBrand,
  reqDelBrand,
} from '@/apis/product/brand/index'
import type {
  BrandPageListResponseData,
  Brand,
} from '@/apis/product/brand/type'
import { ElMessage } from 'element-plus'
import type { UploadRawFile, FormRules, FormInstance } from 'element-plus'

const currentPage = ref<number>(1)
const pageSize = ref<number>(3)
const pagedBrandList = ref<BrandPageListResponseData | undefined>()
// 是否显示添加，修改品牌对话框
const showDialog = ref<boolean>(false)
const brandFormData = reactive<Brand>({
  id: 0,
  tmName: '',
  logoUrl: '',
})
// 添加，修改品牌表单
const brandForm = ref<FormInstance>()

// Dialog的标题
const dialogTitle = computed(() => {
  return brandFormData.id ? '修改品牌' : '添加品牌'
})

// 表单验证-是否上传图片
const validateUpload = (_rule: any, value: string, callback: any) => {
  if (!value.length) {
    callback(new Error('请上传品牌图片'))
  } else {
    callback()
  }
}

// 表单验证规则
const rules = reactive<FormRules<Brand>>({
  tmName: [
    {
      required: true,
      min: 2,
      message: '请输入至少2位品牌名称',
      trigger: 'blur',
    },
  ],
  logoUrl: [{ required: true, validator: validateUpload }],
})

onMounted(async () => {
  await getBrandPageList()
})

const getBrandPageList = async (cPage: number = 1) => {
  currentPage.value = cPage
  pagedBrandList.value = await reqGetBrandPageList(
    currentPage.value,
    pageSize.value,
  )
}

const sizeChange = async () => {
  await getBrandPageList()
}

// current-page 或 page-size 更改时触发
const change = (cPage: number, pSize: number) => {
  console.log(`currentPage:${cPage},pageSize:${pSize}`)
}

// 上传文件之前的钩子，参数为上传的文件， 若返回false或者返回 Promise 且被 reject，则停止上传
const beforeUpload = (rawFile: UploadRawFile) => {
  const typeList = ['image/jpeg', 'image/png', 'image/gif']

  if (!typeList.includes(rawFile.type)) {
    ElMessage({
      type: 'error',
      message: '上传文件格式务必为【PNG|JPG|GIF】',
    })
    return false
  }

  // 验证上传文件大小不能超过4M
  const maxSize = 4 * 1024 * 1024 // 4MB 转换为字节
  if (rawFile.size > maxSize) {
    ElMessage({
      type: 'error',
      message: '文件大小不能超过4MB',
    })
    return false
  }
}

// 文件上传成功时的钩子
const onSuccess = (response: any) => {
  // 上传文件成功
  if (response.code == 200) {
    brandFormData.logoUrl = response.data
    brandForm.value?.clearValidate('logoUrl')
  }
}

// 添加或修改品牌数据
const upsertBrand = async () => {
  // 验证表单，如果不通过，会报错，中断以下代码的执行，验证通过，则继续向下执行代码
  await brandForm.value?.validate()
  await reqUpsertBrand(brandFormData)
  ElMessage({
    type: 'success',
    message: dialogTitle.value + '成功',
  })
  showDialog.value = false

  // 修改品牌后，留在当前页
  await getBrandPageList(
    dialogTitle.value == '修改品牌' ? currentPage.value : 1,
  )
}

// 添加品牌按钮回调
const addBrandBtn = async () => {
  // 清除表单验证信息，方式一
  // brandForm.value?.clearValidate();

  showDialog.value = true
  Object.assign(brandFormData, { tmName: '', logoUrl: '', id: 0 })
  // 清除表单验证信息，方式二
  await nextTick()
  brandForm.value!.clearValidate()
}

// 修改品牌按钮回调
const editBrandBtn = async (row: Brand) => {
  // 清除表单验证信息，方式一
  // brandForm.value?.clearValidate();
  showDialog.value = true
  Object.assign(brandFormData, row)

  // 清除表单验证信息，方式二
  await nextTick()
  brandForm.value!.clearValidate()
}

// 删除品牌
const delBrand = async (id: number) => {
  await reqDelBrand(id)
  ElMessage({
    type: 'success',
    message: '删除品牌成功',
  })
  await getBrandPageList(
    pagedBrandList.value!.size <= 1 ? currentPage.value - 1 : currentPage.value,
  )
}
</script>

<template>
  <div class="brand">
    <el-card>
      <el-button type="primary" icon="plus" @click="addBrandBtn">
        添加品牌
      </el-button>
      <!-- 品牌数据展示表格 -->
      <el-table
        style="width: 100%; margin: 10px 0"
        border
        :data="pagedBrandList?.records"
      >
        <el-table-column
          type="index"
          label="序号"
          width="80px"
          align="center"
        />
        <el-table-column prop="tmName" label="品牌名称" />
        <el-table-column label="品牌Logo" v-slot="{ row }">
          <img :src="row.logoUrl" alt="" width="100px" />
        </el-table-column>
        <el-table-column label="品牌操作" v-slot="{ row }">
          <el-button
            type="primary"
            icon="edit"
            size="small"
            @click="editBrandBtn(row)"
          ></el-button>
          <el-popconfirm
            :title="`你确定要删除【${row.tmName}】吗?`"
            width="auto"
            icon="delete"
            @confirm="delBrand(row.id)"
          >
            <template #reference>
              <el-button type="danger" icon="delete" size="small"></el-button>
            </template>
          </el-popconfirm>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[3, 6, 9, 12]"
        size="default"
        background
        layout="prev, pager, next, jumper, -> , sizes, total"
        :total="pagedBrandList?.total ?? 0"
        @current-change="getBrandPageList"
        @size-change="sizeChange"
        @change="change"
      />
    </el-card>
    <!-- 添加，修改品牌对话框 -->
    <el-dialog v-model="showDialog" :title="dialogTitle">
      <!-- 品牌数据表单 -->
      <el-form
        :model="brandFormData"
        label-width="100px"
        label-position="left"
        style="width: 80%"
        :rules="rules"
        ref="brandForm"
      >
        <el-form-item label="品牌名称" prop="tmName">
          <el-input
            v-model.trim="brandFormData.tmName"
            placeholder="请输入品牌名称"
          />
        </el-form-item>
        <el-form-item label="品牌Logo" prop="logoUrl">
          <el-upload
            drag
            accept=".jpeg, .jpg, .png, .gif"
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :before-upload="beforeUpload"
            :on-success="onSuccess"
          >
            <img
              v-if="brandFormData.logoUrl"
              :src="brandFormData.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="showDialog = false">取消</el-button>
          <el-button type="primary" @click="upsertBrand">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.avatar-uploader .avatar {
  // height: 178px;
  display: block;
  width: 178px;
}
</style>

<style>
.avatar-uploader .el-upload {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  width: 178px;
  height: 178px;
  font-size: 28px;
  color: #8c939d;
  text-align: center;
}
</style>
