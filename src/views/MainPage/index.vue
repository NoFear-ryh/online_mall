<template>
    <div class="main">
      <router-view></router-view>
      <van-tabbar v-model="active" active-color="hotpink" inactive-color="#000" route>
        <van-tabbar-item icon="wap-home-o" to="/home">首页</van-tabbar-item>
        <van-tabbar-item icon="apps-o" to="/category">分类</van-tabbar-item>
        <van-tabbar-item icon="shopping-cart-o" to="/cart" class="cart">
          <span v-if="totalNum > 0" class="cart-num">{{ totalNum }}</span>
          购物车
        </van-tabbar-item>
        <van-tabbar-item icon="user-o" to="/me">我的</van-tabbar-item>
      </van-tabbar>

    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'MainPage',
  components: {},
  data () {
    return {
      active: 0
    }
  },
  computed: {
    ...mapGetters('cart', ['totalNum'])
  }
}
</script>
<style scoped lang="less">
.cart{
  position: relative;
  .cart-num{
    z-index: 999;
    position: absolute;
    top: 5px;
    right: 20px;
    min-width: 20px;
    font-size: 14px;
    height: 14px;
    padding: 0 4px;
    color: #fff;
    text-align: center;
    background-color: #ee0a24;
    border-radius: 50%;
  }
}
</style>
