<template>
  <div class="editor-type flex_center p_center">
    <div class="type-item" @click="emits('selectType', 'zjson')">
      <RetweetOutlined />
      <p>转杰森</p>
    </div>
    <div class="type-item" @click="emits('selectType', 'diff')">
      <span>
        <SvgDiff />
      </span>
      <p>文件对比</p>
    </div>
    <div class="type-item" @click="emits('selectType', 'code')">
      <span>
        <SvgCode />
      </span>
      <p>代码编辑</p>
    </div>
  </div>
</template>
  
<script setup lang='ts'>
import SvgDiff from '@/assets/svg/diff.svg'
import SvgCode from '@/assets/svg/code.svg'
import { RetweetOutlined } from '@ant-design/icons-vue'
import { storeToRefs, useEditorStore } from '@/stores'
import { watch } from 'vue'

const emits = defineEmits(['selectType'])
const props = defineProps({
  isActive: {
    type: Boolean
  }
})
const { formatResult } = storeToRefs(useEditorStore())

watch(
  () => props.isActive,
  (active) => {
    if (active) formatResult.value = {}
  },
  { immediate: true }
)
</script>
  
<style lang="scss">
.editor-type {
  top: 40% !important;
  .type-item {
    width: 200px;
    height: 200px;
    margin: 3vw;
    border: 1px solid var(--border-color-base);
    border-radius: 12px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: .65;
    transition: all .25s;
    cursor: pointer;
    &:hover {
      opacity: 1;
      border: 1px solid var(--primary-color);
    }
    .anticon {
      font-size: 50px;
    }
    p {
      margin-top: 18px;
      font-size: 18px;
    }
  }
}
</style>