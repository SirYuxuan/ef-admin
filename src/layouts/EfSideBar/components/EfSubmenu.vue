<template>
  <el-sub-menu
    ref="subMenu"
    :index="handlePath(item.path)"
    :popper-append-to-body="false"
  >
    <template #title>
      <ef-icon
          v-if="item.meta && item.meta.icon"
          :icon-class="item.meta.icon"
          class="ef-icon"
      />
      <span>{{ item.meta.title }}</span>
      <el-tag
        v-if="item.meta && item.meta.badge"
        type="danger"
        style="margin-right: 20px"
        effect="dark"
      >
        {{ item.meta.badge }}
      </el-tag>
    </template>
    <slot />
  </el-sub-menu>
</template>

<script>
import { isExternal } from '@/utils/validate'
import path from 'path'

export default {
  name: 'EfSubmenu',
  props: {
    routeChildren: {
      type: Object,
      default() {
        return null
      },
    },
    item: {
      type: Object,
      default() {
        return null
      },
    },
    fullPath: {
      type: String,
      default: '',
    },
  },
  methods: {
    handlePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.fullPath)) {
        return this.fullPath
      }
      return path.resolve(this.fullPath, routePath)
    },
  },
}
</script>
