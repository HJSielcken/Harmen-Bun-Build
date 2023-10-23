import { cssEntries, cssLoader } from './cssLoader'
import { kaliberConfigLoader } from './kaliberConfigLoader'
import { universalLoader } from './universalLoader'

async function build() {
  try {
    const result = await Bun.build({
      entrypoints: ['./src/App.jsx'],
      outdir: './build',
      target: 'bun',
      plugins: [cssLoader, kaliberConfigLoader, universalLoader],
    })

    console.log(result.logs.join('\n'))
    console.log({ success: result.success })
    const allCss = cssEntries.join('\n')
    await Bun.write('./build/allCss.css', allCss)
  } catch (e) {
    console.log(e)
  }
}

build().then((_) => console.log('finished'))
