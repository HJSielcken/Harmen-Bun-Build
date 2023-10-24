import Container from './Container.universal'
import styles from './App.css'

export default function App() {
  return (
    <Html>
      <div className={styles.component}>Aap</div>
      <Container aap='kees'/>
    </Html>
  )
}

function Html({ children }) {
  return (
    <html>
      <head>
        <title>aap</title>
        <link rel='stylesheet' href='./allCss.css' />
        <script type="text/javascript" src="/react.development.js"></script>
        <script type="text/javascript" src="/react-dom.development.js"></script>
        {/* <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/react/16.8.6/umd/react.development.js"></script> */}
        {/* <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.8.6/umd/react-dom.development.js"></script> */}
        {/* <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.8.6/umd/react-dom.development.js"></script> */}
      </head>
      {children}
    </html>
  )
}
