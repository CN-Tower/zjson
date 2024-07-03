<template>
  <div class="code-editor h_100 flex_col_start mt_sm p_relative">
    <div class="zjs-toolbar w_100 flex_between">
      <div class="bar-left pl_sm flex_start">
        <span class="fs_5">语言：</span>
        <a-select class="zjs-selector" v-model:value="editorLang" style="width: 120px" size="small">
          <a-select-option v-for="l in EDITOR_LANGS" :value="l" :key="l">{{ l }}</a-select-option>
        </a-select>
      </div>
      <div class="bar-right">
        <a-tooltip title="清空">
          <DeleteOutlined class="bar-btn" @click="handleDelCode" />
        </a-tooltip>
        <a-popover trigger="click" placement="bottom">
          <template #content>
            <SaveHistory @select="saveHistoryRef.click()" :key="historyKey" />
          </template>
          <a-tooltip title="存档历史">
            <FolderOpenOutlined class="bar-btn" ref="saveHistoryRef" />
          </a-tooltip>
        </a-popover>
        <a-tooltip title="存档">
          <SaveOutlined class="bar-btn" @click="handleSaveFile" />
        </a-tooltip>
        <a-tooltip title="设置">
          <SettingOutlined class="bar-btn" @click="handleSettings" />
        </a-tooltip>
        <a-tooltip title="拆分编辑器">
          <SplitCellsOutlined
            class="bar-btn"
            :class="{ disabled: isEditorNumMax }"
            @click="emit('split')"
          />
        </a-tooltip>
        <a-tooltip v-if="codeEditors.length > 1" title="关闭">
          <CloseOutlined class="bar-btn" @click="emit('close')" />
        </a-tooltip>
      </div>
    </div>
    <div class="code-content w_100 h_100 p_relative">
      <div class="editor w_100 h_100" ref="editorRef"></div>
      <p
        v-if="!editorCode"
        class="zjs-placeholder p_center text_center text3 opacity_d75 pe_none fs_1xx"
      >
        <img
          class="code-img img-lg"
          v-if="index === 0"
          src="https://img.picgo.net/2024/07/03/11130c620a3e44582.png"
          alt=""
        />
        <img
          class="code-img img-lg"
          v-else-if="index === 1"
          src="https://img.picgo.net/2024/07/03/259d00a2e5b22910f.png"
          alt=""
        />
        <img
          class="code-img img-lg"
          v-else
          src="https://img.picgo.net/2024/07/03/318105d607a38be22.png"
          alt=""
        />
      </p>
    </div>
    <slot></slot>
    <!-- 存档弹窗 -->
    <a-modal v-model:open="isShowSaveMode" title="存档">
      <div class="my_md">
        <a-input placeholder="请输入存档名称" v-model:value="saveName"></a-input>
      </div>
      <template #footer>
        <a-button @click="isShowSaveMode = false">取消</a-button>
        <a-button type="primary" :disabled="!saveName.trim()" @click="submitSaveFile"
          >保存</a-button
        >
      </template>
    </a-modal>
    <!-- 设置弹窗 -->
    <a-modal v-model:open="isShowSettingsMode" title="代码编辑器设置">
      <a-form class="mt_md form-item">
        <a-form-item label="超出换行：">
          <a-radio-group v-model:value="wordWrap">
            <a-radio :value="true">自动换行</a-radio>
            <a-radio :value="false">不换行</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="检测缩进：">
          <a-radio-group v-model:value="detectIndentation">
            <a-radio :value="true">自动检测</a-radio>
            <a-radio :value="false">不检测</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="缩进大小：">
          <a-select class="w_100" v-model:value="tabSize">
            <a-select-option v-for="i in 8" :value="i">{{ i }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="保存设置：">
          <a-checkbox v-model:checked="isSaveToLocal" name="type">是否保存设置持久生效</a-checkbox>
        </a-form-item>
      </a-form>
      <template #footer>
        <a-button type="primary" @click="isShowSettingsMode = false">确定</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import SaveHistory from './SaveHistory.vue'
import {
  DeleteOutlined,
  SplitCellsOutlined,
  FolderOpenOutlined,
  SaveOutlined,
  CloseOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue'
import { ref, watch, onMounted, onBeforeUnmount, provide, inject, type Ref } from 'vue'
import { storeToRefs, useAppStore, useEditorStore } from '@/stores'
import { events } from '@/utils'
import { EDITOR_LANGS, ZJSON_SAVE_CODES, ZJSON_CODE_SETTINGS } from '@/config'
import { message } from 'ant-design-vue'

const props = defineProps({
  codeEditors: {
    type: Object,
    default: () => ({}),
  },
  isEditorNumMax: {
    type: Boolean,
  },
  index: {
    type: Number,
  },
})
const emit = defineEmits(['split', 'close'])
const historyKey = inject('historyKey') as Ref<number>
const { isEditorReady } = storeToRefs(useEditorStore())
const { themeMode } = storeToRefs(useAppStore())
const editorRef = ref()
const isEditorInited = ref(false)
const editorLang = ref('json')
const editorCode = ref('')
const saveName = ref('')
const isShowSaveMode = ref(false)
const saveHistoryRef = ref()
const tabSize = ref(2)
const wordWrap = ref(true)
const detectIndentation = ref(true)
const isSaveToLocal = ref(false)
const isShowSettingsMode = ref(false)
let editor = null as any

const localSettings = JSON.parse(localStorage.getItem(ZJSON_CODE_SETTINGS) || '{}')
if (localSettings.isSaveToLocal) {
  tabSize.value = localSettings.tabSize
  wordWrap.value = localSettings.wordWrap
  detectIndentation.value = localSettings.detectIndentation
  isSaveToLocal.value = localSettings.isSaveToLocal
}

watch(editorCode, (code) => {
  if (editor && code !== editor.getValue()) {
    editor.setValue(code)
  }
})

watch(editorLang, () => {
  const model = editor?.getModel()
  if (model) {
    ;(window as any).monaco.editor.setModelLanguage(model, editorLang.value)
  }
})

watch([tabSize, wordWrap, detectIndentation], () => {
  // isShowSettingsMode.value = false
  if (isSaveToLocal.value) saveSettingsToLocal()
  setTimeout(() => {
    editor?.updateOptions({
      tabSize: tabSize.value,
      wordWrap: wordWrap.value ? 'on' : 'off',
      detectIndentation: detectIndentation.value,
    })
  })
})

watch(isSaveToLocal, () => saveSettingsToLocal())

const saveSettingsToLocal = () => {
  localStorage.setItem(
    ZJSON_CODE_SETTINGS,
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

const handleDelCode = () => {
  editorCode.value = ''
}

const handleSettings = () => {
  isShowSettingsMode.value = true
}

/**
 * 存档
 */
const handleSaveFile = () => {
  if (!editorCode.value.trim()) {
    message.warning('空文件不能保存')
    return
  }
  const code = editorCode.value.replace(/[\s\r\n]/g, '')
  saveName.value = code.length > 20 ? code.substr(0, 20) + ' ...' : code
  isShowSaveMode.value = true
}

const submitSaveFile = () => {
  const savedList = JSON.parse(localStorage.getItem(ZJSON_SAVE_CODES) || '[]')
  savedList.unshift({
    name: saveName.value,
    lang: editorLang.value,
    code: editorCode.value,
    time: Date.now(),
  })
  if (savedList.length > 20) {
    savedList.pop()
  }
  localStorage.setItem(ZJSON_SAVE_CODES, JSON.stringify(savedList))
  isShowSaveMode.value = false
  historyKey.value = Math.random()
  message.success('存档成功')
}

/**
 * 打开历史存档
 */
const handleOpenHistory = (time: number) => {
  const savedList = JSON.parse(localStorage.getItem(ZJSON_SAVE_CODES) || '[]')
  const item = savedList.find((item: any) => item.time === time)
  if (item) {
    editorLang.value = item.lang || 'plaintext'
    editorCode.value = item.code
  }
}
provide('handleOpenHistory', handleOpenHistory)

/**
 * ===========================================================================
 * 初始化编辑器
 * ===========================================================================
 */
const initEditor = () => {
  if (isEditorInited.value || !isEditorReady.value) return
  isEditorInited.value = true
  editor = (window as any).monaco.editor.create(editorRef.value, {
    language: editorLang.value,
    tabSize: 2,
    wordWrap: 'on',
    theme: themeMode.value === 'light' ? 'vs' : 'vs-dark',
    minimap: { enabled: true },
    detectIndentation: detectIndentation.value,
  })
  editor.setValue(editorCode.value)
  editor.onDidChangeModelContent(() => {
    editorCode.value = editor.getValue()
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
.code-editor {
  width: 100%;
  .code-content {
    padding: 1px;
  }
}
</style>
