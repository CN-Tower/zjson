<template>
  <div class="editor-result h_100 flex_col_start">
    <div class="toobar w_100 flex_end mt_xs fs_3">
      <span class="bar-btn flex_center">
        <SvgToLeft />
      </span>
      <ShrinkOutlined class="bar-btn" />
      <span class="bar-btn flex_center">
        <SvgCycle />
      </span>
      <!-- <span class="bar-btn flex_center">
        <SvgCycleDot />
      </span> -->
      <ClearOutlined class="bar-btn" />
      <DownloadOutlined class="bar-btn" />
      <SaveOutlined class="bar-btn" />
      <CopyOutlined class="bar-btn" />
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
import { CopyOutlined, ShrinkOutlined, ClearOutlined, SaveOutlined, DownloadOutlined } from '@ant-design/icons-vue'
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
.editor-result {
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
