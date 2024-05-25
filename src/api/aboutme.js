// 获取页面 “我的” 相关信息
import request from '@/utils/request'

export const getUserInfo = () => {
  return request.get('/user/info')
}
