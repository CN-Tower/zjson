<template>
  <div class="editor-zjson w_100 h_100 flex_start" ref="wrapRef">
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
  <!-- 存档弹窗 -->
  <a-modal v-model:open="isShowSaveMode" title="存档">
    <div class="my_md">
      <a-input placeholder="请输入存档名称" v-model:value="saveName"></a-input>
    </div>
    <template #footer>
      <a-button @click="isShowSaveMode = false">取消</a-button>
      <a-button type="primary" :disabled="!saveName.trim()" @click="handleSaveFile">保存</a-button>
    </template>
  </a-modal>
  <!-- 设置弹窗 -->
  <a-modal v-model:open="isShowSettingsMode" title="转杰森编辑器设置">
    <a-form class="mt_md form-item">
      <a-form-item label="换行：">
        <a-radio-group v-model:value="wordWrap">
          <a-radio :value="true">自动换行</a-radio>
          <a-radio :value="false">不换行</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="缩进：">
        <a-select class="w_100" v-model:value="codeIndent">
          <a-select-option v-for="i in 8" :value="i">{{ i }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="引号：">
        <a-select
          class="w_100"
          v-model:value="qtMarkType"
          :options="qtMarkOptions"
          @change="() => {}"
        />
      </a-form-item>
      <a-form-item label="保存：">
        <a-checkbox v-model:checked="isSaveToLocal" name="type">是否保存设置持久生效</a-checkbox>
      </a-form-item>
    </a-form>
    <template #footer>
      <a-button type="primary" @click="isShowSettingsMode = false">确定</a-button>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
import EditorSource from './EditorSource.vue'
import EditorResult from './EditorResult.vue'
import { ref, watch, computed, onMounted, onBeforeUnmount, provide } from 'vue'
import fmt2json from 'format-to-json'
import { storeToRefs, useEditorStore } from '@/stores'
import { message } from 'ant-design-vue'
import { ZJSON_SAVE_JSONS, TEMPLATE_ZJSON, TEMPLATE_PYUNI, ZJSON_JSON_SETTINGS } from '@/config'
import { debounce } from '@/utils'

const props = defineProps({
  isActive: {
    type: Boolean,
  },
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
const wordWrap = ref(true)
const codeIndent = ref(2)
const qtMarkType = ref<0 | 1 | 2 | 3>(0)
const keyQtMark = computed<any>(() => ['"', '', '', "'"][qtMarkType.value])
const valQtMark = computed<any>(() => ['"', "'", '"', "'"][qtMarkType.value])
const saveName = ref('')
const isShowSaveMode = ref(false)
const historyKey = ref(Math.random())
const isSaveToLocal = ref(false)
const isShowSettingsMode = ref(false)
const qtMarkOptions = ref([
  { label: '"key": "value"', value: 0 },
  { label: "key: 'value'", value: 1 },
  { label: 'key: "value"', value: 2 },
  { label: "'key': 'value'", value: 3 },
])

provide('sourceCode', sourceCode)
provide('resultCode', resultCode)
provide('fmtStrict', fmtStrict)
provide('fmtEscape', fmtEscape)
provide('fmtExpand', fmtExpand)
provide('wordWrap', wordWrap)
provide('codeIndent', codeIndent)

const localSettings = JSON.parse(localStorage.getItem(ZJSON_JSON_SETTINGS) || '{}')
if (localSettings.isSaveToLocal) {
  wordWrap.value = localSettings.wordWrap
  codeIndent.value = localSettings.codeIndent
  qtMarkType.value = localSettings.qtMarkType
  isSaveToLocal.value = localSettings.isSaveToLocal
}

watch([codeIndent, keyQtMark, valQtMark], () => {
  if (props.isActive) doFormatJson()
})

watch([codeIndent, qtMarkType, wordWrap], () => {
  // isShowSettingsMode.value = false
  if (isSaveToLocal.value) saveSettingsToLocal()
})

watch(isSaveToLocal, () => saveSettingsToLocal())

const saveSettingsToLocal = () => {
  localStorage.setItem(
    ZJSON_JSON_SETTINGS,
    JSON.stringify({
      wordWrap: wordWrap.value,
      codeIndent: codeIndent.value,
      qtMarkType: qtMarkType.value,
      isSaveToLocal: isSaveToLocal.value,
    }),
  )
}

/**
 * ===========================================================================
 * 响应页面事件
 * ===========================================================================
 */

const setFormatResult = () => {
  if (props.isActive) formatResult.value = fmtResult.value
}

const doFormatJson = () => {
  fmtResult.value = fmt2json(sourceCode.value, {
    withDetails: true,
    strict: fmtStrict.value,
    escape: fmtEscape.value,
    expand: fmtExpand.value,
    indent: codeIndent.value,
    keyQtMark: keyQtMark.value,
    valQtMark: valQtMark.value,
  })
  console.log('fmtResult.value', fmtResult.value)
  resultCode.value = fmtResult.value.result
  setFormatResult()
}

const handleFmtToJson = debounce(() => doFormatJson(), 500)
watch(sourceCode, () => handleFmtToJson(), { immediate: true })

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
      message.success('原码已反转义')
      break
    case 'fmtStrict':
      fmtStrict.value = !fmtStrict.value
      doFormatJson()
      break
    case 'clearSource':
      sourceCode.value = ''
      message.success('原码已清空')
      break
    case 'clearResult':
      resultCode.value = ''
      message.success('格式化结果已清空')
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
        message.warning('原码为空，无法存档')
        return
      }
      const code = sourceCode.value.replace(/[\s\r\n]/g, '')
      saveName.value = code.length > 20 ? code.substr(0, 20) + ' ...' : code
      isShowSaveMode.value = true
      break
  }
}

/**
 * 设置
 */
const handleSettings = () => {
  isShowSettingsMode.value = true
}
provide('handleSettings', handleSettings)

/**
 * 存档
 */
const handleSaveFile = () => {
  const savedList = JSON.parse(localStorage.getItem(ZJSON_SAVE_JSONS) || '[]')
  savedList.unshift({
    name: saveName.value,
    code: sourceCode.value,
    time: Date.now(),
  })
  if (savedList.length > 20) {
    savedList.pop()
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

const handleWindowResize = debounce(() => {
  const WW = wrapRef.value.offsetWidth
  const LW = sourceRef.value.$el.offsetWidth
  const pl = (LW / WW) * 100
  const pr = 100 - pl
  sourceRef.value.$el.style.width = `${pl}%`
  resultRef.value.$el.style.width = `${pr}%`
  handleLayoutEditors()
}, 300)

watch(
  () => props.isActive,
  (active) => {
    setFormatResult()
    if (active) {
      setTimeout(() => handleLayoutEditors())
    }
  },
  { immediate: true },
)

const removeEventListeners = () => {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
  window.addEventListener('resize', handleWindowResize)
}

onMounted(() => {
  window.addEventListener('resize', handleWindowResize)
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
