import { defineConfig } from 'tsup';

export default defineConfig(() => {
  return {
    entry: ['src/index.ts', 'src/path/index.ts'],
    splitting: true,
    sourcemap: false,
    clean: true,
    format: ['cjs', 'esm'],
    dts: true,
    minify: false,
  };
});
