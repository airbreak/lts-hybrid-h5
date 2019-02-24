<template>
  <div class="box">
    <div class="title">{{data.title}}</div>
    <div class="titles gray">
      <span>{{data.classifyName}}</span>
      <span>{{dateFormat(data.createTime,'yyyy年MM月dd日')}}</span>
    </div>
    <div class="hits">{{data.hits}}阅读</div>
    <div class="detail img-s" v-html="data.detail"></div>
  </div>
</template>

<script>
import * as api from '@/utils/api'
import { dateFormat } from '@/utils/date'
export default {
  name: 'index',
  data () {
    return {
      pload: false,
      data: {}
    }
  },
  created () {
    document.title = '易普惠APP'
    this.getData()
  },
  methods: {
    dateFormat: dateFormat,
    async getData () {
      this.pload = false
      try {
        const Datas = await api.getArt(this.$route.query.artId)
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
  line-height: 1.5;
  padding-bottom: 20px;
  width: 100%;
  .title {
    padding: 10px 12px;
    line-height: 21px;
    font-size: 20px;
  }
  .titles {
    font-size: 10px;
    padding: 4px 12px;
    span {
      padding-right: 10px;
    }
  }
  .hits {
    padding: 10px 12px;
  }
  .detail {
    padding: 10px 12px;
    text-align: justify;
    font-size: 13px;
  }
}
</style>
<style>
.img-s {
  overflow: hidden;
}
.img-s img {
  max-width: 90%;
}
</style>
