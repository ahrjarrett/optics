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

export type MockData = {
  updates: Array<Update>,
  goals: Array<Goal>,
  users: Array<User>,
}


export type ContextType<T, S> = {
  data: T,
  x: number,
  y: number,
  xs: Array<number>,
  ys: Array<Array<S>>,
  width: number,
  height: number,
  d3Ref: React.MutableRefObject<SVGSVGElement | null>,
  xScale: d3.ScaleTime<number, number>,
  yScale: d3.ScaleLinear<number, number>,
}

export type AppData = ReadonlyRecord<string, Array<Update>>

export type Context = ContextType<AppData, Update>

export type AppState = AsyncData<Error, AppData>

export type Margin = {
  top: number,
  bottom: number,
  left: number,
  right: number,
}
