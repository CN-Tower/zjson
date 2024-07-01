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
        <a-tooltip title="拆分编辑器">
          <SplitCellsOutlined
            class="bar-btn"
            :class="{ disabled: isEditorNumMax }"
            @click="emit('split')"
          />
        </a-tooltip>
        <a-tooltip title="清空">
          <DeleteOutlined class="bar-btn" />
        </a-tooltip>
        <a-tooltip title="存档历史">
          <FolderOpenOutlined class="bar-btn" />
        </a-tooltip>
        <a-tooltip title="存档">
          <SaveOutlined class="bar-btn" />
        </a-tooltip>
        <a-tooltip v-if="codeEditors.length > 1" title="关闭">
          <CloseOutlined class="bar-btn" @click="emit('close')" />
        </a-tooltip>
      </div>
    </div>
    <div class="code-content w_100 h_100">
      <div class="editor w_100 h_100" ref="editorRef"></div>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import {
  DeleteOutlined,
  SplitCellsOutlined,
  FolderOpenOutlined,
  SaveOutlined,
  CloseOutlined
} from '@ant-design/icons-vue'
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { storeToRefs, useAppStore, useEditorStore } from '@/stores'
import { events } from '@/utils'
import { EDITOR_LANGS } from '@/config'

const props = defineProps({
  codeEditors: {
    type: Object,
    default: () => ({})
  },
  isEditorNumMax: {
    type: Boolean
  }
})
const emit = defineEmits(['split', 'close'])
const { isEditorReady } = storeToRefs(useEditorStore())
const { themeMode } = storeToRefs(useAppStore())
const editorRef = ref()
const isEditorInited = ref(false)
const editorLang = ref('json')
let editor = null as any

watch(editorLang, () => {
  console.log(editorLang.value)
  editor?.updateOptions({ language: editorLang.value })
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
