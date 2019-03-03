<template lang="pug">
  section#login-form
    topBackWrapper
    el-form(ref="form" :model="form")
      el-form-item(v-if="loginBy===`phone`")
        el-input(v-model="form.phone" placeholder="输入手机号" round)
      el-form-item(v-else-if="loginBy===`email`")
        el-input(v-model="form.email" placeholder="输入邮箱")
      el-form-item()
        el-input(v-model="form.password" placeholder="输入密码")
      el-row
        el-button(type="danger" round) 手机登录
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import topBackWrapper from "@/components/top-back-wrapper/top-back-wrapper.vue";

@Component({
  components: { topBackWrapper }
})
export default class LoginForm extends Vue {
  public form: {
    phone: string;
    email: string;
    password: string;
  } = {
    phone: "",
    email: "",
    password: ""
  };

  public loginBy!: string;

  created() {
    this.loginBy = this.$route.params.by;
    console.log(this.$route.params.by)
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";
#login-form {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: $color-background;
  z-index: 1001;
  .el-form {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .el-form-item, .el-row {
      width: 90%;
      button {
        width: 100%;
      }
    }
  }
}
</style>
