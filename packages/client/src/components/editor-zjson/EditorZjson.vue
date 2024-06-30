<template>
  <div class="editor-zjson h_100 flex_start" ref="wrapRef">
    <EditorSource class="zjson-source h_100" ref="sourceRef" @editorAction="handleEditorAction">
      <div
        class="zjs-dragbar p_absolute t_0 h_100"
        :class="{ active: isOnResizing }"
        @mousedown="handleMouseDown"
      >
        <div class="drag-line p_center h_100"></div>
      </div>
    </EditorSource>
    <EditorResult class="zjson-result h_100" ref="resultRef" />
  </div>
</template>

<script setup lang="ts">
import EditorSource from './EditorSource.vue'
import EditorResult from './EditorResult.vue'
import { ref, watch, onMounted, onBeforeUnmount, provide, onActivated } from 'vue'
import { debounce } from 'lodash-es'
import fmt2json from 'format-to-json'
import { storeToRefs, useEditorStore } from '@/stores'

const props = defineProps({
  isActive: {
    type: Boolean
  }
})

const { formatResult } = storeToRefs(useEditorStore())
const isOnResizing = ref(false)
const wrapRef = ref()
const sourceRef = ref()
const resultRef = ref()
const sourceCode = ref('')
const fmtResult = ref(null as any)

provide('sourceCode', sourceCode)

const setFormatResult = () => {
  if (props.isActive) {
    formatResult.value = fmtResult.value
  }
}

watch(
  () => props.isActive,
  () => setFormatResult(),
  { immediate: true }
)

watch(sourceCode, (val) => {
  handleFmtToJson()
})

const doFormatJson = () => {
  fmtResult.value = fmt2json(sourceCode.value, { withDetails: true })
  console.log('fmtResult.value', fmtResult.value)
  setFormatResult()
  resultRef.value.setResultValue(fmtResult.value.result)
}
const handleFmtToJson = debounce(() => doFormatJson(), 500, { leading: true })

/**
 * ===========================================================================
 * 响应页面事件
 * ===========================================================================
 */
interface IEditorAction {
  type: string
  data?: any
}
const handleEditorAction = ({ type, data }: IEditorAction) => {
  if (type === 'putCenter') {
    sourceRef.value.$el.style.width = '50%'
    resultRef.value.$el.style.width = '50%'
    handleLayoutEditors()
    sourceRef.value.isEditorDftLeft = false
  } else if (type === 'putLeft') {
    sourceRef.value.$el.style.width = '38%'
    resultRef.value.$el.style.width = '100%'
    handleLayoutEditors()
    sourceRef.value.isEditorDftLeft = true
  } else if (type === 'fmtJson') {
    doFormatJson()
  }
}

/**
 * ===========================================================================
 * 左右拖动调整大小
 * ===========================================================================
 */
let ww = 0
let ox = 0
let ow = 0

const handleMouseDown = (e: MouseEvent) => {
  ww = wrapRef.value.offsetWidth
  if (ww < 800) {
    return
  }
  ox = e.clientX
  ow = sourceRef.value.$el.offsetWidth
  isOnResizing.value = true
  removeEventListeners()
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

let layoutTimer = null as any
const handleMouseMove = (e: MouseEvent) => {
  if (!isOnResizing.value) return
  const cx = e.clientX
  const dx = cx - ox
  let nw = ow + dx
  if (nw < 400) nw = 400
  if (nw + 400 > ww) nw = ww - 400
  const pl = (nw / ww) * 100
  const pr = 100 - pl
  sourceRef.value.$el.style.width = `${pl}%`
  resultRef.value.$el.style.width = `${pr}%`
  sourceRef.value.isEditorDftLeft = false
  handleLayoutEditors()
  clearTimeout(layoutTimer)
  layoutTimer = setTimeout(() => handleLayoutEditors(), 300)
}

const handleMouseUp = (e: MouseEvent) => {
  isOnResizing.value = false
  removeEventListeners()
}

const handleLayoutEditors = () => {
  sourceRef.value.layoutEditor()
  resultRef.value.layoutEditor()
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

<style lang="scss">
.editor-zjson {
  .zjson-source {
    width: 38%;
    flex-shrink: 0;
  }
  .zjson-result {
    width: 100%;
  }
}
</style>
