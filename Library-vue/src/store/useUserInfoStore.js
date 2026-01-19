//import {defineStore} from "pinia";
import {useDynamicRoutingStore} from "@/store/useDynamicRouteStore";
import {useAppSettingStore} from "@/store/useAppSettingStore";
import {getUserInfoApi} from "@/api/user";
import {removeToken} from "@/utils/auth";
import {getUserResourceApi} from "@/api/borrower";

const state = {
  uid: '',
  name: '',
  email: '',
  permissions: [],
  // 用户的借阅资源
  userBookResource: {
    borrowedNum: null,
    borrowMaxNum: null,
  }
}

const getters = {
  // 是否已经获取了用户的信息
  hasGetUserInfo: (state) => {
    return state.uid !== '' && state.name && state.email && Array.isArray(state.permissions)
  },
  // 是否能获取用户资源,只有用户拥有图书的资源信息
  hasResource: (state) => {
    return state.permissions.indexOf('borrower') !== -1
  },
  borrowedNum: (state) => {
    return state.userBookResource.borrowedNum
  },
  borrowMaxNum: (state) => {
    return state.userBookResource.borrowMaxNum
  }
}

const mutations = {
  SET_USER_INFO(state, userInfo) {
    state.uid = userInfo.id
    state.name = userInfo.username
    state.email = userInfo.email
    state.permissions = userInfo.permissions
  },
  SET_USER_RESOURCE(state, resource) {
    if (resource) {
      state.userBookResource.borrowedNum = resource.borrowedNum
      state.userBookResource.borrowMaxNum = resource.borrowMaxNum
    }
  },
  RESET_USER_INFO(state) {
    state.uid = ''
    state.name = ''
    state.email = ''
    state.permissions = []
    state.userBookResource.borrowedNum = null
    state.userBookResource.borrowMaxNum = null
  }
}

const actions = {
  // 获取用户信息
  async getUserInfo({ commit, dispatch }) {
    const res = await getUserInfoApi()
    commit('SET_USER_INFO', res.data.userInfo)
    
    // 根据权限生成动态路由
    dispatch('dynamicRoute/generateDynamicRoutes', res.data.userInfo.permissions, { root: true })
    
    // 初始化用户资源
    dispatch('getUserResource')
  },
  // 重置用户信息
  resetUserInfo({ commit, dispatch }) {
    // 删除动态添加的路由数据（重置vue-router）
    dispatch('dynamicRoute/resetDynamicRoutes', null, { root: true })
    
    // 清除token
    removeToken()
    
    // 重置本store的值
    commit('RESET_USER_INFO')
  },
  // 获取用户资源
  async getUserResource({ commit, getters }) {
    if (getters.hasResource) {
      const res = await getUserResourceApi()
      commit('SET_USER_RESOURCE', res.data.resource)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}