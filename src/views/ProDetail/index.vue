<template>
    <div class="prodetail">
      <!-- 顶部导航 -->
      <van-nav-bar
        title="商品详情页"
        left-arrow
        @click-left="$router.go(-1)"
        fixed
      />

      <!-- 轮播图 -->
      <van-swipe class="mySwipe" :autoplay="3000" indicator-color="white" @change="onChange">
        <van-swipe-item v-for="(item) in goodsImgUrls" :key="item.file_id">
        <img :src="item.external_url" alt="">
        </van-swipe-item>
        <template #indicator>
          <div class="custom-indicator">{{ current + 1 }}/{{ goodsImgUrls.length }}</div>
        </template>
      </van-swipe>

      <!-- 商品说明 -->
      <div class="info">
        <div class="title">
          <div class="price">
            <span class="now">￥{{ proDetail.goods_price_max }}</span>
            <span class="old">￥{{ proDetail.line_price_max }}</span>
          </div>
          <div class="sellcount">已售{{ proDetail.goods_sales }}件</div>
        </div>
        <div class="msg text-ell">{{ proDetail.goods_name }}</div>
      </div>

      <div class="service">
        <div class="left-words">
          <span><van-icon name="passed" />七天无理由退货</span>
          <span><van-icon name="passed" />48小时发货</span>
        </div>
        <div class="right-icon">
          <van-icon name="arrow"/>
        </div>
      </div>

      <!-- 商品评价 -->
      <div class="comment">
        <div class="comment-title">
          <div class="left">商品评价({{commentList.length}}条)</div>
          <div class="right">查看更多 <van-icon name="arrow"/></div>
        </div>
        <div class="comment-list">
          <div class="comment-item" v-for="item in commentList" :key="item.comment_id">
            <div class="top">
              <img :src="item.user.avatar_url || defaultImg" alt="">
              <div class="name">{{ item.user.nick_name }}</div>
              <van-rate :value="item.score / 2" />
            </div>
            <div class="content text-ellipsis-2">{{ item.content }}</div>
            <div class="time">{{ item.create_time }}</div>
          </div>
        </div>
      </div>

      <!-- 商品描述 -->
      <div class="desc" v-html="proDetail.content">
      </div>

      <!-- 底部 -->
      <div class="footer">
        <div class="icon-home" @click="$router.push('/home')">
          <van-icon name="wap-home-o" />
          <span>首页</span>
        </div>
        <div class="icon-cart" @click="$router.push('/cart')">
          <span v-if="cartCount > 0" class="cart-num">{{ cartCount }}</span>
          <van-icon name="shopping-cart-o" />
          <span>购物车</span>
        </div>
        <div class="add-btn" @click="addCart">加入购物车</div>
        <div class="buy-btn" @click="buyPro">立即购买</div>
      </div>

      <!-- 弹层 -->
      <van-action-sheet v-model="showPannel" :title="pannelModel === 'cart' ? '加入购物车' : '立即购买'">
        <div class="content">
          <div class="pro-info">
            <div class="left">
              <img :src="proDetail.goods_image" alt="">
            </div>
            <div class="right">
              <div class="price-box">
                <span style="color: red;">¥</span>
                <span class="price"> {{ proDetail.goods_price_min }}</span>
              </div>
              <span class="total-count">库存{{ proDetail.stock_total }}</span>
            </div>
          </div>
          <div class="count">
            <span>数量</span>
            <div>
              <countBox v-model="proCount"></countBox>
            </div>
          </div>
          <!-- 有库存，显示按钮 -->
          <div class="showbtn" v-if="proDetail.stock_total > 0">
            <button v-if="pannelModel === 'cart'" class="adds-btn" @click="handelAdd">加入购物车</button>
            <button v-if="pannelModel === 'buy'" class="buys-btn" @click="handelBuy">立即购买</button>
          </div>
          <div class="btn-none" v-else>该商品已抢完</div>

        </div>
      </van-action-sheet>

    </div>
</template>

