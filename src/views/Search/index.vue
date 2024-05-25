<template>
    <div class="search">
      <van-nav-bar title="商品搜索" left-arrow @click-left="$router.push('/')"/>

      <van-search v-model="searchContent" show-action
        placeholder="请输入搜索关键词"
        @search="onSearch">
        <template #action>
          <div @click="onSearch(searchContent)" class="searchBtn">搜索</div>
        </template>
      </van-search>

      <div class="search-list" v-if="searchHistory.length > 0">
        <div class="title">
          <span>最近搜索</span>
          <van-icon name="delete-o" @click="clearHis"/>
        </div>
        <div class="list-body">
          <div class="list-item" v-for="item in searchHistory" :key="item" @click="onSearch(item)">{{ item }}</div>
        </div>
      </div>
    </div>
</template>

<script>
import { getHistorySearch, setHistorySearch } from '@/utils/storeage'
export default {
  name: 'SearchPage',
  components: {},
  data () {
    return {
      searchContent: '',
      searchHistory: getHistorySearch()
    }
  },
  methods: {
    onSearch (value) {
      if (!value) {
        return
      }
      const isInclude = this.searchHistory.includes(value)
      if (!isInclude) {
        this.searchHistory.unshift(value)
      } else {
        this.searchHistory = this.searchHistory.filter(item => item !== value)
        this.searchHistory.unshift(value)
      }
      setHistorySearch(this.searchHistory)
      this.$router.push(`/searchList?goodsName=${value}`)
    },
    clearHis () {
      this.searchHistory = []
      setHistorySearch([])
    }
  }
}
</script>
<style scoped>
  .search{
    /* 顶部导航栏样式 */
    ::v-deep .van-icon-arrow-left{
      color: #333;}
      /* 搜索框样式 */
    ::v-deep .van-search__action {
      background-color: #c21401;
      color: #fff;
      padding: 0 20px;
      border-radius: 0 5px 5px 0;
      margin-right: 10px;
      }
      .search-list{
        .title{
          height: 40px;
          line-height: 40px;
          font-size: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 15px;
        }
        .list-body{
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          padding: 0 10px;
          gap: 5%;
          .list-item{
            width: 30%;
            height: 30px;
            line-height: 30px;
            text-align: center;
            background: #fff;
            border: 1px solid #efefef;
            margin-top: 10px;
            border-radius: 15px;
            overflow: hidden;
          }
        }
      }

  }
</style>
