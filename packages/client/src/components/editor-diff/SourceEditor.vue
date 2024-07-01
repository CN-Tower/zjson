<template>
  <div class="diff-source h_100 p_relative">
    <div class="editor w_100 h_100" ref="editorRef"></div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, inject, type Ref } from 'vue'
import { storeToRefs, useAppStore, useEditorStore } from '@/stores'
import { events } from '@/utils'

const emit = defineEmits(['codeChange'])
const props = defineProps({
  code: {
    type: String,
    default: ''
  }
})
const editorLang = inject('editorLang') as Ref<string>
const { isEditorReady } = storeToRefs(useEditorStore())
const { themeMode } = storeToRefs(useAppStore())
const editorRef = ref()
const isEditorInited = ref(false)
let editor = null as any

watch(editorLang, (lang) => {
  if (lang && editor) {
    ;(window as any).monaco.editor.setModelLanguage(editor.getModel(), lang)
  }
})

watch(() => props.code, (code) => {
  if (editor && editor.getValue() !== code) {
    editor.setValue(code)
  }
})

const initEditor = () => {
  if (isEditorInited.value || !isEditorReady.value) return
  isEditorInited.value = true
  editor = (window as any).monaco.editor.create(editorRef.value, {
    language: editorLang.value,
    tabSize: 2,
    wordWrap: 'on',
    theme: themeMode.value === 'light' ? 'vs' : 'vs-dark',
    minimap: { enabled: true },
    scrollbar: { horizontal: 'hidden' }
  })
  editor.setValue(props.code)
  editor.onDidChangeModelContent(() => {
    emit('codeChange', editor.getValue())
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
