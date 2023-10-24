import { cssEntries, cssLoader } from './cssLoader'
import { kaliberConfigLoader } from './kaliberConfigLoader'
import { universalClientLoader, universalServerLoader } from './universalLoader'
import { readdirSync, copyFileSync, unlinkSync } from 'fs'

async function build() {
  const buildFiles = readdirSync('build')
  buildFiles.map(x => unlinkSync(`${process.cwd()}/build/${x}`))
  const srcFiles = readdirSync('src')

  const universalEntrypoints = srcFiles.filter(x => /universal\.jsx/.test(x)).map(x => `${process.cwd()}/src/${x}`)
  universalEntrypoints.map(x => copyFileSync(x, x.replace('.jsx', '.js')))

  try {
    await Bun.build({
      entrypoints: universalEntrypoints,
      outdir: './build',
      target: 'browser',
      naming: {
        entry: '[dir]/[name].browser.[ext]'
      },
      splitting: true,
      plugins: [universalClientLoader, cssLoader, kaliberConfigLoader],
    })

    const result = await Bun.build({
      entrypoints: ['./src/App.jsx'],
      outdir: './build',
      target: 'bun',
      plugins: [universalServerLoader, cssLoader],
    })
    const allCss = cssEntries.join('\n')

    universalEntrypoints.map(x => unlinkSync(x.replace('.jsx', '.js')))

    await Bun.write(`${process.cwd()}/build/allCss.css`, allCss)

    console.log(result.logs.join('\n'))
    console.log(`Success: ${result.success}`)
  } catch (e) {
    console.log(e)
  }
}

build().then((_) => console.log('finished'))
