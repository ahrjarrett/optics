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
