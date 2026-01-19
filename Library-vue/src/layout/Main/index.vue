<template>
  <div class="main">
    <Tags style="flex-shrink: 0"></Tags>
    <Breadcrumb style="flex-shrink: 0"></Breadcrumb>
    <el-scrollbar style="flex: 1;overflow: hidden;" ref="scrollbarRef">
      <router-view v-slot="{ Component }">
        <transition name="move" mode="out-in">
          <keep-alive :include="cachedTagList">
            <component :is="Component" :key="componentKey"/>
          </keep-alive>
        </transition>
      </router-view>
    </el-scrollbar>
  </div>
</template>

<script>
import Tags from "@/layout/Tags";
import Breadcrumb from "@/layout/Breadcrumb";
import {computed, ref, watch} from "vue";
import {useRoute} from "vue-router";
import { useStore } from 'vuex'

export default {
  name: "Main",
  components: {
    Breadcrumb,
    Tags
  },
  setup(){
    const scrollbarRef = ref()
    const store = useStore()
    const route = useRoute()
    
    // 路由更新时滚动条回到顶部
    watch(()=>route.path,()=>{
      scrollbarRef.value.setScrollTop(0)
    },{ deep: true })

    const componentKey = computed(()=>{
      return route.path || undefined
    })
    
    const cachedTagList = computed(() => store.getters['appSetting/getCachedTagList'])

    return {
      scrollbarRef, componentKey, cachedTagList
    }
  }
}
</script>

<style scoped lang="scss">
.main{
  display: flex;
  
  flex-direction: column;
  background-color: #f0f0f0;
}
.move-enter-active,
.move-leave-active {
  transition: opacity .2s ease;
}
.move-enter-from,
.move-leave-to {
  opacity: 0;
}
</style>
