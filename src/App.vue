<script setup lang="ts">
const route = useRoute()

const imageModel = ref<HTMLImageElement>()

useEventListener('click', async (e) => {
  const path = Array.from(e.composedPath())
})
</script>

<template>
  <NavBar />
  <div class="box">
    123
  </div>
</template>

<style scoped>
.box {
  height: 2000px;
}
</style>
