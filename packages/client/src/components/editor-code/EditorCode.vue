<template>
  <div class="editor-code h_100 flex_between" ref="wrapRef">
    <CodeEditor
      v-for="(item, i) in codeEditors"
      :key="item.key"
      :codeEditors="codeEditors"
      :isEditorNumMax="isEditorNumMax"
      ref="editorRefs"
      @split="handleSplitEditor(item, i)"
      @close="handleCloseEditor(i)"
    >
      <div
        v-if="i < codeEditors.length - 1"
        class="zjs-dragbar p_absolute t_0 h_100"
        :class="{ active: isOnResizing, disabled: isEditorNumMax }"
        @mousedown="handleMouseDown($event, i)"
      >
        <div class="drag-line p_center h_100"></div>
      </div>
    </CodeEditor>
  </div>
</template>

<script setup lang="ts">
import CodeEditor from './CodeEditor.vue'
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import type { ICodeEditor } from '@/types'

const codeEditors = ref<ICodeEditor[]>([{ key: Math.random().toString() }])
const wrapRef = ref()
const editorRefs = ref([] as any[])
const isOnResizing = ref(false)
const isEditorNumMax = computed(() => codeEditors.value.length >= 3)

const handleSplitEditor = (item: ICodeEditor, i: number) => {
  if (isEditorNumMax.value) return
  codeEditors.value.splice(i + 1, 0, { key: Math.random().toString() })
  setTimeout(() => calcEditorWidth(), 200)
}

const handleCloseEditor = (i: number) => {
  codeEditors.value.splice(i, 1)
  setTimeout(() => calcEditorWidth())
}

const calcEditorWidth = () => {
  const wp = (1 / codeEditors.value.length) * 100
  editorRefs.value.forEach((editorRef: any) => {
    editorRef.$el.style.width = `${wp}%`
    editorRef.layoutEditor()
  })
}

/**
 * ===========================================================================
 * 左右拖动调整大小
 * ===========================================================================
 */
let ww = 0
let ox = 0
let ow = 0
let firstIdx = 0

const handleMouseDown = (e: MouseEvent, i: number) => {
  console.log('-------i', i, editorRefs.value.length)
  console.log(editorRefs.value[0].$el)
  if (!wrapRef.value) return
  if (editorRefs.value.length !== 2) return
  ww = wrapRef.value.offsetWidth
  if (ww < 800) {
    return
  }
  ox = e.clientX
  firstIdx = +(editorRefs.value[0].$el.offsetLeft > 100)
  ow = editorRefs.value[0].$el.offsetWidth
  isOnResizing.value = true
  removeEventListeners()
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

const handleMouseMove = (e: MouseEvent) => {
  if (!isOnResizing.value) return
  const cx = e.clientX
  const dx = cx - ox
  let nw = ow + dx
  if (nw < 400) nw = 400
  if (nw + 400 > ww) nw = ww - 400
  const pl = (nw / ww) * 100
  const pr = 100 - pl
  editorRefs.value[firstIdx].$el.style.width = `${pl}%`
  editorRefs.value[+!firstIdx].$el.style.width = `${pr}%`
  handleLayoutEditors()
}

const handleMouseUp = (e: MouseEvent) => {
  isOnResizing.value = false
  removeEventListeners()
}

const handleLayoutEditors = () => {
  editorRefs.value.forEach((editorRef: any) => editorRef.layoutEditor())
}

const removeEventListeners = () => {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
  window.addEventListener('resize', handleLayoutEditors)
}

onMounted(() => {
  window.addEventListener('resize', handleLayoutEditors)
})
onBeforeUnmount(() => removeEventListeners())
</script>

<style></style>
