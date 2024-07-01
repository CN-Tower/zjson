<template>
  <div class="slect-history">
    <ul class="flex_col_start pd_0 mg_0 list_style_none items_stretch">
      <li class="his-item" @click="handleLoadTpl('zjson')">转杰森 | ZJSON</li>
      <li class="his-item" @click="handleLoadTpl('pyUni')">Py Unicode Collections</li>
      <li class="bb_1 my_sm"></li>
      <li v-if="!saveList.length" class="text3 pd_xs">暂无存档</li>
      <li
        class="his-item"
        v-for="(item, i) in saveList"
        :key="item.time"
        @click="handleLoadSave(item.time)"
      >
        <DeleteOutlined class="item-del mr_sm" @click.stop="handleDelItem(i)" />
        <span>{{ item._time }} {{ item.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue'
import type { Func } from '@/types'
import { ZJSON_SAVE_JSONS } from '@/config'
import { DeleteOutlined } from '@ant-design/icons-vue'
import { formatDate } from '@/utils'

const emit = defineEmits(['select'])
const handleOpenTplate = inject('handleOpenTplate') as Func
const handleOpenHistory = inject('handleOpenHistory') as Func
const saveList = ref(JSON.parse(localStorage.getItem(ZJSON_SAVE_JSONS) || '[]') as any[])
saveList.value.forEach((item) => {
  item._time = formatDate('MM-DD hh:mm', item.time)
})

const handleLoadTpl = (type: 'zjson' | 'pyUni') => {
  handleOpenTplate(type)
  emit('select')
}

const handleLoadSave = (time: number) => {
  handleOpenHistory(time)
  emit('select')
}

const handleDelItem = (i: number) => {
  saveList.value.splice(i, 1)
  localStorage.setItem(ZJSON_SAVE_JSONS, JSON.stringify(saveList.value))
}
</script>

<style lang="scss">
.slect-history {
  width: 300px;
  max-height: 400px;
  overflow-y: auto;
  .his-item {
    padding: 5px;
    cursor: pointer;
    transition: all 0.25s;
    border-radius: 4px;
    white-space: nowrap;
    text-overflow: ellipsis;
    &:hover {
      background-color: var(--component-background-float);
    }
    .item-del {
      color: var(--error-color);
    }
  }
}
</style>
