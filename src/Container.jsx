import styles from './Container.css'
export default function Container({ aap }) {
  return (
    <div className={styles.component}>
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
