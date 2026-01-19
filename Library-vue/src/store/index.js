import { createStore } from 'vuex'

// 直接导入store目录下的模块文件
import userInfo from './useUserInfoStore'
import appSetting from './useAppSettingStore'
import dynamicRoute from './useDynamicRouteStore'

export default createStore({
  modules: {
    userInfo,
    appSetting,
    dynamicRoute
  }
})