// 充值浏览器的样式 采用tailwind的方案
import '@unocss/reset/tailwind.css'

import './styles/main.css'

import 'virtual:uno.css'

import autoRoutes from 'pages-generated'
import NProgress from 'nprogress'
import { ViteSSG } from 'vite-ssg'

import App from './App.vue'

const routes = autoRoutes.map((i) => {
  console.log('i', i)
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
