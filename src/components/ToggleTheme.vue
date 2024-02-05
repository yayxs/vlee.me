<script setup lang='ts'>
import { toggleDark } from '~/utils'
</script>

<template>
  <a class="select-none" title="切换主题" @click="toggleDark">
    <div i-ri-sun-line dark:i-ri-moon-line />
  </a>
</template>
