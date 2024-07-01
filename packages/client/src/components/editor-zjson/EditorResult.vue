<template>
  <div class="editor-result h_100 flex_col_start">
    <div class="zjs-toolbar w_100 flex_end mt_xs fs_3">
      <a-tooltip title="内容推至左边">
        <span class="bar-btn flex_center">
          <SvgToLeft @click="emit('editorAction', { type: 'pushToLeft' })" />
        </span>
      </a-tooltip>
      <a-tooltip v-if="fmtExpand" title="压缩">
        <ShrinkOutlined class="bar-btn" @click="emit('editorAction', { type: 'fmtExpand' })" />
      </a-tooltip>
      <a-tooltip v-else title="展开">
        <ExpandAltOutlined class="bar-btn" @click="emit('editorAction', { type: 'fmtExpand' })" />
      </a-tooltip>
      <a-tooltip v-if="fmtEscape" title="不转义">
        <span class="bar-btn btn-escape flex_center">
          <SvgCycleDot @click="emit('editorAction', { type: 'fmtEscape' })" />
        </span>
      </a-tooltip>
      <a-tooltip v-else title="转义">
        <span class="bar-btn btn-escape flex_center">
          <SvgCycle @click="emit('editorAction', { type: 'fmtEscape' })" />
        </span>
      </a-tooltip>
      <a-tooltip title="标准格式开关">
        <span v-if="fmtStrict" class="bar-btn flex_center">
          <SvgSwitch class="rotate_180" @click="emit('editorAction', { type: 'fmtStrict' })" />
        </span>
        <span v-else class="bar-btn flex_center">
          <SvgSwitch @click="emit('editorAction', { type: 'fmtStrict' })" />
        </span>
      </a-tooltip>
      <a-tooltip title="清空">
        <DeleteOutlined class="bar-btn" @click="emit('editorAction', { type: 'clearResult' })" />
      </a-tooltip>
      <a-tooltip title="复制">
        <CopyOutlined class="bar-btn" @click="handleCopyResult" />
      </a-tooltip>
    </div>
    <div class="editor-wrap w_100 h_100 p_relative pl_0">
      <div class="editor w_100 h_100" ref="editorRef"></div>
      <div v-if="!resultCode" class="resout-hint p_center pe_none">
        <p class="text_center text3 opacity_d75">
          格式化结果输出<br />记得及时存档以备不时之需
        </p>
        <img src="https://s21.ax1x.com/2024/07/02/pkgKwx1.png" alt="">
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
} from '@ant-design/icons-vue'
import { ref, watch, onMounted, onBeforeUnmount, inject } from 'vue'
import { storeToRefs, useAppStore, useEditorStore } from '@/stores'
import { events, copyText } from '@/utils'
import { message } from 'ant-design-vue'
import type { Ref } from 'vue'

const emit = defineEmits(['editorAction'])
const resultCode = inject('resultCode') as Ref<string>
const fmtEscape = inject('fmtEscape') as Ref<boolean>
const fmtExpand = inject('fmtExpand') as Ref<boolean>
const fmtStrict = inject('fmtStrict') as Ref<boolean>
const editorRef = ref()
const isEditorInited = ref(false)
const { isEditorReady } = storeToRefs(useEditorStore())
const { themeMode } = storeToRefs(useAppStore())

let editor = null as any
watch(resultCode, (val) => {
  if (editor && val !== editor.getValue()) {
    editor?.setValue(val)
  }
})

const handleCopyResult = () => {
  copyText(resultCode.value)
  message.success('复制成功')
}

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
    opacity: .2;
  }
}
.editor-result {
  .btn-escape {
    width: 20px;
  }
  .editor-wrap {
    padding: 1px;
    .resout-hint {
      top: 25%;
      font-size: 24px;
      img {
        width: 360px;
        margin-top: 20px;
        margin-left: -20px;
        position: absolute;
        opacity: .4;
        user-select: none;
      }
    }
  }
}
</style>
