<template>
  <div class="dashboard">
    <el-card shadow="hover" style="width: 260px;" class="user-info">
      <template #header>
        <div class="user-info-header">用户信息</div>
      </template>
      <el-form label-width="70px">
        <el-form-item label="用户ID">{{uid}}</el-form-item>
        <el-form-item label="用户名称">{{name}}</el-form-item>
        <el-form-item label="邮箱">{{email}}</el-form-item>
        <el-form-item label="角色">{{permissions.join(',')}}</el-form-item>
        <el-form-item v-if="hasResource" label="借阅情况">{{`${borrowedNum}/${borrowMaxNum}`}}</el-form-item>
      </el-form>
    </el-card>
  </div>
  
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  name: "Dashboard",
  setup(){
    const store = useStore()
    
    const uid = computed(() => store.state.userInfo.uid)
    const name = computed(() => store.state.userInfo.name)
    const email = computed(() => store.state.userInfo.email)
    const permissions = computed(() => store.state.userInfo.permissions)
    const hasResource = computed(() => store.getters['userInfo/hasResource'])
    const borrowedNum = computed(() => store.getters['userInfo/borrowedNum'])
    const borrowMaxNum = computed(() => store.getters['userInfo/borrowMaxNum'])
    
    return {
      uid,
      name,
      email,
      permissions,
      hasResource,
      borrowedNum,
      borrowMaxNum
    }
  }
}
</script>

<style scoped lang="scss">
.dashboard{
  padding: 20px;
  .user-info{
    .user-info-header{
      font-weight: bold;
    }
    .el-form::v-deep{
      .el-form-item{
        .el-form-item__label{
          font-weight: bold;
        }
      }
    }
  }
}
</style>
