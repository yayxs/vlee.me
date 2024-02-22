<script setup lang="ts">
import libs from '../../data/libraries'

console.log(Object.entries(libs))
</script>

<template>
  <div class=" bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
    <header class="pt-2">
      <div class="max-w-7xl mx-auto flex justify-between">
        <a href="/learning" class="p-2 block text-3xl text-center lg:text-left">
          <span class="font-normal">Learning</span>
          <span class="font-bold">.docs</span>
        </a>
      </div>
    </header>
    <div class="px-4 lg:px-28">
      <div class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8 lg:gap-12 w-full max-w-8xl mt-8 lg:mt-20">
        <div v-for="data, id in Object.entries(libs)" :key="id" class="relative shadow-lg border border-gray-200 bg-white rounded-md font-normal overflow-hidden dark:bg-gray-800/30 dark:border-gray-700">
          <div class="relative z-10 flex flex-col justify-between h-full">
            <!-- 底部的点击按钮 -->
            <div class="">
              <!-- 左边的文档地址 -->
              <a :href="data[1].url" class="inline-flex items-center space-x-2 w-1/2 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <DocsIcon />
                <span class="sm:hidden">Docs</span>
                <span class="hidden sm:inline">Documentation</span>
              </a>
              <!-- 右边的github -->
              <a :href="data[1].github" target="_blank" rel="noopener noreferrer" class="inline-flex items-center space-x-2 w-1/2 px-6 py-4 hover:bg-gray-50 transition-colors dark:text-gray-800">
                <GitHubLogo class="text-xl" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
