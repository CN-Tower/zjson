<template>
  <div id="zjs-loading" v-show="isShowLoading">
    <div class="loadingBg"></div>
    <div class="loadingText top45 mr_md">
      <div class="loadingGif">
        <div class="loader ball-clip-rotate-multiple">
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { events } from '@/utils'

const isShowLoading = ref(true)
events.on('editorReady', () => {
  isShowLoading.value = false
})
</script>

<style></style>
