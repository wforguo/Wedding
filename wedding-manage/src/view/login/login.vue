<style lang="less">
  @import './login.less';
  .demo-spin-icon-load{
      margin-bottom: 10px;
      animation: ani-demo-spin 1s linear infinite;
  }
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit" :loading="loading"></login-form>
          <p class="login-tip">输入任意用户名和密码即可</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      loading: false
    }
  },
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit ({ userName, userPwd }) {
      this.loading = true
      this.handleLogin({ userName, userPwd }).then(() => {
        this.$router.push({
          name: this.$config.homeName
        })
        setTimeout(() => {
          this.loading = false
        }, 300)
      }).catch(error => {
        console.log(error)
        setTimeout(() => {
          this.loading = false
        }, 100)
      })
    }
  }
}
</script>

<style>

</style>
