import postcss from 'postcss'
import PostcssModulesPlugin from 'postcss-modules'

const cssJson = {}

const cssModuleLoader = PostcssModulesPlugin({
  getJSON(filename, json) {
    cssJson[filename] = json
  },
})

const plugins = [cssModuleLoader]

export let cssEntries = []

export const cssLoader = {
  name: 'css-modules',
  setup({ onLoad, config }) {
    onLoad({ filter: /\.css$/ }, async (args) => {
      const css = await Bun.file(args.path).text()

      await postcss(plugins)
        .process(css, { from: args.path })
        .then(x => { cssEntries = [...cssEntries, x.css] })


      return {
        contents: JSON.stringify(cssJson[args.path]),
        loader: 'json',
      }
    })
  },
}
