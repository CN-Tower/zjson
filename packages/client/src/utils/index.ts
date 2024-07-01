import mitt from 'mitt'
import type { Events } from '@/types'

export * from './utils'

/**
 * 全局事件
 */
export const events = mitt<Events>()
