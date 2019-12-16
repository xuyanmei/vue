<template>
  <div class="page">
    <section class="window-width window-height column">
      <nav class="row justify-end window-width items-center bc cf f16 q-py-md">
        <div class="q-pr-lg">欢迎登录yi购商城</div>
      </nav>
      <div class="content column items-center justify-center">
        <main class="q-pa-lg login-container column">
          <span class="f16 text-bold q-mb-lg">密码登录</span>
          <el-input placeholder="用户名" v-model="userName">
            <img slot="prefix" class="account_box" src="@/assets/home/account-box.png" alt />
          </el-input>
          <el-input placeholder="密码" v-model="password" type="password" @keyup.enter.native="login">
            <img slot="prefix" class="password" src="@/assets/home/password.png" alt />
          </el-input>
          <q-btn color="bc" :loading="loading" @click="login" label="登录"></q-btn>
        </main>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: "",
      password: "",
      loading: false
    };
  },
  methods: {
    login() {
      this.loading = true;
      this.$router.push({path:"./"})
      this.loading = false;
    }
  }
};
</script>
<style>
.login-container .el-input {
  height: 45px;
  width: 328px;
}
.login-container .el-input {
  margin-bottom: 20px;
}
.login-container .el-input__inner {
  border-radius: 0%;
  border: 1px solid gray;
  box-sizing: border-box;
  height: 100%;
  padding-left: 45px;
}
.login-container .el-input__prefix {
  left: 0px;
}
.login-container div:nth-of-type(2) > span {
  left: 5px;
  top: 5px;
}
</style>

<style scoped>
.bg-bc {
  background: #815999;
}
.content {
  flex: auto;
  background: #f5f3f3;
}
.login-container {
  background-color: rgba(255, 255, 255, 0.9);
  box-sizing: border-box;
  border: 1px solid #815999;
}
.account_box {
  height: 100%;
}
.password {
  height: 35px;
}
main span {
  text-align: left;
}
.q-btn {
  height: 45px;
  width: 328px;
}
</style>