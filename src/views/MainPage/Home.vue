<template>
    <div class="home">
      <!-- 顶部导航栏 -->
      <van-nav-bar title="商城在线" fixed/>

      <!-- 搜索框 -->
      <van-search v-model="goodsName"
      placeholder="搜索你要找的商品"
      shape="round"
      @click="$router.push('/search')" />

      <!-- 轮播图 -->
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" >
        <van-swipe-item v-for="(item, index) in bannerData" :key="index"><img :src="item.imgUrl" alt=""></van-swipe-item>
      </van-swipe>

      <!-- 导航 -->
      <van-grid :border="true" :column-num="5">
        <van-grid-item v-for="(item, index) in navbarData" :key="index" :text="item.text" :icon="item.imgUrl">
        </van-grid-item>
      </van-grid>

      <!-- 主会场 -->
      <div class="main">
        <img src="@/assets/main.png" alt="">
      </div>

      <!-- 猜你喜欢 -->
      <div class="guess">
        <p class="guess-title">-- 猜你喜欢 --</p>
        <div class="goods-list">
          <GoodsItem v-for="item in goodsData" :key="item.goods_id" :item="item"></GoodsItem>
        </div>
      </div>
    </div>
</template>

<script>
import GoodsItem from '@/components/goodsItem'
import { getHomeData } from '@/api/home'
export default {
  name: 'HomePage',
  components: { GoodsItem },
  data () {
    return {
      goodsName: '',
      bannerData: [],
      navbarData: [],
      goodsData: []
    }
  },
  async created () {
    const { data: { pageData } } = await getHomeData()
    this.bannerData = pageData.items[1].data
    this.navbarData = pageData.items[3].data
    this.goodsData = pageData.items[6].data
  }
}
</script>
<style scoped lang="less">
  .home {
    padding-top: 100px;
    padding-bottom: 50px;
  }
  // 顶部导航栏样式
  .van-hairline--bottom{
    background-color: #c21401;
    /deep/ .van-nav-bar__title{
      color: #fff;
    }
  }
  // 搜索框样式
  .van-search {
  position: fixed;
  width: 100%;
  top: 46px;
  z-index: 999;
}
  // 轮播图
  .my-swipe{
    .van-swipe-item {
    color: #fff;
    height: 185px;
    font-size: 20px;
    line-height: 185px;
    text-align: center;
    background-color: #39a9ed;
    img{
      width: 100%;
      height: 185px;
    }
  }
  }
  // 主会场
  .main img{
    width: 100%;
  }

  // 猜你喜欢
  .guess .guess-title{
    text-align: center;
    line-height: 40px;
    height: 40px;
  }

</style>
