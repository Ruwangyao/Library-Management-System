<template>
  <div class="sidebar">
    <el-scrollbar>
      <el-menu
          :collapse="sidebarCollapse"
          unique-opened
          :default-active="$route.path"
          :background-color="menuTheme.menuBg"
          :text-color="menuTheme.menuText"
          :active-text-color="menuTheme.menuActiveText">
        <sidebar-item
            v-for="item in routes"
            :item="item"
            :key="item.path"
            base-path="/"></sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import SidebarItem from "@/layout/Sidebar/SidebarItem";

import menuTheme from '@/layout/variable.scss'
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Sidebar',
  components:{
    SidebarItem
  },
  setup(){
    const store = useStore()
    
    const routes = computed(() => store.state.dynamicRoute.routes)
    const sidebarCollapse = computed(() => store.state.appSetting.sidebarCollapse)

    return {
      routes,
      sidebarCollapse,
      menuTheme
    }
  }
}

</script>

<style scoped lang="scss">
@import "~@/layout/variable.scss";
.sidebar::v-deep{
  .el-scrollbar{
    .el-scrollbar__view{
      height: 100%;
      .el-menu{
        box-sizing: content-box;
        min-height: 100%;
        a{
          text-decoration: none;
        }
        &{
          width: $sidebarCollapseWidth;
        }
        // 侧边栏展开时的宽度
        &:not(.el-menu--collapse){
          width: $sidebarExpandWidth;
        }
        // 子菜单图标的样式
        .sub-menu-icon{
          margin-right: 5px;
          width: 24px;
          text-align: center;
          font-size: 18px;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
