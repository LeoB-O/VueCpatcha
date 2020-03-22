# captcha

## components/Captcha 文本验证码

略

## components/SlideCaptcha 滑动验证码

### 可用的 props

| props   | 类型   | 描述                |
| ------- | ------ | ------------------- |
| imgSrc  | string | 验证码图片地址      |
| sliderX | number | 验证码挖空 x 轴位置 |

### 可用的 event

| event   | 传递值    | 描述                                    |
| ------- | --------- | --------------------------------------- |
| success | x: number | 验证成功的事件，x 是用户滑动的 x 轴距离 |
| fail    | x: number | 验证失败的事件，x 是用户滑动的 x 轴距离 |
