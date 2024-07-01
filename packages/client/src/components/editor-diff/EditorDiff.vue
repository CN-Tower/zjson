<template>
  <div class="editor-diff h_100 flex_col_start">
    <div class="zjs-toolbar w_100 flex_between mt_xs fs_3">
      <div class="bar-left pl_sm flex_start">
        <span class="fs_5">语言：</span>
        <a-select class="zjs-selector" v-model:value="editorLang" style="width: 120px" size="small">
          <a-select-option value="json">json</a-select-option>
          <a-select-option value="html">html</a-select-option>
          <a-select-option value="css">css</a-select-option>
          <a-select-option value="javascript">javascript</a-select-option>
          <a-select-option value="typescript">typescript</a-select-option>
        </a-select>
      </div>
      <div class="bar-center">
        <a-tooltip title="清空左侧">
          <DeleteOutlined class="bar-btn del-l mr_lg" />
        </a-tooltip>
        <a-tooltip title="左右交换">
          <SwapOutlined class="bar-btn" />
        </a-tooltip>
        <a-tooltip title="推到中间">
          <PauseOutlined class="bar-btn" @click="handleCenterSource" />
        </a-tooltip>
        <a-tooltip title="存档历史">
          <FolderOpenOutlined class="bar-btn" />
        </a-tooltip>
        <a-tooltip title="存档">
          <SaveOutlined class="bar-btn" />
        </a-tooltip>
        <a-tooltip title="清空右侧">
          <DeleteOutlined class="bar-btn del-r ml_xxl" />
        </a-tooltip>
      </div>
      <div class="bar-right flex_end">
        <a-button class="r-btn zjs-button" v-if="isShowDiff" size="small" @click="handleEdit">
          <EditOutlined />
          <span class="fs_5">编辑</span>
        </a-button>
        <a-button class="r-btn zjs-button" v-else size="small" @click="handleDiff">
          <CheckOutlined />
          <span class="fs_5">对比</span>
        </a-button>
      </div>
    </div>
    <div class="diff-content w_100 h_100">
      <div v-if="!isShowDiff" class="h_100 flex_between" ref="wrapRef">
        <SourceEditor class="source-left" ref="leftRef">
          <div
            class="zjs-dragbar p_absolute t_0 h_100"
            :class="{ active: isOnResizing }"
            @mousedown="handleMouseDown"
          >
            <div class="drag-line p_center h_100"></div>
          </div>
        </SourceEditor>
        <SourceEditor class="source-right" ref="rightRef" />
      </div>
      <DiffEditor />
    </div>
  </div>
</template>

<script setup lang="ts">
import SourceEditor from './SourceEditor.vue'
import DiffEditor from './DiffEditor.vue'
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import {
  PauseOutlined,
  SwapOutlined,
  DeleteOutlined,
  FolderOpenOutlined,
  SaveOutlined,
  CheckOutlined,
  EditOutlined
} from '@ant-design/icons-vue'
import { storeToRefs, useEditorStore } from '@/stores'

const props = defineProps({
  isActive: {
    type: Boolean
  }
})
const isShowDiff = ref(false)
const isOnResizing = ref(false)
const wrapRef = ref()
const leftRef = ref()
const rightRef = ref()
const editorLang = ref('json')
const { formatResult } = storeToRefs(useEditorStore())

watch(
  () => props.isActive,
  (active) => {
    if (active) formatResult.value = {}
  },
  { immediate: true }
)

/**
 * ===========================================================================
 * 响应页面事件
 * ===========================================================================
 */
const handleCenterSource = () => {
  if (isShowDiff.value) {

  } else {
    leftRef.value.$el.style = '50%'
    rightRef.value.$el.style = '50%'
    handleLayoutEditors()
  }
}

const handleEdit = () => {
  isShowDiff.value = false
}
const handleDiff = () => {
  isShowDiff.value = true
}

/**
 * ===========================================================================
 * 左右拖动调整大小
 * ===========================================================================
 */
let ww = 0
let ox = 0
let ow = 0

const handleMouseDown = (e: MouseEvent) => {
  if (!wrapRef.value) return
  ww = wrapRef.value.offsetWidth
  if (ww < 800) {
    return
  }
  ox = e.clientX
  ow = leftRef.value.$el.offsetWidth
  isOnResizing.value = true
  removeEventListeners()
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

let layoutTimer = null as any
const handleMouseMove = (e: MouseEvent) => {
  if (!isOnResizing.value) return
  const cx = e.clientX
  const dx = cx - ox
  let nw = ow + dx
  if (nw < 400) nw = 400
  if (nw + 400 > ww) nw = ww - 400
  const pl = (nw / ww) * 100
  const pr = 100 - pl
  leftRef.value.$el.style.width = `${pl}%`
  rightRef.value.$el.style.width = `${pr}%`
  handleLayoutEditors()
  clearTimeout(layoutTimer)
  layoutTimer = setTimeout(() => handleLayoutEditors(), 300)
}

const handleMouseUp = (e: MouseEvent) => {
  isOnResizing.value = false
  removeEventListeners()
}

const handleLayoutEditors = () => {
  leftRef.value?.layoutEditor()
  rightRef.value?.layoutEditor()
}

const removeEventListeners = () => {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
  window.addEventListener('resize', handleLayoutEditors)
}

onMounted(() => {
  window.addEventListener('resize', handleLayoutEditors)
})
onBeforeUnmount(() => removeEventListeners())
</script>

<style lang="scss">
.editor-diff {
  .zjs-toolbar {
    .bar-left, .bar-right {
      width: 200px;
    }
    .del-l {
      transform: rotate(-15deg);
    }
    .del-r {
      transform: rotate(15deg);
    }
    .bar-right {
      .r-btn {
        width: 90px;
      }
    }
  }
  .source-left {
    width: 50%;
    flex-shrink: 0;
  }
  .source-right {
    width: 100%;
  }
}
</style>
