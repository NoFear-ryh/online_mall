import { getInfo, setInfo, removeInfo } from '@/utils/storeage'

const state = {
  userInfo: getInfo()
}
const mutations = {
  saveInfo (state, obj) {
    state.userInfo = obj
    setInfo(obj)
  },
  deleteUserInfo (state) {
    removeInfo()
    state.userInfo = ''
  }
}
const actions = {
  logout (context) {
    context.commit('deleteUserInfo')
    context.commit('cart/deleteSearchHistory', null, { root: true })
    context.commit('address/deleteDefaultAddress', null, { root: true })
  }
}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
