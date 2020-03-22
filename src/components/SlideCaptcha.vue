<template>
  <div id="login">
    <el-button
      class="login-inputorbuttom login-bottom"
      type="primary"
      v-popover:popover
      @click="visible = !visible"
    >
      <slot>登 录</slot>
    </el-button>
    <!--验证码弹窗-->
    <el-popover
      popper-class="slidingPictures"
      ref="popover"
      trigger="manual"
      v-model="visible"
    >
      <div class="sliding-pictures">
        <div class="vimg">
          <canvas id="sliderBlock"></canvas>
          <canvas id="codeImg"></canvas>
        </div>
        <div class="slider">
          <div class="track" :class="{ pintuTrue: isTrue }">
            {{ tips }}
          </div>
          <div class="button el-icon-s-grid" @mousedown.prevent="drag"></div>
        </div>
        <div class="operation">
          <span
            title="关闭验证码"
            @click="visible = false"
            class="el-icon-circle-close"
          ></span>
          <span
            title="刷新验证码"
            @click="canvasInit"
            class="el-icon-refresh-left"
          ></span>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: "slidercaptcha",
  props: {
    imgSrc: String,
    sliderX: Number
  },
  data() {
    return {
      tips: "拖动左边滑块完成上方拼图",
      visible: false,
      isTrue: false
    };
  },
  watch: {
    visible(e) {
      if (e === true) {
        this.canvasInit();
      }
    }
  },
  methods: {
    //拼图验证码初始化
    canvasInit() {
      //生成指定区间的随机数
      const random = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
      };

      const sliderY = random(10, 99);

      this.isTrue = false;
      this.draw(this.sliderX, sliderY);
    },
    //鼠标按下事件
    drag(e) {
      let dom = e.target; //滑块dom元素
      let slider = document.querySelector("#sliderBlock"); //拼图dom
      const downX = e.x;

      //x轴移动距离
      let x = 0;
      const move = moveEV => {
        x = moveEV.x - downX;
        if (x >= 251 || x <= 0) return false;
        dom.style.left = x + "px";
        slider.style.left = x - this.sliderX + "px";
      };

      const up = () => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
        dom.style.left = "";

        //允许正负误差10
        let max = this.sliderX + 10;
        let min = this.sliderX - 10;
        if ((max >= x && x >= min) || x === this.sliderX) {
          // 验证成功
          this.tips = "验证成功";
          this.isTrue = true;
          this.$emit("success", x);
        } else {
          // 验证失败
          this.tips = "验证失败，请重试";
          this.isTrue = false;
          this.$emit("fail", x);
          this.canvasInit();
        }
      };

      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    },
    draw(mx = 200, y = 50) {
      let mainDom = document.querySelector("#codeImg");
      let bg = mainDom.getContext("2d");
      let width = mainDom.width;
      let height = mainDom.height;

      let blockDom = document.querySelector("#sliderBlock");
      let block = blockDom.getContext("2d");
      //重新赋值，让canvas进行重新绘制
      blockDom.height = height;
      mainDom.height = height;
      blockDom.style.left = -mx + "px";

      let img = document.createElement("img");
      img.style.objectFit = "scale-down";
      img.src = this.imgSrc;
      img.onload = function() {
        bg.drawImage(img, 0, 0, width, height);
        block.drawImage(img, 0, 0, width, height);
      };

      let mainxy = { x: mx, y: y, r: 9 };
      this.drawBlock(bg, mainxy, "fill");
      this.drawBlock(block, mainxy, "clip");
    },
    //绘制拼图
    drawBlock(ctx, xy = { x: 254, y: 109, r: 9 }, type) {
      let x = xy.x,
        y = xy.y,
        r = xy.r,
        w = 40;
      let PI = Math.PI;
      //绘制
      ctx.beginPath();
      //left
      ctx.moveTo(x, y);
      //top
      ctx.arc(x + (w + 5) / 2, y, r, -PI, 0, true);
      ctx.lineTo(x + w + 5, y);
      //right
      ctx.arc(x + w + 5, y + w / 2, r, 1.5 * PI, 0.5 * PI, false);
      ctx.lineTo(x + w + 5, y + w);
      //bottom
      ctx.arc(x + (w + 5) / 2, y + w, r, 0, PI, false);
      ctx.lineTo(x, y + w);
      ctx.arc(x, y + w / 2, r, 0.5 * PI, 1.5 * PI, true);
      ctx.lineTo(x, y);
      //修饰，没有会看不出效果
      ctx.lineWidth = 1;
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
      ctx.stroke();
      ctx[type]();
      ctx.globalCompositeOperation = "xor";
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
