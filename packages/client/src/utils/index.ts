import mitt from 'mitt'
import type { Events } from '@/types'

/**
 * 全局事件
 */
export const events = mitt<Events>()