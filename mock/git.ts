import type { MockConfig } from 'vite-plugin-mock'

import libs from '../data/libraries'

export default (config?: MockConfig) => {
  return [
    {
      url: '/api/git-clone',
      method: 'get',
      response: (res: any) => {
        return {
          code: 0,
          message: 'ok',
          data: { 'a': 21, 'import.meta.url': import.meta.url },
        }
      },
    },
  ]
}
