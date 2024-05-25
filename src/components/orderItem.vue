<template>
    <div class="order-item">
        <div class="pro-info">
            <div class="time-state">
                <span class="time">{{ item.create_time }}</span>
                <span class="state">{{ item.state_text }}</span>
            </div>
            <div class="image-msg-price" v-for="goods in item.goods" :key="goods.goods_id">
                <img :src="goods.goods_image" alt="" class="image">
                <span class="msg tit text-ellipsis-2">{{ goods.goods_name }}</span>
                <div class="price-num">
                    <p class="price">￥{{ goods.total_pay_price }}</p>
                    <p class="num">x{{ goods.total_num }}</p>
                </div>
            </div>
            <div class="total">
                <span>共 {{ productTotalNum }} 件商品，总金额</span>
                <span class="total-money">￥{{ item.total_price }}</span>
            </div>
            <div class="actions">
                <div v-if="item.order_status === 10">
                    <button v-if="item.pay_status === 10">立刻付款</button>
                    <button v-else-if="item.delivery_status === 10">申请取消</button>
                    <button v-else-if="item.delivery_status === 10 || item.delivery_status === 30">确认收货</button>
                </div>

                <button v-if="item.order_status === 30">去评价</button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: '',
  components: {},
  props: {
    item: {
      type: Object,
      default: () => { return {} }
    }
  },
  computed: {
    productTotalNum () {
      return this.item.goods.reduce((sum, item) => sum + item.total_num, 0)
    }
  }
}
</script>
<style scoped lang="less">
    .order-item{
        margin: 10px auto;
        background-color: #fff;
        box-shadow: 0 0.5px 2px 0 rgba(0,0,0,.05);
        font-size: 14px;
        width: 96%;
        border-radius: 6px;
        .pro-info{
            padding: 0 20px;
            display: flex;
            flex-direction: column;
            .time-state{
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin: 16px 0;
                .state{
                    color: #fa2209;
                    font-weight: bold;
                }
            }
            .image-msg-price{
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                .image{
                    width: 100px;
                    height: 100px;
                }
                .msg{
                    padding-top: 10px;
                }
                .price-num{
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    color: #b39999;
                    .price{
                        margin-bottom: 6px;
                    }
                }
            }
            .total{
                display: flex;
                justify-content: flex-end;
                margin-bottom: 10px;
                .total-money{
                    color: #fa2209;
                }
            }
            .actions{
                text-align: right;
                margin-bottom: 10px;
                button{
                    background-color: #fff;
                    width: 80px;
                    height: 30px;
                    border-radius: 10px;
                    border: 1px solid #aaa;
                }
            }
        }
    }
</style>
