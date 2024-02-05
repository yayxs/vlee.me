// 采用tailwind的方案 重置浏览器的样式
import '@unocss/reset/tailwind.css'

import 'markdown-it-github-alerts/styles/github-colors-light.css'
import 'markdown-it-github-alerts/styles/github-colors-dark-class.css'
import 'markdown-it-github-alerts/styles/github-base.css'

import 'shikiji-twoslash/style-rich.css'
import './styles/main.css'
import './styles/prose.css'
import './styles/markdown.css'

import 'virtual:uno.css'

import autoRoutes from 'pages-generated'
import NProgress from 'nprogress'
import { ViteSSG } from 'vite-ssg'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat.js'
import App from './App.vue'

const routes = autoRoutes.map((i) => {
  // console.log('i', i)
  return {
    ...i,
    alias: i.path.endsWith('/') ? `${i.path}index.html` : `${i.path}.html`,
  }
})

export const createApp = ViteSSG(
  App,
  { routes },
  ({ router, app, isClient }) => {
    console.log(router)
    console.log(app)
    console.log(isClient)
    if (isClient) {
      dayjs.extend(LocalizedFormat)
      // const html = document.querySelector('html')

      router.beforeEach(() => {
        NProgress.start()
      })
      router.afterEach(() => {
        NProgress.done()
      })
    }
  },
)
