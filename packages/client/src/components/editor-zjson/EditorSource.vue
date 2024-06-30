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
        <ThunderboltOutlined class="bar-btn" />
      </a-tooltip>
      <a-tooltip title="标准格式开关">
        <span class="bar-btn flex_center">
          <SvgSwitch />
        </span>
        <!-- <span class="bar-btn flex_center">
          <SvgSwitch class="rotate_180" />
        </span> -->
      </a-tooltip>
      <a-tooltip title="清空源码">
        <DeleteOutlined class="bar-btn" />
      </a-tooltip>
      <a-tooltip title="上传文件">
        <UploadOutlined class="bar-btn" />
      </a-tooltip>
      <a-tooltip title="存档记录">
        <FolderOpenOutlined class="bar-btn" />
      </a-tooltip>
      <a-tooltip title="转为JSON">
        <RetweetOutlined class="bar-btn" />
      </a-tooltip>
    </div>
    <div class="editor-wrap w_100 h_100 pr_0">
      <div class="editor w_100 h_100" ref="editorRef"></div>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import SvgSwitch from '@/assets/svg/switch.svg'
import {
  PauseOutlined,
  StepBackwardOutlined,
  RetweetOutlined,
  ThunderboltOutlined,
  DeleteOutlined,
  FolderOpenOutlined,
  UploadOutlined
} from '@ant-design/icons-vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { storeToRefs, useAppStore, useEditorStore } from '@/stores'
import { events } from '@/utils'

const emit = defineEmits(['editorAction'])

const isEditorInited = ref(false)
const isEditorDftLeft = ref(true)
const editorRef = ref()
const { isEditorReady } = storeToRefs(useEditorStore())
const { themeMode } = storeToRefs(useAppStore())
let editor = null as any

const initEditor = () => {
  if (isEditorInited.value || !isEditorReady.value) return
  isEditorInited.value = true
  editor = (window as any).monaco.editor.create(editorRef.value, {
    language: 'text/plain',
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
defineExpose({ layoutEditor, isEditorDftLeft })

events.on('editorReady', () => initEditor())
onMounted(() => setTimeout(() => initEditor()))
onBeforeUnmount(() => editor?.dispose())
</script>

<style lang="scss">
.editor-source {
  .editor-wrap {
    padding: 1px;
  }
}
</style>
