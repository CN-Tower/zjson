<template>
  <div class="diff-source h_100 p_relative">
    <div class="editor w_100 h_100" ref="editorRef"></div>
    <p v-if="!code" class="zjs-placeholder p_center text_center text3 opacity_d75 pe_none fs_1xx">
      <img class="code-img" v-if="from === 'l'" src="https://img.picgo.net/2024/07/03/a44f0e7d071bb73ee.png" alt="">
      <img class="code-img" v-else src="https://img.picgo.net/2024/07/03/b5f4df1f5d4298174.png" alt="">
    </p>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, inject, type Ref } from 'vue'
import { storeToRefs, useAppStore, useEditorStore } from '@/stores'
import { events, updateEditorContent } from '@/utils'

const emit = defineEmits(['codeChange'])
const props = defineProps({
  code: {
    type: String,
    default: ''
  },
  from: {
    type: String,
    default: ''
  }
})
const editorLang = inject('editorLang') as Ref<string>
const tabSize = inject('tabSize') as Ref<string>
const wordWrap = inject('wordWrap') as Ref<string>
const detectIndentation = inject('detectIndentation') as Ref<string>
const { isEditorReady } = storeToRefs(useEditorStore())
const { themeMode } = storeToRefs(useAppStore())
const editorRef = ref()
const isEditorInited = ref(false)
let editor = null as any

watch(
  () => props.code,
  (code) => {
    if (editor && editor.getValue() !== code) {
      editor.setValue(code)
    }
  }
)

watch(editorLang, (lang) => {
  if (lang && editor) {
    ;(window as any).monaco.editor.setModelLanguage(editor.getModel(), lang)
  }
})

watch([tabSize, wordWrap, detectIndentation], () => {
  setTimeout(() => {
    editor?.updateOptions({
      tabSize: tabSize.value,
      wordWrap: wordWrap.value ? 'on' : 'off',
      detectIndentation: detectIndentation.value,
    })
  })
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
    detectIndentation: detectIndentation.value
  })
  editor.setValue(props.code)
  editor.onDidChangeModelContent(() => {
    emit('codeChange', editor.getValue())
  })
}

const layoutEditor = () => {
  editor?.layout()
}

const updateContent = (content: string) => {
  if (editor) {
    updateEditorContent(editor, content)
  }
}
defineExpose({ layoutEditor, updateContent })

events.on('editorReady', () => initEditor())
onMounted(() => setTimeout(() => initEditor()))
onBeforeUnmount(() => editor?.dispose())
</script>

<style lang="scss">
.diff-source {
  padding: 1px;
}
</style>
