<template>
  <div class="box">
    <div class="header" v-if="$route.query.type==='1'">{{data.prodName}}</div>
    <div class="top">
      <img :src="data.titlePictureUrl">
    </div>
    <div class="group">
      <div class="title-1">{{data.prodName}}</div>
      <ul class="list-1 f12 gray">
        <li>投保年龄：{{data.minAge}}-{{data.maxAge}}岁</li>
        <li>保障期限：{{data.period}}</li>
        <li>保险类型：{{data.consumptionName}}</li>
      </ul>
    </div>
    <div class="group">
      <div class="title-2">
        <div>
          <span>{{data.premium}}</span>元起
        </div>
        <div v-if="$route.query.type!=='1'">
          推广奖励:<span>{{data.rewardMin}}-{{data.rewardMax}}</span>元
        </div>
      </div>
      <div class="info-1 img-s" v-html="data.summary"></div>
    </div>
    <div class="group">
      <div class="title-3">保障范围</div>
      <div class="info-2 gray img-s" v-html="data.coverage">
      </div>
    </div>
    <div class="group">
      <div class="title-tab">
        <ul>
          <li @click="tab='details'" :class="{on:tab==='details'}">产品特色</li>
          <li @click="tab='instructions'" :class="{on:tab==='instructions'}">投保须知</li>
          <li @click="tab='terms'" :class="{on:tab==='terms'}">产品条款</li>
          <li @click="tab='claimsService'" :class="{on:tab==='claimsService'}">理赔服务</li>
        </ul>
      </div>
    </div>
    <div class="group" v-show="tab==='details'">
      <div class="title-3">产品特色</div>
      <div class="info-2 gray img-s" v-html="data['details']">
      </div>
    </div>
    <div class="group" v-show="tab==='instructions'">
      <div class="title-3">投保须知</div>
      <div class="info-2 gray img-s" v-html="data['instructions']">
      </div>
    </div>
    <div class="group" v-show="tab==='terms'">
      <div class="title-3">产品条款</div>
      <div class="info-2 gray img-s" v-html="data['terms']">
      </div>
    </div>
    <div class="group" v-show="tab==='claimsService'">
      <div class="title-3">理赔服务</div>
      <div class="info-2 gray img-s" v-html="data['claimsService']">
      </div>
    </div>
    <div class="group" v-if="$route.query.type==='1'">
      <div class="title-3">保险推荐人</div>
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
      data: {},
      tab: 'details'
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
        const Datas = await api.getProduct({
          brokerId: this.$route.query.brokerId,
          prodId: this.$route.query.prodId
          // brokerId: '29b2c7da72a6456198cef164b08abccf',
          // prodId: '34fd3db7bf52465fb53e8ca561e6d96a'
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
    img {
      max-width: 100%;
      height: auto;
    }
    .title-1 {
      padding: 12px 12px 0 12px;
    }
    .title-2 {
      padding: 12px;
      color: #ff5000;
      box-shadow: 0 -1px 0 #dedede inset;
      display: flex;
      &>div:nth-child(1){
        flex: 1;
      }
      span {
        font-size: 20px;
      }
    }
    .title-3 {
      position: relative;
      padding: 13px 20px;
      &::before {
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
    .title-tab {
      ul {
        display: flex;
        justify-content: space-between;
        padding: 0 12px;
        li {
          padding: 10px 0;
          text-align: center;
          &.on {
            color: #017aff;
            border-bottom: 2px solid #017aff;
          }
        }
      }
    }
    .list-1 {
      display: flex;
      padding: 10px 12px;
      li {
        flex: 1;
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
    .info-2 {
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
