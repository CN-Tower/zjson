<template>
  <div class="diff-source h_100 p_relative">
    <div class="editor w_100 h_100" ref="editorRef"></div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { storeToRefs, useAppStore, useEditorStore } from '@/stores'
import { events } from '@/utils'

const { isEditorReady } = storeToRefs(useEditorStore())
const { themeMode } = storeToRefs(useAppStore())
const editorRef = ref()
const isEditorInited = ref(false)
let editor = null as any

const initEditor = () => {
  if (isEditorInited.value || !isEditorReady.value) return
  isEditorInited.value = true
  editor = (window as any).monaco.editor.create(editorRef.value, {
    language: 'text/plain',
    tabSize: 2,
    wordWrap: 'on',
    theme: themeMode.value === 'light' ? 'vs' : 'vs-dark',
    minimap: { enabled: true },
    scrollbar: { horizontal: 'hidden' }
  })
}

const layoutEditor = () => {
  editor?.layout()
}
defineExpose({ layoutEditor })

events.on('editorReady', () => initEditor())
onMounted(() => setTimeout(() => initEditor()))
onBeforeUnmount(() => editor?.dispose())
</script>

<style lang="scss">
.diff-source {
  padding: 1px;
}
</style>
