import request from '@/utils/request'

// 添加商品到购物车
export const getCartInfo = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/add', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

// 获取购物车列表
export const getCartList = () => {
  return request.get('/cart/list')
}

// 修改购物车内商品数量
export const updateCartNum = (goodsNum, goodsId, goodsSkuId) => {
  return request.post('/cart/update', {
    goodsNum,
    goodsId,
    goodsSkuId
  })
}

// 删除购物车内的商品
export const deleteCartPro = (cartIds) => {
  return request.post('/cart/clear', { cartIds })
}
