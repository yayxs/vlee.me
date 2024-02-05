import { isClient } from '../shared'

export const defaultWindow = /* #__PURE__ */ isClient ? window : undefined
