import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  rules: [
    // 动态规则
    [/^slide-enter-(\d+)$/, ([_, n]) => {
      console.log(_)
      console.log(n)
      return {
        '--enter-stage': n,
      }
    }],
  ],
  presets: [

    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'height': '1.2em',
        'width': '1.2em',
        'vertical-align': 'text-bottom',
      },
    }),
    // 启用属性模式
    presetAttributify(),
    // 默认预设
    presetUno(),
  ],
})
