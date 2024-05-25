import { getAddressList, defaultAddressId } from '@/api/address'
import { saveDefaultAddress, getDefaultAddress, removeDefaultAddress } from '@/utils/storeage'

const state = {
  addressList: [],
  selectedAddress: getDefaultAddress(),
  defaultId: 0
}
const mutations = {
  setList (state, newList) {
    state.addressList = newList
  },
  defaultAddress (state, newAddress) { // 保存默认地址到本地
    state.selectedAddress = newAddress
    saveDefaultAddress(newAddress)
  },
  deleteDefaultAddress () {
    removeDefaultAddress()
  },
  setSelectedAddress (state, newAddress) {
    state.addressList.forEach(item => {
      item.address_id === newAddress.address_id ? item.isCheck = true : item.isCheck = false
    })
    state.selectedAddress = newAddress
  }
}
const actions = {
  async getList (context) {
    const { data: { list } } = await getAddressList() // 地址列表
    const id = await defaultAddressId() // 默认地址id
    context.state.defaultId = id.data.defaultId

    for (let i = 0; i < list.length; i++) { // 将默认地址移到第一个
      if (list[i].address_id === context.state.defaultId) {
        list[i].isCheck = true;
        [list[i], list[0]] = [list[0], list[i]]
      } else {
        list[i].isCheck = false
      }
    }
    context.commit('setList', list)
    context.commit('defaultAddress', list[0])
  }
}
const getters = {
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
