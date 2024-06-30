<template>
  <div class="editor-result h_100 flex_col_start">
    <div class="zjs-toolbar w_100 flex_end mt_xs fs_3">
      <a-tooltip title="内容推至左边">
        <span class="bar-btn flex_center">
          <SvgToLeft />
        </span>
      </a-tooltip>
      <a-tooltip title="压缩">
        <ShrinkOutlined class="bar-btn" />
      </a-tooltip>
      <a-tooltip title="转义">
        <span class="bar-btn flex_center">
          <SvgCycle />
        </span>
      </a-tooltip>
      <a-tooltip title="不转义">
        <!-- <span class="bar-btn flex_center">
          <SvgCycleDot />
        </span> -->
      </a-tooltip>
      <a-tooltip title="清空">
        <DeleteOutlined class="bar-btn" />
      </a-tooltip>
      <a-tooltip title="下载">
        <DownloadOutlined class="bar-btn" />
      </a-tooltip>
      <a-tooltip title="存档">
        <SaveOutlined class="bar-btn" />
      </a-tooltip>
      <a-tooltip title="复制">
        <CopyOutlined class="bar-btn" />
      </a-tooltip>
    </div>
    <div class="editor-wrap w_100 h_100 p_relative pl_0">
      <div class="editor w_100 h_100" ref="editorRef"></div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgToLeft from '@/assets/svg/to_left.svg'
import SvgCycle from '@/assets/svg/cycle.svg'
import SvgCycleDot from '@/assets/svg/cycle_dot.svg'
import { CopyOutlined, ShrinkOutlined, DeleteOutlined, SaveOutlined, DownloadOutlined } from '@ant-design/icons-vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { storeToRefs, useAppStore, useEditorStore } from '@/stores'
import { events } from '@/utils'

const editorRef = ref()
const isEditorInited = ref(false)
const { isEditorReady } = storeToRefs(useEditorStore())
const { themeMode } = storeToRefs(useAppStore())
let editor = null as any

const initEditor = () => {
  if (isEditorInited.value || !isEditorReady.value) return
  isEditorInited.value = true
  editor = (window as any).monaco.editor.create(editorRef.value, {
    language: 'json',
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
const setResultValue = (val: string) => {
  editor?.setValue(val)
}
defineExpose({ layoutEditor, setResultValue })

events.on('editorReady', () => initEditor())
onMounted(() => setTimeout(() => initEditor()))
onBeforeUnmount(() => editor?.dispose())
</script>

<style lang="scss">
.editor-result {
  .editor-wrap {
    padding: 1px;
  }
}
</style>
