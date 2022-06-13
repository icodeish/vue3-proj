<template>
  <div>
    <el-input
      placeholder="请输入旧密码"
      show-password
      type="password"
      v-model="oldpwd"
    ></el-input>
    <el-input
      placeholder="请输入新密码"
      show-password
      type="password"
      v-model="newpwd"
    ></el-input>
    <el-input
      placeholder="确认新密码"
      show-password
      type="password"
      v-model="checknewpwd"
    ></el-input>
    <el-button @click="updatepwd" type="primary">修改密码</el-button>
  </div>
</template>
<script>
import { ref, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const { proxy } = getCurrentInstance();
    const email = localStorage.getItem("name");
    const oldpwd = ref("");
    const newpwd = ref("");
    const checknewpwd = ref("");

    function updatepwd() {
      if (newpwd.value !== checknewpwd.value) {
        alert("两次密码不一致");
        return;
      }
      proxy.$axios
        .post("/home/home_up", {
          email: email,
          oldpassword: oldpwd.value,
          newpassword: newpwd.value,
        })
        .then((res) => {
          console.log(res);
          if (res.data.state === 200) {
            alert("密码修改成功!");
            router.push("/login");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return {
      oldpwd,
      newpwd,
      checknewpwd,
      updatepwd,
      email,
    };
  },
};
</script>

<style scoped>
.el-input {
  width: 200px;
  display: flex;
  margin-top: 20px;
}
.el-button {
  margin-top: 20px;
}
</style>