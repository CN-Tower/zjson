<template>
  <a-config-provider :theme="themeConfig">
    <RouterView />
  </a-config-provider>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { storeToRefs, useAppStore, useEditorStore } from '@/stores'
import { events } from '@/utils'
import { message } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import { watchEffect } from 'vue'

const { locale } = useI18n()
const { themeConfig } = storeToRefs(useAppStore())
const { isEditorReady } = storeToRefs(useEditorStore())

watchEffect(() => {
  document.documentElement.lang = locale.value
})

const loaderScript: HTMLScriptElement = document.createElement('script')
loaderScript.type = 'text/javascript'
loaderScript.src = 'https://www.zjson.net/lib/monaco-editor/min/vs/loader.js'
loaderScript.addEventListener('load', () => {
  const win = window as any
  win.require.config({
    paths: { vs: 'https://www.zjson.net/lib/monaco-editor/min/vs' },
  })
  win.MonacoEnvironment = {
    getWorkerUrl: function () {
      return `data:text/javascript;charset=utf-8,${encodeURIComponent(`
        self.MonacoEnvironment = {
          baseUrl: 'https://www.zjson.net/lib/monaco-editor/min/'
        };
        importScripts('https://www.zjson.net/lib/monaco-editor/min/vs/base/worker/workerMain.js');
      `)}`
    },
  }
  win.require(['vs/editor/editor.main'], () => {
    isEditorReady.value = true
    events.emit('editorReady')
  })
})
document.body.appendChild(loaderScript)

message.config({ top: `50px`, duration: 2, maxCount: 3 })
</script>
