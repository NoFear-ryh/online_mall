// 用于存放登录相关的请求接口
import request from '@/utils/request'

// 获取图形验证码的请求
export const getPicCode = () => {
  return request.get('/captcha/image')
}

// 获取手机验证码的接口
export const getPhoneCode = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode,
      captchaKey,
      mobile
    }
  })
}

// 登录接口
export const codeLogin = (mobile, smsCode) => {
  return request.post('/passport/login', {
    form: {
      isParty: false,
      partyData: {},
      mobile,
      smsCode
    }
  })
}
