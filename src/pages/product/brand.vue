<script setup lang="ts" name="brand">
import { ref, onMounted, reactive } from 'vue'
import { reqGetBrandPageList } from '@/apis/product/brand/index'
import type {
  brandPageListResponseData,
  brand,
} from '@/apis/product/brand/type'
import { ElMessage, UploadRawFile } from 'element-plus'

const currentPage = ref<number>(1)
const pageSize = ref<number>(3)
const pagedBrandList = ref<brandPageListResponseData | undefined>()
// 是否显示添加，修改品牌对话框
const showDialog = ref<boolean>(false)
const brandFormData = reactive<brand>({
  tmName: '',
  logoUrl: '',
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
  }
}
</script>

<template>
  <div class="brand">
    <el-card>
      <el-button type="primary" icon="plus" @click="showDialog = true">
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
        <el-table-column label="品牌操作">
          <el-button
            type="primary"
            icon="edit"
            size="small"
            @click="showDialog = true"
          ></el-button>
          <el-button type="danger" icon="delete" size="small"></el-button>
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
    <el-dialog v-model="showDialog" title="添加品牌">
      <!-- 品牌数据表单 -->
      <el-form
        :model="brandFormData"
        label-width="80px"
        label-position="left"
        style="width: 80%"
      >
        <el-form-item label=" 品牌名称">
          <el-input
            v-model="brandFormData.tmName"
            placeholder="请输入品牌名称"
          />
        </el-form-item>
        <el-form-item label="品牌Logo">
          <el-upload
            drag
            accept=".jpeg, .jpg, .png, .gif"
            class="avatar-uploader"
            action="/admin/product/fileUpload"
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
          <el-button type="primary" @click="">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
