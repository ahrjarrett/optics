import {ReadonlyRecord} from 'fp-ts/lib/ReadonlyRecord';
import {timeWeek} from 'd3-time';

import {GroupedInput, Nil} from 'types';
import {Update} from 'types/codecs';

export const prop = (prop: string) => (obj: Record<string, any>) =>
  obj[prop] || undefined;
export const min = (ns: number[]): number =>
  ns.reduce((lo, n) => (n <= lo ? n : lo), Infinity);
export const max = (ns: number[]): number =>
  ns.reduce((hi, n) => (n >= hi ? n : hi), -Infinity);

export const zipRecord = <A>(
  r: ReadonlyRecord<string, Array<A>>,
): Array<{week: string; updates: Array<A>}> => {
  return Object.entries<Array<A>>(r).map(([week, updates]) => ({
    week,
    updates,
  }));
};

export const groupBy = <K extends string, A>(
  fn: (a: A) => K,
): ((list: ReadonlyArray<A>) => ReadonlyRecord<K, Array<A>>) => {
  return list =>
    list.reduce((acc, curr) => {
      const key = fn(curr);
      const A = acc[key] || [];
      return {
        ...acc,
        [key]: [...A, curr],
      };
    }, {} as ReadonlyRecord<K, Array<A>>);
};

export function groupByWeek(datapoint: Update): string {
  const week = timeWeek(new Date(datapoint.date)).valueOf() + '';
  return week;
}

export const identity = <A>(a: A): A => a;

const isNull = (a: unknown): a is null => a === null;

const isUndefined = (a: unknown): a is undefined => a === undefined;

export const isNil = (a: unknown): a is Nil => isNull(a) || isUndefined(a);

export const isNotNil = <A>(a: A | Nil): a is A => !isNil(a);

export const isString = (a: unknown): a is string => typeof a === 'string';

export const isObject = (a: unknown): a is object =>
  !isNull(a) && typeof a === 'object' && a instanceof Object;

export const isArray = <A>(as: Array<A> | unknown): as is Array<A> =>
  Array.isArray(as);

export const isNonEmptyArray = <A>(as: Array<A> | unknown): as is Array<A> =>
  isArray(as) && as.length > 0;

export function isDate(a: any): boolean {
  return isNull(a) ? false : a.getTime?.() === a.getTime?.();
}
