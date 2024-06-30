<template>
<div class="editor-tab" ref="tabTextRef">
  {{ getTabTitle(tab) }}
</div>
</template>
  
<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import type { IEditorTab } from '@/types'

const props = defineProps({
  tab: {
    type: Object,
    require: true
  }
})
const tabTextRef = ref()

const getTabTitle = (tab: IEditorTab) => {
  return `${tab.type ? tab.type.toUpperCase() : 'TAB'}-${tab.title}`
}

onMounted(() => {
  setTimeout(() => {
    const tabEle = tabTextRef.value?.parentElement?.parentElement
    if (tabEle) {
      tabEle.setAttribute('draggable', true)
    }
  })
})
</script>
