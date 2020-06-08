import { Update } from '../types'
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

export function groupByWeek(datapoint: Update) {
  const week = timeWeek(datapoint.date).valueOf() + ''
  return week
}


export function isNull(a: any): boolean {
  return a === null || typeof a === 'undefined'
}

export function min(list: ReadonlyArray<number>): number {
  return list.reduce((acc, curr) => curr < acc ? curr : acc, Infinity)

}

export function max<A>(list: ReadonlyArray<A>, accessor: (item: A) => number): number {
  return list.reduce((acc, curr) => accessor(curr) > acc ? accessor(curr) : acc, -Infinity)
}


export function identity<A>(a: A) { return a }

// function isDate(a: any): boolean {
//   return isNull(a) ? false : a.getTime?.() === a.getTime?.()
// }
//export declare function isNone<A>(fa: Option<A>): fa is None
export declare function isDate(maybeDate: Date | string | number): maybeDate is Date
