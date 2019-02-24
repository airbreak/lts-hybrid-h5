<template>
  <div class="box">
    <div class="main">
      <qrCode :value="value" :options="config" class="qrcode" :style="{top:150*scale + 'px'}"></qrCode>
      <span>
        <i>扫一扫，下载易普惠APP</i>
        <i v-if="code">注册输入邀请码：{{code}}</i>
        <i>版本：{{ver}}</i>
      </span>
      <a href="javascript:void(0);" @click="linkTo">下载易普惠APP</a>
    </div>
  </div>
</template>

<script>
import * as api from '@/utils/api'
export default {
  name: 'index',
  components: {
    qrCode: () => import('@xkeshi/vue-qrcode')
  },
  data () {
    return {
      pload: false,
      width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
      value: '',
      tag: 'img',
      code: '',
      ver: '',
      config: {
        size: 100
      }
    }
  },
  computed: {
    scale () {
      let scale = this.width / 375
      scale = scale < 1 ? scale : 1
      return scale
    }
  },
  created () {
    this.getData()
    document.title = '易普惠APP'
  },
  methods: {
    async getData () {
      this.pload = false
      try {
        const Datas = await api.getDownload({
          brokerId: this.$route.query.brokerId
          // brokerId: '29b2c7da72a6456198cef164b08abccf'
        })
        let ver = Datas[this.$route.query.type]
        this.value = ver.downloadUrl
        this.config = {
          size: this.scale * 100
        }
        this.code = Datas.brokerInfo ? Datas.brokerInfo.brokerInviteCode : null
        this.ver = ver.versionCode
        this.pload = true
      } catch (error) {
        alert('数据加载失败')
      }
    },
    linkTo () {
      window.location.href = this.value
    }
  }
}
</script>
<style lang="less" scoped>
.box {
  background: url(../assets/download-bg.png) no-repeat;
  background-size: 100% 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  .main {
    padding-top: 95%;
    width: 375px;
    max-width: 100%;
    background: url(../assets/download-main.png) no-repeat;
    background-size: 100%;
    margin: 0 auto;
    transform: translateY(10%);
    position: relative;
    & > .qrcode {
      position: absolute;
      left: 50%;
      transform: translate(-50%, 0);
    }
    & > a {
      width: 211px;
      height: 58px;
      font-size: 15px;
      line-height: 58px;
      text-align: center;
      display: block;
      margin: 0 auto;
      border-radius: 3px;
      border: 1px solid #fff;
      text-decoration: none;
      color: #fff;
      background: rgba(255, 255, 255, 0.05);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: -15px;
      .ios {
        width: 35px;
        height: 35px;
        background: url(../assets/ios.png) no-repeat;
        background-size: 100%;
        margin-right: 10px;
      }
      .android {
        width: 35px;
        height: 35px;
        background: url(../assets/android.png) no-repeat;
        background-size: 100%;
        margin-right: 10px;
      }
    }
    & > span {
      display: block;
      transform: translateY(-50%);
      line-height: 2;
      color: #fff;
      text-align: center;
      & > i {
        font-style: normal;
        display: block;
        &:nth-child(1) {
          font-size: 18px;
        }
        &:nth-child(2) {
          font-size: 13px;
        }
      }
    }
  }
}
</style>
