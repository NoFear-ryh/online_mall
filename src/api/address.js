// 此处为收货地址相关的接口
import request from '@/utils/request'

// 获取收货地址列表
export const getAddressList = () => {
  return request.get('/address/list')
}

// 添加收货地址
export const setAddressList = (name, phone, region, detail) => {
  return request.post('/address/add', {
    form: {
      name,
      phone,
      region,
      detail
    }
  })
}

// 获取默认地址id
export const defaultAddressId = () => {
  return request.get('/address/defaultId')
}

// 删除收货地址
export const removeAddress = (addressId) => {
  return request.post('/address/remove', {
    addressId
  })
}

// 获取详细地址
export const getDetailAddress = (addressId) => {
  return request.post('/address/detail', {
    addressId
  })
}

// 编辑地址
export const editAdddress = (addressId, name, phone, region, detail) => {
  return request.post('/address/edit', {
    addressId,
    form: {
      name,
      phone,
      region,
      detail
    }
  })
}

// 设置为默认地址
export const setDefaultAddress = (addressId) => {
  return request.post('/address/setDefault', {
    addressId
  })
}

// 获取省市区列表
export const getPcrList = () => {
  return request.get('/region/tree')
}
