import { Option } from 'fp-ts/lib/Option'
import { Either } from 'fp-ts/lib/Either'

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
