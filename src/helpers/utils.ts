import { Nil, Update } from '../types'
import { ReadonlyRecord } from 'fp-ts/lib/ReadonlyRecord'
import { timeWeek } from 'd3-time'

export const prop = (prop: string) => (obj: Record<string, any>) => obj[prop] || undefined
export const path = (path: string) => (obj: Record<string | number | symbol, any>) => {
  const props = path.split('.').reverse()
  let val = obj
  while (props.length) {
    let _path = props.pop()
    if (typeof _path === 'undefined') return undefined
    val = val[_path]
    if (typeof val === 'undefined') return undefined
  }
  return val
}

export const min = (ns: number[]): number => ns.reduce((lo, n) => n <= lo ? n : lo, Infinity)
export const max = (ns: number[]): number => ns.reduce((hi, n) => n >= hi ? n : hi, -Infinity)


export function zipRecord<A>(r: ReadonlyRecord<string, Array<A>>): Array<{ week: string, updates: Array<A> }> {
  const zipped = Object.entries<Array<A>>(r).map(([week, updates]) => ({ week, updates }))
  return zipped
}

export function groupBy<K extends string, A>(fn: (a: A) => K): (list: Array<A>) => ReadonlyRecord<K, Array<A>> {
  return (list) =>
    list.reduce((acc, curr) => {
      const key = fn(curr)
      const A = acc[key] || []
      return {
        ...acc, [key]: [...A, curr]
      }
    }, {} as ReadonlyRecord<K, Array<A>>)
}

export function groupByWeek(datapoint: Update): string {
  const week = timeWeek(datapoint.date).valueOf() + ''
  return week
}

export function identity<A>(a: A) { return a }

// export function min(list: ReadonlyArray<string>): number {
//   return list.reduce((acc, curr) => isNaN(parseInt(curr)) ? acc : parseInt(curr, 10) < acc ? parseInt(curr, 10) : acc, Infinity)
// }

// export function max<A>(list: ReadonlyArray<A>): number;
// export function max<A>(list: ReadonlyArray<number>): number {
//   return list.reduce((acc, curr) => curr > acc ? curr : acc, -Infinity
//     //accessor(curr) > acc ? accessor(curr) : acc, -Infinity)
//   )
// }
// return list.reduce((acc, curr) => accessor(curr) > acc ? accessor(curr) : acc, -Infinity)
// }

const isNull = (a: unknown): a is null => a === null

const isUndefined = (a: unknown): a is undefined => a === undefined

export const isNil = (a: unknown): a is Nil => isNull(a) || isUndefined(a)

export const isNotNil = <A>(a: A | Nil): a is A => !isNil(a)

export const isString = (a: unknown): a is string => typeof a === 'string'

export const isObject = (a: unknown): a is object => !isNull(a) && typeof a === 'object' && a instanceof Object

export const isArray = <A>(as: Array<A> | unknown): as is Array<A> => Array.isArray(as)

export const isNonEmptyArray = <A>(as: Array<A> | unknown): as is Array<A> => isArray(as) && as.length > 0

export function isDate(a: any): boolean {
  return isNull(a) ? false : a.getTime?.() === a.getTime?.()
}
