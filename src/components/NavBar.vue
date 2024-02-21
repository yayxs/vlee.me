<script setup lang="ts">
function toTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
const { y: scroll } = useWindowScroll()
</script>

<template>
  <header class="header z-40">
    <button
      title="Scroll to top"
      fixed right-3 bottom-3 w-10 h-10 hover:op100 rounded-full
      hover-bg-hex-8883 transition duration-300 z-100 print:hidden
      :class="scroll > 300 ? 'op30' : 'op0! pointer-events-none'"
      @click="toTop()"
    >
      <div i-ri-arrow-up-line />
    </button>
    <nav class="nav">
      <div class="spacer" />
      <div class="right" print:op0>
        <RouterLink to="/posts" title="Blog">
          <span class="lt-md:hidden">Blog</span>
          <div i-ri-article-line md:hidden />
        </RouterLink>
        <RouterLink to="/projects" title="Projects">
          <span class="lt-md:hidden">Projects</span>
          <div i-ri-lightbulb-line class="md:hidden" />
        </RouterLink>
        <RouterLink to="/learning" title="Learning">
          <span class="lt-md:hidden">Learning</span>
          <div eos-icons:machine-learning-outlined class="md:hidden" />
        </RouterLink>
        <a href="https://github.com/yayxs" target="_blank" title="GitHub" class="lt-md:hidden">
          <div i-uil-github-alt />
        </a>
        <ToggleTheme />
      </div>
    </nav>
  </header>
</template>

<style scoped>
.header h1 {
  margin-bottom: 0;
}
.nav {
  padding: 2rem;
  width: 100%;
  display: grid;
  grid-template-columns: auto max-content;
  box-sizing: border-box;
}
.nav > * {
  margin: auto;
}
.nav a {
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  transition: opacity 0.2s ease;
  opacity: 0.6;
  /* 一条声明中设置多个轮廓属性的简写属性 */
  outline: none;
}
.nav a:hover {
  opacity: 1;
  /*  用于设置文本修饰线的颜色 */
  text-decoration-color: inherit;
}
.nav .right {
  display: grid;
  grid-gap: 1.2rem;
  /* 设置了网格的自动流动方向为列 */
  grid-auto-flow: column;
}

.nav .right > * {
  /* 所有直接子元素的外边距为自动，这样可以使得子元素在其可用空间中水平居中 */
  margin: auto;
}
</style>
