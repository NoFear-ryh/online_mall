<template>
    <div class="all-category">
      <van-nav-bar title="全部分类" fixed/>

      <van-search placeholder="请输入搜索关键词"
        shape="round" @click="$router.push('/search')"
        fixed="true">
      </van-search>

      <div class="list-box" v-if="categoryList">
        <div class="left">
          <ul v-for="(item, index) in categoryList" :key="item.category_id" >
            <li :class="{active: index === activeIndex}" @click="activeIndex = index">{{ item.name }}</li>
          </ul>
        </div>
        <div class="right">
          <div @click="$router.push(`/searchlist?categoryId=${item.category_id}`)" class="one-goods" v-for="item in categoryList[activeIndex]?.children" :key="item.category">
            <img :src="item.image?.external_url" alt="">
            <p>{{ item.name }}</p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { getCategoryList } from '@/api/category'
export default {
  name: 'CateGory',
  components: {},
  data () {
    return {
      activeIndex: 0,
      categoryList: []

    }
  },
  async created () {
    const res = await getCategoryList()
    this.categoryList = res.data.list
  }
}
</script>
<style scoped lang="less">
  .all-category{
    padding-top: 100px;
    padding-bottom: 40px;
    height: 100vh;
    ::v-deep .van-search{
      position: fixed;
      background-color: #eee;
      width: 100%;
      top: 50px;
    }
    .list-box{
      display: flex;
      height: 100%;
      padding-top: 20px;
      .left{
        width: 85px;
        background-color: #f3f3f3;
        overflow: auto;
        li{
          padding: 20px 0;
          font-size: 18px;
          text-align: center;
          &.active {
          color: #fb442f;
          background-color: #fff;
        }
        }
      }
      .right{
        flex: 1;
        height: 100%;
        background-color: #fff;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-content: flex-start;
        padding: 10px 0;
        overflow: auto;
        .one-goods{
          width: 33.3%;
          margin-bottom: 10px;
          img{
            width: 70px;
            height: 70px;
            display: block;
            margin: 5px auto;
          }
          p{
            text-align: center;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
