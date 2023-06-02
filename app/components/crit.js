import classNames from 'classnames'

import GetCritLocations from '../lib/getCritLocations'
import GetHitLocation from '../lib/getHitLocation'
import RollDice from '../lib/rolldice'

import Hit from './hit'

import styles from './crit.module.sass'

export default function Crit({targetType, attackDirection, roll, hit}) {

	console.log('crit', hit)

	function isGroupless(hitLocation) {
		return ['HD', 'LL', 'RL'].includes(hitLocation)
	}

	let critLocations = []
	if (targetType == 'mech' && hit.floatingCrit) {
		const actualCrits = {8: 1, 9: 1, 10: 2, 11: 2, 12: 3}[RollDice()] || false
		critLocations = GetCritLocations({targetType, critCount: actualCrits})

		return critLocations.length ? <div roll={roll} className={styles.crits}>
			{critLocations.map((critLocation, i) => {
				const hitLocation = GetHitLocation({targetType, attackDirection, roll: RollDice()})
				return <div className={classNames(styles.crit, styles[`type_${targetType}`])} key={`crit_${i}`}>
					<Hit key={`crit_location_${i}`} hitLocation={hitLocation} targetType={targetType} damage={0} />
					<div className={styles.crit_location}>
						{isGroupless(hitLocation.location) ? '' : (critLocation.group > 3 ? '↑' : '↓')}
						{critLocation.location}
					</div>
				</div>
			})}
		</div> : null
	} else if (targetType == 'vehicle') {
		if (hit.vehicleMotiveCrit) {
			const damageResults = {
				'Tracked, Naval': RollDice() + 0,
				'Wheeled': RollDice() + 2,
				'Hovercraft': RollDice() + 3,
				'WiGE': RollDice() + 4
			}

			function getSystemDamage(totalRoll) {
				if (totalRoll <= 5) {
					return 'No effect'
				} else if (totalRoll == 6 || totalRoll == 7) {
					return 'Minor damage'
				} else if (totalRoll == 8 || totalRoll == 9) {
					return 'Moderate damage'
				} else if (totalRoll == 10 || totalRoll == 11) {
					return 'Heavy damage'
				} else if (totalRoll >= 12) {
					return 'Immobilized'
				}
			}

			console.log('damageResults', damageResults)
			return <div className={classNames(styles.motive_crit, styles[`type_${targetType}`])}>
				{[...Object.keys(damageResults)].map((type, i) => {
					return <p key={`damage_results_${i}`}>
						<strong>{type}:</strong><br />{getSystemDamage(damageResults[type] + hit.vehicleMotiveCrit.attackDirectionModifier)}<br />
					</p>
				})}
			</div>
		}
	}

	console.log('crit', critLocations)




}