import { getCurrentInstance, onMounted, ref } from 'vue'

export function useMounted() {
  const isMounted = ref(false)

  if (getCurrentInstance()) {
    onMounted(() => {
      isMounted.value = true
    })
  }

  return isMounted
}
