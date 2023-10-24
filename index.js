import { cssEntries, cssLoader } from './cssLoader'
import { kaliberConfigLoader } from './kaliberConfigLoader'
import { universalLoader } from './universalLoader'


async function build() {
  try {
    const clientResult = await Bun.build({
      entrypoints: ['./src/Container.universal.jsx'],
      outdir: './build',
      target: 'browser',
      naming: {
        entry: '[dir]/[name].browser.[ext]'
      },
      splitting: false,
      plugins: [cssLoader, kaliberConfigLoader],
    })

    const clientMap = Object.fromEntries(clientResult.outputs.map(x => {
      return [
        x.path.replace('/build/', '/src/')
          .replace('universal.browser', 'universal')
          .replace('.js', '.jsx'),
        x.path
      ]
    }))

    const serverResult = await Bun.build({
      entrypoints: ['./src/Container.universal.jsx'],
      outdir: './build',
      target: 'bun',
      naming: {
        entry: '[dir]/[name].server.[ext]'
      },
      splitting: false,
      plugins: [cssLoader, kaliberConfigLoader],
    })


    const serverMap = Object.fromEntries(serverResult.outputs.map(x => [
      x.path
        .replace('/build/', '/src/')
        .replace('universal.server', 'universal')
        .replace('.js', '.jsx'),
      x.path
    ]
    ))

    const result = await Bun.build({
      entrypoints: ['./src/App.jsx'],
      outdir: './build',
      target: 'bun',

      plugins: [cssLoader, kaliberConfigLoader, universalLoader({ clientMap, serverMap })],
    })
    const allCss = cssEntries.join('\n')
    await Bun.write('./build/allCss.css', allCss)

    console.log(result.logs.join('\n'))
    console.log(`Success: ${result.success}`)
  } catch (e) {
    console.log(e)
  }
}

build().then((_) => console.log('finished'))
