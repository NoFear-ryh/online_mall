<template>
  <div class="payPage">
    <van-nav-bar fixed title="订单结算台" left-arrow @click-left="$router.go(-1)"/>

    <!-- 地址信息 -->
    <div class="address" @click="$router.push('/choose_address')">
      <div class="left-icon">
        <van-icon name="location-o" />
      </div>

      <div class="info" v-if="selectedAddress.address_id">
        <div class="info-content">
          <span class="name">{{ selectedAddress.name }}</span>
          <span class="phone">{{ selectedAddress.phone }}</span>
        </div>
        <div class="info-address">
          {{ getDetailAddress }}
        </div>
      </div>
      <div class="info" v-else>请选择配送地址</div>

      <div class="right-icon">
        <van-icon name="arrow" />
      </div>
    </div>

    <!-- 订单明细 -->
    <div class="pay-list">
      <div class="pro-info" v-for="item in orderList" :key="item.goods_id">
        <div class="info-left">
          <img :src="item.goods_image" alt="">
        </div>
        <div class="info-right">
          <div class="msg tit text-ellipsis-2">{{ item.goods_name }}</div>
          <div class="num-price">
            <span class="num">x{{ item.total_num }}</span>
            <span class="price">￥{{ item.goods_price_min }}</span>
          </div>
        </div>
      </div>
      <div class="pro-money">
        <span>共{{ order.orderTotalNum }}件商品，合计：</span>
        <span class="money">￥{{ order.orderTotalPrice }}</span>
      </div>
    </div>

    <!-- 支付详情 -->
    <div class="pay-detail">
      <div class="total-money">
        <span>订单总金额</span>
        <span class="red">￥{{ order.orderTotalPrice }}</span>
      </div>
      <div class="coupon">
        <span>优惠券：</span>
        <span>无优惠券可用</span>
      </div>
      <div class="delivery-cost">
        <span>配送费用：</span>
        <span v-if="false">请先选择配送地址</span>
        <span v-else class="red">+￥0.00</span>
      </div>
    </div>

    <!-- 支付方式 -->
    <div class="pay-way">
      <span>支付方式</span>
      <div class="way">
        <div class="left">
          <van-icon name="balance-o" />
          <span>余额支付(可用￥{{ personal.balance }}元)</span>
        </div>
        <van-icon name="passed" color="red"/>
      </div>
    </div>

    <!-- 买家留言 -->
    <div class="message">
      <textarea  v-model="remark" placeholder="选填：买家留言(50字内)"></textarea>
    </div>

    <!-- 底部结算信息 -->
    <div class="footer">
      <div class="exact-pay">
        实付款：<span>￥{{ order.orderTotalPrice }}</span>
      </div>
      <button class="btn" @click="handelSubmit">提交订单</button>
    </div>
  </div>
</template>

<script>
import { checkOrder, submitOrder } from '@/api/pay'
import { mapState } from 'vuex'
export default {
  name: 'PayMoney',
  components: {},
  data () {
    return {
      order: {}, // 商品列表
      personal: {}, // 个人信息
      remark: '' // 买家留言
    }
  },
  computed: {
    ...mapState('address', ['selectedAddress']),
    getDetailAddress () {
      return this.selectedAddress.region.province + this.selectedAddress.region.city + this.selectedAddress.region.region + this.selectedAddress.detail
    },
    orderList () { // 选中的商品列表
      return this.order.goodsList
    },
    mode () {
      return this.$route.query.mode
    },
    cartIds () {
      return this.$route.query.cartIds
    },
    goodsId () {
      return this.$route.query.goodsId
    },
    goodsNum () {
      return this.$route.query.goodsNum
    },
    goodsSkuId () {
      return this.$route.query.goodsSkuId
    }
  },
  async created () {
    this.$store.dispatch('address/getList')
    this.requestProduct()
  },
  methods: {
    async requestProduct () {
      if (this.mode === 'cart') {
        const { data } = await checkOrder(this.mode, { cartIds: this.cartIds })
        this.order = data.order
        this.personal = data.personal
      }
      if (this.mode === 'buyNow') {
        const obj = {
          goodsId: this.goodsId,
          goodsNum: this.goodsNum,
          goodsSkuId: this.goodsSkuId
        }
        const { data } = await checkOrder(this.mode, obj)
        this.order = data.order
        this.personal = data.personal
      }
    },
    async handelSubmit () {
      if (this.mode === 'cart') {
        await submitOrder(this.mode, this.remark, { cartIds: this.cartIds })
      }
      if (this.mode === 'buyNow') {
        await submitOrder(this.mode, this.remark, {
          goodsId: this.goodsId,
          goodsNum: this.goodsNum,
          goodsSkuId: this.goodsSkuId
        })
      }
      this.$toast.success('支付成功')
      this.$router.replace('/order')
    }
  }
}
</script>
<style scoped lang="less">
.payPage{
  padding-top: 46px;
  padding-bottom: 46px;
   /* 顶部导航栏样式 */
  ::v-deep .van-icon-arrow-left{
    color: #333;
  }
  .address{
    padding: 20px 20px;
    display: flex;
    justify-content: space-between;
    color: #666;
    align-items: center;
    background: url(@/assets/border-line.png) bottom repeat-x;
    background-size: 60px auto;
    .info-content{
      padding: 0 10px;
      font-size: 14px;
    }
    .info-address{
      padding: 0 10px;
      font-size: 14px;
    }
  }
  .pay-list{
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #eee;
    padding: 10px 20px;
    .pro-info{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 14px;
      .info-left{
        img{
          width: 80px;
          display: block;
        }
      }
      .info-right{
        margin-left: 20px;
        .msg{
          font-size: 14px;
          margin-bottom: 6px;
        }
        .num-price{
          display: flex;
          justify-content: space-between;
          align-items: center;
          .price{
            color: #fa2209;
          }
        }
      }
    }
    .pro-money{
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
      .money{
        color: #fa2209;
      }
    }
  }
  .pay-detail{
    display: flex;
    flex-direction: column;
    padding: 16px;
    border-bottom: 1px solid #eee;
    .total-money, .coupon, .delivery-cost{
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .red{
        color: #fa2209;
      }
    }
  }
  .pay-way{
    padding: 20px;
    border-bottom: 1px solid #eee;
    .way{
      margin-top: 16px;
      display: flex;
      justify-content: space-between;
    }
  }

  .message{
      display: block;
      textarea{
        display: block;
        width: 100%;
        border: none;
        padding: 10px;
        height: 100px;
      }
    }
  .footer{
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 46px;
    border-top: 1px solid #eee;
    background-color: #fff;

    .exact-pay{
      padding-left: 10px;
      flex: 1;
      span{
        color: #fa2209;
      }
    }
    .btn{
      width: 120px;
      background: linear-gradient(90deg, #f9211c, #ff6335);
      color: #fff;
      line-height: 46px;
      border: none;
      text-align: center;
    }
  }
}
</style>
