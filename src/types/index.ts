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


export type ContextType<T> = {
  d3Ref: React.MutableRefObject<SVGSVGElement | null>,
  xScale: d3.ScaleTime<number, number>,
  yScale: d3.ScaleLinear<number, number>,
  data: T
}

export type AppData = ReadonlyRecord<string, Array<Update>>

export type Context = ContextType<AppData>

export type AppState = AsyncData<Error, AppData>


