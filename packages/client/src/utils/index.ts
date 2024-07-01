import mitt from 'mitt'
import type { Events } from '@/types'

/**
 * 全局事件
 */
export const events = mitt<Events>()

/**
 * 彻底移除DOM元素防止内存泄漏
 * @param element {Node}
 */
export function removeElement(element: any) {
  const dustbinId = '__butils_element_dustbin'
  let dustbin = document.getElementById(dustbinId)
  if (!dustbin) {
    dustbin = document.createElement('DIV')
    dustbin.id = dustbinId
    dustbin.style.display = 'none'
    document.body.appendChild(dustbin)
  }
  dustbin.appendChild(element)
  dustbin.innerHTML = ''
}

/**
 * 复制文本到粘帖板
 * @param {string} text
 * @param {Element} target
 */
export function copyText(text: string, target?: any) {
  const el = document.createElement('textarea')
  el.value = text
  el.setAttribute('readonly', '')
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  const targetEl = target || document.body
  targetEl.appendChild(el)
  const selected =
    document.getSelection()!.rangeCount > 0 ? document.getSelection()!.getRangeAt(0) : false
  el.select()
  document.execCommand('copy')
  targetEl.removeChild(el)
  removeElement(el)
  if (selected) {
    document.getSelection()!.removeAllRanges()
    document.getSelection()!.addRange(selected)
  }
}
