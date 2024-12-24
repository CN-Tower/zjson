import mitt from 'mitt'
import type { Events } from '@/types'

export * from './utils'

/**
 * 全局事件
 */
export const events = mitt<Events>()

/**
 * 更新编辑器内容，支持撤销
 */
export const updateEditorContent = (editor: any, content: string) => {
  const currentModel = editor.getModel()
  const totalLines = currentModel.getLineCount()
  const range = new (window as any).monaco.Range(
    1,
    1,
    totalLines,
    currentModel.getLineMaxColumn(totalLines),
  )
  editor.executeEdits('my-source', [
    {
      range: range,
      text: content,
      forceMoveMarkers: true,
    },
  ])
}
