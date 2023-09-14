await Bun.build({
	entrypoints: ['./src/index.ts'],
	external: ['zod', 'fp-ts'],
	format: 'esm',
	naming: '[dir]/[name].mjs',
	outdir: './dist',
})
