<template>
    <div class="choose-address">
      <van-nav-bar fixed title="收货地址" left-arrow @click-left="$router.go(-1)"/>

      <div class="address-info" v-for="item in addressList" :key="item.address_id">
        <div class="name-phone">
          <div class="left">
            <span class="name">{{ item.name }}</span>
            <span class="phone">{{ item.phone }}</span>
          </div>
          <div class="right" v-if="!item.isCheck">
            <button class="btn" @click="setDefault(item.address_id)">设为默认地址</button>
          </div>
        </div>
        <div class="address">{{ item.region.province + '' + item.region.city + ' ' + item.region.region + ' ' + item.detail }}</div>
        <div class="operates">
          <div class="choose" @click="chooseAddress(item)">
            <van-checkbox :value="item.isCheck" checked-color="#f9211c">{{ item.isCheck ? '默认' : '选择' }}</van-checkbox>
          </div>
          <div class="edit-delete">
            <div class="edit" @click="$router.push(`/edit_address?type=edit&addressId=${item.address_id}`)">
              <van-icon name="edit" />编辑
            </div>
            <div class="delete" @click="handelDel(item.address_id)">
              <van-icon name="delete-o" />删除
            </div>
          </div>
        </div>
      </div>

      <div class="footer">
        <button class="btn" @click="$router.push('/edit_address?type=add')">添加新地址</button>
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { removeAddress, setDefaultAddress } from '@/api/address'
export default {
  name: 'ChooseAddress',
  components: {},
  data () {
    return {

    }
  },
  computed: {
    ...mapState('address', ['addressList'])
  },
  async created () {
    this.$store.dispatch('address/getList')
  },
  methods: {
    chooseAddress (obj) {
      this.$store.commit('address/setSelectedAddress', obj)
      this.$router.go(-1)
    },
    handelDel (addressId) {
      this.$dialog.confirm({
        title: '温馨提示',
        message: '您确定要删除当前收货地址吗？',
        showConfirmButton: '确定',
        showCancelButton: '取消'
      })
        .then(async () => {
        // on confirm
          await removeAddress(addressId)
          this.$store.dispatch('address/getList')
          this.$toast('地址删除成功！')
        })
        .catch(() => {
        // on cancel
        })
    },
    async setDefault (addressId) {
      await setDefaultAddress(addressId)
      this.$store.dispatch('address/getList')
      this.$toast('默认地址设置成功')
    }
  }
}
</script>
<style scoped lang="less">
  .choose-address{
    padding-top: 46px;
    padding-bottom: 60px;
    background-color: #eee;
    min-height: 100vh;
    /* 顶部导航栏样式 */
    ::v-deep .van-icon-arrow-left{
      color: #333;
    }
    .address-info{
      margin: 10px auto;
      padding: 10px 20px;
      width: 94%;
      border-radius: 5px;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      .name-phone{
        font-size: 18px;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        .left{
          .name{
            margin-right: 10px;
          }
        }
        .right{
          font-size: 12px;
          .btn{
            background-color: #ff6335;
            border: none;
            height: 20px;
            width: 80px;
            border-radius: 10px;
            color: #fff;

          }
        }
      }
      .address{
        font-size: 14px;
        width: 100%;
        padding-bottom: 10px;
        border-bottom: 1px solid #efefef;
      }
      .operates{
        height: 30px;
        padding-top: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .edit-delete{
          display: flex;
          .edit{
            margin-right: 16px;
          }
        }
      }
    }

    .footer{
      width: 100%;
      height: 60px;
      background-color: #fff;
      position: fixed;
      left: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      .btn{
        display: block;
        height: 40px;
        width: 90%;
        border-radius: 20px;
        border: none;
        background: linear-gradient(90deg, #f9211c, #ff6335);
      }
    }
  }
</style>
