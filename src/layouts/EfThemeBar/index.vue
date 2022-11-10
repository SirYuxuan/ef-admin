<template>
  <span v-if="themeBar">
    <ef-icon
      title="主题配置"
      iconClass="setting"
      @click="openSetting"
    />
  </span>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'VabThemeBar',
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      themeBar: 'settings/themeBar',
    }),
    classObj() {
      return {
        mobile: this.device === 'mobile',
      }
    },
  },
  created() {},
  methods: {
    openSetting() {
      this.$emit('openSetting')
    },
  },
}
</script>
