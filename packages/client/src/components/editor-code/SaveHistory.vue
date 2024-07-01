<template>
  <div class="save-history">
    <ul class="flex_col_start pd_0 mg_0 list_style_none items_stretch">
      <li v-if="!saveList.length" class="text3 pd_xs">暂无存档</li>
      <li
        class="his-item"
        v-for="(item, i) in saveList"
        :key="item.time"
        @click="handleSelectItem(item.time)"
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
import { ZJSON_SAVE_CODES } from '@/config'
import { DeleteOutlined } from '@ant-design/icons-vue'
import { formatDate } from '@/utils'

const emit = defineEmits(['select'])
const handleOpenHistory = inject('handleOpenHistory') as Func
const saveList = ref(JSON.parse(localStorage.getItem(ZJSON_SAVE_CODES) || '[]') as any[])
saveList.value.forEach((item) => {
  item._time = formatDate('MM-DD hh:mm', item.time)
})

const handleSelectItem = (time: number) => {
  handleOpenHistory(time)
  emit('select')
}

const handleDelItem = (i: number) => {
  saveList.value.splice(i, 1)
  localStorage.setItem(ZJSON_SAVE_CODES, JSON.stringify(saveList.value))
}
</script>

<style lang="scss">
.save-history {
  width: 300px;
  max-height: 400px;
  overflow-y: auto;
  .his-item {
    padding: 5px;
    cursor: pointer;
    transition: all 0.25s;
    border-radius: 4px;
    white-space: nowrap;
    overflow: hidden;
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
