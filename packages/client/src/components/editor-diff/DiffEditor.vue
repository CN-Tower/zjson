<template>
  <div class="diff-editor w_100 h_100">
    <div class="editor w_100 h_100" ref="editorRef"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, watch, type Ref, onMounted, onBeforeUnmount } from 'vue'
import { storeToRefs, useEditorStore } from '@/stores'
import { events } from '@/utils'

const editorLang = inject('editorLang') as Ref<string>
const leftCode = inject('leftCode') as Ref<string>
const rightCode = inject('rightCode') as Ref<string>
const editorRef = ref()
const isEditorInited = ref(false)
const { isEditorReady } = storeToRefs(useEditorStore())
let editor = null as any
let leftModel = null as any
let rightModel = null as any

watch([editorLang, leftCode, rightCode], () => updateEditorModel())

const updateEditorModel = () => {
  if (!editor || !leftModel || !rightModel) return
  if (leftModel.getValue() !== leftCode.value) {
    leftModel.setValue(leftCode.value)
  }
  if (rightModel.getValue() !== rightCode.value) {
    rightModel.setValue(rightCode.value)
  }
  ;(window as any).monaco.editor.setModelLanguage(leftModel, editorLang.value)
  ;(window as any).monaco.editor.setModelLanguage(rightModel, editorLang.value)
}

const initEditor = () => {
  if (isEditorInited.value || !isEditorReady.value) return
  isEditorInited.value = true
  console.log('leftCode', leftCode.value)
  editor = (window as any).monaco.editor.createDiffEditor(editorRef.value, {
    originalEditable: true
  })
  leftModel = (window as any).monaco.editor.createModel(leftCode.value, editorLang.value)
  leftModel.onDidChangeContent(() => (leftCode.value = leftModel.getValue()))
  rightModel = (window as any).monaco.editor.createModel(rightCode.value, editorLang.value)
  rightModel.onDidChangeContent(() => (rightCode.value = rightModel.getValue()))
  editor?.setModel({ original: leftModel, modified: rightModel })
}

const resetDiffEditor = () => {
  editor?.dispose()
  editor = null
  isEditorInited.value = false
  initEditor()
}
defineExpose({ resetDiffEditor })

events.on('editorReady', () => initEditor())
onMounted(() => setTimeout(() => initEditor()))
onBeforeUnmount(() => editor?.dispose())
</script>

<style>
.diff-editor {
  padding: 1px;
}
</style>
