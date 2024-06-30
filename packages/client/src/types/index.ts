/**
 * 编辑器类型
 */
export type IEditorType = 'zjson' | 'diff' | 'code'

/**
 * 编辑器标签
 */
export interface IEditorTab {
  title: string
  key: string
  type?: IEditorType
  closable?: boolean
}

/**
 * 代码编辑器
 */
export interface ICodeEditor {
  key: string
}

/**
 * 全局事件
 */
export type Events = {
  editorReady: void
}