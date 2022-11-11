<template>
  <el-scrollbar class="side-bar-container" :class="{ 'is-collapse': collapse }">
    <ef-logo/>
    <el-menu
        :background-color="variables['menu-background']"
        :text-color="variables['menu-color']"
        :active-text-color="variables['menu-color-active']"
        :default-active="activeMenu"
        :collapse="collapse"
        :collapse-transition="false"
        :default-openeds="defaultOpens"
        :unique-opened="uniqueOpened"
        mode="vertical"
    >
      <ef-side-bar-item
          v-for="(route,index) in routes"
          :key="index+route.path"
          :full-path="route.path"
          :item="route"
      />
    </el-menu>
  </el-scrollbar>
</template>
<script>
import variables from '@/assets/style/variables.module.scss'
import { mapGetters } from 'vuex'
import { defaultOopeneds, uniqueOpened } from '@/config'

export default {
  name: 'EfSideBar',
  data() {
    return {
      uniqueOpened,
    }
  },
  computed: {
    ...mapGetters({
      collapse: 'settings/collapse',
      routes: 'routes/routes',
    }),
    defaultOpens() {
      if (this.collapse) {
      }
      return defaultOopeneds
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    variables() {
      return variables
    },
  }
}
</script>
<style lang="scss" scoped>
@mixin active {
  &:hover {
    color: $base-color-white;
    background-color: $base-menu-background-active !important;
  }

  &.is-active {
    color: $base-color-white;
    background-color: $base-menu-background-active !important;
  }
}

.side-bar-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: $base-z-index;
  width: $base-left-menu-width;
  height: 100vh;
  overflow: hidden;
  background: $base-menu-background;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  transition: width $base-transition-time;

  &.is-collapse {
    width: $base-left-menu-width-min;
    border-right: 0;

    :deep(.el-menu) {
      transition: width $base-transition-time;
    }

    :deep(.el-menu--collapse) {
      border-right: 0;

      .el-submenu__icon-arrow {
        right: 10px;
        margin-top: -3px;
      }
    }
  }

  :deep(.el-scrollbar__wrap) {
    overflow-x: hidden;
  }

  :deep(.el-menu) {
    border: 0;

    .ef-fas-icon {
      padding-right: 3px;
      font-size: $base-font-size-default;
    }

    .ef-icon {
      padding-right: 3px;
      font-size: $base-font-size-default + 2;
    }
  }

  :deep(.el-menu-item,
      .el-submenu__title) {
    height: $base-menu-item-height;
    overflow: hidden;
    line-height: $base-menu-item-height;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
  }

  :deep(.el-menu-item) {
    @include active;
  }
}
</style>
