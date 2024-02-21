---
title: Projects
display: Projects
description: List of projects
plum: true
wrapperClass: 'text-center'
projects:
  Learning:
    - name: 'HTML Learn'
      link: 'https://github.com/yayxs/html-learn'
      desc: '无框架、无库、原生HTML学习'
      icon: ''

---

<!-- @layout-full-width -->

<ListProjects :projects="frontmatter.projects" />
