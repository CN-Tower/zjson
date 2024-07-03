<template>
  <div class="editor-result h_100 flex_col_start">
    <div class="zjs-toolbar w_100 flex_between mt_xs fs_3">
      <div class="bar-left">
        <a-tooltip :title="t('editor.settings')">
          <SettingOutlined class="bar-btn" @click="handleSettings" />
        </a-tooltip>
      </div>
      <div class="bar-right flex_end">
        <a-tooltip :title="t('editor.pushToLeft')">
          <span class="bar-btn flex_center">
            <SvgToLeft @click="emit('editorAction', { type: 'pushToLeft' })" />
          </span>
        </a-tooltip>
        <a-tooltip v-if="fmtExpand" :title="t('editor.compress')">
          <ShrinkOutlined class="bar-btn" @click="emit('editorAction', { type: 'fmtExpand' })" />
        </a-tooltip>
        <a-tooltip v-else :title="t('editor.stretch')">
          <ExpandAltOutlined class="bar-btn" @click="emit('editorAction', { type: 'fmtExpand' })" />
        </a-tooltip>
        <a-tooltip :title="t('editor.escapeSwitch')">
          <span v-if="fmtEscape" class="bar-btn flex_center">
            <SvgSwitch class="rotate_180" @click="emit('editorAction', { type: 'fmtEscape' })" />
          </span>
          <span v-else class="bar-btn flex_center">
            <SvgSwitch @click="emit('editorAction', { type: 'fmtEscape' })" />
          </span>
        </a-tooltip>
        <a-tooltip :title="t('editor.standardFormatSwitch')">
          <span v-if="fmtStrict" class="bar-btn btn-strict flex_center">
            <SvgCycleDot @click="emit('editorAction', { type: 'fmtStrict' })" />
          </span>
          <span v-else class="bar-btn btn-strict flex_center">
            <SvgCycle @click="emit('editorAction', { type: 'fmtStrict' })" />
          </span>
        </a-tooltip>
        <a-tooltip :title="t('clear')">
          <DeleteOutlined class="bar-btn" @click="emit('editorAction', { type: 'clearResult' })" />
        </a-tooltip>
        <a-tooltip :title="t('copy')">
          <CopyOutlined class="bar-btn" @click="handleCopyResult" />
        </a-tooltip>
      </div>
    </div>
    <div class="editor-wrap w_100 h_100 p_relative pl_0">
      <div class="editor w_100 h_100" ref="editorRef"></div>
      <div v-if="!resultCode" class="resout-hint p_center pe_none">
        <p class="text_center text3 opacity_d75">
          {{ t('editor.resultOutput') }}<br />{{ t('editor.rememberSave') }}
        </p>
        <img
          class="p_center_x"
          src="https://img.picgo.net/2024/07/03/a27c582a154d393ca4.png"
          alt=""
        />
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgToLeft from '@/assets/svg/to_left.svg'
import SvgCycle from '@/assets/svg/cycle.svg'
import SvgCycleDot from '@/assets/svg/cycle_dot.svg'
import SvgSwitch from '@/assets/svg/switch.svg'
import {
  CopyOutlined,
  ShrinkOutlined,
  ExpandAltOutlined,
  DeleteOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue'
import { ref, watch, onMounted, onBeforeUnmount, inject } from 'vue'
import { storeToRefs, useAppStore, useEditorStore } from '@/stores'
import { events, copyText } from '@/utils'
import { message } from 'ant-design-vue'
import type { Ref } from 'vue'
import type { Func } from '@/types'
import { useI18n } from 'vue-i18n'

const emit = defineEmits(['editorAction'])
const resultCode = inject('resultCode') as Ref<string>
const fmtEscape = inject('fmtEscape') as Ref<boolean>
const fmtExpand = inject('fmtExpand') as Ref<boolean>
const fmtStrict = inject('fmtStrict') as Ref<boolean>
const wordWrap = inject('wordWrap') as Ref<number>
const codeIndent = inject('codeIndent') as Ref<number>
const handleSettings = inject('handleSettings') as Func
const editorRef = ref()
const isEditorInited = ref(false)
const { isEditorReady } = storeToRefs(useEditorStore())
const { themeMode } = storeToRefs(useAppStore())
const { t } = useI18n()

let editor = null as any
watch(resultCode, (val) => {
  if (editor && val !== editor.getValue()) {
    editor?.setValue(val)
  }
})

watch(codeIndent, () => {
  setTimeout(() => editor?.updateOptions({ tabSize: codeIndent.value }))
})
watch(wordWrap, () => {
  setTimeout(() => editor?.updateOptions({ wordWrap: wordWrap.value ? 'on' : 'off' }))
})

const handleCopyResult = () => {
  copyText(resultCode.value)
  message.success(t('msg.copySuccess'))
}

const initEditor = () => {
  if (isEditorInited.value || !isEditorReady.value) return
  isEditorInited.value = true
  editor = (window as any).monaco.editor.create(editorRef.value, {
    language: 'json',
    tabSize: codeIndent.value,
    wordWrap: wordWrap.value,
    theme: themeMode.value === 'light' ? 'vs' : 'vs-dark',
    minimap: { enabled: true },
  })
  editor.setValue(resultCode.value || '')
  editor.onDidChangeModelContent(() => {
    resultCode.value = editor.getValue()
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
.dark-mode {
  .editor-result .editor-wrap .resout-hint img {
    opacity: 0.2;
  }
}
.editor-result {
  .btn-strict {
    width: 20px;
  }
  .editor-wrap {
    padding: 1px;
    .resout-hint {
      width: 100%;
      text-align: center;
      top: 25%;
      font-size: 24px;
      user-select: none;
      img {
        width: 360px;
        margin-top: 20px;
        opacity: 0.4;
      }
    }
  }
}
</style>
