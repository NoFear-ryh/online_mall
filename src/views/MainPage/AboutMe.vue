<template>
    <div class="about-me">
      <!-- 头部 -->
      <div class="header" v-if="isLogin">
        <div class="head-img">
          <img src="@/assets/default-avatar.png" alt="">
        </div>
        <div class="head-info">
          <div class="phone">{{ userInfo.mobile }}</div>
          <div class="vip">
            <van-icon name="diamond-o" />普通会员
          </div>
        </div>
      </div>

      <div class="header" v-else @click="$router.push('/login')">
        <div class="head-img">
          <img src="@/assets/default-avatar.png" alt="">
        </div>
        <div class="head-info">
          <div class="phone">去登录</div>
          <div class="tips">点击登录账号</div>
        </div>
      </div>

      <!-- 余额、积分、钱包等 -->
      <div class="money">
        <div class="balance">
          <span class="number">{{ userInfo.balance || 0 }}</span>
          <span class="title">账户余额</span>
        </div>
        <div class="points">
          <span class="number">{{ userInfo.points || 0 }}</span>
          <span class="title">积分</span>
        </div>
        <div class="coupon">
          <span class="number">0</span>
          <span class="title">优惠券</span>
        </div>
        <div class="wallet">
          <van-icon name="balance-pay"/>
          <span class="title">我的钱包</span>
        </div>
      </div>

      <!-- 订单相关 -->
      <div class="order">
        <div class="order-item" @click="$router.push('/order?dataType=all')">
          <van-icon name="orders-o" />
          <span>全部订单</span>
        </div>
        <div class="order-item" @click="$router.push('/order?dataType=payment')">
          <van-icon name="pending-payment" />
          <span>待支付</span>
        </div>
        <div class="order-item" @click="$router.push('/order?dataType=delivery')">
          <van-icon name="logistics" />
          <span>待发货</span>
        </div>
        <div class="order-item" @click="$router.push('/order?dataType=received')">
          <van-icon name="send-gift-o" />
          <span>待收货</span>
        </div>
      </div>

      <!-- 服务相关 -->
      <div class="serve">
        <p>我的服务</p>
        <div class="serve-list">
          <div class="serve-item">
            <van-icon name="location-o" />
            <span>收货地址</span>
          </div>
          <div class="serve-item">
            <van-icon name="point-gift-o" />
            <span>领券中心</span>
          </div>
          <div class="serve-item">
            <van-icon name="coupon-o" />
            <span>优惠券</span>
          </div>
          <div class="serve-item">
            <van-icon name="question-o" />
            <span>我的帮助</span>
          </div>
          <div class="serve-item">
            <van-icon name="miniprogram-o" />
            <span>我的积分</span>
          </div>
          <div class="serve-item">
            <van-icon name="after-sale" />
            <span>退换/售后</span>
          </div>
        </div>
      </div>

      <div class="exit" v-if="isLogin">
        <button class="btn" @click="logOut">退出登录</button>
      </div>
    </div>
</template>

<script>
import { getUserInfo } from '@/api/aboutme'
import { removeInfo } from '@/utils/storeage'
export default {
  name: 'AboutMe',
  components: {},
  data () {
    return {
      userInfo: {}
    }
  },
  async created () {
    if (this.isLogin) {
      this.getInfo()
    }
  },
  computed: {
    isLogin () {
      return this.$store.getters.userToken
    }
  },
  methods: {
    async getInfo () {
      const { data } = await getUserInfo()
      this.userInfo = data.userInfo
    },
    logOut () {
      this.$dialog.confirm({
        title: '温馨提示',
        message: '您确定要退出吗？'
      })
        .then(() => {
          removeInfo()
          this.$store.dispatch('user/logout')
        })
        .catch(() => {})
    }
  }
}
</script>
<style scoped lang="less">
  .about-me{
    min-height: 100vh;
    background-color: #f7f7f7;
    padding-bottom: 50px;
    .header{
      height: 130px;
      background: url("http://cba.itlike.com/public/mweb/static/background/user-header2.png");
      background-size: cover;
      display: flex;
      align-items: center;
      .head-img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        margin: 0 10px;
        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .head-info{
        .phone{
          margin-bottom: 5px;
          color: #c59a46;
          font-size: 18px;
          font-weight: bold;
        }
        .vip{
          display: inline-block;
          background-color: #3c3c3c;
          padding: 3px 5px;
          border-radius: 5px;
          color: #e0d3b6;
          font-size: 14px;
          .van-icon{
            font-weight: bold;
            color: #ffb632;
          }
        }
      }
    }
    .money{
      margin-top: 10px;
      padding: 20px;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .balance, .points, .coupon, .wallet{
        display: flex;
        flex-direction: column;
        align-items: center;
        .number{
          height: 24px;
          font-size: 18px;
          color: #fa2209;
        }
        .title{
          margin-top: 10px;
          font-size: 14px;
        }
        .van-icon{
          font-size: 18px;
          height: 24px;
        }
      }
    }
    .order{
      margin: 10px auto;
      padding: 10px 20px;
      background-color: #fff;
      width: 94%;
      display: flex;
      justify-content: space-between;
      .order-item{
        display: flex;
        flex-direction: column;
        align-items: center;
        .van-icon{
          font-size: 18px;
        }
        span{
          margin-top: 10px;
        }
      }
    }
    .serve{
      margin: 10px auto;
      padding: 10px 20px;
      background-color: #fff;
      border-radius: 5px;
      width: 94%;
      p{
        font-size: 16px;
        margin: 10px 0;
      }
      .serve-list{
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        .serve-item{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 25%;
          margin-bottom: 20px;
          .van-icon{
            font-size: 20px;
            margin-bottom: 5px;
            color: #ff3800;
            font-weight: bold;
          }
          span{
            margin: 10px 0;
          }
        }
      }
    }
    .exit{
      margin: 20px 0;
      .btn{
        display: block;
        width: 60%;
        text-align: center;
        margin: 0 auto;
        padding: 7px 0;
        height: 40px;
        border-radius: 10px;
        border: 1px solid #dcdcdc;
        background-color: #fafafa;
      }
    }
  }
</style>
