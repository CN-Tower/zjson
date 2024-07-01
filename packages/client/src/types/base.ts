/**
 * Any类型
 */
export type Any = any

/**
 * Key类型
 */
export type Key = string | number

/**
 * 对象类型
 */
export type Data = Record<Key, any>

/**
 * 任意函数
 */
export type Func = (...args: any[]) => any

/**
 * 可能为空值
 */
export type Nullable<T> = T | null
export type Voidable<T> = T | null | undefined

/**
 * 获取元组或常量数组的元素类型
 * https://stackoverflow.com/a/59187769
 *
 * @example
 * const colors = ['blue', 'pink'] as const
 * type ColorType = ElementOf<typeof colors> // => 'blue' | 'pink'
 */
export type ElementOf<T> = T extends (infer E)[] ? E : T extends readonly (infer F)[] ? F : never

/**
 * 枚举类型合并其父类型
 * https://github.com/Microsoft/TypeScript/issues/29729
 *
 * @example
 * type AbcAndStr = UnionSuper<'a' | 'b' | 'c'>
 */
// eslint-disable-next-line
export type UnionSuper<T extends U, U = string> = T | (U & {})

/**
 * 进程通信返回数据
 */
export interface IpcResponse<T> {
  data?: T
  error?: any
}
export type IpcResPromise<T> = Promise<IpcResponse<T>>
