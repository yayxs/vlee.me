<script setup lang="ts">
import { onMounted } from 'vue'
import { getDocs } from '~/utils/docs'

async function getDocsData() {
  const docs = await getDocs()
}

onMounted(() => {
  getDocsData()
})
</script>

<template>
  <div />
</template>
