<template>
  <div class="editor-zjson h_100 flex_start" ref="wrapRef">
    <EditorSource
      class="zjson-source h_100"
      ref="sourceRef"
      :historyKey="historyKey"
      @editorAction="handleEditorAction"
    >
      <div
        class="zjs-dragbar p_absolute t_0 h_100"
        :class="{ active: isOnResizing }"
        @mousedown="handleMouseDown"
      >
        <div class="drag-line p_center h_100"></div>
      </div>
    </EditorSource>
    <EditorResult class="zjson-result h_100" ref="resultRef" @editorAction="handleEditorAction" />
  </div>
  <a-modal v-model:open="isShowSaveMode" title="存档">
    <div class="my_md">
      <a-input placeholder="请输入存档名称" v-model:value="saveName"></a-input>
    </div>
    <template #footer>
      <a-button @click="isShowSaveMode = false">取消</a-button>
      <a-button type="primary" :disabled="!saveName.trim()" @click="handleSaveFile">保存</a-button>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
import EditorSource from './EditorSource.vue'
import EditorResult from './EditorResult.vue'
import { ref, watch, onMounted, onBeforeUnmount, provide } from 'vue'
import { debounce } from 'lodash-es'
import fmt2json from 'format-to-json'
import { storeToRefs, useEditorStore } from '@/stores'
import { message } from 'ant-design-vue'
import { ZJSON_SAVE_JSONS, TEMPLATE_ZJSON, TEMPLATE_PYUNI } from '@/config'

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
const resultCode = ref('')
const fmtStrict = ref(false)
const fmtEscape = ref(false)
const fmtExpand = ref(true)
const fmtResult = ref(null as any)
const isShowSaveMode = ref(false)
const saveName = ref('')
const historyKey = ref(Math.random())

provide('sourceCode', sourceCode)
provide('resultCode', resultCode)
provide('fmtStrict', fmtStrict)
provide('fmtEscape', fmtEscape)
provide('fmtExpand', fmtExpand)

/**
 * ===========================================================================
 * 响应页面事件
 * ===========================================================================
 */
const setFormatResult = () => {
  if (props.isActive) {
    formatResult.value = fmtResult.value
  }
}

const doFormatJson = () => {
  fmtResult.value = fmt2json(sourceCode.value, {
    withDetails: true,
    strict: fmtStrict.value,
    escape: fmtEscape.value,
    expand: fmtExpand.value
  })
  console.log('fmtResult.value', fmtResult.value)
  resultCode.value = fmtResult.value.result
  setFormatResult()
}

const handleFmtToJson = debounce(() => doFormatJson(), 500, { leading: true })

watch(
  () => props.isActive,
  () => setFormatResult(),
  { immediate: true }
)

watch(sourceCode, (val) => handleFmtToJson(), { immediate: true })

interface IEditorAction {
  type: string
  data?: any
}
const handleEditorAction = ({ type, data }: IEditorAction) => {
  switch (type) {
    case 'putCenter':
      sourceRef.value.$el.style.width = '50%'
      resultRef.value.$el.style.width = '50%'
      handleLayoutEditors()
      sourceRef.value.isEditorDftLeft = false
      break
    case 'putLeft':
      sourceRef.value.$el.style.width = '38%'
      resultRef.value.$el.style.width = '100%'
      handleLayoutEditors()
      sourceRef.value.isEditorDftLeft = true
      break
    case 'fmtJson':
      doFormatJson()
      break
    case 'unescapeSrc':
      sourceCode.value = sourceCode.value.replace(/\\"/gm, '"').replace(/\\\\/gm, '\\')
      break
    case 'fmtStrict':
      fmtStrict.value = !fmtStrict.value
      doFormatJson()
      break
    case 'clearSource':
      sourceCode.value = ''
      message.success('源码已清空')
      break
    case 'clearResult':
      resultCode.value = ''
      message.success('结果已清空')
      break
    case 'fmtEscape':
      fmtEscape.value = !fmtEscape.value
      doFormatJson()
      break
    case 'pushToLeft':
      sourceCode.value = resultCode.value
      break
    case 'fmtExpand':
      fmtExpand.value = !fmtExpand.value
      doFormatJson()
      break
    case 'saveFile':
      if (!sourceCode.value.trim()) {
        message.warning('源码为空，无法存档')
        return
      }
      const code = sourceCode.value.replace(/[\s\r\n]/g, '')
      saveName.value = code.length > 20 ? code.substr(0, 20) + ' ...' : code
      isShowSaveMode.value = true
      break
  }
}

/**
 * 存档
 */
const handleSaveFile = () => {
  const savedList = JSON.parse(localStorage.getItem(ZJSON_SAVE_JSONS) || '[]')
  savedList.push({
    name: saveName.value,
    code: sourceCode.value,
    time: Date.now()
  })
  if (savedList.length > 20) {
    savedList.shift()
  }
  localStorage.setItem(ZJSON_SAVE_JSONS, JSON.stringify(savedList))
  isShowSaveMode.value = false
  historyKey.value = Math.random()
  message.success('存档成功')
}

/**
 * 打开模板JSON
 */
const handleOpenTplate = (type: 'zjson' | 'pyUni') => {
  console.log('type', type)
  if (type === 'zjson') {
    sourceCode.value = TEMPLATE_ZJSON
  } else if (type === 'pyUni') {
    sourceCode.value = TEMPLATE_PYUNI
  } else {
    sourceCode.value = ''
  }
}
provide('handleOpenTplate', handleOpenTplate)

/**
 * 打开历史存档
 */
const handleOpenHistory = (time: number) => {
  const savedList = JSON.parse(localStorage.getItem(ZJSON_SAVE_JSONS) || '[]')
  const item = savedList.find((item: any) => item.time === time)
  if (item) {
    sourceCode.value = item.code
  }
}
provide('handleOpenHistory', handleOpenHistory)

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
  sourceRef.value?.layoutEditor()
  resultRef.value?.layoutEditor()
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
