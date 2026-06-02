import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: { compilerOptions: { composite: false } },
  tsconfig: 'tsconfig.build.json',
  external: ['react', 'react-dom', 'framer-motion'],
  sourcemap: true,
  clean: true,
})
