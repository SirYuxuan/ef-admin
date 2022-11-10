import { tabsBar, logo, layout, header, themeBar } from '@/config'
const theme = JSON.parse(localStorage.getItem('ef-admin-theme')) || {}
export default {
  state: () => ({
    tabsBar: theme.tabsBar || tabsBar,
    logo, themeBar,
    collapse: false,
    layout: theme.layout || layout,
    header: theme.header || header,
    device: 'desktop',

  }),
  getters: {
    collapse: (state) => state.collapse,
    device: (state) => state.device,
    header: (state) => state.header,
    layout: (state) => state.layout,
    logo: (state) => state.logo,
    tabsBar: (state) => state.tabsBar,
    themeBar: (state) => state.themeBar,
  },
  mutations: {
    changeLayout: (state, layout) => {
      if (layout) state.layout = layout
    },
    changeHeader: (state, header) => {
      if (header) state.header = header
    },
    changeTabsBar: (state, tabsBar) => {
      if (tabsBar) state.tabsBar = tabsBar
    },
    changeCollapse: (state) => {
      state.collapse = !state.collapse
    },
    foldSideBar: (state) => {
      state.collapse = true
    },
    openSideBar: (state) => {
      state.collapse = false
    },
    toggleDevice: (state, device) => {
      state.device = device
    },
  },
  actions: {
    changeLayout({ commit }, layout) {
      commit('changeLayout', layout)
    },
    changeHeader({ commit }, header) {
      commit('changeHeader', header)
    },
    changeTabsBar({ commit }, tabsBar) {
      commit('changeTabsBar', tabsBar)
    },
    changeCollapse({ commit }) {
      commit('changeCollapse')
    },
    foldSideBar({ commit }) {
      commit('foldSideBar')
    },
    openSideBar({ commit }) {
      commit('openSideBar')
    },
    toggleDevice({ commit }, device) {
      commit('toggleDevice', device)
    },
  },

}

