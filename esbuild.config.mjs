import esbuild from 'esbuild'
import { sassPlugin } from 'esbuild-sass-plugin'

await esbuild.build({
  entryPoints: ['src/index.tsx', 'src/styles/index.scss'],
  outdir: 'dist',
  bundle: true,
  tsconfig: 'tsconfig.json',
  platform: 'browser',
  sourcemap: true,
  plugins: [sassPlugin()],
})
