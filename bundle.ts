await Bun.build({
	entrypoints: ['./src/index.ts'],
	format: 'esm',
	naming: '[dir]/[name].mjs',
	outdir: './dist',
})
