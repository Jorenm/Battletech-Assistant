import GetCritLocations from '../lib/getCritLocations'
import GetHitLocation from '../lib/getHitLocation'
import RollDice from '../lib/rolldice'

import Hit from './hit'

import styles from './crit.module.sass'

export default function Crit({facing, roll, critCount}) {
	const critLocations = GetCritLocations(critCount)

	function isGroupless(hitLocation) {
		return ['HD', 'LL', 'RL'].includes(hitLocation)
	}

	return critLocations.length ? <div roll={roll} className={styles.crits}>
		{critLocations.map((critLocation, i) => {
			const hitLocation = GetHitLocation(facing, RollDice())
			console.log(isGroupless(hitLocation.location))
			return <div className={styles.crit} key={`crit_${i}`}>
				<Hit key={`crit_location_${i}`} hitLocation={hitLocation} damage={0} />
				<div className={styles.crit_location}>
					{isGroupless(hitLocation.location) ? '' : (critLocation.group > 3 ? '↑' : '↓')}
					{critLocation.location}
				</div>
			</div>
		})}
	</div> : null
}