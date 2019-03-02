<template>
  <div class="article-box" v-if="data">
    <div class="title">{{data.title}}</div>
    <div class="info-box">
      <div class="left">
        <img :src="data.avatar">
        <span>{{data.author}}</span>
        <span>·</span>
        <span>{{dateFormat(data.createTime,'yyyy/MM/dd')}}</span>
        <span>·</span>
        <span>点赞 {{data.praise}}</span>
      </div>
      <div class="right" :class="{followed: followedFlag}" @click="follow(data.userId)">{{followedFlag? '已关注': '关注'}}</div>
    </div>
    <div class="short-content">
      <span class="red">摘要：</span>
      <span>{{data.summary}}</span>
    </div>
    <div class="cover">
      <img v-if="data.imgUrl" :src="data.imgUrl">
    </div>
    <div class="detail" v-html="data.details"></div>
    <div class="up-rewoard-box">
      <div>
        <div class="img-box" @click="up()">
          <img src="../assets/up.png">
        </div>
        <div>赞</div>
      </div>
      <div>
        <div class="img-box" @click="ctrlRewardAmountBox(true)">
          <img src="../assets/reward.png">
        </div>
        <div>打赏</div>
      </div>
    </div>
    <div class="reward-list-box">
      <template v-if="rewardList.length > 0">
        <div class="reward-avatar-box">
          <div :style="{ width: rewardList.length * 30 + 'rem' }">
            <template v-for="(item, index) in rewardList">
              <img v-if="index < 3"
                :style="{ left: index * 20 + 'rem' }"
                :key="index"
                :src="item.avatar"/>
            </template>
          </div>
        </div>
        <span>{{rewardList.length > 3? '等': ''}}</span>
        <span class="num">{{rewardList.length}}</span>
        <span>人已打赏</span>
      </template>
      <template v-else>
        <span>首席赞赏官虚位以待</span>
      </template>
    </div>
    <div class="reward-amount-box" v-show="rewardAmountBoxFlag">
      <div class="main">
        <div class="reward-title">
          <span>打赏</span>
          <span class="close-btn" @click="ctrlRewardAmountBox(false)">×</span>
        </div>
        <div class="amount-box">
          <div class="amount-box-item">
            <template v-for="(item, index) in amountArr">
            <span v-if="index < 3"
            :key="item"
            :class="{'on': amountSelected === item}"
            @click="selectAmount(item)">￥{{item}}</span>
            </template>
          </div>
          <div class="amount-box-item">
            <template v-for="(item, index) in amountArr">
            <span v-if="index > 2"
            :key="item"
            :class="{'on': amountSelected === item}"
            @click="selectAmount(item)">￥{{item}}</span>
            </template>
          </div>
        </div>
        <div class="custom-amount">
          <input type="number" class="input-box" placeholder="自定义金额" v-model="inputAmount" @focus="inputFocus()">
          <div :class="{'disabled':amountSelected < 0 && inputAmount === ''}" @click="doReward()">打赏</div>
        </div>
      </div>
    </div>
    <div class="tips">
      文章内容仅供参考，不构成投资建议，投资有风险，入市需谨慎！
    </div>
    <div class="keyword-box">
      <template v-if="data.keyword">
        <span v-for="item in data.keyword.split(',')" :key="item">{{item}}</span>
      </template>
    </div>
  </div>
</template>

