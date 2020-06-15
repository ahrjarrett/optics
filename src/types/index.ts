import { MutableRefObject } from 'react'
import { ScaleLinear } from 'd3'
import { Option } from 'fp-ts/lib/Option'
import { Either } from 'fp-ts/lib/Either'
import { ReadonlyRecord } from 'fp-ts/lib/ReadonlyRecord'

export type AsyncData<E, A> = Option<Either<E, A>>

export type Error = string

export interface Update {
  id: string;
  date: Date;
  goal: string;
  user: string;
}

export interface Goal {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
}

export type Input = {
  updates: Array<Update>,
  goals: Array<Goal>,
  users: Array<User>,
}

export type WeekMonth = {
  week: number,
  month: number,
  monthString: string,
  weekStart: string,
  weekEnd: string
}

export type Datum = {
  x: WeekMonth,
  y: number,
  updates: Array<Update>,
}

export type ContextType = {
  data: Array<Datum>,
  mos: Array<number>,
  width: number,
  height: number,
  d3Ref: React.MutableRefObject<SVGSVGElement | null>,
  xScale: d3.ScaleTime<number, number>,
  yScale: d3.ScaleLinear<number, number>,
}

export type SVGNode = SVGSVGElement | null
export type D3Ref = MutableRefObject<SVGNode>
export type YScale = ScaleLinear<number, number>

export type GroupedInput = {
  week: string,
  updates: Array<Update>
}

export type AppData = Input


export type AppState = AsyncData<Error, AppData>

export type Margin = {
  top: number,
  bottom: number,
  left: number,
  right: number,
}

export type Nil = null | undefined

declare global {
  interface Window { __namespace__: any }
}
