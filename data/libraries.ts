export interface Library {
  title: string
  url: string
  github: string
  description: string
  // Optional banner image
  image?: string
  // Optional project icon
  icon?: string
  // Optional repository to fetch and serve docs from
  // <user>/<repo>/<branch>/<path/to/dir>
  docs?: string
}

const libraries: Record<string, Library> = {
  'html-learn': {
    title: 'HTML Learn',
    url: '/html-learn',
    github: 'https://github.com/yayxs/html-learn',
    description: '无库、无框架',
    docs: 'yayxs/html-learn/main/docs',
  },
  'css-learn': {
    title: 'CSS Learn',
    url: '/css-learn',
    github: 'https://github.com/yayxs/css-learn',
    description: 'CSS学习',
    docs: 'yayxs/css-learn/tree/main/docs',
  },
}

export default libraries
