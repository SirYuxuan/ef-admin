<template>
  <div v-if="routerView" class="app-main-container">
   13213213
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'EfAppMain',
  data(){
    return {
      routerView: true
    }
  },
  computed: {
    ...mapGetters({
      visitedRoutes: 'tabsBar/visitedRoutes',
      device: 'settings/device',
    }),
    cachedRoutes() {
      const cachedRoutesArr = []
      this.visitedRoutes.forEach((item) => {
        if (!item.meta.noKeepAlive) {
          cachedRoutesArr.push(item.name)
        }
      })
      return cachedRoutesArr
    },
    key() {
      return this.$route.path
    },
  },
}
</script>

<style scoped>

</style>