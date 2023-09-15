# zio-ts

A tiny abstraction to make Zod compatible with fp-ts.

## Installation

```sh
npm install @valeriobelli/zio-ts fp-ts zod
```

## Usage

This library exposes `parse` and `parseAsync` which wraps the Zod `parse` and `parseAsync` functions.

### parse

The `parse` function takes a Zod schema and returns a function that takes an `unknown` value and returns an `Either` of the `ZodError` or the decoded value.

```typescript
import * as R from 'fp-ts/Reader'
import * as RE from 'fp-ts/ReaderEither'
import { constant, pipe } from 'fp-ts/function'
import { parse } from 'zio-ts'
import { z } from 'zod'

const Env = z.object({
	ENVIRONMENT: z.string(),
	NODE_ENV: z.string(),
})

declare const getEnv: R.Reader<void, Record<string, unknown>>

const getDecodedEnv = pipe(
	getEnv, // R.Reader<void, Record<string, unknown>>
	R.map(parse(Env)), // R.ReaderEither<void, z.ZodError<Env>, Env>
	RE.getOrElse(() => constant({ ENVIRONMENT: 'production', NODE_ENV: 'production' }))), // R.Reader<void, Env>
)
```

### parseAsync

The `parseAsync` function takes a Zod schema and returns a function that takes an `unknown` value and returns a `TaskEither` of the `ZodError` or the decoded value.

```typescript
import * as RTE from 'fp-ts/ReaderTaskEither'
import { flow } from 'fp-ts/function'
import { parse } from 'zio-ts'
import { z } from 'zod'

const User = z.object({
	name: z.string(),
	age: z.number(),
})

type User = z.infer<typeof User>

declare const getUser: RTE.ReaderTaskEither<void, Error, unknown>

const getDecodedUser = pipe(
	getUser, // RTE.ReaderTaskEither<Error, unknown>
	RTE.flatMapTaskEither(parseAsync(User)), // RTE.ReaderTaskEither<void, Error | z.ZodError<User>, User>
) // RTE.ReaderTaskEither<void, Error | z.ZodError<User>, User>
```
