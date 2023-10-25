import esbuild from 'esbuild'
import { sassPlugin } from 'esbuild-sass-plugin'

const config = {
  entryPoints: ['src/index.tsx', 'src/styles/index.scss'],
  outdir: 'dist',
  bundle: true,
  tsconfig: 'tsconfig.json',
  platform: 'browser',
  sourcemap: true,
  plugins: [sassPlugin()],
}

if (process.env.NODE_ENV === 'development') {
  const ctx = await esbuild.context(config)
  await ctx.watch()
  ctx.serve({ port: 3000, servedir: './' }, () => {
    console.log('server started')
  })
}

if (process.env.NODE_ENV === 'production') {
  config.minify = true
  await esbuild.build(config)
}
