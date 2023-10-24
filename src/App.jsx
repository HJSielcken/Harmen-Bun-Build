import Container from './Container.universal'
import Container2 from './Container2.universal'
import styles from './App.css'
import { readdirSync } from 'fs'

export default function App() {
  return (
    <Html>
      <div className={styles.component}>Aap</div>
      <Container aap='kees' />
      <Container2 aap='wim' />
    </Html>
  )
}

function Html({ children }) {
  return (
    <html>
      <head>
        <title>aap</title>
        <link rel='stylesheet' href='./allCss.css' />
        <JavaScript />
      </head>
      {children}
    </html>
  )
}

function JavaScript() {
  const chunkFiles = readdirSync(`${process.cwd()}/build`)
    .filter((x) => /^chunk\-.*\.js$/.test(x))
    .map((x) => [x, `./${x}`])

  const moduleFiles = readdirSync(`${process.cwd()}/build`).filter((x) =>
    /.*universal\.browser\.js$/.test(x)
  )

  const importMap = { imports: Object.fromEntries(chunkFiles) }
  return (
    <>
      <script
        type='importmap'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(importMap) }}
      />
      {chunkFiles.map((x, idx) => (
        <script key={idx} defer type='module' src={x[1]}></script>
      ))}
      {moduleFiles.map((x, idx) => (
        <script key={idx} defer type='module' src={x}></script>
      ))}
    </>
  )
}
