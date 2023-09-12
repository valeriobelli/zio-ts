import { expect, test } from 'bun:test'
import { expectTypeOf } from 'expect-type'
import * as E from 'fp-ts/Either'
import * as TE from 'fp-ts/TaskEither'
import { z } from 'zod'
import { parse, parseAsync } from './index.ts'

test('parse generates an Either with a ZodError in the Left channel and the decoded data in the Right channel', () => {
	const schema = z.object({
		bar: z.number(),
		foo: z.string(),
	})

	const result = parse(schema)({ bar: 1, foo: 'foo' })

	expectTypeOf(result).toEqualTypeOf<E.Either<z.ZodError<{ bar: number; foo: string }>, { bar: number; foo: string }>>()
})

test('parse parses a valid input by returning the result in the Right channel of a Either monad', () => {
	const schema = z.object({
		bar: z.number(),
		foo: z.string(),
	})

	const result = parse(schema)({ bar: 1, foo: 'foo' })

	expect(result).toEqual(E.right({ bar: 1, foo: 'foo' }))
})

test('parse parses an invalid input by returning the result in the Left channel of a Either monad', () => {
	const schema = z.object({
		bar: z.number(),
		foo: z.string(),
	})

	const result = parse(schema)('INVALID!')

	expect(result).toEqual(E.left(expect.any(z.ZodError)))
})

test('parseAsync generates a TaskEither with a ZodError in the Zeft channel and the decoded data in the Right channel', () => {
	const schema = z.object({
		bar: z.number(),
		foo: z.string(),
	})

	const result = parseAsync(schema)({ bar: 1, foo: 'foo' })

	expectTypeOf(result).toEqualTypeOf<
		TE.TaskEither<z.ZodError<{ bar: number; foo: string }>, { bar: number; foo: string }>
	>()
})

test('parseAsync parses a valid input by returning the result in the Right channel of a Either monad', async () => {
	const schema = z.object({
		bar: z.number(),
		foo: z.string(),
	})

	expect(await parseAsync(schema)({ bar: 1, foo: 'foo' })()).toEqual(E.right({ bar: 1, foo: 'foo' }))
})

test('parseAsync parses an invalid input by returning the result in the Left channel of a Either monad', async () => {
	const schema = z.object({
		bar: z.number(),
		foo: z.string(),
	})

	expect(await parseAsync(schema)('INVALID!')()).toEqual(E.left(expect.any(z.ZodError)))
})
