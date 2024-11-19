// 创建Category组件小仓库
import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'
import {
  reqGetCategory1,
  reqGetCategory2,
  reqGetCategory3,
} from '@/apis/product/attr/index'
import type { Category, Category2, Category3 } from '@/apis/product/attr/type'

// 创建Category组件小仓库，并对外暴露
export default defineStore('Category', () => {
  const category1List = ref<Category[]>([])
  const c1Id = ref<number | undefined>()

  const category2List = ref<Category2[]>([])
  const c2Id = ref<number | undefined>()

  const category3List = ref<Category3[]>([])
  const c3Id = ref<number | undefined>()

  onMounted(async () => {
    console.log('CategoryStore挂载完毕')
    await getCategory1List()
  })

  const getCategory1List = async () => {
    category1List.value = await reqGetCategory1()
  }

  const getCategory2List = async (c1Id: number) => {
    category2List.value = await reqGetCategory2(c1Id)
  }

  const getCategory3List = async (c2Id: number) => {
    category3List.value = await reqGetCategory3(c2Id)
  }

  const clearC2Id = () => {
    c2Id.value = undefined
    category3List.value = []
    c3Id.value = undefined
  }

  const clearC3Id = () => {
    c3Id.value = undefined
  }

  return {
    category1List,
    c1Id,
    getCategory2List,
    category2List,
    c2Id,
    getCategory3List,
    category3List,
    c3Id,
    clearC2Id,
    clearC3Id,
  }
})
