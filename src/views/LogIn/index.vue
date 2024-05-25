<template>
    <div class="login">
      <van-nav-bar title="会员登录" left-arrow @click-left="$router.go(-1)"/>
      <div class="login-body">
        <div class="title">
          <h3>手机号登录</h3>
          <p>未注册的手机号登录后将自动注册</p>
        </div>
        <div class="form">
          <div class="form-item">
            <input v-model="phoneNumber" @blur="verifyPhone" type="text" placeholder="请输入手机号码">
          </div>
          <div class="form-item">
            <input v-model="picCode" type="text" placeholder="请输入图形验证码">
            <img alt="" :src="imgUrl" v-if="imgUrl" @click="getImg">
          </div>
          <div class="form-item">
            <input type="text" placeholder="请输入短信验证码">
            <button @click="getPhoCode($event)">{{ countDown === totalTime ? '获取验证码' : `重新发送(${this.countDown})秒后` }}</button>
          </div>

        </div>
        <button class="btn" @click="login">登录</button>
      </div>
    </div>
</template>

<script>
import { getPicCode, getPhoneCode, codeLogin } from '@/api/login'
export default {
  name: 'LogIn',
  components: {},
  data () {
    return {
      imgUrl: '', // 图片验证码地址
      picKey: '', // 图片验证码key值
      phoneNumber: '', // 手机号码
      picCode: '', // 图片验证码
      countDown: 60, // 手机验证码倒计时
      totalTime: 60,
      timer1: null,
      smsCode: '246810'

    }
  },
  created () {
    this.getImg()
  },
  methods: {
    async getImg () {
      const res = await getPicCode()
      this.imgUrl = res.data.base64
      this.picKey = res.data.key
    },
    verifyPhone () {
      if (this.phoneNumber.length !== 11) {
        this.$toast('输入手机号不是11位')
        return false
      } else {
        const isRealphone = /^1(3[0-9]|5[0-3,5-9]|7[1-3,5-8]|8[0-9])\d{8}$/.test(this.phoneNumber)
        if (!isRealphone) {
          this.$toast('输入手机号不正确')
          return false
        }
      }
      return true
    },
    // 获取手机验证码
    async getPhoCode (e) {
      if (!this.verifyPhone()) {
        return
      }
      await getPhoneCode(this.picCode, this.picKey, this.phoneNumber)
      this.$toast('验证码发送成功')

      if (!this.timer1 && this.countDown === this.totalTime) {
        this.timer1 = setInterval(() => {
          this.countDown--
          e.target.style.color = '#b8b8b8'

          if (this.countDown === 0) {
            clearInterval(this.timer1)
            this.timer1 = null
            e.target.style.color = '#cea26a'
            this.countDown = this.totalTime
          }
        }, 1000)
      }
      this.$toast('验证码发送成功')
    },
    async login () {
      if (!this.verifyPhone()) {
        return
      }
      if (!/^\d{6}$/.test(this.smsCode)) {
        return
      }
      const res = await codeLogin(this.phoneNumber, this.smsCode)

      this.$toast(res.message)
      this.$store.commit('user/saveInfo', res.data)
      const url = this.$route.query.backUrl || '/'
      this.$router.replace(url)
    }
  },
  destroyed () {
    clearInterval(this.timer1)
  }
}
</script>
<style scoped>
  .login-body{
    margin: auto 20px;
    .title{
      display: block;
      height: 80px;
      margin: 30px auto;
      h3{
        font-size: 26px;
        font-weight: normal;
      }
      p{
        margin-top: 10px;
        font-size: 14px;
        color: #b8b8b8;
      }
    }
    .form{
      .form-item{
        position: relative;
        height: 80px;
        padding: 10px;
        border-bottom: 1px solid #f3f1f2;
        input{
          position: absolute;
          left: 10px;
          bottom: 10px;
          height: 30px;
          color: black;
          border: none;
        }
        img{
          position: absolute;
          right: 10px;
          bottom: 10px;
          width: 90px;
          height: 30px;
          cursor: pointer;
        }
        button{
          position: absolute;
          right: 10px;
          bottom: 10px;
          height: 31px;
          border: none;
          font-size: 13px;
          color: #cea26a;
          background-color: transparent;
          padding-right: 9px;
        }
      }
    }
    .btn{
      width: 80%;
      height: 40px;
      margin: 10%;
      background: linear-gradient(90deg,#ecb53c,#ff9211);
      border-radius: 20px;
      border: none;
      color: #fff;
      font-size: 18px;
    }
  }
</style>
