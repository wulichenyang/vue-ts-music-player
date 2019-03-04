<template lang="pug">
  section#login-form
    topBackWrapper(tip='登录')
    //- el-form(ref="form" :model="form")
    //-   el-form-item(v-if="loginBy===`phone`")
    //-     el-input(v-model="form.phone" placeholder="输入手机号" round)
    //-   el-form-item(v-else-if="loginBy===`email`")
    //-     el-input(v-model="form.email" placeholder="输入邮箱")
    //-   el-form-item()
    //-     el-input(v-model="form.password" placeholder="输入密码" type="password")
    //-   el-row
    //-     van-button(type="danger" round) 登录
    van-cell-group
      van-field(
        v-model="form.phone"
        v-if="loginBy===`phone`"
        placeholder="请输入手机号"
        left-icon="phone-o"
        required
        clearable
        :error-message="formError.phone"
        @focus="clearError(formError, 'phone')"
        @blur="checkPhone"
      )
      van-field(
        v-model="form.email"
        v-else-if="loginBy===`email`"
        placeholder="请输入邮箱"
        left-icon="envelop-o"
        required
        clearable
        :error-message="formError.email"
        @focus="clearError(formError, 'email')"
        @blur="checkEmail"
      )
      van-field(
        v-model="form.password"
        placeholder="请输入密码"
        :left-icon="ifShowPassword ? `eye-o` : `closed-eye`"
        right-icon="info-o"
        @click-right-icon="togglePassword"
        required
        clearable
        :type="ifShowPassword ? `text` : `password`"
        :error-message="formError.password"
        @focus="clearError(formError, 'password')"
        @blur="checkPwd"
      )
      van-row(type="flex")
        van-col(span="4" offset="14")
          van-button(type="danger" plain) 注册
        van-col(span="4" offset="1")
          van-button(
            type="danger"
            @click="login"
          ) 登录
      
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import topBackWrapper from "@/components/top-back-wrapper/top-back-wrapper.vue";
import { loginByPhone, loginByEmail, logout } from "@/api/user";
import AES from "@/assets/js/crypto.ts";
import cookie from "@/assets/js/cookie.ts";
import { Toast } from "vant";

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

  public formError: {
    phone: string;
    email: string;
    password: string;
  } = {
    phone: "",
    email: "",
    password: ""
  };

  public ifShowPassword: boolean = false;
  public loginBy!: string;

  created() {
    this.loginBy = this.$route.params.by;
    console.log(this.$route.params.by);
  }

  public resetForm(): void {
    this.form = {
      phone: "",
      email: "",
      password: ""
    };
    this.formError = {
      phone: "",
      email: "",
      password: ""
    };
  }

  public clearError(formError: any, type: string): void {
    formError[type] = "";
  }

  public checkPhone(): void {
    const reg: any = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!this.form.phone.length) {
      this.formError.phone = "请填写手机号";
      return;
    }
    if (!reg.test(this.form.phone)) {
      this.formError.phone = "手机号格式错误";
    }
  }
  public checkEmail(): void {
    const reg: any = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
    if (!this.form.email.length) {
      this.formError.email = "请填写邮箱号";
      return;
    }
    if (!reg.test(this.form.email)) {
      this.formError.phone = "邮箱号格式错误";
    }
  }
  public checkPwd(): void {
    if (!this.form.password.length) {
      this.formError.password = "请填写密码";
    }
  }

  public togglePassword(): void {
    const pwd: string = this.form.password;
    this.ifShowPassword = !this.ifShowPassword;
    this.form.password = pwd;
  }

  public async loginByPhone() {
    const res: Ajax.AxiosResponse = await loginByPhone(
      this.form.phone,
      AES.Encrypt(this.form.password)
    );
    if (res.status === 200 && res.data.code === 200) {
      // 登录成功 保存token
      this.resetForm();
      Toast("登录成功");
      cookie.setCookie(
        "accessToken",
        (res.data as any).bindings[0].tokenJsonStr,
        0.2
      );
      // TODO save token in store
      this.$router.push({ path: "/" });
    }
  }
  public async loginByEmail() {
    const res: Ajax.AxiosResponse = await loginByEmail(
      this.form.email,
      AES.Encrypt(this.form.password)
    );
    if (res.status === 200 && res.data.code === 200) {
      // 登录成功 保存token
      this.resetForm();
      Toast("登录成功");
      cookie.setCookie(
        "accessToken",
        (res.data as any).bindings[0].tokenJsonStr,
        0.2
      );
      // TODO save token in store
      this.$router.push({ path: "/" });
    }
  }
  public login(): void {
    if (this.loginBy === "phone") {
      if (
        this.formError.phone === "" &&
        this.formError.password === "" &&
        this.form.phone &&
        this.form.password
      ) {
        this.loginByPhone();
      }
      return;
    } else if (this.loginBy === "email") {
      if (
        this.formError.email === "" &&
        this.formError.password === "" &&
        this.form.email &&
        this.form.password
      ) {
        this.loginByEmail();
      }
    }
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
    .el-form-item,
    .el-row {
      width: 90%;
      button {
        width: 100%;
      }
    }
  }
  .van-cell-group {
    .van-cell {
      .van-field__left-icon {
      }
    }
    .van-button {
      width: 100%;
      height: 95%;
    }
    .van-row {
      padding: 10px 0;
    }
  }
}
</style>
