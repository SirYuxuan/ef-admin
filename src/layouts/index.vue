<template>
  <div class="ef-admin-wrapper" :class="classObj">
    <div v-if="'horizontal' === layout" class="layout-container-horizontal"  :class="{  fixed: header === 'fixed', 'no-tabs-bar': tabsBar === 'false' || tabsBar === false, }" >
      <div :class="header === 'fixed' ? 'fixed-header' : ''">
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
        <vab-ad />
        <ef-app-main />
      </div>
    </div>
    <div v-else class="layout-container-vertical" :class="{ fixed: header === 'fixed', 'no-tabs-bar': tabsBar === 'false' || tabsBar === false, }" >
      <div v-if="device === 'mobile' && collapse === false"  class="mask"  @click="handleFoldSideBar" />
      <ef-side-bar />
      <div class="ef-main" :class="collapse ? 'is-collapse-main' : ''">
        <div :class="header === 'fixed' ? 'fixed-header' : ''">
          <ef-nav-bar @openSetting="openThemeSetting" />
          <ef-tabs-bar v-if="tabsBar === 'true' || tabsBar === true" />
        </div>
        <vab-ad />
        <ef-app-main />
      </div>
    </div>
    <el-backtop />
    <el-drawer
        title="主题配置"
        :visible.sync="drawerVisible"
        direction="rtl"
        append-to-body
        size="270px"
    >
      <el-scrollbar style="overflow: hidden">
        <div class="el-drawer__body" style="padding: 0 20px 20px 20px">
          <el-form ref="form" :model="theme" label-position="left">
            <el-divider content-position="left">
              <i class="el-icon-setting"></i>
              常用设置
            </el-divider>
            <el-form-item>
              <span style="display: inline-block; float: left">
                布局
                <el-tooltip
                    content="布局仅在PC版生效，手机版将固定为纵向布局"
                    class="item"
                    effect="dark"
                    placement="top-start"
                >
                  <i class="el-icon-info"></i>
                </el-tooltip>
              </span>

              <el-select
                  v-model="theme.layout"
                  style="width: 115px"
                  size="mini"
                  placeholder="布局"
              >
                <el-option label="纵向" value="vertical"></el-option>
                <el-option label="横向" value="horizontal"></el-option>
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
            <el-form-item label="多标签">
              <el-switch
                  v-model="theme.tabsBar"
                  style="display: inline-block; float: right"
                  active-value="true"
                  inactive-value="false"
              ></el-switch>
            </el-form-item>
          </el-form>
        </div>
      </el-scrollbar>
    </el-drawer>
  </div>
</template>

<script>
import { ElBacktop, ElScrollbar, ElDrawer } from 'element-plus'
import { mapActions, mapGetters } from 'vuex'
import { tokenName } from '@/config'
export default {
  name: 'index',
  components: { ElBacktop, ElScrollbar, ElDrawer },
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
      drawerVisible: false
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
    openThemeSetting() {
      this.drawerVisible = true
      const theme = localStorage.getItem('ef-admin-theme')
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
            "tabsBar":"${tabsBar}"
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

    ::v-deep {
      .ef-main {
        width: 88%;
        margin: auto;
      }

      .fixed-header {
        @include fix-header;
      }

      .tag-view-show {
        background: $base-color-white;
        box-shadow: $base-box-shadow;
      }

      .nav-bar-container {
        .fold-unfold {
          display: none;
        }
      }

      .main-padding {
        .app-main-container {
          margin-top: $base-padding;
          margin-bottom: $base-padding;
          background: $base-color-white;
        }
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

      ::v-deep {
        .fixed-header {
          @include fix-header;

          left: $base-left-menu-width;
          width: $base-right-content-width;
          box-shadow: $base-box-shadow;
          transition: $base-transition;
        }

        .nav-bar-container {
          position: relative;
          box-sizing: border-box;
        }

        .tabs-bar-container {
          box-sizing: border-box;
        }

        .app-main-container {
          width: calc(100% - #{$base-padding} - #{$base-padding});
          margin: $base-padding auto;
          background: $base-color-white;
          border-radius: $base-border-radius;
        }
      }

      &.is-collapse-main {
        margin-left: $base-left-menu-width-min;

        ::v-deep {
          .fixed-header {
            left: $base-left-menu-width-min;
            width: calc(100% - 65px);
          }
        }
      }
    }
  }

  /* 手机端开始 */
  &.mobile {
    ::v-deep {
      .el-pager,
      .el-pagination__jump {
        display: none;
      }

      .layout-container-vertical {
        .el-scrollbar.side-bar-container.is-collapse {
          width: 0;
        }

        .ef-main {
          width: 100%;
          margin-left: 0;
        }
      }

      .ef-main {
        .fixed-header {
          left: 0 !important;
          width: 100% !important;
        }
      }
    }
  }

  /* 手机端结束 */
}
</style>