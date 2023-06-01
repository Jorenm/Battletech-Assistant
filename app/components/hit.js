import classNames from 'classnames'
import styles from './hit.module.sass'

import RollDice from '../lib/rolldice'
import { useEffect, useState } from 'react'
import GetHitLocation from '../lib/getHitLocation'
import GetCritLocations from '../lib/getCritLocations'

export default function Hit({facing, roll, hitLocation, damage}) {
	// const crits = {8: 1, 9: 1, 10: 2, 11: 2, 12: 3}[RollDice()] || false
	// const [crit, setCrit] = useState(GetCritLocations(crits))

	// console.log('crit', crit)

	useEffect(() => {
	}, [])

	return <div roll={roll} className={classNames(styles.hit_wrapper, facing == 'back' ? styles.back : '')}>
		{hitLocation && facing == 'back' && <div className={classNames(styles.back, styles.hit)}>
			<img src={`/hit_locations/left_torso${hitLocation.location == 'LT' ? '_red' : ''}.png`} width="44" height="70" className={styles.left_torso} />
			<img src={`/hit_locations/center_torso${hitLocation.location == 'CT' ? '_red' : ''}.png`} width="57" height="109" className={styles.center_torso} />
			<img src={`/hit_locations/right_torso${hitLocation.location == 'RT' ? '_red' : ''}.png`} width="44" height="70" className={styles.right_torso} />
		</div>}
		{hitLocation && facing != 'back' && <div className={styles.hit}>
			<img src={`/hit_locations/left_arm${hitLocation.location == 'LA' ? '_red' : ''}.png`} width="49" height="137" className={styles.left_arm} />
			<img src={`/hit_locations/left_torso${hitLocation.location == 'LT' ? '_red' : ''}.png`} width="44" height="70" className={styles.left_torso} />
			<img src={`/hit_locations/head${hitLocation.location == 'HD' ? '_red' : ''}.png`} width="52" height="41" className={styles.head} />
			<img src={`/hit_locations/center_torso${hitLocation.location == 'CT' ? '_red' : ''}.png`} width="57" height="109" className={styles.center_torso} />
			<img src={`/hit_locations/right_torso${hitLocation.location == 'RT' ? '_red' : ''}.png`} width="44" height="70" className={styles.right_torso} />
			<img src={`/hit_locations/right_arm${hitLocation.location == 'RA' ? '_red' : ''}.png`} width="49" height="137" className={styles.right_arm} />
			<img src={`/hit_locations/left_leg${hitLocation.location == 'LL' ? '_red' : ''}.png`} width="57" height="179" className={styles.left_leg} />
			<img src={`/hit_locations/right_leg${hitLocation.location == 'RL' ? '_red' : ''}.png`} width="57" height="179" className={styles.right_leg} />
		</div>}
		{damage ? <div className={styles.damage}>{damage}</div> : ''}
	</div>
}