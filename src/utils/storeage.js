// 用户信息数据保存到本地
const infoKey = 'user_shopping_info'
// 获取用户信息
export const getInfo = () => {
  const defaultObj = { token: '', userId: '' }
  const res = localStorage.getItem(infoKey)
  return res ? JSON.parse(res) : defaultObj
}
// 保存用户信息
export const setInfo = (obj) => {
  localStorage.setItem(infoKey, JSON.stringify(obj))
}
// 移除用户信息
export const removeInfo = () => {
  localStorage.removeItem(infoKey)
}

// 用户搜索信息保存到本地
const searchKey = 'search_history'
// 获取搜索列表
export const getHistorySearch = () => {
  const res = localStorage.getItem(searchKey)
  return res ? JSON.parse(res) : []
}
// 保存搜索列表
export const setHistorySearch = (arr) => {
  localStorage.setItem(searchKey, JSON.stringify(arr))
}
// 移除本地的用户搜索列表
export const removeHistorySearch = () => {
  localStorage.removeItem(searchKey)
}

// 保存用户收货地址到本地
const addressKey = 'default_address'
// 保存用户默认地址到本地
export const saveDefaultAddress = (obj) => {
  localStorage.setItem(addressKey, JSON.stringify(obj))
}
// 获取本地默认地址
export const getDefaultAddress = () => {
  const res = localStorage.getItem(addressKey)
  return res ? JSON.parse(res) : {}
}
// 移除本地默认地址
export const removeDefaultAddress = () => {
  localStorage.removeItem(addressKey)
}
