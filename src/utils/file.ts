// 将 IndexedDB 作为唯一可用的存储技术
import FS from '@isomorphic-git/lightning-fs'

const fs = new FS('my-git-app-db')

export default fs
