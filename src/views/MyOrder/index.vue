<template>
    <div class="my-order">
      <van-nav-bar title="我的订单" left-arrow @click-left="$router.go(-1)"/>

      <!-- tab栏切换 -->
      <van-tabs v-model="active">
        <van-tab name="all" title="全部"></van-tab>
        <van-tab name="payment" title="待支付"></van-tab>
        <van-tab name="delivery" title="待发货"></van-tab>
        <van-tab name="received" title="待收货"></van-tab>
        <van-tab name="comment" title="待评价"></van-tab>
      </van-tabs>

      <div v-if="orderList.length > 0">
        <orderItem v-for="item in orderList" :key="item.order_id" :item="item"></orderItem>
      </div>
      <div v-else class="empty">
        <img src="@/assets/empty.png" alt="">
        <p>亲，暂无订单记录</p>
      </div>
    </div>
</template>

<script>
import orderItem from '@/components/orderItem'
import { getProState } from '@/api/productState'
import verifyLogin from '@/mixins/verifyLogin'
export default {
  name: 'MyOrder',
  components: { orderItem },
  mixins: [verifyLogin],
  data () {
    return {
      active: this.$route.query.dataType || 'all',
      page: 1,
      orderList: []
    }
  },
  async created () {
    this.getList()
  },
  methods: {
    async getList () {
      if (this.verifyLogin()) {
        return
      }
      const res = await getProState(this.active, this.page)
      this.orderList = res.data.list.data
    }
  },
  watch: {
    active: {
      immediate: true,
      handler () {
        this.getList()
      }
    }
  }
}
</script>
<style scoped lang="less">
  .my-order{
    min-height: 100vh;
    background-color: #eee;
    ::v-deep .van-icon-arrow-left{
      color: #333;
    }
    .empty{
      padding: 50px 30px;
      img{
        display: block;
        width: 140px;
        height: 90px;
        margin: 0 auto;
      }
      p{
        margin: 10px auto;
        text-align: center;
        color: #999;
      }
    }
  }

</style>
