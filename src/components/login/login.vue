<template>
  <div class="content">
    <div class="login">
      <div class="title">服务端录音后台系统</div>
      <div class="ipt">
        <p>账号</p>
        <el-input
            clearable
          v-model="username"
          placeholder="请输入账号"
          class="u_ipt"
        ></el-input>
      </div>
      <div class="ipt">
        <p>密码</p>
        <el-input
        show-password
          type="password"
          v-model="password"
          placeholder="请输入密码"
          class="u_ipt"
        ></el-input>
      </div>

      <el-button @click="login" class="btn" type="primary">登录</el-button>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs, getCurrentInstance } from "vue";
  import{ useRouter} from 'vue-router'
export default {

  setup() {
    const router=useRouter()
    const { proxy } = getCurrentInstance();
    const user = reactive({
      username: "",
      password: "",
    });
    const login = () => {
      if(!user.username&&!user.password){
        alert("请输入用户名或密码")
        return
      }
      const obj = { email: user.username, password: user.password };
        // const res=await new proxy.$request(proxy.$urls.m().login,obj).modepost()
        proxy.$axios.post('/login',obj)
        .then((res)=>{
            localStorage.setItem('name',res.data.user.email)
            if(res.data.state===1)
            router.push('/index')
        })
        .catch((error)=>{
          console.log(error)
            alert("服务器连接失败")
        })
  
    };
    return {
      ...toRefs(user),
      login,
    };
  },
};
</script>

<style scoped>
.content {
  width: 100%;
  height: 100%;
}
.login {
  background-color: #fff;
  width: 400px;
  height: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
}
.title {
  text-align: center;
  margin: 20px 0;
  font-size: 25px;
}
.ipt {
  display: flex;
  width: 300px;
  padding-top: 30px;
  align-items: center;
  height: 40px;
  margin: 0 auto;
}
.u_ipt {
  flex: 1;
}
p {
  width: 50px;
  font-size: 16px;
}
.btn {
  width: 200px;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  margin-top: 20px;
}
</style>