<script>
import { getGoodsDetail, getComment } from '@/api/productInfo'
import defaultImg from '@/assets/default-avatar.png'
import countBox from '@/components/countBox'
import { getCartInfo, getCartList } from '@/api/cart'
import verifyLogin from '@/mixins/verifyLogin'
export default {
  name: 'ProDetail',
  mixins: [verifyLogin], // 全局混入，将可以共用的方法放到mixins文件夹中，通过mixins引入到组件中
  components: { countBox },
  data () {
    return {
      proDetail: {}, // 商品详细信息
      goodsImgUrls: [], // 轮播图url
      limit: 6, // 获取评论时最大条数
      current: 0, // 记录轮播图的序号
      commentList: [], // 用于保存评论
      defaultImg, // 默认头像
      showPannel: false, // 是否显示弹层
      pannelModel: 'buy', // 弹层的模式 '加入购物车或者立即购买'
      proCount: 1, // 某件商品的数量
      cartCount: 0 // 购物车内商品数量
    }
  },
  computed: {
    goodsId () {
      return this.$route.params.id
    }
  },
  async created () {
    if (this.$store.getters.userToken) {
      const res = await getCartList() // 获取购物车列表
      this.cartCount = res.data.cartTotal // 获取购物车商品总数
    }
    this.getProDetail()
    this.getProComment()
  },
  methods: {
    onChange (index) {
      this.current = index
    },
    async getProDetail () {
      const resDetail = await getGoodsDetail(this.goodsId)
      this.proDetail = resDetail.data.detail
      this.goodsImgUrls = this.proDetail.goods_images
    },
    async getProComment () {
      const resComment = await getComment(this.goodsId, this.limit)
      this.commentList = resComment.data.list
    },
    addCart () {
      this.showPannel = true
      this.pannelModel = 'cart'
    },
    buyPro () {
      this.showPannel = true
      this.pannelModel = 'buy'
    },
    async handelAdd () {
      if (this.verifyLogin()) {
        return
      }

      const res = await getCartInfo(this.goodsId, this.proCount, this.proDetail.skuList[0].goods_sku_id)
      this.cartCount = res.data.cartTotal
      this.$toast('加入购物车成功')
      this.showPannel = false
    },
    handelBuy () {
      if (this.verifyLogin()) {
        return
      }
      this.$router.push({
        path: '/pay',
        query: {
          mode: 'buyNow',
          goodsId: this.goodsId,
          goodsNum: this.proCount,
          goodsSkuId: this.proDetail.skuList[0].goods_sku_id
        }

      })
    }
  }
}
</script>
<style scoped lang="less">
  .prodetail{
    padding-top: 46px;
    /* 顶部导航栏样式 */
    ::v-deep .van-icon-arrow-left{
      color: #333;}

      .mySwipe{
        // margin-top: 60px;
        img{
          width: 100%;
          height: 100%;
        }
        .custom-indicator{
          padding: 5px 10px;

          border-radius: 15px;
          position: absolute;
          right: 10px;
          bottom: 10px;
          text-align: center;
          background-color: #999;
        }
      }

      .info{
        padding: 10px;
        .title{
          display: flex;
          justify-content: space-between;
          .now{
            color: #fa2209;
            font-size: 20px;
          }
          .old{
            color: #959595;
            font-size: 16px;
            text-decoration: line-through;
            margin-left: 5px;
          }
          .sellcount{
            color: #959595;
            font-size: 16px;
            position: relative;
            top: 4px;
          }
        }
        .msg{
          font-size: 16px;
          line-height: 24px;
          margin-top: 5px;
        }
      }

      .service{
        display: flex;
        justify-content: space-between;
        line-height: 40px;
        margin-top: 10px;
        font-size: 16px;
        background-color: #fafafa;
        .left-words {
          span{
            margin-right: 10px;
          }
          .van-icon{
            margin-right: 4px;
            color: #fa2209;
          }
        }
        .right-icon{
          margin-right: 10px;
        }
      }

      .comment{
        padding: 10px;
        .comment-title{
          display: flex;
          line-height: 30px;
          justify-content: space-between;
          .right{
            color: #959595;
          }
        }
        .comment-item{
          font-size: 16px;
          line-height: 30px;
          .top{
            height: 30px;
            display: flex;
            align-items: center;
            margin-top: 20px;
            img{
              width: 20px;
              height: 20px;
            }
            .name{
              margin: 0 10px;
            }
          }
          .time{
            color: #999;
          }
        }
      }

      .desc {
        width: 100%;
        overflow: scroll;
        ::v-deep img {
          display: block;
          width: 100%!important;
        }
      }

      .footer{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 55px;
        background-color: #fff;
        border-top: 1px solid #ccc;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        .icon-home, .icon-cart{
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          position: relative;
          .cart-num{
            z-index: 999;
            position: absolute;
            top: -2px;
            right: 0;
            min-width: 20px;
            font-size: 14px;
            padding: 0 4px;
            color: #fff;
            text-align: center;
            background-color: #ee0a24;
            border-radius: 50%;
          }
          .van-icon{
            font-size: 24px;
          }
        }
        .add-btn, .buy-btn{
          height: 36px;
          line-height: 36px;
          width: 120px;
          border-radius: 18px;
          background-color: #ffa900;
          text-align: center;
          color: #fff;
          font-size: 14px;
        }
        .buy-btn{
          background-color: #fe5630;
        }
      }
      .content {

        .pro-info{
          display: flex;
          .left{
            img{
            width: 90px;
            height: 90px;
          }
            padding: 10px;
          }
          .right{
            flex: 1;
            padding: 10px;
            display: flex;
            flex-direction: column;
            .price{
              color: #fa2209;
              font-size: 24px;
            }
            .total-count{
              margin-top: 4px;
            }
          }
        }
        .count{
          padding: 10px;
          display: flex;
          justify-content: space-between;
        }
        .adds-btn, .buys-btn, .btn-none{
          margin: 10px auto;
          display: block;
          width: 80%;
          height: 30px;
          line-height: 30px;
          border-radius: 15px;
          text-align: center;
          background-color: #ffa900;
          border: none;
        }
        .buys-btn{
          background-color: #fe5630;
        }
        .btn-none{
          background-color: #cccccc;
        }
      }
  }
</style>
