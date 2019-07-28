<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
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
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit ({ userName, password }) {
      this.handleLogin({ userName, password }).then(() => {
        this.$store.commit('setAvatar', 'https://f2e.forguo.com/img/photo.jpg')
        this.$store.commit('setUserName', 'admin')
        this.$store.commit('setUserId', '2')
        this.$store.commit('setAccess', 'admin')
        this.$store.commit('setHasGetInfo', true)
        this.$router.push({
          name: this.$config.homeName
        })
      })
    }
  }
}
</script>

<style>

</style>
