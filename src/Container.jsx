import styles from './Container.css'
export function Container({ aap }) {
  return (
    <div className={cx(styles.component, styles[aap])}>
      noot
      <button
        onClick={() => {
          window.alert(`Geklikt ${aap}`)
        }}
      >
        Klik hier {aap}
      </button>
    </div>
  )
}


function cx(...x) {
  return x.filter(Boolean).join(' ')
}
