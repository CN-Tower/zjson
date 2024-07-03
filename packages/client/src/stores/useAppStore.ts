import { computed, ref, watch, watchEffect } from 'vue'
import { defineStore } from 'pinia'
import { theme } from 'ant-design-vue'
import { ZJSON_THEME, ZJSON_THEME_SETTING } from '@/config'
import type { IThemeSetting } from '@/types'

export const useAppStore = defineStore('useAppStore', () => {
  const themeSet = localStorage.getItem(ZJSON_THEME_SETTING) as IThemeSetting
  const themeSetting = ref<IThemeSetting>(themeSet || 'system')
  const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')
  const sysTheme = darkModeQuery.matches ? 'dark' : 'light'
  const zjsTheme = localStorage.getItem(ZJSON_THEME) || sysTheme
  const themeMode = ref(themeSetting.value === 'system' ? sysTheme : zjsTheme)

  const themeConfig = computed(() => {
    return {
      algorithm: themeMode.value === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm,
    }
  })

  /**
   * 监听主题设置, 保存到 localStorage
   */
  watch(themeSetting, () => {
    if (themeSetting.value === 'system') {
      themeMode.value = darkModeQuery.matches ? 'dark' : 'light'
    } else {
      localStorage.setItem(ZJSON_THEME, themeMode.value)
    }
    localStorage.setItem(ZJSON_THEME_SETTING, themeSetting.value)
  })

  /**
   * 监听系统主题变化
   */
  darkModeQuery.addEventListener('change', (e) => {
    if (themeSetting.value === 'system') {
      themeMode.value = e.matches ? 'dark' : 'light'
    }
  })

  /**
   * 监听主题模式变化
   */
  watchEffect(() => {
    if (themeMode.value === 'light') {
      document.querySelector('html')?.classList.remove('dark-mode')
      ;(window as any).monaco?.editor?.setTheme('vs')
    } else {
      document.querySelector('html')?.classList.add('dark-mode')
      ;(window as any).monaco?.editor?.setTheme('vs-dark')
    }
    localStorage.setItem(ZJSON_THEME, themeMode.value)
  })

  return { themeMode, themeConfig, themeSetting }
})
