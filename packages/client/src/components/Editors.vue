<template>
  <a-tabs
    class="zjs-tabs"
    v-model:activeKey="activeKey"
    type="editable-card"
    size="small"
    @edit="onEdit"
  >
    <a-tab-pane v-for="tab in editorTabs" :key="tab.key" :tab="tab.title" :closable="isTabClosable">
      <div class="zjs-editor">
        <template v-if="tab.type">
          <component :is="editorComps[tab.type]"></component>
        </template>
        <EditorType v-else />
      </div>
    </a-tab-pane>
  </a-tabs>
</template>

<script setup lang="ts">
import { ref, shallowRef, reactive, computed } from 'vue'
import EditorZjson from './editor-zjson/EditorZjson.vue'
import EditorType from './EditorType.vue'
import EditorDiff from './editor-diff/EditorDiff.vue'
import EditorCode from './editor-code/EditorCode.vue'

const editorComps = shallowRef({
  zjson: EditorZjson,
  diff: EditorDiff,
  code: EditorCode
})
type IEditorType = 'zjson' | 'diff' | 'code'
interface IEditorTab {
  title: string
  key: string
  type?: IEditorType
  closable?: boolean
}
const editorTabs = ref<IEditorTab[]>([
  { title: `ZJSON-${Date.now().toString().substr(-8)}`, key: 'defaultKey', type: 'zjson' }
])

const isTabClosable = computed(() => editorTabs.value.length > 1)

const activeKey = ref(editorTabs.value[0].key)

const newTabIndex = ref(0)

const add = () => {
  activeKey.value = `NewTab${++newTabIndex.value}`
  editorTabs.value.push({ title: `TAB-${Date.now().toString().substr(-8)}`, key: activeKey.value })
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
  .zjs-tabs.ant-tabs {
    .ant-tabs-tab-active {
      background: #1E1E1E;
      border-bottom-color: #1E1E1E;
    }
  }
}
.zjs-tabs.ant-tabs {
  .ant-tabs-tab, .ant-tabs-tab-active {
    transition: background 0s !important; 
  }
  .ant-tabs-tab, .ant-tabs-nav-more {
    padding: 2px 16px !important;
  }
  .ant-tabs-nav {
    margin-bottom: 0;
  }
}
.zjs-editor {
  height: calc(100vh - 84px);
}
</style>
