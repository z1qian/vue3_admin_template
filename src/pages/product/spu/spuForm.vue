<script setup lang="ts" name="spuForm">
import {
    reqGetSPUBrandList,
    reqGetSPUImageList,
    reqGetBaseSaleAttrList,
    reqGetSPUSaleAttrList,
    reqUpsertSPU
} from '@/apis/product/spu'
import type { Brand } from '@/apis/product/brand/type'
import type {
    Image,
    BaseSaleAttrList,
    SpuSaleAttr,
    SpuRecord,
} from '@/apis/product/spu/type'
import { ref, computed, nextTick } from 'vue'
import type { UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'
// 引入分类小仓库
import useCategoryStore from '@/stores/modules/category'

// 创建分类小仓库
const categoryStore = useCategoryStore()

// 定义接收的 props
const props = defineProps({
    modelValue: {
        type: Number, // 绑定的值类型，根据需要调整
        required: true,
    },
    currentPage: {
        type: Number,
        default: 1,
    },
    pageSize: {
        type: Number,
        default: 3,
    }
})

// 定义触发的事件
const emit = defineEmits(['update:modelValue', 'update:currentPage', 'update:pageSize'])

const spuBrandList = ref<Brand[]>([])
const spuImageList = ref<Image[]>([])
const baseSaleAttrList = ref<BaseSaleAttrList>([])
const spuSaleAttrList = ref<SpuSaleAttr[]>([])
// 添加或者修改SPU表单数据
const spuFormData = ref<SpuRecord>({
    id: 0,
    spuName: '',
    description: '',
    category3Id: 0,
    tmId: undefined,
    spuSaleAttrList: [],
    spuImageList: []
});
// 照片墙预览dialog是否展示
const dialogVisible = ref(false);
// 照片墙预览dialog里的图片地址
const dialogImageUrl = ref('');
// 未选择的基础销售属性列表
const unSelectedBaseSaleAttrList = computed(() =>
    baseSaleAttrList.value.filter(attr =>
        spuSaleAttrList.value.every(spuAttr => attr.name != spuAttr.saleAttrName))
)

const selectedBaseSaleAttr = ref('');
const getSPUBrandList = async () => {
    spuBrandList.value = await reqGetSPUBrandList()
}

const getSPUImageList = async (spuId: number) => {
    spuImageList.value = await reqGetSPUImageList(spuId);
    spuImageList.value = spuImageList.value.map(img => {
        return {
            name: img.imgName,
            url: img.imgUrl,
        }
    });
}

const getBaseSaleAttrList = async () => {
    baseSaleAttrList.value = await reqGetBaseSaleAttrList()
}

const getSPUSaleAttrList = async (spuId: number) => {
    spuSaleAttrList.value = await reqGetSPUSaleAttrList(spuId)
}

const initSPUData = async (spu: SpuRecord) => {
    spuFormData.value = JSON.parse(JSON.stringify(spu));
    await getSPUBrandList()
    await getSPUImageList(spu.id!)
    await getBaseSaleAttrList()
    await getSPUSaleAttrList(spu.id!)
}

// 点击文件列表中已上传的文件时的钩子
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
    dialogImageUrl.value = uploadFile.url!
    dialogVisible.value = true
}

// 上传文件之前的钩子，参数为上传的文件， 若返回false或者返回 Promise 且被 reject，则停止上传
const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
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

    return true;
}

// 添加属性按钮回调
const addSpuAttr = () => {
    if (!selectedBaseSaleAttr.value) return;

    // baseSaleAttrId: number
    // saleAttrName: string
    // spuSaleAttrValueList: SpuSaleAttrValue[]
    const [attrId, attrName] = selectedBaseSaleAttr.value.split(':');
    spuSaleAttrList.value.push({
        baseSaleAttrId: parseInt(attrId),
        saleAttrName: attrName,
        spuSaleAttrValueList: [],
    });
    selectedBaseSaleAttr.value = '';
}

// 添加属性值回调
const addAttrValue = async (attr: SpuSaleAttr) => {
    attr.edit = true;
    await nextTick();
    attr.inputCom?.focus();
}

// 返回一个函数，Vue 会调用这个函数，将当前渲染的 DOM 元素传入
// 当绑定的元素被卸载时，函数也会被调用一次，此时的 el 参数会是 null
const setInputRef = (attr: SpuSaleAttr) => (el: HTMLInputElement | null) => {
    attr.inputCom = el;
}

const toViewMode = (attr: SpuSaleAttr) => {
    if (!attr.spuSaleAttrValue) {
        ElMessage({
            type: 'error',
            message: '请输入属性值',
        })
        // attr.inputCom?.focus();
        return;
    }

    // 判断属性值是否重复
    if (attr.spuSaleAttrValueList.some(v => v.saleAttrValueName == attr.spuSaleAttrValue)) {
        ElMessage({
            type: 'error',
            message: '属性值不能重复',
        })
        attr.spuSaleAttrValue = '';
        // attr.inputCom?.focus();
        return;
    }

    attr.edit = false;
    attr.spuSaleAttrValueList.push({
        baseSaleAttrId: attr.baseSaleAttrId,
        saleAttrValueName: attr.spuSaleAttrValue
    })
    attr.spuSaleAttrValue = '';
}

