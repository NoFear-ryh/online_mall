<template>
    <div class="count-box">
        <button class="sub-btn" @click="subBtn">-</button>
        <input class="count" type="text" :value="value" @change="handelChange">
        <button class="add-btn" @click="addBtn">+</button>
    </div>
</template>

<script>

export default {
  name: 'countBox',
  components: {},
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  methods: {
    subBtn () {
      if (this.value <= 1) {
        return
      }
      this.$emit('input', this.value - 1)
    },
    addBtn () {
      this.$emit('input', this.value + 1)
    },
    handelChange (e) {
      const num = +e.target.value
      if (isNaN(num) || num < 1) {
        e.target.value = this.value
        return
      }
      this.$emit('input', num)
    }
  }
}
</script>
<style scoped lang="less">
    .count-box{
        width: 110px;
        .sub-btn, .add-btn{
            width: 30px;
            height: 30px;
            border: none;
            outline: none;
            background-color: #efefef;
        }
        .count{
            width: 40px;
            height: 30px;
            margin: 0 5px;
            text-align: center;
            border: none;
            background-color: #efefef;
        }
    }
</style>
