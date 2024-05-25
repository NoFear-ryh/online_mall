import request from '@/utils/request'

// 页面数据请求接口
export const getHomeData = () => {
  return request.get('/page/detail', {
    pageId: 0
  })
}
