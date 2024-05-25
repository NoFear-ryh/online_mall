<template>
    <div class="search">
      <van-nav-bar
      title="商品列表"
      left-arrow
      @click-left="$router.go(-1)"
      fixed
      />

      <van-search show-action :value="searchName || '搜索商品'"
        placeholder="请输入搜索关键词"
        shape="round"
        @click="$router.push('/search')">
        <template #action>
          <van-icon class="tools" name="apps-o" @click="$router.push('./search')"/>
        </template>
      </van-search>

      <div class="title">
        <ul>
          <li>综合</li>
          <li>销量</li>
          <li>价格</li>
        </ul>
      </div>

      <div class="goods-list">
        <GoodsItem v-for="item in goodsData" :key="item.goods_id" :item="item"></GoodsItem>
      </div>
    </div>
</template>

<script>
import GoodsItem from '@/components/goodsItem'
import { getProduct } from '@/api/productInfo'
export default {
  name: 'SearchList',
  components: {
    GoodsItem
  },
  data () {
    return {
      goodsData: [],
      page: 1
    }
  },
  computed: {
    searchName () {
      return this.$route.query.goodsName
    }
  },
  async created () {
    const res = await getProduct({
      categoryId: this.$route.query.categoryId,
      goodsName: this.searchName,
      page: this.page
    })
    this.goodsData = res.data.list.data
  }
}
</script>
<style scoped lang="less">
  .search{
    padding-top: 46px;
    /* 顶部导航栏样式 */
  ::v-deep .van-icon-arrow-left{
      color: #333;}

  /* 搜索框样式 */
  .tools{
    font-size: 24px;
    height: 30px;
    line-height: 30px;
    }
    .title ul{
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin: 20px 0;
    }

  }
</style>
@/api/productInfo.js
