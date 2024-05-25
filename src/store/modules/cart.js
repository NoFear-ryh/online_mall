import { getCartList, updateCartNum, deleteCartPro } from '@/api/cart'
import { setHistorySearch, removeHistorySearch } from '@/utils/storeage'
import { Toast } from 'vant'

const state = {
  cartList: []
}
const mutations = {
  setCartList (state, newList) {
    state.cartList = newList
    setHistorySearch(newList)
  },
  deleteSearchHistory (state) {
    removeHistorySearch()
    state.cartList = []
  },
  toggleCheckOne (state, goodsId) {
    const pro = state.cartList.find(item => item.goods_id === goodsId)
    pro.isCheck = !pro.isCheck
  },
  toggleCheckAll (state, flag) {
    state.cartList.forEach(item => { item.isCheck = flag })
  },
  changeNum (state, obj) {
    const { goodsNum, goodsId } = obj
    const pro = state.cartList.find(item => item.goods_id === goodsId)
    pro.goods_num = goodsNum
  }
}

const actions = {
  async getCartInfo (context) {
    const { data } = await getCartList()

    data.list.forEach(item => { // 给每一项添加isCheck属性
      item.isCheck = true
    })
    context.commit('setCartList', data.list)
  },
  async changeCartNum (context, obj) {
    const { goodsNum, goodsId, goodsSkuId } = obj
    context.commit('changeNum', { goodsNum, goodsId }) // 更新本地商品数量

    await updateCartNum(goodsNum, goodsId, goodsSkuId) // 更新服务器商品数量
  },
  async deleteCartPro (context) {
    const Ids = context.getters.selList.map(item => item.id)
    await deleteCartPro(Ids) // 提交后台删除商品数据

    Toast('删除成功')
    context.dispatch('getCartInfo') // 重新渲染
  }
}
const getters = {
  totalNum (state) { // 统计购物车商品总数
    return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
  },
  selList (state) { // 选择所有选中的商品列表
    return state.cartList.filter(item => item.isCheck)
  },
  selNum (state, getters) { // 所有选中的商品总数
    return getters.selList.reduce((sum, item) => sum + item.goods_num, 0)
  },
  selPrice (state, getters) { // 所有选中的商品总价
    return getters.selList.reduce((sum, item) => {
      return sum + item.goods_num * item.goods.goods_price_min
    }, 0).toFixed(2)
  },
  isAllChecked (state) {
    return state.cartList.every(item => item.isCheck)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
