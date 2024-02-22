import git from 'isomorphic-git'
import http from 'isomorphic-git/http/web'

import axios from 'axios'
import libs from '../../data/libraries'
import fs from './file'

/**
 * 检查是否是 .md(x) 文件
 */
export const MARKDOWN_REGEX = /\.mdx?/

/**
 * 取消markdown中的注释
 */
const FRONTMATTER_REGEX = /^<!--[\s\n]*?(?=---)|(?!---)[\s\n]*?-->/g

/**
 * 删除多行和单行注释
 */
const COMMENT_REGEX = /<!--(.|\n)*?-->|<!--[^\n]*?\n/g

/**
 * 删除markdown中这种格式 <https://inline.links>
 */
const INLINE_LINK_REGEX = /<(http[^>]+)>/g

/**
 * 通过mock 请求git 仓库
 * @param lib
 * @returns
 */

function getMockData() {
  axios.get('/api/git-clone').then((res) => {
    console.log('res', res)
  })
}

/**
 * 如果指定是哪个库的话就查询哪个库的docs下的文件
 * 如果未指定，查询全部
 */
export async function getDocs(lib?: keyof typeof libs): Promise<Doc[]> {
// 如果没有指定，获取全部的文档
  if (!lib) {
    const docs = await Promise.all(
      Object.keys(libs)
        .filter(lib => libs[lib].docs)
        .map(getDocs),
    )
    return docs.filter(Boolean).flat()
  }
  const config = libs[lib]
  const docsUrl = config.docs!.split('/') // ['yayxs', 'css-learn', 'tree', 'main', 'docs']
  console.log('配置是什么', config, docsUrl)

  const [user, repo, _, branch, ...rest] = docsUrl
  const dir = `/${user}-${repo}-${branch}`
  const root = `${dir}/${rest.join('/')}`
  console.log('dir', dir, 'root', root)

  getMockData()
  // await git.clone({
  //   fs,
  //   http,
  //   dir,
  //   url: `https://github.com/${user}/${repo}`,
  //   ref: branch,
  //   singleBranch: true,
  //   depth: 1,
  // })
}
