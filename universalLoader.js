export const universalLoader = ({ clientMap, serverMap }) => ({
  name: 'universal-modules',
  setup({ onLoad }) {
    onLoad({ filter: /\.universal.jsx$/ }, async (args) => {
      const newFile = snippet({
        clientPath: clientMap[args.path],
        serverPath: serverMap[args.path]
      })

      return {
        contents: newFile,
        loader: 'jsx',
      }
    })
  },
})

function snippet({ clientPath, serverPath }) {
  const where = clientPath.split('/').findIndex(x=> x==='build') + 1
  const relativeClientPath = clientPath.split('/').slice(where).join('/')
  const javascript = `|import A from './${relativeClientPath}'; 
                      |const { hydrateRoot } = ReactDOM; 
                      |const node = document.getElementById('${serverPath}'); 
                      |const props = JSON.parse(node.dataset.harmenComponent); 
                      |const newElement = React.createElement(A, props);
                      |hydrateRoot(node, newElement);`.split(/^[ \t]*\|/m).join('').replace(/\n/g, '');

  return `|import Component from '${serverPath}'
          |export default function C(props) {
          |return <>
          |<script 
          |  type='module' 
          |  dangerouslySetInnerHTML={{__html: "${javascript}"}}
          |/>
          |<div data-harmen-component={JSON.stringify(props)} id='${serverPath}'>
          |  <Component {...props}/>
          |</div></>
          |}`.split(/^[ \t]*\|/m).join('')
}
