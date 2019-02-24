<template>
  <div class="box">
    <div class="header" v-if="$route.query.type==='1'">{{data.productName}}</div>
    <div class="top">
      <img :src="data.detailUrl">
    </div>
    <div class="group">
      <ul class="list-1 f12 gray">
        <li>贷款额度<span>{{data.loanCredit}}</span></li>
        <li>办理周期<span>{{data.dealLimit}}</span></li>
        <li>借贷期数<span>{{data.loanLimit}}</span></li>
      </ul>
    </div>
    <div class="group">
      <div class="title-3">产品介绍</div>
      <div class="info-1 img-s" v-html="data.details">
      </div>
    </div>
    <div class="group" v-if="$route.query.type==='1'">
      <div class="title-3">经纪人</div>
      <div class="list-2">
        <ul>
          <li>
            <span>姓名</span>{{data.brokerName}}</li>
          <li>
            <span>电话</span>{{data.brokerPhone}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from '@/utils/api'
export default {
  name: 'index',
  data () {
    return {
      pload: false,
      data: {}
    }
  },
  created () {
    this.getData()
    document.title = '易普惠APP 产品详情'
  },
  methods: {
    async getData () {
      this.pload = false
      try {
        const Datas = await api.getLoan({
          brokerId: this.$route.query.brokerId,
          productId: this.$route.query.productId
        })
        this.data = Datas
        this.pload = true
      } catch (error) {
        alert('数据加载失败')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.box {
  background: #f4f4f4;
  line-height: 1.5;
  padding-bottom: 20px;
  .header {
    background: #fff;
    font-size: 16px;
    text-align: center;
    padding: 12px 0;
  }
  .top {
    img {
      display: block;
      width: 100%;
    }
  }
  .group {
    width: 100%;
    overflow: hidden;
    position: relative;
    background: #fff;
    margin-bottom: 9px;
    box-shadow: 0 1px 0 #dedede inset, 0 -1px 0 #dedede inset;
    img{
      max-width: 100%;
      height: auto;
    }
    .title-3 {
      position: relative;
      padding: 13px 20px;
      &:before {
        content: "";
        position: absolute;
        top: 50%;
        left: 12px;
        transform: translateY(-50%);
        width: 3px;
        height: 14px;
        background: #017aff;
      }
    }
    .list-1 {
      li {
        display: flex;
        padding: 15px 12px;
        box-shadow: 0 1px 0 #dedede inset;
        font-size: 13px;
        span{
          flex: 1;
          text-align: right;
          color: #ff5000;
        }
      }
    }
    .list-2 {
      li {
        display: flex;
        padding: 13px 20px;
        box-shadow: 0 1px 0 #dedede inset;
        span {
          flex: 1;
        }
      }
    }
    .info-1 {
      padding: 10px 12px;
    }
  }
}
</style>
<style>
  .img-s {
    overflow: hidden;
  }
  .img-s img {
    max-width: 100%;
  }
</style>
