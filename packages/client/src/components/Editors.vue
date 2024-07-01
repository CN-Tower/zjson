<template>
  <main class="zjs-content">
    <a-tabs
      class="zjs-tabs"
      v-model:activeKey="activeKey"
      type="editable-card"
      size="small"
      @edit="onEdit"
    >
      <a-tab-pane v-for="tab in editorTabs" :key="tab.key" :closable="isTabClosable">
        <template #tab>
          <EditorTab :tab="tab" />
        </template>
        <div class="zjs-editor">
          <template v-if="tab.type">
            <component :is="editorComps[tab.type]" :isActive="tab.key === activeKey"></component>
          </template>
          <EditorType
            v-else
            :isActive="tab.key === activeKey"
            @selectType="handleSelectType(tab, $event)"
          />
        </div>
      </a-tab-pane>
    </a-tabs>
  </main>
</template>

<script setup lang="ts">
import { ref, shallowRef, reactive, computed } from 'vue'
import EditorZjson from './editor-zjson/EditorZjson.vue'
import EditorType from './EditorType.vue'
import EditorTab from './EditorTab.vue'
import EditorDiff from './editor-diff/EditorDiff.vue'
import EditorCode from './editor-code/EditorCode.vue'
import type { IEditorType, IEditorTab } from '@/types'

const editorComps = shallowRef({
  zjson: EditorZjson,
  diff: EditorDiff,
  code: EditorCode
})

const editorTabs = ref<IEditorTab[]>([
  { title: `${Date.now().toString().substr(-8)}`, key: 'defaultKey', type: 'zjson' }
])

const isTabClosable = computed(() => editorTabs.value.length > 1)
const activeKey = ref(editorTabs.value[0].key)
const newTabIndex = ref(0)

const handleSelectType = (tab: IEditorTab, type: IEditorType) => {
  tab.type = type
}

const add = () => {
  activeKey.value = `NewTab${++newTabIndex.value}`
  editorTabs.value.push({ title: `${Date.now().toString().substr(-8)}`, key: activeKey.value })
}

const remove = (targetKey: string) => {
  let lastIndex = 0
  editorTabs.value.forEach((tab, i) => {
    if (tab.key === targetKey) {
      lastIndex = i - 1
    }
  })
  editorTabs.value = editorTabs.value.filter((tab) => tab.key !== targetKey)
  if (editorTabs.value.length && activeKey.value === targetKey) {
    if (lastIndex >= 0) {
      activeKey.value = editorTabs.value[lastIndex].key
    } else {
      activeKey.value = editorTabs.value[0].key
    }
  }
}

const onEdit = (targetKey: string | MouseEvent, action: string) => {
  if (action === 'add') {
    add()
  } else {
    remove(targetKey as string)
  }
}
</script>

<style lang="scss">
.dark-mode {
  .zjs-content {
    .ant-tabs {
      .ant-tabs-tab-active {
        background: #1e1e1e;
        border-bottom-color: #1e1e1e;
      }
    }
  }
}
.zjs-content {
  .ant-tabs {
    .ant-tabs-tab {
      user-select: none;
    }
    .ant-tabs-tab,
    .ant-tabs-tab-active {
      transition: background 0s !important;
    }
    .ant-tabs-tab,
    .ant-tabs-nav-more {
      padding: 2px 16px !important;
    }
    .ant-tabs-nav {
      margin-bottom: 0;
    }
  }
  .zjs-editor {
    height: calc(100vh - 82px);
  }
}
</style>
