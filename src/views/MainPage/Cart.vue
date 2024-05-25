<template>
  <div class="cart">
    <van-nav-bar title="购物车" fixed/>
    <div v-if="isLogin && cartList.length > 0" class="show-pro">
      <!-- 购物车开头 -->
      <div class="cart-title">
      <span class="p-count">共<i class="num">{{ totalNum }}</i>件商品</span>
      <span class="edit" @click="isEdit = !isEdit">
        <van-icon name="edit" />
        编辑
      </span>
      </div>

      <!-- 购物车列表 -->
      <div class="cart-item" v-for="item in cartList" :key="item.goods_id">
      <van-checkbox :value="item.isCheck" @click="toggleOne(item.goods_id)"></van-checkbox>
      <img :src="item.goods.goods_image" alt="">
      <div class="pro-info">
        <div class="msg tit text-ellipsis-2">{{ item.goods.goods_name }}</div>
        <div class="price-count">
          <span class="price"><i>￥</i>{{ item.goods.goods_price_min }}</span>
          <countBox @input="(value) => changeNum(value, item.goods_id, item.goods_sku_id)" :value="item.goods_num"></countBox>
        </div>
      </div>
      </div>
      <!-- 购物车底部 -->
      <div class="footer">
      <div class="all-check">
        <van-checkbox :value="isAllChecked" @click="toggleAll">全选</van-checkbox>
      </div>
      <div class="all-total">
        <span>合计：￥<i class="total-money">{{ selPrice }}</i></span>
        <button v-if="!isEdit" class="goBuy" :class="{disabled: selNum === 0 }" @click="goPay">结算( <span class="total-count">{{ selNum }}</span> )</button>
        <button v-else class="delete" :class="{disabled: selNum === 0 }" @click="handelDel">删除</button>
      </div>
      </div>
    </div>
    <div v-else class="empty-cart">
      <img src="@/assets/empty.png" alt="">
      <div class="msg">您的购物车是空的，快去逛逛吧</div>
      <button class="btn" @click="$router.push('/')">去逛逛</button>
    </div>
  </div>
</template>

<script>
import countBox from '@/components/countBox'
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'CartS',
  components: { countBox },
  data () {
    return {
      isEdit: false
    }
  },
  computed: {
    ...mapState('cart', ['cartList']),
    ...mapGetters('cart', ['totalNum', 'isAllChecked', 'selNum', 'selPrice', 'selList']),
    isLogin () {
      return this.$store.getters.userToken
    }
  },
  created () {
    if (this.isLogin) { // 验证用户是否登录
      this.$store.dispatch('cart/getCartInfo')
    }
  },
  methods: {
    toggleOne (goodsId) {
      this.$store.commit('cart/toggleCheckOne', goodsId)
    },
    toggleAll () {
      this.$store.commit('cart/toggleCheckAll', !this.isAllChecked)
    },
    changeNum (goodsNum, goodsId, goodsSkuId) {
      console.log(goodsNum, goodsId, goodsSkuId)
      this.$store.dispatch('cart/changeCartNum', { goodsNum, goodsId, goodsSkuId })
    },
    handelDel () {
      if (this.selNum === 0) {
        return
      }
      this.$store.dispatch('cart/deleteCartPro')
      this.isEdit = false
    },
    goPay () {
      if (this.selList.length > 0) {
        const ids = this.selList.map(item => item.id).join(',')
        this.$router.push({
          path: '/pay',
          query: {
            mode: 'cart',
            cartIds: ids
          }
        })
      }
    }
  },
  watch: {
    isEdit (newValue) {
      if (newValue) {
        this.$store.commit('cart/toggleCheckAll', false)
      } else {
        this.$store.commit('cart/toggleCheckAll', true)
      }
    }
  }
}
</script>
<style scoped lang="less">
.cart{
  padding-top: 46px;
  padding-bottom: 100px;
  background-color: #f5f5f5;
  min-height: 100vh;
  .show-pro{
    .cart-title{
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      font-size: 14px;
      .p-count{
        i{
          font-style: normal;
          margin: 0 2px;
          color: #fa2209;
        }
      }
      .edit{
        .van-icon{
          font-size: 18px;
        }
      }
    }
    .cart-item{
      margin: 0 10px 10px 10px;
      padding: 10px;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 5px;

      img{
        margin: 0 4px;
        width: 100px;
        height: 100px;
      }
      .pro-info{
        width: 210px;
        padding: 10px 5px;
        font-size: 16px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .msg{
          margin-bottom: 20px;
        }
        .price-count{
          display: flex;
          justify-content: space-between;
          align-items: center;
          .price{
            color: #fa2209;
            font-size: 16px;
            i{
              font-size: 14px;
              padding-right: 2px;
            }
          }
        }
      }
    }
    .footer{
      position: fixed;
      left: 0;
      bottom: 50px;
      height: 50px;
      width: 100%;
      background-color: #fff;
      border-bottom: 1px solid #ccc;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding:0 10px;
      .all-total{
        display: flex;
        align-items: center;
        .total-money{
          color: #fa2209;
          font-size: 18px;
          font-style: normal;
          margin-right: 6px;
        }
        .goBuy, .delete{
          min-width: 100px;
          height: 36px;
          line-height: 36px;
          text-align: center;
          background-color: #fa2f21;
          color: #fff;
          border-radius: 18px;
          border: none;
          &.disabled {
            background-color: #ff9779;
          }
        }
      }
    }
  }
  .empty-cart{
    padding: 80px 30px;
    img{
      width: 140px;
      height: 90px;
      display: block;
      margin: 0 auto;
    }
    .msg{
      margin: 20px 0;
      font-size: 12px;
      text-align: center;
    }
    .btn{
      width: 100px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      display: block;
      background-color: #fa2f21;
      color: #fff;
      font-size: 14px;
      border: none;
      margin: 0 auto;
      border-radius: 15px;
    }
  }
}
</style>
