const setting = {
  state: () => ({
    tabsBar: 'abc',
    logo: 10,
    collapse:1,
    layout:1,
    header:"1",
    device:",",

  }),
  mutations: {
    setUserName (state) {
      state.username = 'ddd'
    },
    setAge (state, value) {
      state.age = value
    }
  },
  actions: {
    asyncSetAge (context, value = 50) {
      console.log(context, 'context')
      setTimeout(() => {
        context.commit('setAge', value)
      }, 200)
    }
  },
  getters: {
    descrption (state, getters, rootState) {
      return state.username + '年龄是' + state.age + '岁'

    }
  }
}

export default user