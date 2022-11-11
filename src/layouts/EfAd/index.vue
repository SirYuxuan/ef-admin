<template>
  <div v-if="showAd" class="ef-ad">
    <el-carousel
      v-if="adList"
      height="30px"
      direction="vertical"
      :autoplay="true"
      :interval="3000"
      indicator-position="none"
    >
      <el-carousel-item v-for="(item, index) in adList" :key="index">
        <el-tag type="danger">广告</el-tag>
        <a target="_blank" :href="item.url" style="margin-left: 5px">{{ item.title }}</a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
import { showAd } from '@/config'
export default {
  name: 'EfAd',
  data() {
    return {
      showAd: showAd,
      nodeEnv: process.env.NODE_ENV,
      adList: [],
    }
  },
  created() {
    if (this.showAd) {
      this.fetchData()
    }
  },
  methods: {
    async fetchData() {
      this.adList = [{ title: '技术支持：雨轩博客', url: 'https://www.yuxuan66.com' } ]
    },
  },
}
</script>
<style lang="scss" scoped>
  .ef-ad {
    height: 30px;
    padding-right: $base-padding;
    padding-left: $base-padding;
    margin-bottom: -20px;
    line-height: 30px;
    cursor: pointer;

    a {
      color: #999;
    }
  }
</style>
