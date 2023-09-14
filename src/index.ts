import * as E from 'fp-ts/Either'
import * as TE from 'fp-ts/TaskEither'
import type { ZodError, ZodType, ZodTypeDef } from 'zod'

const cast = <T>(data: unknown) => data as T

export const parse =
	<Type extends ZodType<unknown, ZodTypeDef, unknown>>(type: Type) =>
	(data: unknown): E.Either<ZodError<Type['_input']>, Type['_output']> =>
		E.tryCatch(() => type.parse(data), cast<ZodError<Type['_input']>>)

export const parseAsync =
	<Type extends ZodType<unknown, ZodTypeDef, unknown>>(type: Type) =>
	(data: unknown): TE.TaskEither<ZodError<Type['_input']>, Type['_input']> =>
		TE.tryCatch(() => type.parseAsync(data), cast<ZodError<Type['_input']>>)
