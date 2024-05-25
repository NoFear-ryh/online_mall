<template>
    <div class="goods-item" @click="$router.push(`/detail/${item.goods_id}`)">
        <div class="left">
            <img :src="item.goods_image" alt="">
        </div>
        <div class="right">
            <p class="tit text-ellipsis-2">{{ item.goods_name }}</p>
            <p class="number">已售{{ item.goods_sales }}件</p>
            <p class="price">
                <span class="new">￥{{ item.goods_price_min }}</span>
                <span class="old">￥{{ item.line_price_min }}</span>
            </p>
        </div>
    </div>
</template>

<script>

export default {
  name: 'GoodsItem',
  components: {},
  props: {
    item: {
      type: Object,
      default: () => { return {} }
    }
  }
}
</script>
<style scoped>
    .goods-item{
        height: 148px;
        margin-bottom: 5px;
        padding: 10px;
        display: flex;
        .left{
            width: 125px;
            img{
                display: block;
                width: 100%;
            }

        }
        .right{
            flex: 1;
            font-size: 14px;
            line-height: 1.3;
            padding: 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            overflow: hidden;
        }
        .number{
            color: #999;
            font-size: 13px;
        }
        .price{
            font-size: 16px;
            .new{
                color: red;
                margin-right: 10px;
            }
            .old{
                text-decoration: line-through;
                color: #999;
            }
        }
    }
</style>
