<template>
  <el-form label-width="80px">
    <el-form-item label="验证码">
      <el-input v-model="form.captcha"> </el-input>
    </el-form-item>
    <canvas id="captcha" :width="width" :height="height"></canvas>
    <el-button @click="init">换一张</el-button>
    <el-form-item>
      <el-button @click="handleSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    charNum: { default: 6, type: Number },
    width: { default: 200, type: Number },
    height: { default: 100, type: Number }
  },
  data() {
    return {
      canvas: null,
      ctx: null,
      captcha: "",
      form: {
        captcha: ""
      }
    };
  },

  components: {},

  computed: {},

  mounted() {
    this.canvas = document.querySelector("#captcha");
    this.ctx = this.canvas.getContext("2d");

    this.init();
  },

  methods: {
    init() {
      this.canvas.height = this.canvas.height;
      this.ctx.font = "48px serif";
      this.drawNoise();
      const randomChar = Math.random()
        .toString(36)
        .slice(2, 2 + this.charNum)
        .split("");
      this.captcha = randomChar.join("");
      for (let i = 0; i < randomChar.length; i++) {
        const angel = Math.random() / 5 - 0.1;
        this.ctx.rotate(angel);
        if (Math.random() > 0.5) {
          randomChar[i] = randomChar[i].toUpperCase();
        }
        this.ctx.fillText(
          randomChar[i],
          i * (this.width / this.charNum - 2) + 2,
          this.height / 2 + 24
        );
        this.ctx.rotate(-angel);
      }
    },

    drawNoise() {
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * this.width;
        const y = Math.random() * this.height;
        this.ctx.fillRect(x, y, Math.random() * 5, Math.random() * 5);
      }
    },

    handleSubmit() {
      if (this.form.captcha != this.captcha) {
        this.$message.error("验证码错误");
      } else {
        this.$message.success("验证成功");
      }
    }
  }
};
</script>
<style scoped>
.el-form {
  text-align: left;
}

#captcha {
  margin-left: 80px;
}
</style>
