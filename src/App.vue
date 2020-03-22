<template>
  <div id="login">
    <el-form class="loginFrom" :model="logindata" ref="ruleForm">
      <el-form-item prop="userName">
        <el-input
          class="login-inputorbuttom"
          prefix-icon="el-icon-user"
          placeholder="登录名"
          v-model="logindata.userName"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          class="login-inputorbuttom"
          prefix-icon="el-icon-lock"
          placeholder="密码"
          v-model="logindata.password"
        ></el-input>
      </el-form-item>
      <el-form-item class="login-item">
        <SlideCaptcha
          imgSrc="https://img95.699pic.com/photo/40011/0709.jpg_wh860.jpg"
          :sliderX="sliderX"
          @success="captchaSuccess"
          @fail="captchaFail"
        ></SlideCaptcha>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { fakeGetCodeInfo, fakeLogin } from "./mock/index.js";
import SlideCaptcha from "./components/SlideCaptcha";

export default {
  name: "login",
  components: { SlideCaptcha },
  data() {
    return {
      logindata: {
        userName: "",
        password: "",
        codeId: ""
      },
      sliderX: 0
    };
  },
  created() {
    let codeInfo = fakeGetCodeInfo();
    this.logindata.codeId = codeInfo.data.id;
    this.sliderX = codeInfo.data.x;
  },
  methods: {
    captchaSuccess(x) {
      fakeLogin(
        this.logindata.userName,
        this.logindata.password,
        this.logindata.codeId,
        x
      );
      this.$message.success("登陆成功");
    },
    captchaFail() {
      this.$message.error("验证码错误");
    }
  }
};
</script>
<style>
.slidingPictures {
  padding: 0;
  width: 300px;
  border-radius: 2px;
}
</style>
<style scoped>
/*该样式最终是以弹窗插入*/
.sliding-pictures {
  width: 100%;
}
.vimg {
  width: 100%;
  height: 170px;
}
#codeImg,
#sliderBlock {
  padding: 7px 7px 0 7px;
  width: inherit;
  height: inherit;
}
#sliderBlock {
  position: absolute;
  z-index: 4000;
}
.slider {
  width: 100%;
  height: 65px;
  border-bottom: #c7c9d0 1px solid;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.track {
  margin-left: 7px;
  width: 286px;
  height: 38px;
  background: rgba(28, 136, 188, 0.5);
  border-radius: 25px;
  font-size: 14px;
  line-height: 38px;
  padding-right: 15px;
  padding-left: 70px;
}
.pintuTrue {
  background: #67c23a;
  color: #ffffff;
}
.button {
  position: absolute;
  width: 50px;
  height: 50px;
  line-height: 48px;
  background: #ffffff;
  box-shadow: #b9bdc8 0 0 3px;
  border-radius: 50%;
  left: 7px;
  text-align: center;
  font-size: 28px;
  color: #3e5d8b;
}
.button:hover {
  color: #2181bd;
}
.operation {
  width: 100%;
  height: 40px;
}
.operation > span {
  color: #9fa3ac;
  display: inline-block;
  width: 40px;
  font-size: 25px;
  line-height: 40px;
  text-align: center;
}

.operation > span:hover {
  background: #e2e8f5;
}
</style>
