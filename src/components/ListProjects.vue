<script setup lang="ts">
const props = defineProps<{ projects: Record<string, any[]> }>()

console.log('配置的项目列表', props.projects)

/**
 *
 * @param name
 * @returns "hello-world"
 */
function slug(name: string) {
  return name.toLowerCase().replace(/[\s\\\/]+/g, '-')
}
</script>

<template>
  <div class="max-w-300 mx-auto">
    <div v-for="key, cidx in Object.keys(projects)" :key="key" slide-enter :style="{ '--enter-stage': cidx + 1 }">
      <!-- {{ projects }} -->
      <h4 :id="slug(key)" class="mt-15 mb-2 font-bold text-center op80">
        {{ key }}
      </h4>
      <div class="project-grid py-2 max-w-500 w-max mx-auto" grid="~ md:cols-2 gap-4" :class="projects[key].length === 1 ? 'flex' : projects[key].length > 2 ? 'lg:grid-cols-3' : ''">
        <a v-for="item, idx in projects[key]" :key="idx" class="item relative flex items-center" :href="item.link" target="_blank" :title="item.name">
          <!-- 图标 -->
          <div v-if="item.icon" class="pt-2 pr-5">
            <div class="text-3xl opacity-50" :class="item.icon" />

          </div>
          <div class="flex-auto">
            <div class="text-normal">{{ item.name }}</div>
            <div class="desc text-sm opacity-50 font-normal" v-html="item.desc" />
          </div>
        </a>
      </div>
    </div>

    <div class="prose pb5 mx-auto mt10 text-center">
      <div block mt-5>
        <a href="https://github.com/yayxs?tab=repositories&q=&type=source&language=&sort=stargazers" target="_blank" op70>All projects sort by stars-rank </a>
      </div>
    </div>
  </div>
  <!-- 目录 -->
  <div>
    <div class="table-of-contents">
      <div class="table-of-contents-anchor">
        <div class="i-ri-menu-2-fill" />
      </div>
      <ul>
        <li v-for="key of Object.keys(projects)" :key="key">
          <!-- 标题转为 跳转的链接 -->
          <a :href="`#${slug(key)}`">{{ key }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
