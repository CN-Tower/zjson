<template>
  <div class="editor-type flex_center p_center">
    <div class="type-item">
      <RetweetOutlined />
      <p>转杰森</p>
    </div>
    <div class="type-item">
      <span>
        <SvgDiff />
      </span>
      <p>文件对比</p>
    </div>
    <div class="type-item">
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
</script>
  
<style lang="scss">
.editor-type {
  top: 45% !important;
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