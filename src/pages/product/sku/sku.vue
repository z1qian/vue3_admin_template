<script setup lang="ts" name="sku">
import { ref, onMounted } from 'vue'
import { reqGetPagedList, reqOnSale, reqCancelSale, reqGetSkuById, reqDeleteSku } from '@/apis/product/sku'
import type { PagedSkuResponse, Sku } from '@/apis/product/sku/type'
import { ElMessage } from 'element-plus';

const currentPage = ref(1)
const pageSize = ref(10)
const pagedSkuObj = ref<PagedSkuResponse>();
const drawer = ref(false);
const sku = ref<Sku>();

onMounted(() => {
  getPagedSkuList();
})

const getPagedSkuList = async (page: number = 1) => {
  currentPage.value = page;
  pagedSkuObj.value = await reqGetPagedList(currentPage.value, pageSize.value)
}

// 上下架操作
const updateIsSale = async (row: Sku) => {
  let message = '';
  try {
    // sku已经上架了
    if (row.isSale == 1) {
      message = '下架成功'
      row.isSale = 0;
      await reqCancelSale(row.id)
    }
    else {
      message = '上架成功'
      row.isSale = 1;
      await reqOnSale(row.id)
    }
  } catch (error) {
    console.error(error);
  }
  finally {
    ElMessage({
      type: 'success',
      message
    })
  }
}

const editSku = () => {
  ElMessage({
    type: "success",
    message: '正在更新中...'
  })
}

const getSkuById = async (skuId: number) => {
  drawer.value = true
  sku.value = await reqGetSkuById(skuId)
}

const deleteSku = async (skuId: number, index: number) => {
  // 接口有问题
  try {
    await reqDeleteSku(skuId);
  } catch (error) {
    console.log(error);
  }
  finally {
    ElMessage({
      type: 'success',
      message: '删除成功'
    });
    // 应该是要再次向接口获取数据，但是删除接口有问题
    pagedSkuObj.value?.records.splice(index, 1);
    if (pagedSkuObj.value!.records.length == 0 && currentPage.value > 1) {
      currentPage.value = currentPage.value - 1;
    }
    await getPagedSkuList(currentPage.value);
  }
}
</script>

<template>
  <div class="sku">
    <el-table :data="pagedSkuObj?.records" style="width: 100%;margin-bottom: 10px" border>
      <el-table-column type="index" label="序号" align="center" width="80px">
      </el-table-column>
      <el-table-column prop="skuName" label="名称" width="300px" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="skuDesc" label="描述" width="400px" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="图片" width="150px" v-slot="{ row }">
        <img :src="row.skuDefaultImg" :alt="row.skuDesc" width="100px">
      </el-table-column>
      <el-table-column prop="weight" label="重量" width="150px">
      </el-table-column>
      <el-table-column prop="price" label="价格" width="150px">
      </el-table-column>
      <el-table-column label="操作" width="210px" fixed="right" v-slot="{ row, $index }">
        <el-button type="primary" :icon="row.isSale == 1 ? 'bottom' : 'top'" size="small" @click="updateIsSale(row)"
          :title="row.isSale == 1 ? '下架' : '上架'"></el-button>
        <el-button type="primary" icon="edit" size="small" @click="editSku"></el-button>
        <el-button type="primary" icon="InfoFilled" size="small" @click="getSkuById(row.id)"></el-button>
        <el-popconfirm :title="`确定要删除${row.skuName}吗？`" width="auto" @confirm="deleteSku(row.id, $index)">
          <template #reference>
            <el-button type="primary" icon="delete" size="small"></el-button>
          </template>
        </el-popconfirm>
      </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
      size="default" background layout="prev, pager, next, jumper, -> , sizes, total" :total="pagedSkuObj?.total ?? 0"
      @size-change="getPagedSkuList()" @current-change="getPagedSkuList" />
    <el-drawer v-model="drawer" title="查看商品的详情" direction="rtl" size="40%">
      <el-row>
        <el-col :span="6">名称</el-col>
        <el-col :span="18">{{ sku?.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6">描述</el-col>
        <el-col :span="18">{{ sku?.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6">价格</el-col>
        <el-col :span="18">{{ sku?.price }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6">平台属性</el-col>
        <el-col :span="18">
          <el-tag v-for="item in sku?.skuAttrValueList" :key="item.id" type="primary" size="small">{{
            item.valueName }}</el-tag>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">销售属性</el-col>
        <el-col :span="18">
          <el-tag type="primary" size="small" v-for="item in sku?.skuSaleAttrValueList" :key="item.id">{{
            item.saleAttrValueName }}</el-tag>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">商品图片</el-col>
        <el-col :span="18">
          <el-carousel :interval="2000" type="card" height="100px" :pause-on-hover="false">
            <el-carousel-item v-for="item in sku?.skuImageList ?? []" :key="item.id">
              <img :src="item.imgUrl" :alt="item.imgName" height="100%">
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<style scoped lang="scss">
.el-drawer__body {
  .el-row {
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
      /* 取消最后一个的 margin-bottom */
    }

    .el-col {
      .el-tag {
        margin: 0 5px 5px 0;
      }
    }
  }
}
</style>
