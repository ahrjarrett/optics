import * as t from 'io-ts';
import {either} from 'fp-ts/lib/Either';

//https://github.com/gcanti/io-ts-types/blob/master/src/fromRefinement.ts
function refinementToCodec<A>(
  uri: string,
  is: (u: unknown) => u is A,
): t.Type<A, A, unknown> {
  return new t.Type(
    uri,
    is,
    (u, c) => (is(u) ? t.success(u) : t.failure(u, c)),
    t.identity,
  );
}

const DateFromString = new t.Type<Date, string, unknown>(
  'DateFromString',
  (u): u is Date => u instanceof Date,
  (u, c) =>
    either.chain(t.string.validate(u, c), s => {
      const d = new Date(s);
      return isNaN(d.getTime()) ? t.failure(u, c) : t.success(d);
    }),
  a => a.toISOString(),
);

export type User = t.TypeOf<typeof UserCodec>;
export const UserCodec = t.type({
  id: t.readonly(t.string),
});

export type Goal = t.TypeOf<typeof GoalCodec>;
export const GoalCodec = t.type({
  id: t.readonly(t.string),
  createdAt: DateFromString,
  updatedAt: DateFromString,
});

export type Update = t.TypeOf<typeof UpdateCodec>;
export const UpdateCodec = t.readonly(
  t.type({
    id: t.string,
    date: DateFromString,
    goal: t.string,
    user: t.string,
  }),
);

export type Input = t.TypeOf<typeof InputCodec>;
export const InputCodec = t.type({
  updates: t.readonlyArray(UpdateCodec),
  goals: t.readonlyArray(GoalCodec),
  users: t.readonlyArray(UserCodec),
});

// DateFromString.decode(s)
// // right(new Date('1973-11-29T23:00:00.000Z'))

// DateFromString.decode('foo')
// // left(errors...)

// /**
//  * @since 0.5.0
//  */
// import * as t from 'io-ts'
// import { either } from 'fp-ts/lib/Either'

// /**
//  * @since 0.5.0
//  */
// export interface DateFromNumberC extends t.Type<Date, number, unknown> {}

// /**
//  * @example
//  * import { DateFromNumber } from 'io-ts-types/lib/DateFromNumber'
//  * import { right } from 'fp-ts/lib/Either'
//  *
//  * const date = new Date(1973, 10, 30)
//  * const input = date.getTime()
//  * assert.deepStrictEqual(DateFromNumber.decode(input), right(date))
//  *
//  * @since 0.5.0
//  */
// export const DateFromNumber: DateFromNumberC = new t.Type<Date, number, unknown>(
//   'DateFromNumber',
//   (u): u is Date => u instanceof Date,
//   (u, c) =>
//     either.chain(t.number.validate(u, c), n => {
//       const d = new Date(n)
//       return isNaN(d.getTime()) ? t.failure(u, c) : t.success(d)
//     }),
//   a => a.getTime()
