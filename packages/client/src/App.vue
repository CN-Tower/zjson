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
loaderScript.src = 'https://lf6-cdn-tos.bytecdntp.com/cdn/monaco-editor/0.32.1/min/vs/loader.js'
loaderScript.addEventListener('load', () => {
  const win = window as any
  win.require.config({
    paths: { vs: 'https://lf6-cdn-tos.bytecdntp.com/cdn/monaco-editor/0.32.1/min/vs' },
  })
  win.MonacoEnvironment = {
    getWorkerUrl: function () {
      return `data:text/javascript;charset=utf-8,${encodeURIComponent(`
        self.MonacoEnvironment = {
          baseUrl: 'https://lf6-cdn-tos.bytecdntp.com/cdn/monaco-editor/0.32.1/min/'
        };
        importScripts('https://lf6-cdn-tos.bytecdntp.com/cdn/monaco-editor/0.32.1/min/vs/base/worker/workerMain.js');
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