// 保存按钮回调
const upsertSpu = async () => {
    let type = spuFormData.value.id ? '修改' : '添加';
    // 整理照片墙数据
    spuFormData.value.spuImageList = spuImageList.value.map((img: any) => {
        return {
            imgName: img.name,
            imgUrl: img.response ? img.response.data : img.url
        }
    })
    spuFormData.value.spuSaleAttrList = spuSaleAttrList.value;

    await reqUpsertSPU(spuFormData.value);
    ElMessage({
        type: 'success',
        message: `${type}成功`,
    });
    emit('update:modelValue', 2);

    if (type == '修改')
        categoryStore.getPagedSPUList(props.currentPage, props.pageSize)
    else {
        emit('update:currentPage', 1);
        // 只有等父组件完成更新后，才能拿到新值
        // 确保父组件的响应式数据更新完成
        await nextTick();
        categoryStore.getPagedSPUList(props.currentPage, props.pageSize)
    }
}

const initAddSPUData = async (c3Id: number) => {
    // 清除数据
    Object.assign(spuFormData.value, {
        id: 0,
        spuName: '',
        description: '',
        category3Id: 0,
        tmId: undefined,
        spuSaleAttrList: [],
        spuImageList: []
    });
    spuImageList.value = [];
    spuSaleAttrList.value = [];
    selectedBaseSaleAttr.value = '';

    spuFormData.value.category3Id = c3Id;
    await getSPUBrandList()
    await getBaseSaleAttrList()
}


defineExpose({ initSPUData, initAddSPUData })
</script>

<template>
    <div class="spuForm">
        <el-form ref="form" :model="spuFormData" label-width="100px" label-position="top">
            <el-form-item label="SPU名称" prop="spuName">
                <el-input placeholder="请输入SPU名称" v-model="spuFormData.spuName" />
            </el-form-item>
            <el-form-item label="SPU品牌">
                <el-select placeholder="请选择" style="width: 240px" v-model="spuFormData.tmId">
                    <el-option v-for="item in spuBrandList" :key="item.id" :label="item.tmName"
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="SPU描述">
                <el-input placeholder="请输入SPU描述" type="textarea" v-model="spuFormData.description" />
            </el-form-item>
            <el-form-item label="SPU图标">
                <el-upload v-model:file-list="spuImageList" action="/api/admin/product/fileUpload"
                    list-type="picture-card" :on-preview="handlePictureCardPreview" :before-upload="beforeUpload">
                    <el-icon>
                        <Plus />
                    </el-icon>
                </el-upload>
                <el-dialog v-model="dialogVisible">
                    <img w-full :src="dialogImageUrl" alt="Preview Image" width="100%" />
                </el-dialog>
            </el-form-item>
            <el-form-item label="SPU销售属性">
                <el-select v-model="selectedBaseSaleAttr"
                    :placeholder="unSelectedBaseSaleAttrList.length > 0 ? `还未选择${unSelectedBaseSaleAttrList.length}项` : '无'"
                    style="width: 240px">
                    <el-option v-for="item in unSelectedBaseSaleAttrList" :key="item.id" :label="item.name"
                        :value="`${item.id}:${item.name}`"></el-option>
                </el-select>
                <el-button type="primary" icon="plus" style="margin-left: 10px" :disabled="!selectedBaseSaleAttr"
                    @click="addSpuAttr">
                    添加属性
                </el-button>
                <el-table :data="spuSaleAttrList" style="width: 100%; margin: 10px 0" border>
                    <el-table-column label="序号" width="80px" type="index" align="center"></el-table-column>
                    <el-table-column prop="saleAttrName" label="销售属性名称" width="120px"></el-table-column>
                    <el-table-column label="销售属性值" v-slot="{ row }">
                        <el-tag v-for="(item, index) in row.spuSaleAttrValueList" :key="item.id" closable type="primary"
                            style="margin-right: 5px;" @close="row.spuSaleAttrValueList.splice(index, 1)">
                            {{ item.saleAttrValueName }}
                        </el-tag>
                        <el-input :ref="setInputRef(row)" v-if="row.edit" placeholder="请输入属性值" style="width: 100px;"
                            size="small" @blur="toViewMode(row)" v-model="row.spuSaleAttrValue"></el-input>
                        <el-button v-else type="primary" size="small" icon="Plus"
                            @click="addAttrValue(row)"></el-button>
                    </el-table-column>
                    <el-table-column label="操作" width="100px" v-slot="{ $index }">
                        <el-button type="danger" icon="delete" size="small"
                            @click="spuSaleAttrList.splice($index, 1)"></el-button>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="upsertSpu" :disabled="spuSaleAttrList.length == 0">保存</el-button>
                <el-button type="primary" @click="emit('update:modelValue', 2)">
                    取消
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style scoped lang="scss"></style>
