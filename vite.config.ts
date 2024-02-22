import { basename, dirname, resolve } from 'node:path'
import { defineConfig } from 'vite'
import fs from 'fs-extra'

// 使用 Vite 的 Vue 3 / React / Solid 应用程序基于文件系统的路由
// @see https://github.com/hannoeru/vite-plugin-pages
import Pages from 'vite-plugin-pages'
import matter from 'gray-matter'

import UnoCSS from 'unocss/vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'

// 将 Markdown 编译为 Vue 组件。
import Markdown from 'unplugin-vue-markdown/vite'
import GitHubAlerts from 'markdown-it-github-alerts'

// @ts-expect-error missing types
import TOC from 'markdown-it-table-of-contents'
import anchor from 'markdown-it-anchor'
import MarkdownItShikiji from 'markdown-it-shikiji'
import { rendererRich, transformerTwoslash } from 'shikiji-twoslash'
import LinkAttributes from 'markdown-it-link-attributes'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { viteMockServe } from 'vite-plugin-mock'

// import proxy from 'http-proxy-middleware'
import { slugify } from './scripts/slugify'

export default defineConfig({
  resolve: {
    alias: [
      { find: '~/', replacement: `${resolve(__dirname, 'src')}/` },
    ],
  },
  // 依赖优化选项
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      '@vueuse/core',
      'dayjs',
      'dayjs/plugin/localizedFormat',
    ],
  },
  server: {
    cors: true,
    proxy: {
      '/github-api': {
        target: 'https://github.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/github-api/, ''),
      },
    },
  },
  plugins: [
    // 通过插件 填充 Node 浏览器环境的核心模块
    // @see https://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility
    nodePolyfills(),

    UnoCSS(),

    Vue({
      include: [/\.vue$/, /\.md$/],
      // reactivityTransform: true,
      script: {
        defineModel: true,
      },
    }),

    Pages({
      extensions: ['vue', 'md'],
      dirs: 'pages', // 'src/pages'
      // 扩展路由 对于使用额外数据（例如路线元数据）来扩充您的路线非常有用
      extendRoute(route) {
        // 取到md文件中的内容，写到路由的meta信息中
        //  D:\gh-code\vlee.me\pages\index.md
        const path = resolve(__dirname, route.component.slice(1)) //

        console.log('---', path)
        // 如果是以为md结尾的话

        if (path.endsWith('.md')) {
          // 读出文件的内容
          const md = fs.readFileSync(path, 'utf-8')
          // 解析出的数据是data
          const { data } = matter(md)
          // console.log('+++', data)
          /**
           * {
            title: '',
            description: "",
            image: '',
            plum: true
            }
           */
          route.meta = Object.assign(route.meta || {}, { frontmatter: data })
        }
        return route
      },

    }),

    Markdown({
      wrapperComponent: (id) => {
        // 其中id的值是xxx/vlee.me/pages/html-learn.md 这种格式
        if (id.includes('-learn')) {
          return 'WrapperLearn'
        }
        else {
          return id.includes('/demo/')
            ? 'WrapperDemo'
            : 'WrapperPost'
        }
      },
      wrapperClasses: (id, code) => code.includes('@layout-full-width')
        ? ''
        : 'prose m-auto slide-enter-content',
      headEnabled: true,
      exportFrontmatter: false,
      exposeFrontmatter: false,
      exposeExcerpt: false,
      markdownItOptions: {
        quotes: '""\'\'',
      },
      async markdownItSetup(md) {
        md.use(await MarkdownItShikiji({
          themes: {
            dark: 'vitesse-dark',
            light: 'vitesse-light',
          },
          defaultColor: false,
          cssVariablePrefix: '--s-',
          transformers: [
            transformerTwoslash({
              explicitTrigger: true,
              renderer: rendererRich(),
            }),
          ],
        }))

        md.use(anchor, {
          slugify,
          permalink: anchor.permalink.linkInsideHeader({
            symbol: '#',
            renderAttrs: () => ({ 'aria-hidden': 'true' }),
          }),
        })

        md.use(LinkAttributes, {
          matcher: (link: string) => /^https?:\/\//.test(link),
          attrs: {
            target: '_blank',
            rel: 'noopener',
          },
        })

        md.use(TOC, {
          includeLevel: [1, 2, 3, 4],
          slugify,
          containerHeaderHtml: '<div class="table-of-contents-anchor"><div class="i-ri-menu-2-fill" /></div>',
        })

        md.use(GitHubAlerts)
      },
    }),

    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
      ],
    }),

    Components({
      extensions: ['vue', 'md'],
      dts: true,
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
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

    viteMockServe({
      mockPath: 'mock',
      enable: true,
      logger: true,
    }),
  ],
})
