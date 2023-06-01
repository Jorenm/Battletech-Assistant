import styles from './page.module.sass'
import Roller from './components/roller'

export default function Home() {
	return (
		<main className={styles.main}>
			<Roller />
		</main>
	)
}