<script>
import * as api from '@/utils/api'
import { dateFormat } from '@/utils/date'
import cookie from '@/utils/cookie'
import { operationType } from '@/utils/assist'
import { Toast } from 'mint-ui'
export default {
  name: 'index',
  data () {
    return {
      followedFlag: true,
      data: {},
      rewardList: [
        // { avatar: 'https://dummyimage.com/30x30/fff&text=M' },
        // { avatar: 'https://dummyimage.com/30x30/000&text=B' },
        // { avatar: 'https://dummyimage.com/30x30/E13C31&text=L' },
        // { avatar: 'https://dummyimage.com/30x30/fff&text=M' },
        // { avatar: 'https://dummyimage.com/30x30/000&text=B' },
        // { avatar: 'https://dummyimage.com/30x30/E13C31&text=L' },
        // { avatar: 'https://dummyimage.com/30x30/fff&text=M' },
        // { avatar: 'https://dummyimage.com/30x30/000&text=B' },
        // { avatar: 'https://dummyimage.com/30x30/E13C31&text=L' },

        // { avatar: 'https://dummyimage.com/30x30/ccc&text=C' }
      ],
      rewardAmountBoxFlag: false,
      amountArr: [10, 20, 50, 66, 88, 100],
      inputAmount: '',
      amountSelected: 10,
      deviceType: null
    }
  },
  created () {
    document.title = '文章详情'
    this.getTokenFromApp()
    this.initRewardedFn()
  },
  methods: {
    dateFormat: dateFormat,
    async up () {
    },
    ctrlRewardAmountBox (flag) {
      this.rewardAmountBoxFlag = flag
    },
    selectAmount (item) {
      this.amountSelected = item
    },
    inputFocus () {
      this.amountSelected = -1
    },
    doReward () {
      let amount = 0
      if (this.amountSelected > -1) {
        amount = this.amountSelected
      } else {
        amount = this.inputAmount
      }
      let reg = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
      if (!reg.test(amount)) {
        Toast('请输入正确的金额')
        return
      }
      let rewardInfo = {
        payType: 'alipay',
        payAmount: amount,
        businessId: 1
      }
      let str = JSON.stringify(rewardInfo)
      alert(str)
      if (this.deviceType.android) {
        if (typeof window.androidApp !== 'undefined') {
          switch (rewardInfo.payType) {
            case 'alipay':
              alert('向android app发送支付支付宝支付信息：' + str)
              window.androidApp.aliPay(str)
              break
            case 'wx':
              alert('向android app发送微信支付信息：' + str)
              window.androidApp.wxPay(str)
              break
            default:
              break
          }
        }
      } else {
        if (typeof window.iosApp !== 'undefined') {
          switch (rewardInfo.payType) {
            case 'alipay':
              alert('向ios app发送支付支付宝支付信息：' + str)
              window.iosApp.aliPay(str)
              break
            case 'wx':
              alert('向ios app发送微信支付信息：' + str)
              window.iosApp.wxPay(str)
              break
            default:
              break
          }
        }
      }
    },
    async follow (userId) {
      let params = {
        focusUserId: userId,
        focusStatus: this.followedFlag ? 1 : 0 // 1表示取消关注
      }
      let res = await api.focusUser(params)
      if (res.data) {
        let arr = ['关注失败']
        if (res.data.message) {
          arr.push(res.data.message)
        }
        Toast(arr.join(','))
      } else {
        if (this.followedFlag) {
          Toast('取消成功')
        } else {
          Toast('关注成功')
        }
        this.followedFlag = !this.followedFlag
      }
    },
    async getData () {
      try {
        const id = this.$route.params.id
        let data = await api.getArticleDetail({ articleId: id })
        if (data) {
          this.data = data
        }
      } catch (error) {
        alert('数据加载失败')
      }
    },
    // 调用app的方法获取token
    getTokenFromApp () {
      this.deviceType = operationType()
      let token = null
      // token = 'RjVCQTMyRDAyODQwNjI1RUMyREI3NkM2Njk2QjI5RThCQjQxRDQ3QUM3MTBDMTZGQUUyN0RERjU3QzcwMUQ2MTFGNkZCOTdCNzgxOTQ3NzBEQkQxRUYxRDZBNkFFOThDQUFFODk3QzMwOTA0REFGMzYxRDAzQkI4OERDREQyOUU0RDEyQ0YxMjc0MjMxQjFDNUU0MzFCNUFGQzJCRkE3RkFEREE4NEQ1MzQ4NEI5MDdDRUZEMzBBRDBGN0Q1RDUyRkIyMzlCMUJDRTQwNEUyQkU3QkQ2NTI5MDQzRDkxNUZDRjBBMzA5NzgxNzQxMjEzM0MyMDVGMzgxOTFCNDA5Rg===='
      // if (!token) {
      if (this.deviceType.mobile) {
        if (this.deviceType.android) {
          if (typeof window.androidApp !== 'undefined') {
            token = window.androidApp.getToken()
            alert('安卓端获取到的token为' + token)
            cookie.set('device_id', token)
            sessionStorage.setItem('token', token)
            this.getData()
          }
        } else {
          setTimeout(() => {
            if (typeof window.iosApp !== 'undefined') {
              token = window.iosApp.getToken()
            }
          }, 500)
        }
      } else {
        token = 'RjVCQTMyRDAyODQwNjI1RUMyREI3NkM2Njk2QjI5RThCQjQxRDQ3QUM3MTBDMTZGQUUyN0RERjU3QzcwMUQ2MTFGNkZCOTdCNzgxOTQ3NzBEQkQxRUYxRDZBNkFFOThDQUFFODk3QzMwOTA0REFGMzYxRDAzQkI4OERDREQyOUU0RDEyQ0YxMjc0MjMxQjFDNUU0MzFCNUFGQzJCRkE3RkFEREE4NEQ1MzQ4NEI5MDdDRUZEMzBBRDBGN0Q1RDUyRkIyMzlCMUJDRTQwNEUyQkU3QkQ2NTI5MDQzRDkxNUZDRjBBMzA5NzgxNzQxMjEzM0MyMDVGMzgxOTFCNDA5Rg===='
        this.getData()
      }
    },
    initRewardedFn () {
      window.rewardSuccess = () => {
        alert('支付成功')
      }
      window.rewardFail = (res) => {
        alert('支付失败' + res)
      }
      window.receiveTokenFromIOS = (token) => {
        alert(`token: ${token}`)
        cookie.set('device_id', token)
        sessionStorage.setItem('token', token)
        this.getData()
      }
    }
  }
}
</script>
<style lang="scss">
.article-box {
  line-height: 1.5;
  padding: .4rem;
  width: 100%;
  background-color: #fff;
  font-size: .28rem;
  overflow-x: hidden;
  font-family: '微软雅黑','Courier New', Courier, monospace;
  box-sizing: border-box;
  .title {
    padding: .2rem .24rem;
    line-height: .42rem;
    font-size: .4rem;
    color: #333;
  }
  .info-box {
    margin-top: .20rem;
    padding: .08rem .24rem;
    color: #7E7E7E;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left{
      display: flex;
      align-items: center;
      justify-content: space-between;
      img {
        height: .80rem;
        width: .80rem;
        border-radius: 50%;
        margin-right: .05rem;
      }
      span {
        color: #808080;
        font-size: .28rem;
      }
    }
    .right {
      background-color: #FF5852;
      color: #fff;
      font-size: .28rem;
      border-radius: .40rem;
      padding: .12rem .24rem;
      line-height: .28rem;
      border: 0.01rem solid transparent; // 解决安卓字体不居中问题
      box-sizing:border-box;
      &.followed {
        background-color: #a6a6a6;
      }
    }
  }
  .short-content {
    margin-top: .20rem;
    background-color: #f2f4fc;
    border-radius: .15rem;
    padding: .20rem;
    color: #808080;
    line-height: .44rem;
    font-size: .28rem;
    .red {
      color: #FF5753;
    }
  }
  .cover {
    margin-top: .20rem;
    img {
      height: 3.50rem;
      width: 100%;
      border-radius: .15rem;
    }
  }
  .detail {
    margin-top: .20rem;
    text-align: justify;
    img {
      width: 100%;
    }
    p {
      line-height: .60rem;
      font-size: .34rem;
      color: #333;
    }
  }
  .up-rewoard-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 45%;
    margin: .40rem auto;
    > div{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #323334;
      .img-box {
        border: .02rem solid #E13C31;
        border-radius: 50%;
        padding: .20rem;
        margin-bottom: .10rem;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          height: .50rem;
          width: .50rem;
        }
      }
    }
  }
  .reward-list-box {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: .20rem auto;
    .reward-avatar-box {
      margin-right: .35rem;
      min-width: .80rem;
      max-width: 1.60rem;
      overflow: hidden;
      >div {
        position: relative;
        height: .80rem;
      }
      img {
        position: absolute;
        height: .80rem;
        width: .80rem;
        border-radius: 50%;
      }
    }
    span {
      color: #999;
      &.num {
        color: #000;
        margin: 0 .05rem;
      }
    }
  }
  .tips {
    margin-top: .40rem;
    color: #e8331c;
  }
  .keyword-box {
    margin: .30rem auto;
    span {
      display: inline-block;
      margin-top: .30rem;
      margin-right: .30rem;
      color: #4772f9;
      padding: .10rem .20rem;
      background-color: #e0e6ff;
      font-size: .30rem;
      border: .01rem solid transparent; // 解决安卓字体不居中问题
      box-sizing:border-box;
    }
  }
  .reward-amount-box {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0, .5);
    z-index: 1000;
    .main {
      position: absolute;
      z-index: 10001;
      bottom: .30rem;
      left: .30rem;
      right: .30rem;
      background-color: #fff;
      border-radius: .20rem;
      padding-bottom: .30rem;
      .reward-title {
        height: 1.00rem;
        border-bottom: .02rem solid #DADADA;
        color: #333;
        font-size: .40rem;
        padding: 0 .40rem;
        line-height: 1.00rem;
        display: flex;
        justify-content: space-between;
        .close-btn {
          font-size: .70rem;
          color: #b3b3b3;
          padding: 0 .12rem;
        }
      }
      .amount-box {
        // height: 360rem;
        width: 80%;
        margin: .50rem auto;
        display: flex;
        flex-wrap: wrap;
        $w: 1.56rem;
        .amount-box-item{
          display: flex;
          justify-content: space-between;
          &:first-child {
            margin-bottom: .5rem;
          }
          span {
            border: .01rem solid #eb440e;
            border-radius: .50rem;
            flex: 1;
            width: $w;
            min-width: $w;
            max-width: $w;
            height: .80rem;
            line-height: .80rem;
            text-align: center;
            margin-right: .36rem;
            color: #eb440e;
            font-size: .36rem;
            &:nth-child(3n) {
              margin-right: 0;
            }
            &.on {
              background-color: #eb440e;
              color: #fff;
            }
            &.down {
              margin-top: .60rem;
            }
          }
        }
      }
      .custom-amount{
        display: flex;
        justify-content: space-between;
        width: 80%;
        margin: .10rem auto;
        font-size: .40rem;
        height: .9rem;
        .input-box {
          height: 100%;
          flex: 1;
          width: 2.78rem;
          border: .02rem solid #DADADA;
          font-size: .36rem;
          color: #b3b3b3;
          padding-left: .20rem;
          box-sizing: border-box;
          border-radius: .05rem;
        }
        div {
          width: 1.80rem;
          background-color: #eb440e;
          color: #fff;
          height: 100%;
          line-height: .9rem;
          text-align: center;
          border-radius: .16rem;
          border: .02rem solid #ff5d5d;
          padding: 0 .20rem;
          margin-left: .30rem;
          &.disabled {
            background-color: #ccc;
            border: none;
          }
        }
      }
    }
  }
}
</style>
