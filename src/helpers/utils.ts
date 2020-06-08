import { Nil, Update } from '../types'
import { ReadonlyRecord } from 'fp-ts/lib/ReadonlyRecord'
import { timeWeek } from 'd3-time'

export function groupBy<K extends string, A>(fn: (a: A) => K, list: Array<A>): ReadonlyRecord<K, Array<A>> {
  return list.reduce((acc, curr) => {
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

export function min(list: ReadonlyArray<number>): number {
  return list.reduce((acc, curr) => curr < acc ? curr : acc, Infinity)

}

export function max<A>(list: ReadonlyArray<A>, accessor: (item: A) => number): number {
  return list.reduce((acc, curr) => accessor(curr) > acc ? accessor(curr) : acc, -Infinity)
}

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
