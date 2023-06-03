import classNames from 'classnames'

import GetCritLocation from '../lib/getCritLocation'
import GetHitLocation from '../lib/getHitLocation'
import RollDice from '../lib/rolldice'

import Hit from './hit'

import styles from './crit.module.sass'

export default function Crit({targetType, attackDirection, roll, hit}) {

	function isGroupless(hitLocation) {
		return ['HD', 'LL', 'RL'].includes(hitLocation)
	}

	if (targetType == 'mech' && hit.floatingCrit) {
		const critLocation = GetCritLocation({targetType})
		const hitLocation = GetHitLocation({targetType, attackDirection, roll: RollDice()})

		return <div roll={roll} className={classNames(styles.crit, styles[`type_${targetType}`])}>
			<Hit hitLocation={hitLocation} targetType={targetType} damage={0} />
			<div className={styles.crit_location}>
				{isGroupless(hitLocation.location) ? '' : (critLocation.group > 3 ? '↑' : '↓')}
				{critLocation.location}
			</div>
		</div>
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

			return <div className={classNames(styles.motive_crit, styles[`type_${targetType}`])}>
				{[...Object.keys(damageResults)].map((type, i) => {
					return <p key={`damage_results_${i}`}>
						<strong>{type}:</strong><br />{getSystemDamage(damageResults[type] + hit.vehicleMotiveCrit.attackDirectionModifier)}<br />
					</p>
				})}
			</div>
		}
	}
}