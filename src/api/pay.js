// 此文件为支付相关请求接口
import request from '@/utils/request'

// 订单结算接口
export const checkOrder = (mode, obj) => { // obj是 cartIds  或者 { goodsId, goodsNum, goodsSkuId }
  return request.get('/checkout/order', {
    params: {
      mode, // buyNow 立即购买  或者 cart 购物车
      delivery: 10, // 配送方式 10快递配送 20上门自提
      couponId: 0, // 优惠券id
      shopId: 0,
      isUsePoints: 0, // 1使用 0不使用
      ...obj
    }
  })
}

// 提交订单接口
export const submitOrder = (mode, remark, obj) => {
  return request.post('/checkout/submit', {
    mode,
    remark,
    delivery: 10, // 配送方式 10快递配送 20上门自提
    couponId: 0, // 优惠券id
    isUsePoints: 0, // 1使用 0不使用
    payType: 10, // 支付方式
    ...obj
  })
}
