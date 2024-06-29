<template>
  <div class="editor-source h_100 flex_col_start p_relative">
    <div class="toobar w_100 flex_end mt_xs fs_3">
      <PauseOutlined class="bar-btn" />
      <ThunderboltOutlined class="bar-btn" />
      <span class="bar-btn flex_center">
        <SvgSwitch />
      </span>
      <!-- <span class="bar-btn flex_center">
        <SvgSwitch class="rotate_180" />
      </span> -->
      <ClearOutlined class="bar-btn" />
      <UploadOutlined class="bar-btn" />
      <FolderOpenOutlined class="bar-btn" />
      <RetweetOutlined class="bar-btn" />
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
  RetweetOutlined,
  ThunderboltOutlined,
  ClearOutlined,
  FolderOpenOutlined,
  UploadOutlined
} from '@ant-design/icons-vue'
import { ref, onMounted } from 'vue'
import { storeToRefs, useAppStore, useEditorStore } from '@/stores'
import { events } from '@/utils'

const isEditorInited = ref(false)
const editorRef = ref()
const { isEditorReady } = storeToRefs(useEditorStore())
const { themeMode } = storeToRefs(useAppStore())

const initEditor = () => {
  if (isEditorInited.value || !isEditorReady.value) return
  isEditorInited.value = true
  ;(window as any).monaco.editor.create(editorRef.value, {
    language: 'text/plain',
    tabSize: 2,
    wordWrap: 'on',
    theme: themeMode.value === 'light' ? 'vs' : 'vs-dark',
    minimap: { enabled: true },
    scrollbar: { horizontal: 'hidden' }
  })
}

events.on('editorReady', () => initEditor())
onMounted(() => setTimeout(() => initEditor()))
</script>

<style lang="scss">
.editor-source {
  .toobar {
    height: 30px;
    padding-right: 12px;
    .bar-btn {
      margin-left: 12px;
      cursor: pointer;
      transition: color 0.25s;
      &:hover {
        color: var(--primary-color);
      }
    }
  }
  .editor-wrap {
    padding: 1px;
  }
}
</style>
