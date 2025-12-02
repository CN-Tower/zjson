<template>
  <div class="editor-diff h_100 flex_col_start">
    <div class="zjs-toolbar w_100 flex_between mt_xs fs_3">
      <div class="bar-left pl_sm flex_start">
        <span class="fs_5">{{ t('editor.lang_') }}</span>
        <a-select class="zjs-selector" v-model:value="editorLang" style="width: 120px" size="small">
          <a-select-option v-for="l in EDITOR_LANGS" :value="l" :key="l">{{ l }}</a-select-option>
        </a-select>
      </div>
      <div class="bar-center">
        <a-tooltip :title="t('editor.clearLeft')">
          <DeleteOutlined class="bar-btn del-l" @click="handleDelLeft" />
        </a-tooltip>
        <a-tooltip :title="t('editor.zjsonLeft')">
          <RetweetOutlined class="bar-btn mr_md" @click="handleZjsonLeft" />
        </a-tooltip>
        <a-divider class="mr_sm" type="vertical" />
        <a-tooltip :title="t('editor.swapLeftRight')">
          <SwapOutlined class="bar-btn" @click="handleSwapLeftRight" />
        </a-tooltip>
        <a-tooltip :title="t('editor.toCenter')">
          <PauseOutlined class="bar-btn" @click="handleCenterSource" />
        </a-tooltip>
        <a-popover trigger="click" placement="bottom">
          <template #content>
            <SaveHistory @select="saveHistoryRef.click()" :key="historyKey" />
          </template>
          <a-tooltip :title="t('editor.savedRecords')">
            <FolderOpenOutlined class="bar-btn" ref="saveHistoryRef" />
          </a-tooltip>
        </a-popover>
        <a-tooltip :title="t('editor.save')">
          <SaveOutlined class="bar-btn" @click="handleSaveFile" />
        </a-tooltip>
        <a-tooltip :title="t('editor.clearBoth')">
          <ClearOutlined class="bar-btn" @click="handleDelBoth" />
        </a-tooltip>
        <a-tooltip :title="t('settings')">
          <SettingOutlined class="bar-btn mr_sm" @click="handleSettings" />
        </a-tooltip>
        <a-divider class="ml_md" type="vertical" />
        <a-tooltip :title="t('editor.zjsonRight')">
          <RetweetOutlined class="bar-btn ml_md" @click="handleZjsonRight" />
        </a-tooltip>
        <a-tooltip :title="t('editor.clearRight')">
          <DeleteOutlined class="bar-btn del-r" @click="handleDelRight" />
        </a-tooltip>
      </div>
      <div class="bar-right flex_end">
        <a-button class="r-btn zjs-button" v-if="isShowDiff" size="small" @click="handleEdit">
          <EditOutlined />
          <span class="fs_5">{{ t('edit') }}</span>
        </a-button>
        <a-button class="r-btn zjs-button" v-else size="small" @click="handleDiff">
          <CheckOutlined />
          <span class="fs_5">{{ t('compare') }}</span>
        </a-button>
      </div>
    </div>
    <div class="diff-content w_100 h_100">
      <DiffEditor v-if="isShowDiff" ref="diffEditorRef" />
      <div v-else class="h_100 flex_between" ref="wrapRef">
        <SourceEditor
          class="source-left"
          ref="leftEditorRef"
          :code="leftCode"
          from="l"
          @codeChange="leftCode = $event"
        >
          <div
            class="zjs-dragbar p_absolute t_0 h_100"
            :class="{ active: isOnResizing }"
            @mousedown="handleMouseDown"
          >
            <div class="drag-line p_center h_100"></div>
          </div>
        </SourceEditor>
        <SourceEditor
          class="source-right"
          ref="rightEditorRef"
          :code="rightCode"
          from="r"
          @codeChange="rightCode = $event"
        />
      </div>
    </div>
  </div>
  <!-- 存档弹窗 -->
  <a-modal v-model:open="isShowSaveMode" :title="t('modal.saveRecord')">
    <div class="my_md">
      <a-input :placeholder="t('modal.saveName')" v-model:value="saveName"></a-input>
    </div>
    <template #footer>
      <a-button @click="isShowSaveMode = false">{{ t('cancel') }}</a-button>
      <a-button type="primary" :disabled="!saveName.trim()" @click="submitSaveFile">
        {{ t('save') }}
      </a-button>
    </template>
  </a-modal>
  <!-- 设置弹窗 -->
  <a-modal v-model:open="isShowSettingsMode" :title="t('modal.diffSettings')">
    <a-form class="mt_md diff-settings-form">
      <a-form-item :label="t('modal.overWrap_')">
        <a-radio-group v-model:value="wordWrap">
          <a-radio :value="true">{{ t('modal.autoWrap') }}</a-radio>
          <a-radio :value="false">{{ t('modal.noWrap') }}</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item :label="t('modal.detectTab_')">
        <a-radio-group v-model:value="detectIndentation">
          <a-radio :value="true">{{ t('modal.autoDetect') }}</a-radio>
          <a-radio :value="false">{{ t('modal.noDetect') }}</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item :label="t('modal.tabSize_')">
        <a-select class="w_100" v-model:value="tabSize">
          <a-select-option v-for="i in 8" :value="i">{{ i }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :label="t('modal.saveSettings_')">
        <a-checkbox v-model:checked="isSaveToLocal" name="type">
          {{ t('modal.saveToLocal') }}
        </a-checkbox>
      </a-form-item>
    </a-form>
    <template #footer>
      <a-button type="primary" @click="isShowSettingsMode = false">{{ t('confirm') }}</a-button>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
import SourceEditor from './SourceEditor.vue'
import DiffEditor from './DiffEditor.vue'
import SaveHistory from './SaveHistory.vue'
import { ref, watch, onMounted, onBeforeUnmount, provide } from 'vue'
import {
  PauseOutlined,
  SwapOutlined,
  DeleteOutlined,
  ClearOutlined,
  FolderOpenOutlined,
  SaveOutlined,
  CheckOutlined,
  EditOutlined,
  SettingOutlined,
  RetweetOutlined,
} from '@ant-design/icons-vue'
import { storeToRefs, useEditorStore } from '@/stores'
import { EDITOR_LANGS, ZJSON_SAVE_DIFFS, ZJSON_DIFF_SETTINGS } from '@/config'
import { message } from 'ant-design-vue'
import { debounce } from '@/utils'
import { useI18n } from 'vue-i18n'
import fmt2json from 'format-to-json'

const props = defineProps({
  isActive: {
    type: Boolean,
  },
})
const isShowDiff = ref(false)
const isOnResizing = ref(false)
const wrapRef = ref()
const diffEditorRef = ref()
const leftEditorRef = ref()
const rightEditorRef = ref()
const { formatResult } = storeToRefs(useEditorStore())
const editorLang = ref('json')
const leftCode = ref('')
const rightCode = ref('')
const saveName = ref('')
const isShowSaveMode = ref(false)
const historyKey = ref(Math.random())
const saveHistoryRef = ref()
const tabSize = ref(2)
const wordWrap = ref(true)
const detectIndentation = ref(true)
const isSaveToLocal = ref(false)
const isShowSettingsMode = ref(false)
const { t } = useI18n()

provide('editorLang', editorLang)
provide('leftCode', leftCode)
provide('rightCode', rightCode)
provide('tabSize', tabSize)
provide('wordWrap', wordWrap)
provide('detectIndentation', detectIndentation)

const localSettings = JSON.parse(localStorage.getItem(ZJSON_DIFF_SETTINGS) || '{}')
if (localSettings.isSaveToLocal) {
  tabSize.value = localSettings.tabSize
  wordWrap.value = localSettings.wordWrap
  detectIndentation.value = localSettings.detectIndentation
  isSaveToLocal.value = localSettings.isSaveToLocal
}

watch([tabSize, wordWrap, detectIndentation], () => {
  // isShowSettingsMode.value = false
  if (isSaveToLocal.value) saveSettingsToLocal()
})

watch(isSaveToLocal, () => saveSettingsToLocal())

const saveSettingsToLocal = () => {
  localStorage.setItem(
    ZJSON_DIFF_SETTINGS,
    JSON.stringify({
      tabSize: tabSize.value,
      wordWrap: wordWrap.value,
      detectIndentation: detectIndentation.value,
      isSaveToLocal: isSaveToLocal.value,
    }),
  )
}

/**
 * ===========================================================================
 * 响应页面事件
 * ===========================================================================
 */
const handleZjsonLeft = () => {
  leftEditorRef.value?.updateContent(fmt2json(leftCode.value))
}

const handleZjsonRight = () => {
  rightEditorRef.value?.updateContent(fmt2json(rightCode.value))
}

const handleSwapLeftRight = () => {
  const temp = leftCode.value
  leftCode.value = rightCode.value
  rightCode.value = temp
}

const handleCenterSource = () => {
  if (isShowDiff.value) {
    diffEditorRef.value?.resetDiffEditor()
  } else {
    leftEditorRef.value.$el.style = '50%'
    rightEditorRef.value.$el.style = '50%'
    handleLayoutEditors()
  }
}

const handleEdit = () => {
  isShowDiff.value = false
}

const handleDiff = () => {
  isShowDiff.value = true
}

const handleDelLeft = () => {
  leftCode.value = ''
}

const handleDelRight = () => {
  rightCode.value = ''
}

const handleDelBoth = () => {
  leftCode.value = ''
  rightCode.value = ''
}

const handleSettings = () => {
  isShowSettingsMode.value = true
}

/**
 * 存档
 */
const handleSaveFile = () => {
  if (!leftCode.value.trim() && !rightCode.value.trim()) {
    message.warning(t('msg.saveEmpty'))
    return
  }
  const lc = leftCode.value.replace(/[\s\r\n]/g, '')
  const rc = rightCode.value.replace(/[\s\r\n]/g, '')
  const l = lc.length > 12 ? lc.substr(0, 12) + ' ...' : lc
  const r = rc.length > 12 ? rc.substr(0, 12) + ' ...' : rc
  saveName.value = `${l} | ${r}`
  isShowSaveMode.value = true
}

const submitSaveFile = () => {
  const savedList = JSON.parse(localStorage.getItem(ZJSON_SAVE_DIFFS) || '[]')
  savedList.unshift({
    name: saveName.value,
    leftCode: leftCode.value,
    rightCode: rightCode.value,
    time: Date.now(),
  })
  if (savedList.length > 20) {
    savedList.pop()
  }
  localStorage.setItem(ZJSON_SAVE_DIFFS, JSON.stringify(savedList))
  isShowSaveMode.value = false
  historyKey.value = Math.random()
  message.success(t('msg.saved'))
}

/**
 * 打开历史存档
 */
const handleOpenHistory = (time: number) => {
  const savedList = JSON.parse(localStorage.getItem(ZJSON_SAVE_DIFFS) || '[]')
  const item = savedList.find((item: any) => item.time === time)
  if (item) {
    leftCode.value = item.leftCode
    rightCode.value = item.rightCode
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
  if (!wrapRef.value) return
  ww = wrapRef.value.offsetWidth
  if (ww < 800) {
    return
  }
  ox = e.clientX
  ow = leftEditorRef.value.$el.offsetWidth
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
  leftEditorRef.value.$el.style.width = `${pl}%`
  rightEditorRef.value.$el.style.width = `${pr}%`
  handleLayoutEditors()
  clearTimeout(layoutTimer)
  layoutTimer = setTimeout(() => handleLayoutEditors(), 300)
}

const handleMouseUp = (e: MouseEvent) => {
  isOnResizing.value = false
  removeEventListeners()
}

const handleLayoutEditors = () => {
  leftEditorRef.value?.layoutEditor()
  rightEditorRef.value?.layoutEditor()
  diffEditorRef.value?.layoutEditor()
}

const handleWindowResize = debounce(() => {
  const WW = wrapRef.value.offsetWidth
  const LW = leftEditorRef.value.$el.offsetWidth
  const pl = (LW / WW) * 100
  const pr = 100 - pl
  leftEditorRef.value.$el.style.width = `${pl}%`
  rightEditorRef.value.$el.style.width = `${pr}%`
  setTimeout(() => handleLayoutEditors(), 200)
}, 300)

watch(
  () => props.isActive,
  (active) => {
    if (active) {
      formatResult.value = {}
      setTimeout(() => handleLayoutEditors())
    }
  },
  { immediate: true },
)

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
.editor-diff {
  .zjs-toolbar {
    .bar-left,
    .bar-right {
      width: 200px;
    }
    .del-l {
      transform: rotate(-15deg);
    }
    .del-r {
      transform: rotate(15deg);
    }
    .bar-right {
      .r-btn {
        width: 100px;
      }
    }
  }
  .source-left {
    width: 50%;
    flex-shrink: 0;
  }
  .source-right {
    width: 100%;
  }
}
[lang='en'] {
  .diff-settings-form {
    .ant-form-item-label {
      width: 110px;
    }
  }
}
</style>
