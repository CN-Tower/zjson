import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEditorStore = defineStore('useEditorStore', () => {
  const isEditorReady = ref(false)
  const isEditorLoading = ref(true)
  const formatResult = ref({} as any)

  return { isEditorReady, isEditorLoading, formatResult }
})