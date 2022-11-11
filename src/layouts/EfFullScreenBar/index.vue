<template>
  <span :title="isFullscreen ? '退出全屏' : '进入全屏'">
    <ef-icon  :icon-class="isFullscreen ? 'full-exit' : 'full'" @click="onFullScreen" />
  </span>
</template>

<script>
import screenfull from 'screenfull'

export default {
  name: 'EfFullScreenBar',
  data() {
    return {
      isFullscreen: false,
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.destroy()
  },
  methods: {
    onFullScreen() {
      if (!screenfull.isEnabled) {
        this.$baseMessage('开启全屏失败', 'error')
        return false
      }
      screenfull.toggle()
      this.$emit('refresh')
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen
    },
    init() {
      if (screenfull.isEnabled) {
        screenfull.on('change', this.change)
      }
    },
    destroy() {
      if (screenfull.isEnabled) {
        screenfull.off('change', this.change)
      }
    },
  },
}
</script>
