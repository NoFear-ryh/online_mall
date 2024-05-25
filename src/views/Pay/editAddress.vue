<template>
    <div class="edit-address">
      <van-nav-bar fixed :title="operateType === 'edit' ? '编辑收货地址' : '新增收货地址'" left-arrow @click-left="$router.go(-1)"/>
      <div class="edit-body">
        <div class="title">收货地址</div>
        <div class="edit-form">
          <van-form>
            <van-field
              v-model="username"
              name="用户名"
              label="用户名"
              placeholder="用户名"
              :rules="[{ required: true, message: '请输入用户名' }]"
            />
            <van-field
              v-model="phone"
              type="tel"
              name="电话"
              label="电话"
              placeholder="请输入收件人手机号"
              :rules="[{ required: true, pattern: /^[1][3,4,5,7,8][0-9]{9}$/ , message: '请输入正确的手机号' }]"
            />
            <van-field
              readonly
              clickable
              name="area"
              :value="pcr"
              label="地区选择"
              placeholder="点击选择省市区"
              @click="showArea = true"
            />
            <van-popup v-model="showArea" position="bottom">
              <van-area
                :area-list="areaLists"
                @confirm="onConfirm"
                @cancel="showArea = false"
              />
            </van-popup>
            <van-field
              v-model="detail"
              name="详细地址"
              label="详细地址"
              placeholder="街道门牌、楼层等信息"
              :rules="[{ required: true, message: '请输入详细地址' }]"
            />
          </van-form>
        </div>
        <div class="submit">
          <button class="btn" @click="saveAddress">保存</button>
        </div>
      </div>
    </div>
</template>

<script>
import { areaList } from '@vant/area-data'
import { getPcrList, setAddressList, getDetailAddress, editAdddress } from '@/api/address'
export default {
  name: 'EditAddress',
  components: {},
  data () {
    return {
      username: '',
      phone: '',
      pcr: '请选择省/市/区',
      arrPcr: [], // 以数组方式存放省、市、区
      region: [],
      detail: '',
      showArea: false,
      areaLists: {} // 数据格式见 Area 组件文档
    }
  },
  computed: {
    addressId () {
      return this.$route.query.addressId
    },
    operateType () {
      return this.$route.query.type
    }
  },
  async created () {
    this.preProcessAreaList()

    if (this.operateType === 'edit') {
      const { data: { detail } } = await getDetailAddress(this.addressId)

      this.username = detail.name
      this.phone = detail.phone
      this.detail = detail.detail
      this.arrPcr = [detail.region.province, detail.region.city, detail.region.region]

      this.pcr = this.arrPcr.join('/')
      this.getAddress()
    }
  },
  methods: {
    // 预处理 areaList, 将直辖市中省份的 ’市‘ 去掉
    preProcessAreaList () {
      const valuesP = Object.values(areaList.province_list)
      const keysP = Object.keys(areaList.province_list)
      const newProvince = {}

      const city = ['北京市', '天津市', '上海市', '重庆市']
      for (let i = 0; i < keysP.length; i++) {
        if (city.includes(valuesP[i])) {
          newProvince[keysP[i]] = valuesP[i].substring(0, 2)
          continue
        }
        newProvince[keysP[i]] = valuesP[i]
      }

      this.areaLists = {
        province_list: newProvince,
        city_list: areaList.city_list,
        county_list: areaList.county_list
      }
    },
    // 得到格式化地址数据：[{label: "省",value: 值}, {label: "市",value: 值}, {label: "区",value: 值}]
    async getAddress () {
      this.region = []
      const res = await getPcrList()
      let list = res.data.list

      for (let i = 0; i < 3; i++) {
        const arrv = Object.values(list)
        for (const item of arrv) {
          if (item.name === this.arrPcr[i]) {
            this.region.push({ value: item.id, label: item.name })
            list = item.city || item.region
            break
          }
        }
      }
    },
    onConfirm (values) {
      this.arrPcr = values.filter((item) => !!item).map((item) => item.name)

      this.pcr = this.arrPcr.join('/')
      this.getAddress()
      this.showArea = false
    },
    // 保存地址
    async saveAddress () {
      if (this.operateType === 'add') {
        await setAddressList(this.username, this.phone, this.region, this.detail)
        this.$toast('地址添加成功')
      }
      if (this.operateType === 'edit') {
        await editAdddress(this.addressId, this.username, this.phone, this.region, this.detail)
        this.$toast('地址修改成功')
      }
      this.$router.replace('/choose_address')
    }
  }
}
</script>
<style scoped lang="less">
  .edit-address{
    padding-top: 46px;
    background-color: #eee;
    min-height: 100vh;
    /* 顶部导航栏样式 */
    ::v-deep .van-icon-arrow-left{
      color: #333;
    }
    ::v-deep .van-nav-bar__title{
      font-weight: bold;
    }
    .edit-body{
      margin-top: 10px;
      padding: 10px;
      .title{
        margin-bottom: 14px;
        color: #aaa;
      }
      .edit-form{
        padding: 0 10px;
        border-radius: 10px;
        background-color: #fff;
        width: 100%;
        ::v-deep .van-cell__title{
          font-size: 16px;
          color: #303133;
        }
        ::v-deep .van-picker__confirm{
          color: rgb(41, 121, 255);
        }
      }
      .submit{
        margin-top: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        .btn{
          width: 94%;
          height: 30px;
          line-height: 30px;
          font-size: 16px;
          color: #fff;
          background: linear-gradient(90deg, #f9211c, #ff6335);
          border: none;
          border-radius: 15px;
        }
      }

    }
  }
</style>
