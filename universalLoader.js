export const universalClientLoader = {
  name: 'universal-client-loader',
  setup({ onLoad }) {
    onLoad({ filter: /\.universal.jsx$/ }, async (args) => {
      const newFile = clientSnippet({
        clientPath: args.path,
      })

      return {
        contents: newFile,
        loader: 'jsx',
      }
    })
  },
}

export const universalServerLoader = {
  name: 'universal-server-loader',
  setup({ onLoad }) {
    onLoad({ filter: /\.universal.jsx$/ }, async (args) => {
      const newFile = serverSnippet({
        serverPath: args.path,
      })

      return {
        contents: newFile,
        loader: 'jsx',
      }
    })
  },
}

function clientSnippet({ clientPath }) {
  const path = clientPath.replace('.jsx','.js')

  return `|import React from 'react';
          |import ReactDOM from 'react-dom/client';
          |import ClientComponent from '${path}'; 
          |const { hydrateRoot } = ReactDOM; 
          |const nodes = Array.from(document.querySelectorAll('*[data-harmen-component-id="${Bun.hash(path)}"]'));
          |nodes.map(x => {
          |const props = JSON.parse(x.dataset.harmenComponent); 
          |const newElement = React.createElement(ClientComponent, props);
          |hydrateRoot(x, newElement);
          |})`.split(/^[ \t]*\|/m).join('').replace(/\n/g, '');
}

function serverSnippet({  serverPath }) {
  const path = serverPath.replace('.jsx','.js')

  return `|import Component from '${path}'
          |export default function ServerComponent(props) {
          |return (
          |<div data-harmen-component={JSON.stringify(props)} data-harmen-component-id='${Bun.hash(path)}'>
          |  <Component {...props}/>
          |</div>)
          |}`.split(/^[ \t]*\|/m).join('')
}
