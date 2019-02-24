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
          <div :style="{ width: rewardList.length * 30 + 'px' }">
            <template v-for="(item, index) in rewardList">
              <img v-if="index < 3"
                :style="{ left: index * 20 + 'px' }"
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
          <span v-for="(item, index) in amountArr"
            :key="item"
            :class="{'on': amountSelectedIndex === index, 'down': index > 2}"
            @click="selectAmount(index)">￥{{item}}</span>
        </div>
        <div class="custom-amount">
          <input type="number" class="input-box" placeholder="自定义金额" v-model="inputAmount" @focus="inputFocus()">
          <div :class="{'disabled':amountSelectedIndex < 0 && inputAmount === ''}" @click="doReward()">打赏</div>
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
      amountSelectedIndex: 0
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
    selectAmount (index) {
      this.amountSelectedIndex = index
    },
    inputFocus () {
      this.amountSelectedIndex = -1
    },
    doReward () {
      let amount = 0
      if (this.amountSelectedIndex > -1) {
        amount = this.amountArr[this.amountSelectedIndex]
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
              alert('向app发送支付支付宝支付信息：' + str)
              window.androidApp.aliPay(str)
              break
            case 'wx':
              alert('向app发送支付支付宝支付信息：' + str)
              window.androidApp.wxPay(str)
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
        this.data = data.data
      } catch (error) {
        alert('数据加载失败')
      }
    },
    // 调用app的方法获取token
    getTokenFromApp () {
      let deviceType = operationType()
      let token = sessionStorage.getItem('token')
      token = 'MDE3QTk4RkI2NEI5NEEyMEI2MEJGMEE0NkQ3Q0M1RjA3QTE3NEVGRjYyRTcwNTdFN0NDQTM5RUUyNjU3MjZBOTM3QjUxNEUwMzAxRUFBRDlDQTdENEI1RDg4NzcyM0E5M0FBRTI5RTRDMEEyMzk0N0YzMkRFOTdFRTZBRDJBNUQwNThCMUNCRjZGNEYwMzM0OEM0RTBBNDYyQzc4ODhBRTY0OTQ1Nzk0QzI1MkM0MDNENzcwNzYxNUNFRDc3QzY0RTY5RTI1OTc5OUUzMTY1QjlCMDk0MTY5NTc5N0JGOEM4Q0VBREI2ODlFRjZBQTIyQUUzOUIwMzM4NUFGRjA0MzgzRENCQzRBMDYyQTI0NUNCMzdFRDRCQjI2ODEyQUQx'
      // if (!token) {
      if (deviceType.mobile) {
        if (deviceType.android) {
          if (typeof window.androidApp !== 'undefined') {
            token = window.androidApp.getToken()
            alert('安卓端获取到的token为' + token)
          }
        } else {
          setTimeout(() => {
            alert('即将调用ios端方法获取token')
            if (typeof window.iosApp === 'undefined') {
              alert('ios端app 不存在')
            }
            if (typeof iosApp === 'undefined') {
              alert('ios端app 不存在')
            }
            token = window.iosApp.getToken()
            alert('ios端获取到的token为' + token)
          }, 100)
        }
      }
      // }
      cookie.set('device_id', token)
      // sessionStorage.setItem('token', token)
      // this.$store.dispatch('getUserInfo')
      // this.getData()
    },
    initRewardedFn () {
      window.rewarded = () => {
        alert('ok')
      }
      window.receiveTokenFromIOS = (token) => {
        alert(`token: ${token}`)
      }
    }
  }
}
</script>
<style lang="scss">
.article-box {
  line-height: 1.5;
  padding: 40px;
  width: 100%;
  background-color: #fff;
  font-size: 28px;
  overflow-x: hidden;
  font-family: '微软雅黑','Courier New', Courier, monospace;
  .title {
    padding: 20px 24px;
    line-height: 42px;
    font-size: 40px;
    color: #333;
  }
  .info-box {
    margin-top: 20px;
    padding: 8px 24px;
    color: #7E7E7E;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left{
      display: flex;
      align-items: center;
      justify-content: space-between;
      img {
        height: 80px;
        width: 80px;
        border-radius: 50%;
        margin-right: 5px;
      }
      span {
        color: #808080;
        font-size: 28px;
      }
    }
    .right {
      background-color: #FF5852;
      color: #fff;
      font-size: 28px;
      border-radius: 40px;
      padding: 12px 24px;
      line-height: 28px;
      border: 1px solid transparent; // 解决安卓字体不居中问题
      box-sizing:border-box;
      &.followed {
        background-color: #a6a6a6;
      }
    }
  }
  .short-content {
    margin-top: 20px;
    background-color: #f2f4fc;
    border-radius: 15px;
    padding: 20px;
    color: #808080;
    line-height: 44px;
    font-size: 28px;
    .red {
      color: #FF5753;
    }
  }
  .cover {
    margin-top: 20px;
    img {
      height: 350px;
      width: 100%;
      border-radius: 15px;
    }
  }
  .detail {
    margin-top: 20px;
    text-align: justify;
    img {
      width: 100%;
    }
    p {
      line-height: 60px;
      font-size: 34px;
      color: #333;
    }
  }
  .up-rewoard-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 45%;
    margin: 40px auto;
    > div{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #323334;
      .img-box {
        border: 2px solid #E13C31;
        border-radius: 50%;
        padding: 20px;
        margin-bottom: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          height: 50px;
          width: 50px;
        }
      }
    }
  }
  .reward-list-box {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px auto;
    .reward-avatar-box {
      margin-right:35px;
      min-width: 80px;
      max-width: 160px;
      overflow: hidden;
      >div {
        position: relative;
        height: 80px;
      }
      img {
        position: absolute;
        height: 80px;
        width: 80px;
        border-radius: 50%;
      }
    }
    span {
      color: #999;
      &.num {
        color: #000;
        margin: 0 5px;
      }
    }
  }
  .tips {
    margin-top: 40px;
    color: #e8331c;
  }
  .keyword-box {
    margin: 30px auto;
    span {
      display: inline-block;
      margin-top: 30px;
      margin-right: 30px;
      color: #4772f9;
      padding: 10px 20px;
      background-color: #e0e6ff;
      font-size: 30px;
      border: 1px solid transparent; // 解决安卓字体不居中问题
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
      bottom: 30px;
      left:30px;
      right: 30px;
      background-color: #fff;
      border-radius: 20px;
      padding-bottom: 30px;
      .reward-title {
        height: 100px;
        border-bottom: 1px solid #E93F33;
        color: #333;
        font-size: 40px;
        padding: 0 40px;
        line-height: 100px;
        display: flex;
        justify-content: space-between;
        .close-btn {
          font-size: 70px;
          color: #b3b3b3;
          padding: 0 12px;
        }
      }
      .amount-box {
        // height: 360px;
        width: 80%;
        margin: 60px auto;
        display: flex;
        flex-wrap: wrap;
        $w: 156px;
        span {
          border: 2px solid #eb440e;
          border-radius: 50px;
          flex: 1;
          width: $w;
          min-width: $w;
          max-width: $w;
          height: 90px;
          line-height: 90px;
          text-align: center;
          margin-right: 40px;
          color: #eb440e;
          font-size: 38px;
          &:nth-child(3n) {
            margin-right: 0;
          }
          &.on {
            background-color: #eb440e;
            color: #fff;
          }
          &.down {
            margin-top: 60px;
          }
        }
      }
      .custom-amount{
        display: flex;
        justify-content: space-between;
        width: 80%;
        margin: 10px auto;
        font-size: 40px;
        .input-box {
          height: 107px;
          flex: 1;
          width: 278px;
          border:2px solid #DADADA;
          font-size: 43px;
          color: #b3b3b3;
          padding-left: 10px;
          box-sizing: border-box;
          border-radius: 5px;
        }
        div {
          width: 180px;
          background-color: #eb440e;
          color: #fff;
          height: 107px;
          line-height: 107px;
          text-align: center;
          border-radius: 16px;
          border: 2px solid #ff5d5d;
          padding: 0 20px;
          margin-left: 30px;
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
