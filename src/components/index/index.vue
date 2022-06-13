/* eslint-disable vue/no-unused-vars */
<template>
  <el-container>
    <el-header>
      <span>服务端录音管理系统</span>
      <el-button type="info" @click="loginout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">
    
        <el-menu active-text-color="#409EFF" router  :default-active="currentPath" v-for="(item) in menuList" :key="item.id" background-color="373d41" text-color="#fff">
          <el-sub-menu v-for="(item2) in item.subMenu" :key="item2.id" :index="item2.id">
            <template #title>
             <el-icon>
                  <component :is="item.icon"></component>
             </el-icon>
              <span>{{item.name}}</span>
            </template>

            <el-menu-item  @click="select(item2.id)" :index="item2.path+''">{{item2.name}}</el-menu-item>
          </el-sub-menu>
       
        </el-menu>
      </el-aside>
      <el-main>
    
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import {useRouter} from 'vue-router'
import { Histogram } from "@element-plus/icons-vue"
import {reactive,ref,onMounted} from 'vue'

export default({
    // components:{
    //     Histogram
    // },
  setup() {
    const router=useRouter()
     const currentPath=ref('1-1')
      onMounted(()=>{
        console.log(1)
        console.log(currentPath.value)
          currentPath.value=localStorage.getItem('currentPath')
      })
     
      function select (id){
          console.log(id)
          currentPath.value=id
          localStorage.setItem('currentPath',id)
      }
      function loginout(){
        router.push('/login')
      }
    const arr = [
      {
        id: "1",
        name: "录音管理",
        icon: Histogram,
        path: "",
        subMenu: [
          {
            id: "1-1",
            name: "录音数据",
            icon: Histogram,
            path: "/user",
          },
        ],
      },
      {
        id: "2",
        name: "设置",
        icon: Histogram,
        path: "",
        subMenu: [
          {
            id: "2-1",
            name: "修改密码",
            icon: Histogram,
            path: "/updatepwd",
          },
        ],
      },
    ];
    const menuList=reactive(arr)
//     const currentPage1 = ref(5)
// const currentPage2 = ref(5)
// const currentPage3 = ref(5)
// const currentPage4 = ref(4)
// const pageSize2 = ref(100)
// const pageSize3 = ref(100)
// const pageSize4 = ref(100)
// const small = ref(false)
// const background = ref(false)
// const disabled = ref(false)

// const handleSizeChange = (val: number) => {
//   console.log(`${val} items per page`)
// }
// const handleCurrentChange = (val: number) => {
//   console.log(`current page: ${val}`)
// }
    return{
        menuList,currentPath,select,loginout
    }
    
  },
});
</script>

<style scoped>
.el-card {
  height: 100%;
}
.el-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  color: #fff;
}
.el-aside {
  width: 200px;
  background-color: #333744;
}
.el-main {
  background-color: #eaedf1;
}
</style>
