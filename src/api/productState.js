import request from '@/utils/request'

// 此接口用于获取商品状态(全部/待支付/待收货/待发货/待评价)
export const getProState = (dataType, page) => {
  return request.get('/order/list', {
    params: {
      dataType,
      page
    }
  })
}
