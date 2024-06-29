<template>
  <div class="editor-zjson h_100 flex_start">
    <EditorSource class="zjson-source h_100">
      <div class="dragbar p_absolute t_0 h_100">
        <div class="drag-line p_center h_100"></div>
      </div>
    </EditorSource>
    <EditorResult class="zjson-result h_100" />
  </div>
</template>
  
<script setup lang='ts'>
import EditorSource from './EditorSource.vue'
import EditorResult from './EditorResult.vue'
</script>
  
<style lang="scss"> 
.editor-zjson {
  .zjson-source {
    width: 38%;
  }
  .zjson-result {
    width: 62%;
  }
  .dragbar {
    width: 8px;
    right: -6px;
    cursor: col-resize;
    &:hover {
      .drag-line {
        background: blue;
        opacity: 1;
      }
    }
    .drag-line {
      width: 2px;
      height: 100%;
      transition: all .25s;
      z-index: 99;
      background: var(--border-color-base);
      opacity: .35;
    }
  }
}
</style>