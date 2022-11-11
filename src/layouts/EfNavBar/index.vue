<template>
  <div class="ef-nav">
    <el-row :gutter="15">
      <el-col :xs="4" :sm="12" :md="12" :lg="12" :xl="12">
        <div class="left-panel">
          <ef-icon class="fold-unfold" :icon-class="collapse? 'menu_unfold_lf' : 'menu_unfold_rg'"
                   :title="collapse ? '展开' : '收起'" @click="handleCollapse"/>
          <ef-breadcrumb class="hidden-xs-only"/>
        </div>
      </el-col>
      <el-col :xs="20" :sm="12" :md="12" :lg="12" :xl="12">
        <div class="right-panel">
          <ef-full-screen-bar @refresh="refreshRoute"/>
          <ef-theme-bar class="hidden-xs-only" @openSetting="openSetting"/>
          <ef-icon
              title="重载所有路由"
              :pulse="pulse"
              icon-class="refresh"
              @click="refreshRoute"
          />
          <vab-avatar/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'EfNavBar',
  data() {
    return {
      pulse: false,
    }
  },
  computed: {
    ...mapGetters({
      collapse: 'settings/collapse',
      visitedRoutes: 'tabsBar/visitedRoutes',
      device: 'settings/device',
      routes: 'routes/routes',
    }),
  },
  methods: {
    ...mapActions({
      changeCollapse: 'settings/changeCollapse',
    }),
    openSetting() {
      this.$emit('openSetting')
    },
    handleCollapse() {
      this.changeCollapse()
    },
    async refreshRoute() {
      this.$baseEventBus.$emit('reload-router-view')
      this.pulse = true
      setTimeout(() => {
        this.pulse = false
      }, 1000)
    },
  },
}
</script>

<style lang="scss" scoped>
.ef-nav {
  position: relative;
  height: $base-nav-bar-height;
  padding-right: $base-padding;
  padding-left: $base-padding;
  overflow: hidden;
  user-select: none;
  background: $base-color-white;
  box-shadow: $base-box-shadow;

  .left-panel {
    display: flex;
    align-items: center;
    justify-items: center;
    height: $base-nav-bar-height;

    .fold-unfold {
      color: $base-color-gray;
      cursor: pointer;
    }

    :deep(.breadcrumb-container) {
      margin-left: 10px;
    }
  }

  .right-panel {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: flex-end;
    height: $base-nav-bar-height;

    :deep(svg) {
      width: 1em;
      height: 1em;
      margin-right: 15px;
      font-size: $base-font-size-small;
      color: $base-color-gray;
      cursor: pointer;
      fill: $base-color-gray;
    }

    :deep(button) {
      svg {
        margin-right: 0;
        color: $base-color-white;
        cursor: pointer;
        fill: $base-color-white;
      }
    }

    :deep(.el-badge) {
      margin-right: 15px;
    }
  }
}
</style>
