import { defineConfig } from 'vite'
import Pages from 'vite-plugin-pages'
import UnoCSS from 'unocss/vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    UnoCSS(),

    Vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Pages({
      extensions: ['vue', 'md'],
      dirs: 'pages',
    }),

    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
      ],
    }),

    Components({
      dirs: ['src/components'], // 组件的位置
      dts: true, // ts支持 结合 volar
      extensions: ['vue', 'md'], // 文件的扩展
      include: [/\.vue$/, /\.vue\?vue/, '/\.md$/'], // 匹配.vue Component.vue?vue
      resolvers: [
        IconsResolver({
          componentPrefix: '',
        }),
      ],
    }),

    Icons({
      defaultClass: 'inline',
      defaultStyle: 'vertical-align: sub;',
    }),
  ],
})
