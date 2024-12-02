import { MockMethod } from 'vite-plugin-mock'
import type {
  BrandPageListResponseData,
  Brand,
} from '../../src/apis/product/brand/type'
import type { paginatedResponse, responseMockData } from '../type'

// 分页获取品牌数据
function getpagedBrandList(
  page: number,
  limit: number,
): BrandPageListResponseData {
  const brandList: Brand[] = [
    {
      id: 1,
      tmName: '小米',
      logoUrl:
        'http://39.98.123.211/group1/M00/03/D9/rBHu8mHmKC6AQ-j2AAAb72A3EO0942.jpg',
    },
    {
      id: 2,
      tmName: '苹果',
      logoUrl:
        'http://39.98.123.211/group1/M00/03/D9/rBHu8mHmKHOADErHAAAQBezsFBo612.jpg',
    },
    {
      id: 3,
      tmName: '华为',
      logoUrl:
        'http://39.98.123.211/group1/M00/03/D9/rBHu8mHmKF2AWpcKAADv98DWYRo516.jpg',
    },
    {
      id: 4,
      tmName: '尚硅谷',
      logoUrl:
        'http://39.98.123.211/group1/M00/02/DA/rBHu8mGxObeAfL10AAAsPY94Hn8745.png',
    },
    {
      id: 5,
      tmName: 'OPPO',
      logoUrl:
        'http://39.98.123.211/group1/M00/02/DA/rBHu8mGxOciADR75AAE6kN74a-E289.png',
    },
    {
      id: 6,
      tmName: 'VIVO',
      logoUrl:
        'http://39.98.123.211/group1/M00/02/DA/rBHu8mGxOdKAamtYAAC9HgX-V4c228.png',
    },
    {
      id: 7,
      tmName: '三星',
      logoUrl:
        'http://39.98.123.211/group1/M00/02/DA/rBHu8mGxOduAL3-vAAAyNxaecgE342.jpg',
    },
    {
      id: 8,
      tmName: '长虹',
      logoUrl:
        'http://39.98.123.211/group1/M00/02/DC/rBHu8mGyMWmAMfrHAAAVOe83Fy0651.jpg',
    },
    {
      id: 9,
      tmName: '索尼',
      logoUrl:
        'http://39.98.123.211/group1/M00/02/DC/rBHu8mGyMX-AUh4sAAAH6bIsT_o073.jpg',
    },
    {
      id: 10,
      tmName: '联想',
      logoUrl:
        'http://39.98.123.211/group1/M00/02/DC/rBHu8mGyMaWAW-TWAAAIiNxy53s540.jpg',
    },
    {
      id: 11,
      tmName: '华硕',
      logoUrl:
        'http://39.98.123.211/group1/M00/02/DC/rBHu8mGyMbKAQP0sAAAWKq85SVY068.jpg',
    },
    {
      id: 12,
      tmName: '海信',
      logoUrl:
        'http://39.98.123.211/group1/M00/02/DC/rBHu8mGyMcCAX4bGAAANH1m3gic067.jpg',
    },
    {
      id: 13,
      tmName: '戴尔',
      logoUrl:
        'http://39.98.123.211/group1/M00/02/DC/rBHu8mGyMc6AUHGFAAAS6pwrg18359.jpg',
    },
    {
      id: 14,
      tmName: 'aaa',
      logoUrl: 'http://139.198.127.41:9000/sph/20241114/favicon.png',
    },
    {
      id: 15,
      tmName: 'ggg11',
      logoUrl: 'http://139.198.127.41:9000/sph/20241114/favicon.jpg',
    },
    {
      id: 16,
      tmName: '',
      logoUrl: '',
    },
    {
      id: 17,
      tmName: '111',
      logoUrl:
        'http://139.198.127.41:9000/sph/20241116/微信图片_20230924100002.jpg',
    },
    {
      id: 18,
      tmName: '我终于不是503了',
      logoUrl:
        'http://139.198.127.41:9000/sph/20241116/微信图片_20230924100002.jpg',
    },
    {
      id: 19,
      tmName: 'hhhh  不是503那个笑死我了',
      logoUrl: 'http://139.198.127.41:9000/sph/20241116/Vue数据代理.png',
    },
    {
      id: 20,
      tmName: '小米',
      logoUrl:
        'http://39.98.123.211/group1/M00/03/D9/rBHu8mHmKC6AQ-j2AAAb72A3EO0942.jpg',
    },
  ]

  const totalItems = brandList.length
  const totalPages = Math.ceil(totalItems / limit)
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit

  return {
    records: brandList.slice(startIndex, endIndex),
    total: totalItems,
    size: limit,
    current: page,
    searchCount: true,
    pages: totalPages,
  }
}

// 对外暴露一个数组：数组里面包含接口
const mock: MockMethod[] = [
  // 分页获取品牌数据接口
  {
    url: '/admin/product/baseTrademark/:page/:limit', //请求地址
    method: 'get', //请求方式
    response: ({ query, url }): responseMockData<paginatedResponse<Brand>> => {
      // 使用 :page 和 :limit 定义动态路由参数，query 可直接读取对应值。
      const { page, limit } = query
      const pageNum = parseInt(page, 10) || 1 // 当前页码
      const pageSize = parseInt(limit, 10) || 10 // 每页记录数

      return {
        code: 200,
        message: '成功',
        ok: true,
        data: getpagedBrandList(pageNum, pageSize),
      }
    },
  },
  // 文件上传接口
  {
    url: '/admin/product/fileUpload', // 接口地址
    method: 'post', // 请求方式
    response: (): responseMockData<string | null> => {
      const imgNameList = [
        '1731659894594.jpg',
        '微信图片_20241118135328.jpg',
        '1731909198393.jpg',
        '微信图片_20241118135337.jpg',
        '微信图片_20241118135613.jpg',
        '微信图片_20241118135623.jpg',
      ]

      // 取值范围：0-imgNameList.length-1
      const imgName =
        imgNameList[Math.floor(Math.random() * imgNameList.length)]

      // 模拟上传成功返回文件路径
      return {
        code: 200,
        message: '成功',
        data: 'http://139.198.127.41:9000/sph/20241118/' + imgName, // 模拟文件路径
        ok: true,
      }
      // return {
      //     code: 201,
      //     message: '失败',
      //     data: null,
      //     ok: false,
      // };
    },
  },
]

export default mock
