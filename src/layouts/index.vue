<template>
  <div class="ef-admin-wrapper" :class="classObj">
    <div v-if="'horizontal' === layout" class="layout-container-horizontal"  :class="{  fixed: header === 'fixed', 'no-tabs-bar': tabsBar === 'false' || tabsBar === false, }" >
      <div :class="header === 'ef-layout-header fixed' ? 'fixed-header' : 'ef-layout-header'">
        <ef-top-bar @openSetting="openThemeSetting" />
        <div
            v-if="tabsBar === 'true' || tabsBar === true"
            :class="{ 'tag-view-show': tabsBar }"
        >
          <div class="ef-main">
            <ef-tabs-bar />
          </div>
        </div>
      </div>
      <div class="ef-main main-padding">
        <ef-ad />
        <ef-app-main />
      </div>
    </div>
    <div v-else class="layout-container-vertical" :class="{ fixed: header === 'fixed', 'no-tabs-bar': tabsBar === 'false' || tabsBar === false, }" >
      <div v-if="device === 'mobile' && collapse === false"  class="mask"  @click="handleFoldSideBar" />
      <ef-side-bar />
      <div class="ef-main" :class="collapse ? 'is-collapse-main' : ''">
        <div :class="header === 'fixed' ? 'ef-layout-header fixed-header' : 'ef-layout-header'">
          <ef-nav-bar @openSetting="openThemeSetting" />
          <ef-tabs-bar v-if="tabsBar === 'true' || tabsBar === true" />
        </div>
        <ef-ad />
        <ef-app-main />
      </div>
    </div>
    <el-backtop />
    <el-drawer
        custom-class="ef-drawer"
        title="主题配置"
        v-model="drawerVisible"
        direction="rtl"
        append-to-body
        size="270px"
    >
      <el-scrollbar style="overflow: hidden">
        <el-form ref="form" :model="theme" label-position="left">
            <el-form-item>
              <template #label>
                <span>布局</span>
                <el-tooltip
                    content="布局仅在PC版生效，手机版将固定为纵向布局"
                    class="item"
                    effect="dark"
                    placement="top-start"
                >
                  <ef-icon icon-class="problem" />
                </el-tooltip>
              </template>

              <el-select
                  v-model="theme.layout"
                  style="width: 159px"
                  size="small"
                  placeholder="布局"
              >
                <el-option label="纵向" value="vertical"></el-option>
                <el-option label="横向" value="horizontal"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="主题">
              <el-select
                  v-model="theme.name"
                  style="width: 159px"
                  size="small"
                  @change="changeTheme"
                  placeholder="布局"
              >
                <el-option label="黑蓝" value="default"></el-option>
                <el-option label="紫白" value="purple_white.module"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="固定头部">
              <el-switch
                  v-model="theme.header"
                  style="display: inline-block; float: right"
                  active-value="fixed"
                  inactive-value="noFixed"
              ></el-switch>
            </el-form-item>
            <el-form-item label="标签">
              <el-switch
                  v-model="theme.tabsBar"
                  style="display: inline-block; float: right"
                  active-value="true"
                  inactive-value="false"
              ></el-switch>
            </el-form-item>
          </el-form>
      </el-scrollbar>
    </el-drawer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { tokenName } from '@/config'
