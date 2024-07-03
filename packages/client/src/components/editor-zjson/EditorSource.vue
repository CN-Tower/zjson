<template>
  <div class="editor-source h_100 flex_col_start p_relative">
    <div class="zjs-toolbar w_100 flex_end mt_xs fs_3">
      <a-tooltip v-if="isEditorDftLeft" :title="t('editor.toCenter')">
        <PauseOutlined class="bar-btn" @click="emit('editorAction', { type: 'putCenter' })" />
      </a-tooltip>
      <a-tooltip v-else="isEditorDftLeft" :title="t('editor.toDefaultPos')">
        <StepBackwardOutlined class="bar-btn" @click="emit('editorAction', { type: 'putLeft' })" />
      </a-tooltip>
      <a-tooltip :title="t('editor.srcUnescape')">
        <ThunderboltOutlined
          class="bar-btn"
          @click="emit('editorAction', { type: 'unescapeSrc' })"
        />
      </a-tooltip>
      <a-popover trigger="click" placement="bottom">
        <template #content>
          <SelectSaveHistory @select="saveHistoryRef.click()" :key="historyKey" />
        </template>
        <a-tooltip :title="t('editor.savedRecords')">
          <FolderOpenOutlined
            class="bar-btn"
            ref="saveHistoryRef"
            @click="emit('editorAction', { type: 'openFile' })"
          />
        </a-tooltip>
      </a-popover>
      <a-tooltip :title="t('editor.save')">
        <SaveOutlined class="bar-btn" @click="emit('editorAction', { type: 'saveFile' })" />
      </a-tooltip>
      <a-tooltip :title="t('editor.clearSource')">
        <DeleteOutlined class="bar-btn" @click="emit('editorAction', { type: 'clearSource' })" />
      </a-tooltip>
      <a-tooltip :title="t('editor.toJson')">
        <RetweetOutlined class="bar-btn" @click="emit('editorAction', { type: 'fmtJson' })" />
      </a-tooltip>
    </div>
    <div class="editor-wrap w_100 h_100 pr_0 p_relative">
      <div class="editor w_100 h_100" ref="editorRef"></div>
      <div v-if="!sourceCode" class="source-hint p_center pe_none">
        <p class="text_center text3 opacity_d75">
          {{ t('editor.enterOrPaste') }}<br />{{ t('editor.jsonLikeStr') }}
        </p>
        <img
          class="p_center_x"
          src="https://img.picgo.net/2024/07/03/a102e8853fab7b6b7d.png"
          alt=""
        />
      </div>
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
} from '@ant-design/icons-vue'
import { events } from '@/utils'
import type { Ref } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  historyKey: {
    type: Number,
  },
})
const emit = defineEmits(['editorAction'])
const sourceCode = inject('sourceCode') as Ref<string>
const isEditorInited = ref(false)
const isEditorDftLeft = ref(true)
const editorRef = ref()
const { isEditorReady } = storeToRefs(useEditorStore())
const { themeMode } = storeToRefs(useAppStore())
const saveHistoryRef = ref()
const { t } = useI18n()

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
    scrollbar: { horizontal: 'hidden' },
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
.dark-mode {
  .editor-source .editor-wrap .source-hint img {
    opacity: 0.2;
  }
}
.editor-source {
  .editor-wrap {
    padding: 1px;
    .source-hint {
      width: 100%;
      text-align: center;
      top: 25%;
      font-size: 24px;
      user-select: none;
      img {
        width: 220px;
        margin-top: 20px;
        margin-left: -20px;
        opacity: 0.4;
      }
    }
  }
}
</style>
