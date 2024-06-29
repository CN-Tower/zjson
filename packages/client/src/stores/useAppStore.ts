import { computed, ref, watchEffect } from 'vue'
import { defineStore } from 'pinia'
import { theme } from 'ant-design-vue'
import { ZJSON_THEME } from '@/config'

export const useAppStore = defineStore('useAppStore', () => {
  const themeMode = ref(localStorage.getItem(ZJSON_THEME) || 'light')

  const themeConfig = computed(() => {
    return {
      algorithm: themeMode.value === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm
    }
  })

  watchEffect(() => {
    if (themeMode.value === 'light') {
      document.querySelector('html')?.classList.remove('dark-mode')
    } else {
      document.querySelector('html')?.classList.add('dark-mode')
    }
    localStorage.setItem(ZJSON_THEME, themeMode.value)
  })

  return { themeMode, themeConfig }
})
