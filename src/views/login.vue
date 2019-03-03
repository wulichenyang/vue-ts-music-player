<template lang="pug">
  div
    transition(name="login")
      div(class="login")
        .music-logo
          img(src="http://wallscollection.net/wp-content/uploads/2017/02/Amazing-Music-Pictures-.jpg")
        .button-wrapper
          router-link(:to="{name: 'loginBy', params: {by: 'phone'}}")
            el-row
              el-button(type="danger" round) 手机登录
          router-link(:to="{name: 'loginBy', params: {by: 'email'}}")
            el-row
              el-button(type="danger" round) 邮箱登录
    transition(name="loginBy")
      router-view
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class Login extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";

.login {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: $color-background;
  z-index: 1000;
  justify-content: center;
  align-items: center;
  .music-logo {
    flex: 1;
    overflow: hidden;
    img {
      width: 100%;
      opacity: 0.6;
    }
  }
  .button-wrapper {
    flex: 1;
    width: 100%;
    text-align: center;
    margin-top: 50px;
    .el-row {
      padding-bottom: 40px;
      button {
        width: 90%;
      }
    }
  }
}
</style>
