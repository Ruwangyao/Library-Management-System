const state = {
  //  侧边栏的折叠状态,false表示未折叠
  sidebarCollapse: false,

  // 是否显示标签栏
  isShowTagList: true,
  // 标签栏最大的标签数量
  maxTagNum: 8,
  // 存储标签的列表
  tagList: [],
}

const getters = {
  // 获取需要缓存的标签列表
  getCachedTagList: (state) => {
    if (state.isShowTagList) {
      return state.tagList.filter(tag => tag.cached === true).map(tag => tag.name)
    } else {
      return []
    }
  }
}

const mutations = {
  TOGGLE_SIDEBAR(state) {
    state.sidebarCollapse = !state.sidebarCollapse
  },
  ADD_TAG(state, routeItem) {
    state.tagList.push({
      name: routeItem.name,
      title: routeItem.meta.title,
      path: routeItem.path,
      // 标识该标签对应的路由是否需要被缓存
      cached: routeItem.name && routeItem.meta.cached === true
    })
  },
  DEL_TAGS(state, { start, nums }) {
    state.tagList.splice(start, nums)
  },
  RESET_APP_SETTING(state) {
    state.sidebarCollapse = false
    state.isShowTagList = true
    state.tagList = []
  }
}

const actions = {
  // 切换侧边栏折叠的状态
  collapseChange({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  /**
   * 经过检查可以被设置为标签的route对象
   * @param routeItem
   */
  addTag({ commit, state }, routeItem) {
    // 如果标签栏的数量大于最大标签，则从头部开始删除部分标签便于添加新标签
    if (state.tagList.length >= state.maxTagNum) {
      commit('DEL_TAGS', { start: 0, nums: state.tagList.length - state.maxTagNum + 1 })
    }
    // 添加新标签
    commit('ADD_TAG', routeItem)
  },
  // 判断是否已经存在某一个路由标签
  isExistTag({ state }, routeItem) {
    return state.tagList.some(item => {
      return item.path === routeItem.path
    })
  },
  // 删除标签
  delTags({ commit }, { start, nums }) {
    commit('DEL_TAGS', { start, nums })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}