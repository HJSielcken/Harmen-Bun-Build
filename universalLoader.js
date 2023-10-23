

export const universalLoader = {
  name: 'universal-modules',
  setup({ onLoad, config }) {
    onLoad({ filter: /\.universal.jsx$/ }, async (args) => {
      const [filename, ...rest] = args.path.split('/').reverse()

      const path = args.path.replace('universal.', '')

      const client = Bun.build({
        entrypoints: [path],
        target: 'browser',
        outdir: 'browser'
      })

      console.log(path.replace('src', 'build/browser').replace('jsx', 'js'))

      const newFile = `
      import Component from '${path}'
      
      export default function C(props) {
        return <>
        <script type="module" 
        dangerouslySetInnerHTML={{__html: "import A from '/browser/Container.js'; const { hydrate } = ReactDOM; let node = document.getElementById('Container.universal.jsx'); let props = JSON.parse(node.dataset.harmenComponent); let newElement = React.createElement(A, props);hydrate(newElement, node);"}}
        />
        <div data-harmen-component={JSON.stringify(props)} id='${filename}'>
          <Component {...props}/>
        </div></>
      }
      `

      return {
        contents: newFile,
        loader: 'jsx',
      }
    })
  },
}
