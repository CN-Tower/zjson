<template>
  <div class="editor-source h_100 flex_col_start p_relative">
    <div class="zjs-toolbar w_100 flex_end mt_xs fs_3">
      <a-tooltip v-if="isEditorDftLeft" title="推到中间">
        <PauseOutlined class="bar-btn" @click="emit('editorAction', { type: 'putCenter' })" />
      </a-tooltip>
      <a-tooltip v-else="isEditorDftLeft" title="推到默认位置">
        <StepBackwardOutlined class="bar-btn" @click="emit('editorAction', { type: 'putLeft' })" />
      </a-tooltip>
      <a-tooltip title="源码反转义">
        <ThunderboltOutlined
          class="bar-btn"
          @click="emit('editorAction', { type: 'unescapeSrc' })"
        />
      </a-tooltip>
      <a-popover trigger="click" placement="bottom">
        <template #content>
          <SelectSaveHistory @select="saveHistoryRef.click()" :key="historyKey" />
        </template>
        <a-tooltip title="存档记录">
          <FolderOpenOutlined class="bar-btn" ref="saveHistoryRef" @click="emit('editorAction', { type: 'openFile' })" />
        </a-tooltip>
      </a-popover>
      <a-tooltip title="存档">
        <SaveOutlined class="bar-btn" @click="emit('editorAction', { type: 'saveFile' })" />
      </a-tooltip>
      <a-tooltip title="清空源码">
        <DeleteOutlined class="bar-btn" @click="emit('editorAction', { type: 'clearSource' })" />
      </a-tooltip>
      <a-tooltip title="转为JSON">
        <RetweetOutlined class="bar-btn" @click="emit('editorAction', { type: 'fmtJson' })" />
      </a-tooltip>
    </div>
    <div class="editor-wrap w_100 h_100 pr_0 p_relative">
      <div class="editor w_100 h_100" ref="editorRef"></div>
      <p v-if="!sourceCode" class="source-hint p_center text_center text3 opacity_d75 pe_none">
        在此处输入或者粘贴<br />需要格式化的JSON原代码
      </p>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import SelectSaveHistory from './SelectSaveHistory.vue'
import { ref, watch, onMounted, onBeforeUnmount, inject } from 'vue'
import { storeToRefs, useAppStore, useEditorStore } from '@/stores'
import {
  PauseOutlined,
  StepBackwardOutlined,
  RetweetOutlined,
  ThunderboltOutlined,
  DeleteOutlined,
  FolderOpenOutlined,
  SaveOutlined,
  UploadOutlined
} from '@ant-design/icons-vue'
import { events } from '@/utils'
import type { Ref } from 'vue'

const props = defineProps({
  historyKey: {
    type: Number,
  }
})
const emit = defineEmits(['editorAction'])
const sourceCode = inject('sourceCode') as Ref<string>
const isEditorInited = ref(false)
const isEditorDftLeft = ref(true)
const editorRef = ref()
const { isEditorReady } = storeToRefs(useEditorStore())
const { themeMode } = storeToRefs(useAppStore())
const saveHistoryRef = ref()

let editor = null as any
watch(sourceCode, (val) => {
  if (editor && val !== editor.getValue()) {
    editor?.setValue(val)
  }
})

const initEditor = () => {
  if (isEditorInited.value || !isEditorReady.value) return
  isEditorInited.value = true
  editor = (window as any).monaco.editor.create(editorRef.value, {
    language: 'plaintext',
    tabSize: 2,
    wordWrap: 'on',
    theme: themeMode.value === 'light' ? 'vs' : 'vs-dark',
    minimap: { enabled: true },
    scrollbar: { horizontal: 'hidden' }
  })
  editor.setValue(sourceCode.value || '')
  editor.onDidChangeModelContent(() => {
    sourceCode.value = editor.getValue()
  })
}

const layoutEditor = () => {
  editor?.layout()
}
defineExpose({ layoutEditor, isEditorDftLeft })

events.on('editorReady', () => initEditor())
onMounted(() => setTimeout(() => initEditor()))
onBeforeUnmount(() => editor?.dispose())
</script>

<style lang="scss">
.editor-source {
  .editor-wrap {
    padding: 1px;
    .source-hint {
      top: 30%;
      font-size: 24px;
    }
  }
}
</style>