export default {
  name: 'index',
  computed: {
    ...mapGetters({
      layout: 'settings/layout',
      header: 'settings/header',
      collapse: 'settings/collapse',
      device: 'settings/device',
      tabsBar: 'settings/tabsBar',
    }),
    classObj() {
      return {
        mobile: this.device === 'mobile',
      }
    },
  },
  data() {
    return {
      oldLayout: '',
      drawerVisible: false,
      theme: {
        name: 'default',
        layout: 'vertical',
        header: 'fixed',
        tabsBar: 'true',
        background: ''
      },
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
  watch: {
    theme: {
      handler() {
        this.handleSetTheme()
      },
      deep: true,
    },
  },
  mounted() {
    console.log('index', this.tabsBar)
    this.oldLayout = this.layout
    const isMobile = this.handleIsMobile()
    if (isMobile) {
      this.$store.dispatch('settings/changeLayout', 'vertical')
      this.$store.dispatch('settings/toggleDevice', 'mobile')
      setTimeout(() => {
        this.$store.dispatch('settings/foldSideBar')
      }, 2000)
    } else {
      this.$store.dispatch('settings/openSideBar')
    }
    this.$nextTick(() => {
      window.addEventListener(
        'storage',
        (e) => {
          if (e.key === tokenName || e.key === null) window.location.reload()
          if (e.key === tokenName && e.value === null)
            window.location.reload()
        },
        false
      )
    })
  },
  methods: {
    ...mapActions({
      handleFoldSideBar: 'settings/foldSideBar',
      changeLayout: 'settings/changeLayout',
      changeHeader: 'settings/changeHeader',
      changeTabsBar: 'settings/changeTabsBar',
    }),
    changeTheme(){
      let themeVars = require(`@/assets/style/theme/${this.theme.name}.scss`)
      for (let key in themeVars) {
        document.documentElement.style.setProperty(key, themeVars[key])
      }
    },
    openThemeSetting() {
      this.drawerVisible = true
      const theme = localStorage.getItem('ef-admin-theme')
      console.log('theme1', theme)
      if (null !== theme) {
        this.theme = JSON.parse(theme)
        this.handleSetTheme()
      } else {
        this.theme.layout = this.layout
        this.theme.header = this.header
        this.theme.tabsBar = this.tabsBar
      }
    },
    handleSetTheme() {
      let { name, layout, header, tabsBar } = this.theme
      localStorage.setItem(
        'ef-admin-theme',
        `{
            "name":"${name}",
            "layout":"${layout}",
            "header":"${header}",
            "tabsBar":"${this.theme.tabsBar}"
          }`
      )
      if (!this.handleIsMobile()) this.changeLayout(layout)
      this.changeHeader(header)
      this.changeTabsBar(tabsBar)
      document.getElementsByTagName(
        'body'
      )[0].className = `ef-admin-theme-${name}`
    },
    handleIsMobile() {
      return document.body.getBoundingClientRect().width - 1 < 992
    },
    handleResize() {
      if (!document.hidden) {
        const isMobile = this.handleIsMobile()
        if (isMobile) {
          //横向布局时如果是手机端访问那么改成纵向版
          this.$store.dispatch('settings/changeLayout', 'vertical')
        } else {
          this.$store.dispatch('settings/changeLayout', this.oldLayout)
        }
        this.$store.dispatch(
          'settings/toggleDevice',
          isMobile ? 'mobile' : 'desktop'
        )
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@mixin fix-header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: $base-z-index - 2;
  width: 100%;
  overflow: hidden;
}

.ef-admin-wrapper {
  position: relative;
  width: 100%;
  height: 100%;

  .layout-container-horizontal {
    position: relative;

    &.fixed {
      padding-top: calc(#{$base-top-bar-height} + #{$base-tabs-bar-height});
    }

    &.fixed.no-tabs-bar {
      padding-top: $base-top-bar-height;
    }
    :deep(.ef-main){
      width: 88%;
      margin: auto;
    }
    :deep(.fixed-header){
      @include fix-header;
    }
    :deep(.tag-view-show){
      background: $base-color-white;
      box-shadow: $base-box-shadow;
    }
    :deep(.ef-nav){
      .ef-nav {
        .fold-unfold {
          display: none;
        }
      }
    }
    :deep(.main-padding){
      .app-main-container {
        margin-top: $base-padding;
        margin-bottom: $base-padding;
        background: $base-color-white;
      }
    }
  }

  .layout-container-vertical {
    position: relative;

    .mask {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: $base-z-index - 1;
      width: 100%;
      height: 100vh;
      overflow: hidden;
      background: #000;
      opacity: 0.5;
    }

    &.fixed {
      padding-top: calc(#{$base-nav-bar-height} + #{$base-tabs-bar-height});
    }

    &.fixed.no-tabs-bar {
      padding-top: $base-nav-bar-height;
    }

    .ef-main {
      position: relative;
      min-height: 100%;
      margin-left: $base-left-menu-width;
      background: #f6f8f9;
      transition: $base-transition;
      :deep(.fixed-header){
        @include fix-header;
        left: $base-left-menu-width;
        width: $base-right-content-width;
        box-shadow: $base-box-shadow;
        transition: $base-transition;
      }
      :deep(.ef-nav){
        position: relative;
        box-sizing: border-box;
      }
      :deep(.ef-tabs){
        box-sizing: border-box;
      }
      :deep(.app-main-container){
        width: calc(100% - #{$base-padding} - #{$base-padding});
        margin: $base-padding auto;
        background: $base-color-white;
        border-radius: $base-border-radius;
      }
      &.is-collapse-main {
        margin-left: $base-left-menu-width-min;
        :deep(.fixed-header){
          left: $base-left-menu-width-min;
          width: calc(100% - 65px);
        }
      }
    }
  }

  /* 手机端开始 */
  &.mobile {
    :deep(.el-pager,.el-pagination__jump){
      display: none;
    }
    :deep(.layout-container-vertical){
      .el-scrollbar.side-bar-container.is-collapse {
        width: 0;
      }
      .ef-main {
        width: 100%;
        margin-left: 0;
      }
    }
    :deep(.fixed-header){
      left: 0 !important;
      width: 100% !important;
    }
  }

  /* 手机端结束 */
}
</style>